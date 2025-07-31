import { auth } from "@/app/auth"
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect('/'); // 未ログインならリダイレクト
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">ダッシュボード</h1>
      <p>ようこそ、{session.user?.name}さん！ここはログインしたユーザーのみが見られるページです。</p>
    </div>
  );
}
