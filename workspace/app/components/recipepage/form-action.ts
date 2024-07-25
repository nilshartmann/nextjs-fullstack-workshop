"use server";

export async function handleSubmit(formdata: FormData) {
  console.log("SUBMIT", formdata.get("rating"), formdata.get("comment"));
}

export async function handleFeedbackSubmit(
  action: string | null,
  formdata: FormData,
) {
  console.log(
    "handleFeedbackSubmit SUBMIT",
    action,
    formdata.get("rating"),
    formdata.get("comment"),
  );

  // ...
  return "Speichern war erfolgreich!";
}
