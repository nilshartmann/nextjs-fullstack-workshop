import { fetchFeedback, fetchRecipe } from "@/app/components/queries.ts";
import { notFound } from "next/navigation";
import RecipePageContent from "@/app/components/recipepage/RecipePageContent.tsx";

type RecipePageProps = {
  params: {
    recipeId: string;
  };
};

export default async function RecipePage({ params }: RecipePageProps) {
  // 8 Sekunden
  console.log("RecipePage rendered at", new Date().toLocaleTimeString());

  // const response = await fetch("api/recipes/12", {
  //   next: {
  //     revalidate: 1200
  //   }
  // })

  const feedbacksPromise = fetchFeedback(params.recipeId); // ca. 1 Sekunden
  const recipeResponse = await fetchRecipe(params.recipeId); // ca. 2 Sekunden

  if (recipeResponse === null) {
    // return <h1>Rezept nicht gefunden!</h1>;
    notFound();
  }

  // recipeResponse.recipe.ingredients.map(i => <div key={i.orderNo}>{i.name}</div>)

  return (
    <RecipePageContent
      feedbacksPromise={feedbacksPromise}
      recipe={recipeResponse.recipe}
    />
  ); // ca. 6 Sekunden
}
