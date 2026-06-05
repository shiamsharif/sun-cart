import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";

export const metadata = {
  title: "Register | SunCart",
};

export default function RegisterPage() {
  return (
    <section className="summer-shell grid min-h-[calc(100vh-13rem)] place-items-center py-12">
      <div className="summer-card w-full max-w-md rounded-box p-6 md:p-8">
        <p className="text-sm font-black uppercase text-primary">
          Join SunCart
        </p>
        <h1 className="mt-2 text-3xl font-black text-neutral">Register</h1>
        <p className="mb-7 mt-3 leading-7 text-neutral/65">
          Create an account to unlock protected product details and personalize
          your summer shopping profile.
        </p>
        <Suspense fallback={<span className="loading loading-spinner text-primary" />}>
          <RegisterForm />
        </Suspense>
      </div>
    </section>
  );
}
