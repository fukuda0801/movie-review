import { NextApiHandler, type NextApiRequest, type NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  if (!SECRET_KEY) {
    return res.status(500).json({ message: "権限がありません" });
  }

  if (req.method === "DELETE") {
    const token = req.cookies.token;
    // ログインしているかどうか
    if (!token) {
      return res.status(401).json({ message: "ログインが必要です。" });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
      // DBからログインユーザーのレコードを取得
      const user = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      // ユーザーが見つからなかった場合
      if (!user) {
        return res.status(401).json({ message: "ユーザーが存在しません" });
      }

      // prismaを使ってログインユーザーのレコードを削除
      const deleteUser = await prisma.user.delete({
        where: {
          email: decoded.email,
        },
      });

      res.setHeader("Set-Cookie", "token=; Max-Age=0; Path=/; HttpOnly");
      return res.status(200).json({ message: "ユーザーの退会処理が完了しました" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "サーバーエラーです。" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`${req.method}は使用できません`);
  }
};

export default handler;
