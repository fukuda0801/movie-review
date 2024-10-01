import InputRadio from "@/components/user/InputRadio";
import InputText from "@/components/user/InputText";
import Title from "@/components/user/Title";
import styles from "../../styles/pages/user/edit.module.css";
import Button from "@/components/utils/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editSchema } from "@/lib/validation";
import { useRouter } from "next/router";
import Link from "next/link";

type EditProps = {
  name: string;
  gender: string;
  age: string;
};

const Edit = () => {
  // React Hook Formにてフォーム管理、zodにてバリでション管理
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProps>({
    resolver: zodResolver(editSchema),
  });

  // useRouterでルーティング管理
  const router = useRouter();

  // ユーザー情報編集処理
  const onSubmit = async (data: EditProps) => {
    try {
      const response = await fetch("/api/user/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          gender: data.gender,
          age: data.age,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "ユーザー情報の編集に失敗しました");
      }
      const editedUser = await response.json();
      alert("ユーザー情報の編集に成功しました");
      router.push(`/user/${editedUser.user.id}`);
    } catch (err: any) {
      console.error(err.message || "サーバーエラーが発生しました");
    }
  };

  return (
    <main className={styles.editContent}>
      <form className={styles.editForm} onSubmit={handleSubmit(onSubmit)}>
        <Title title="ユーザー情報編集" />
        <InputText
          name="name"
          label="ユーザー名"
          type="text"
          register={register("name")}
          errorMessage={errors.name?.message}
        />
        <div className={styles.inputRadioGroup}>
          <div className={styles.inputRadioContent}>
            <label>性別</label>
            <InputRadio label="男性" value="男性" register={register("gender")} checked={true} />
            <InputRadio label="女性" value="女性" register={register("gender")} />
            <InputRadio label="その他" value="その他" register={register("gender")} />
          </div>
          {errors.gender && <p className={styles.errorMessage}>{errors.gender.message}</p>}
        </div>
        <InputText
          name="age"
          label="年齢"
          type="number"
          register={register("age", {
            setValueAs: (value) => (value === "" ? undefined : parseInt(value, 10)),
          })}
          errorMessage={errors.age?.message}
        />
        <div className={styles.buttonGroup}>
          <Button type="submit" label="送信" variant="primary" />
          <Link href="/">
            <Button type="button" label="キャンセル" variant="secondary" />
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Edit;
