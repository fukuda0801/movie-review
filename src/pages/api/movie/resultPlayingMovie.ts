import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// 1ページあたりの映画の表示件数
const MOVIE_PER_PAGE = 12;
const MOVIE_API = process.env.MOVIE_API;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // クエリパラメータよりページ番号取得
  const currentPage = parseInt(req.query.page as string, 12) || 1;

  if (req.method === "GET") {
    try {
      // 公開中の映画（api_id）を取得
      const playingMovies = await prisma.movie.findMany({
        where: {
          playing: true,
        },
        skip: (currentPage - 1) * MOVIE_PER_PAGE,
        take: MOVIE_PER_PAGE,
      });

      // 取得したapi_idを使用してTMDB APIより必要なデータを取得
      const movieDetails = await Promise.all(
        playingMovies.map(async (movie) => {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.api_id}?api_key=${MOVIE_API}&language=ja`
          );
          const movieData = await movieResponse.json();

          return {
            ...movie,
            title: movieData.title,
            poster_path: movieData.poster_path,
            release_date: movieData.release_date,
          };
        })
      );

      // 公開中の映画の総件数を取得
      const totalPlayingMovies = await prisma.movie.count({
        where: {
          playing: true,
        },
      });

      const totalPage = Math.ceil(totalPlayingMovies / MOVIE_PER_PAGE);

      res.status(200).json({ movieDetails, currentPage, totalPage });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "サーバーエラーです" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `${req.method}メソッドは使用できません` });
  }
};

export default handler;
