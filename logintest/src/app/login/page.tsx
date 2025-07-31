import { signIn, auth, signOut } from "@/app/auth"
import Link from "next/link";

import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (!session) {
    // セッションがなければログインページ（Googleサインイン）へリダイレクト
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Link href={"/dashboard"}>dashboard</Link>
      <h1>{session.user?.name}がログインしたよ</h1>
      <img src={session.user?.image as string} alt="user image" />
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Signout</button>
      </form>
    </>
  );
}