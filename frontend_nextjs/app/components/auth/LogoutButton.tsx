import {signOut} from "@/auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        className={"rounded border-2 bg-green-200 p-4 font-bold"}
        type="submit"
      >
        Logout
      </button>
    </form>
  );
}
