import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Login | SunCart",
};

export default function LoginPage() {
  return (
    <section className="summer-shell grid min-h-[calc(100vh-13rem)] place-items-center py-12">
      <div className="summer-card w-full max-w-md rounded-box p-6 md:p-8">
        <p className="text-sm font-black uppercase text-primary">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-black text-neutral">Login</h1>
        <p className="mb-7 mt-3 leading-7 text-neutral/65">
          Sign in to view product details, manage your profile, and keep your
          summer shelf ready.
        </p>
        <Suspense fallback={<span className="loading loading-spinner text-primary" />}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
