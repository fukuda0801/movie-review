import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  // 環境変数がない場合
  if (!SECRET_KEY) {
    res.status(401).json({ message: "権限がありません" });
  }

  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // メールアドレスがマッチするuserデータを取得
      const matchUser = await prisma.user.findUnique({
        where: { email },
      });

      // 送られてきたメールアドレスを持つユーザーがいなかった場合
      if (!matchUser) {
        return res.status(401).json({ message: "メールアドレスが無効です" });
      }

      // パスワードが一致しない場合
      const passwordMatch = await bcrypt.compare(password, matchUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "パスワードが無効です。" });
      }

      // トークン作成
      const token = jwt.sign(
        { id: matchUser.id, email: matchUser.email },
        process.env.JWT_SECRET_KEY!,
        {
          expiresIn: "1d",
        }
      );

      // レスポンスのヘッダーに情報追加（トークンなど）
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24,
          sameSite: "strict",
          path: "/",
          httpOnly: true,
        })
      );

      return res.status(200).json({ message: "ログインに成功しました。" });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: "サーバーエラーが発生しました。" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`${req.method}メソッドは使用できません`);
  }
};

export default handler;
