import SignupForm from "@/components/auth/SignupForm";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function page() {
  const jwtCookie = (await cookies()).get("jwt");

  return (
    <div className="w-screen h-screen relative flex items-center justify-center">
      <Link
        className="fixed text-white top-2 left-3 text-3xl font-pencerio cursor-pointer"
        href="/"
      >
        meetdraw
      </Link>
      <div className="absolute h-[200px] w-[400px] -translate-y-40 -translate-x-15 bg-linear-90 from-green-600 via-green-500 to-green-600 z-1 blur-[150px]" />
      <SignupForm jwtCookie={jwtCookie || null} />
    </div>
  );
}
