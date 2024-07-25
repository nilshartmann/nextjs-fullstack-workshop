import Link from "next/link";

export default function LandingPage() {
  console.log("LandingPage rendered at", new Date().toLocaleTimeString());
  return (
    <div>
      <h1>Welcome to Recipify</h1>

      <p>Guten Appetit!</p>

      <Link href={"/recipes"}>Zu den Rezepten</Link>
    </div>
  );
}
