import { redirect } from "next/navigation";

function loadProfile() {
  return {
    role: "admin",
  };
}

export default function ProfilePage() {
  const profile = loadProfile();

  if (profile.role === "admin") {
    redirect("/profile/admin");
  }

  redirect("/profile/user");
}
