"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getDisplayImageUrl } from "@/lib/images";
import ToastMessage from "@/components/ToastMessage";

export default function ProfileForm({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const { error } = await authClient.updateUser({
      name,
      image: getDisplayImageUrl(image),
    });

    setPending(false);

    if (error) {
      setMessageType("error");
      setMessage(error.message || "Could not update your profile.");
      return;
    }

    setMessageType("success");
    setMessage("Profile updated.");
    router.refresh();
  }

  return (
    <>
      <ToastMessage message={message} type={messageType} />
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="form-control">
          <span className="label-text font-bold">Name</span>
          <input
            className="input input-bordered mt-2 w-full"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label className="form-control">
          <span className="label-text font-bold">Image</span>
          <input
            className="input input-bordered mt-2 w-full"
            type="url"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="https://example.com/photo.jpg"
          />
        </label>
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? <span className="loading loading-spinner loading-sm" /> : <Save size={18} />}
          Update Information
        </button>
      </form>
    </>
  );
}
