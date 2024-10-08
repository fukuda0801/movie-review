import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 秘密鍵取得
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  // 秘密鍵がなかった場合500エラーを返す
  if (!SECRET_KEY) {
    return res.status(500).json({ message: "権限がありません" });
  }

  if (req.method === "PUT") {
    const token = req.cookies.token;
    // 未ログインの場合
    if (!token) {
      return res.status(401).json({ message: "ログインが必要です。" });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
      // 必須入力バリデーション
      const { name, gender, age } = req.body;

      if (!name || !gender || !age) {
        return res.status(400).json({ message: "未入力の項目があります" });
      }

      // prismaを使ってdbから該当データ取得
      const user = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      // DBにユーザーが存在しなかった場合
      if (!user) {
        return res.status(401).json({ message: "ユーザーが存在しません。" });
      }

      // prismaを使って取得したレコードを更新
      const updateUser = await prisma.user.update({
        where: {
          email: decoded.email,
        },
        data: {
          name: name,
          age: age,
          gender: gender,
        },
      });
      return res
        .status(200)
        .json({ message: "ユーザー情報の更新が完了しました。", user: updateUser });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "サーバーエラーです。" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`${req.method}は使用できません`);
  }
};

export default handler;
