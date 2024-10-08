import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // トークンの期限を切らせてログアウトとする
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", "token=; Max-Age=0; Path=/; HttpOnly");
    res.status(200).json({ message: "ログアウトしました" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`${req.method}メソッドは使用できません`);
  }
};

export default handler;
