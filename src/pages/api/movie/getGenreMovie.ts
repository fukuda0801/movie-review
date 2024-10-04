import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const genres = await prisma.genre.findMany();

      if (!genres) {
        res.status(404).json({ message: "ジャンルが見つかりませんでした。" });
      }
      return res.status(200).json({ genres: genres });
    } catch (err) {
      return res.status(500).json({ message: "サーバーエラー", err });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`${req.method}メソッドは使用できません`);
  }
};

export default handler;
