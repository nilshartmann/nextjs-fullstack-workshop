import { fetchRecipes } from "@/app/components/queries.ts";
import ButtonBar from "@/app/components/ButtonBar.tsx";
import Link from "next/link";
import LikeButton from "@/app/recipes/LikeButton.tsx";
import SecondLikeButton from "@/app/recipes/SecondLikeButton.tsx";
import PendingStatus from "@/app/recipes/PendingStatus.tsx";

// export const dynamic = "force-dynamic";

type RecipesPageProps = {
  searchParams: {
    order_by?: "time" | "likes";
  };
};

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  // const orderBy = searchParams.order_by ?? "...";
  // React / Next
  console.log("RecipesPage rendered at", new Date().toLocaleTimeString());

  console.log("SEARCH PARAMS", searchParams);
  // 1. Parameter: Seite, 2. Parameter sortierung: "time" | "likes" | undefined
  const recipes = await fetchRecipes(0, searchParams.order_by);

  // Alternative, um Search-Params für die URL bzw. einen Link zu erzeugen:
  //   const newSearchParams = new URLSearchParams();
  //   newSearchParams.append("order_by", "time");
  //   newSearchParams.append("page", 1);
  //   <Link href={`/recipes?${newSearchParams.toString()}`}>Kürzeste Kochzeit zuerst</Link>

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto pb-16 pt-16"}>
        <ButtonBar>
          <Link href={"/recipes"}>Neustes zuerst (default)</Link>
          <Link href={"/recipes?order_by=likes"}>Bestes Rezept zu erst</Link>
          <Link href={"/recipes?order_by=time"}>Kürzeste Kochzeit zuerst</Link>
        </ButtonBar>
        <div className={"border-2 p-4"}>
          <SecondLikeButton />
        </div>
        <PendingStatus />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/*{recipes.content.map((r) => {*/}
          {/*  return (*/}
          {/*    <RecipeCard key={r.id} recipe={r} />*/}
          {/*  );*/}
          {/*})}*/}
          {recipes.content.map((r) => (
            // <RecipeCard key={r.id} recipe={r} />
            <div key={r.id}>
              <h1>{r.title}</h1>
              <LikeButton recipe={r} />
              {/*<button onClick={(e) => console.log(e)}>Likes: {r.likes}</button>*/}
            </div>
          ))}
        </div>
      </div>
    </div>

    // fetch mit PROMISE API:
    // const responsePromise = fetch(
    //   "http://localhost:8080/api/recipes?slowdown=10000",
    // );
    // responsePromise
    //   .then((response) => response.json())
    //   .then((recipes) => console.log("RECIPIES", recipes))
    //   .catch((err) => console.error(err));

    // fetch mit ASYNC/AWAIT:
    // const response = await fetch(
    //   "http://localhost:8080/api/recipes",
    // );
    // const recipes: PageResponseRecipeDto = await response.json();
    // recipes.content[0].title

    // Abbilden von LISTEN:
    // const personen = [ "Nils", "Gerrit", "Regina"];
    //
    // personen.map(p => <p key={p}>{p}</p>);

    // {/*<p>*/}
    // {/*  <Link href={"/recipes/17"}>Zu Rezept 17</Link>{" "}*/}
    // {/*</p>*/}
    //
    // // <Link href={"/"}>Zur Homepage</Link>
  );
}
