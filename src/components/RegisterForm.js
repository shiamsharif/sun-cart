"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Globe, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getDisplayImageUrl } from "@/lib/images";
import ToastMessage from "@/components/ToastMessage";

function getGoogleLoginErrorMessage(error) {
  return (
    error?.message ||
    "Google login failed. Check /api/auth/status and Vercel environment variables."
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const image = String(formData.get("image") || "");
    const password = String(formData.get("password") || "");

    const { error } = await authClient.signUp.email({
      name,
      email,
      image: getDisplayImageUrl(image),
      password,
      callbackURL: redirectTo,
    });

    setPending(false);

    if (error) {
      setMessageType("error");
      setMessage(error.message || "Registration failed. Try another email.");
      return;
    }

    setMessageType("success");
    setMessage("Account created.");
    router.push(redirectTo);
    router.refresh();
  }

  async function handleGoogleLogin() {
    setPending(true);
    setMessage("");
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
      errorCallbackURL: "/register",
      newUserCallbackURL: redirectTo,
    });

    if (error) {
      setPending(false);
      setMessageType("error");
      setMessage(getGoogleLoginErrorMessage(error));
    }
  }

  return (
    <>
      <ToastMessage message={message} type={messageType} />
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="form-control">
          <span className="label-text font-bold">Name</span>
          <input
            className="input input-bordered mt-2 w-full"
            name="name"
            placeholder="Sunny Shopper"
            required
          />
        </label>
        <label className="form-control">
          <span className="label-text font-bold">Email</span>
          <input
            className="input input-bordered mt-2 w-full"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="form-control">
          <span className="label-text font-bold">Photo URL</span>
          <input
            className="input input-bordered mt-2 w-full"
            type="url"
            name="image"
            placeholder="https://example.com/photo.jpg"
          />
        </label>
        <label className="form-control">
          <span className="label-text font-bold">Password</span>
          <input
            className="input input-bordered mt-2 w-full"
            type="password"
            name="password"
            minLength={8}
            placeholder="At least 8 characters"
            required
          />
        </label>
        <button className="btn btn-primary mt-2" type="submit" disabled={pending}>
          {pending ? <span className="loading loading-spinner loading-sm" /> : <UserPlus size={18} />}
          Register
        </button>
      </form>
      <div className="divider my-6">or</div>
      <button
        type="button"
        className="btn btn-outline btn-block"
        onClick={handleGoogleLogin}
        disabled={pending}
      >
        <Globe size={18} />
        Continue with Google
      </button>
      <p className="mt-6 text-center text-sm text-neutral/70">
        Already have an account?{" "}
        <Link className="font-bold text-primary underline" href="/login">
          Login
        </Link>
      </p>
    </>
  );
}
