"use client";

import { RecipeDto } from "@/app/components/api-types.ts";
import { useOptimistic, useState, useTransition } from "react";
import { incrementLikeForRecipe } from "@/app/recipes/recipify-actions.ts";

type LikeButtonProps = {
  recipe: RecipeDto;
};
export default function LikeButton({ recipe }: LikeButtonProps) {
  const [likes, setLikes] = useState(recipe.likes);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes);

  const [isPending, startTransition] = useTransition();

  // "Classic Ceasar Salad": Sortieren nach "Zeit" oder gar keine Sortierung
  // async function handleSayHello() {
  //   const greeting = await sayHello("World"); // SERVER CALL!!!
  //   console.log("Greeting received", greeting);
  // }

  async function handleIncrementLikes() {
    startTransition(async () => {
      // SERVER CALL!!!!!
      setOptimisticLikes(likes + 1);
      const newLikes = await incrementLikeForRecipe(recipe.id);
      setLikes(newLikes);
    });
  }

  console.log("LikeButton", recipe.id, likes, isPending);

  return (
    <div>
      <button onClick={handleIncrementLikes} disabled={isPending}>
        Likes: {likes}
      </button>
      {isPending && "Like wird gespeichert"}
      {/*<button onClick={handleSayHello}>Gruess die Welt!</button>*/}
    </div>
  );
}
