import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

//TODO notion に登録した人のメールアドレスを登録して、参照すれば有料コンテンツの表示ができそう
const allowedEmails = [
  "o.ryotaro23@gmail.com", // 閲覧を許可するメールアドレスをここに追加
];

export default async function Dashboard() {
  const session = await auth();
  if (!session || !session.user?.email || !allowedEmails.includes(session.user.email)) {
    redirect("/"); // 許可されていない場合はトップページへリダイレクト
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">ダッシュボード</h1>
      <p>ようこそ、{session.user?.name}さん！ここはログインしたユーザーのみが見られるページです。</p>
    </div>
  );
}
