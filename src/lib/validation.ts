import { z } from "zod";

// アカウント登録ページ バリデーション
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "ユーザー名は２文字以上にしてください")
      .max(20, "ユーザー名は２０文字以下にしてください"),
    email: z.string().email("無効なメールアドレスの形式です"),
    gender: z.enum(["男性", "女性", "その他"], {
      required_error: "性別は必須項目です",
    }),
    age: z
      .number({ required_error: "年齢は必須項目です" })
      .min(0, "0歳以上を指定してください")
      .max(130, "130歳以下を指定してください"),
    password: z
      .string()
      .min(6, "パスワードは６文字以内にしてください")
      .max(20, "パスワードは20文字以内にしてください"),
    confirmedPassword: z
      .string()
      .min(6, "確認用パスワードは６文字以内にしてください")
      .max(20, "確認用パスワードは20文字以内にしてください"),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "パスワードが一致しません",
    path: ["confirmedPassword"],
  });

// ログインページ バリデーション
export const loginSchema = z.object({
  email: z.string().email("無効なメールアドレスの形式です"),
  password: z
    .string()
    .min(6, "パスワードは6文字以内にしてください")
    .max(20, "パスワードは20文字以内にしてください"),
});

// ユーザー情報編集ページ バリデーション
export const editSchema = z.object({
  name: z
    .string({ required_error: "ユーザー名は必須項目です" })
    .min(2, "ユーザー名は2文字以上にしてください")
    .max(20, "ユーザー名は20文字以下にしてください"),
  gender: z.enum(["男性", "女性", "その他"], {
    required_error: "性別は必須項目です",
  }),
  age: z
    .number({ required_error: "年齢は必須項目です" })
    .min(0, "０歳以上を指定してください")
    .max(130, "130歳以上を指定してください"),
});
