import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const limit = Number(req.query.limit) || 10;
      const popularMovieIds = await prisma.favorite_Movie.groupBy({
        by: ["api_id"],
        _count: {
          api_id: true,
        },
        orderBy: {
          _count: {
            api_id: "desc",
          },
        },
        take: limit,
      });

      if (!popularMovieIds) {
        return res.status(404).json({ message: "人気映画が見つかりませんでした。" });
      }

      const popularMovies = await Promise.all(
        popularMovieIds.map(async (movie: any) => {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.api_id}?api_key=586eeda24edab92c73392fb73d4d14ce&language=ja-JP`
          );
          const movieData = await movieResponse.json();

          return {
            ...movieData,
            count: movie._count.api_id,
          };
        })
      );

      if (!popularMovies) {
        return res.status(404).json({ message: "人気映画情報が取得できませんでした。" });
      }

      return res.status(200).json({ popularMovies: popularMovies });
    } catch (err) {
      return res.status(500).json({ message: "サーバーエラー", err });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`${req.method}メソッドは使用できません`);
  }
};

export default handler;
