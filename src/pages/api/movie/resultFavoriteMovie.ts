import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// １ページあたりの映画表示件数
const MOVIE_PER_PAGE = 12;
const MOVIE_API = process.env.MOVIE_API;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // クエリパラメータよりページ番号取得
  const currentPage = Number.parseInt(req.query.page as string, 12) || 1;

  if (req.method === "GET") {
    try {
      // お気に入り映画が多い順に映画を取得
      const favoriteMovies = await prisma.movie.findMany({
        skip: (currentPage - 1) * MOVIE_PER_PAGE,
        take: MOVIE_PER_PAGE,
        orderBy: {
          favorite_Movies: {
            _count: "desc",
          },
        },
        include: {
          _count: {
            select: { favorite_Movies: true },
          },
        },
      });

      // TMDBより該当映画情報を取得
      const movieDetails = await Promise.all(
        favoriteMovies.map(async (movie) => {
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

      // お気に入り登録されている映画数を取得
      const totalFavoriteMovies = await prisma.movie.count({
        where: {
          favorite_Movies: {
            some: {},
          },
        },
      });

      const totalPage = Math.ceil(totalFavoriteMovies / MOVIE_PER_PAGE);

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
