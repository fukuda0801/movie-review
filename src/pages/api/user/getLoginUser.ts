import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  // 秘密鍵がなかった場合401エラーを返す
  if (!SECRET_KEY) {
    return res.status(500).json({ message: "権限がありません" });
  }

  if (req.method === "GET") {
    // リクエストよりログインしていた場合にトークンを取得
    const token = req.cookies.token;
    // トークンがなかった場合、未ログインとする。401を返す
    if (!token) {
      return res.status(401).json({ message: "ログインしてください" });
    }

    try {
      // tokenが改ざんされていないか、有効期限は切れていないかをverify関数を使って検証している。
      const decoded = jwt.verify(token, SECRET_KEY) as {
        id: string;
        name: string;
        email: string;
        age: number;
        gender: string;
      };

      // トークンから取得したユーザーのemailを使って、ユーザー情報をデータベースから取得
      const loginUser = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      // データベースからユーザー情報が見つからなかった場合、404エラー
      if (!loginUser) {
        return res.status(404).json({ message: "ユーザーが見つかりません" });
      }
      // データベースからログインユーザーの情報が見つかった場合200を返す
      return res.status(200).json({
        message: "ログインユーザーが見つかりました。",
        user: loginUser,
      });
    } catch (err: any) {
      return res.status(500).json({ message: "サーバーエラー" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`${req.method}メソッドは使用できません`);
  }
};

export default handler;
