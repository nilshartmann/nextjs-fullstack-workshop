"use server";

// DIESE FUNKTION LÄUFT AUF DEM SERVER!!!
//   Server Action

import { saveLike } from "@/app/components/queries.ts";

export async function incrementLikeForRecipe(recipeId: string) {
  const saveResponse = await saveLike(recipeId);

  return saveResponse.newLikes;
}

export async function sayHello(name: string) {
  // process.env.API_SECRET
  console.log("sayHello: ", name);

  // .... Cache leeren ....
  // revalidatePath("/recipes")

  return `Hello, ${name}`;
}
