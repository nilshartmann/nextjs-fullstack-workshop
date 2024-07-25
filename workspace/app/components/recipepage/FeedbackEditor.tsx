"use client";

import { handleFeedbackSubmit } from "@/app/components/recipepage/form-action.ts";
import { useActionState } from "react";

export default function FeedbackEditor({ recipeId }: { recipeId: string }) {
  const [formstate, submitForm, isPending] = useActionState(
    handleFeedbackSubmit,
    null,
  );

  function myCustomSubmitHandler(formData: FormData) {
    // falls Formular mit Zustand gebaut ist
  }
  //
  // Next.js 15 RC + React 19 RC (erscheint wohl im Herbst)
  //  installieren mit: npx create-next-app@rc
  // Next.js 14 stabil + React 18 stabil

  return (
    <form action={submitForm}>
      <label>
        Rating
        <input name={"rating"} type={"number"} min={1} max={5} />
      </label>

      <label>
        Comment
        <input name={"comment"} type={"text"} />
      </label>

      <p>{formstate}</p>

      <button type={"submit"} disabled={isPending}>
        Submit!
      </button>
    </form>
  );
}
