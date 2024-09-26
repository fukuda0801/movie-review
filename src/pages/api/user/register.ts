import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, gender, age, password, confirmedPassword } = req.body;
    try {
      // パスワードと確認用パスワードが一致しているか
      if (password !== confirmedPassword) {
        res.status(403).json({
          message: "パスワードが一致しません",
          user: { name, email, gender, age, password, confirmedPassword },
        });
      }

      // 登録済のメールアドレスは除外
      const exitingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (exitingUser) {
        res.status(409).json({ message: "このメールアドレスはすでに登録されています" });
      }

      const saltRounds = 10;
      // パスワードのハッシュ化
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // ユーザーの登録処理
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          gender,
          age,
          password: hashedPassword,
        },
      });

      return res.status(201).json({ message: "ユーザーの登録に成功しました", user: newUser });
    } catch (err) {
      console.error("サーバーエラーが発生しました", err);
      return res.status(500).json({ err: "サーバーエラーが発生しました" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`${req.method} メソッドは使用できません。`);
  }
};

export default handler;
