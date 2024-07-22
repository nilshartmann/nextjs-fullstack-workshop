import {signIn} from "@/auth";

export default function LoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("keycloak");
      }}
    >
      <button
        type="submit"
        className={"rounded border-2 bg-green-200 p-4 font-bold"}
      >
        Signin with keycloak
      </button>
    </form>
  );
}
