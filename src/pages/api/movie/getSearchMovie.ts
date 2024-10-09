// pages/api/getSearchMovie.js
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// 1ページあたりの映画表示件数
const MOVIE_PER_PAGE = 12;
const MOVIE_API = process.env.MOVIE_API;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // クエリパラメータよりページ番号取得
  const currentPage = Number.parseInt(req.query.page as string, 12) || 1;

  if (req.method === "GET") {
    const search = req.query.search as string;

    try {
      // TMDB APIにリクエストを送信し、映画情報を取得
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&api_key=${MOVIE_API}&language=ja-JP`,
      );
      const moviesData = await movieResponse.json();

      // データが存在しない場合のエラー処理
      if (!moviesData || !moviesData.results || moviesData.results.length === 0) {
        return res.status(404).json({ message: "映画が見つかりませんでした。" });
      }

      // 取得した映画データの`id`のみを取得
      const movieIds = moviesData.results.map((movie: any) => movie.id);

      // データベースに存在する映画IDのみを取得
      const matchedMovies = await prisma.movie.findMany({
        where: { api_id: { in: movieIds } },
        skip: (currentPage - 1) * MOVIE_PER_PAGE,
        take: MOVIE_PER_PAGE,
      });

      // 条件に合う映画情報を取得
      const resultMovies = matchedMovies.map((movie) => {
        const foundMovie = moviesData.results.find(
          (movieData: any) => movieData.id === movie.api_id,
        );
        return {
          ...movie,
          title: foundMovie ? foundMovie.title : null,
          release_date: foundMovie ? foundMovie.release_date : null,
          poster_path: foundMovie ? foundMovie.poster_path : null,
        };
      });

      // あいまい検索で取得できる前衛が件数
      const totalMovies = await prisma.movie.count({
        where: { api_id: { in: movieIds } },
      });

      const totalPage = Math.ceil(totalMovies / MOVIE_PER_PAGE);

      return res.status(200).json({ resultMovies, currentPage, totalPage });
    } catch (error) {
      console.error("サーバーエラー:", error);
      return res.status(500).json({ message: "サーバーエラーが発生しました。" });
    }
  } else {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: `${req.method}メソッドは使用できません` });
  }
};

export default handler;
