import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const limit = Number(req.query.limit) || 20;
      const playingMovieIds = await prisma.movie.findMany({
        where: {
          playing: true,
        },
        select: {
          api_id: true,
        },
        take: limit,
      });

      if (!playingMovieIds) {
        return res.status(404).json({ message: "上映中の映画が見つかりませんでした。" });
      }

      const playingMovies = await Promise.all(
        playingMovieIds.map(async (movie: any) => {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.api_id}?api_key=586eeda24edab92c73392fb73d4d14ce&language=ja-JP`
          );
          return await movieResponse.json();
        })
      );

      if (!playingMovies) {
        return res.status(404).json({ message: "上映中映画情報が見つかりませんでした。" });
      }

      return res.status(200).json({ playingMovies: playingMovies });
    } catch (err) {
      return res.status(500).json({ message: "サーバーエラー", err });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`${req.method}メソッドは使用できません`);
  }
};

export default handler;
