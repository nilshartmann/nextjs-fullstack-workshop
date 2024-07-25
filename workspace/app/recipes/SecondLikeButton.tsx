"use client";

import { useOptimistic, useState, useTransition } from "react";
import { incrementLikeForRecipe } from "@/app/recipes/recipify-actions.ts";

export default function SecondLikeButton() {
  const [likes, setLikes] = useState(123);
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
      const newLikes = await incrementLikeForRecipe("40");
      setLikes(newLikes);
    });
  }

  console.log("SecondLikeButton", 40, likes, isPending);

  return (
    <div>
      <button onClick={handleIncrementLikes} disabled={isPending}>
        40 Likes: {likes}
      </button>
      {isPending && "Like wird gespeichert"}
      {/*<button onClick={handleSayHello}>Gruess die Welt!</button>*/}
    </div>
  );
}
