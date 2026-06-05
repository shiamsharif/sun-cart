import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Mail } from "lucide-react";
import ProfileForm from "@/components/ProfileForm";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const metadata = {
  title: "My Profile | SunCart",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?redirectTo=/profile");
  }

  const user = session.user;

  return (
    <section className="summer-shell py-12">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="summer-card rounded-box p-6 md:p-8">
          <UserAvatar
            image={user.image}
            name={user.name}
            size="lg"
            className="shadow-xl"
          />
          <h1 className="mt-6 text-4xl font-black text-neutral">
            {user.name || "SunCart Shopper"}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-neutral/70">
            <Mail size={18} />
            {user.email}
          </p>
          <div className="mt-8 rounded-box bg-primary/8 p-5">
            <p className="text-sm font-black uppercase text-primary">
              Profile Perk
            </p>
            <p className="mt-2 leading-7 text-neutral/70">
              Your account keeps protected product pages available on reload and
              lets you update your shopper identity any time.
            </p>
          </div>
        </aside>

        <div className="summer-card rounded-box p-6 md:p-8">
          <p className="text-sm font-black uppercase text-primary">
            Update Information
          </p>
          <h2 className="mt-2 text-3xl font-black text-neutral">
            Refresh your profile
          </h2>
          <p className="mb-7 mt-3 leading-7 text-neutral/65">
            Update your display name and image. Your email remains tied to your
            Better Auth account.
          </p>
          <ProfileForm user={user} />
        </div>
      </div>
    </section>
  );
}
