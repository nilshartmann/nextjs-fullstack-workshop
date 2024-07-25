import { RecipeBanner } from "./RecipeBanner.tsx";
import { CookingTime } from "./CookingTime.tsx";
import { Instructions } from "./Instructions.tsx";
import { DetailedRecipeDto, GetRecipeFeedbacksResponse } from "../api-types.ts";
import { Sidebar } from "@/app/components/Sidebar.tsx";
import { H2 } from "@/app/components/Heading.tsx";
import IngredientsSection from "@/app/components/recipepage/IngredientsSection.tsx";
import FeedbackListLoader from "@/app/components/recipepage/FeedbackListLoader.tsx";
import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import { Suspense } from "react";
import FeedbackEditor from "./FeedbackEditor.tsx";

type RecipePageContentProps = {
  recipe: DetailedRecipeDto;
  feedbacksPromise: Promise<GetRecipeFeedbacksResponse>;
};

export default function RecipePageContent({
  recipe,
  feedbacksPromise,
}: RecipePageContentProps) {
  return (
    <div>
      <FeedbackEditor recipeId={recipe.id} />
      <RecipeBanner recipe={recipe} />
      <div className={"container mx-auto mb-8 mt-8 md:flex md:space-x-12"}>
        <div className={"md:w-2/3"}>
          <CookingTime
            cookTime={recipe.cookTime}
            preparationTime={recipe.preparationTime}
          />
          <IngredientsSection ingredients={recipe.ingredients} />
          <Instructions recipe={recipe} />
        </div>
        <div className={"md:w-1/3"}>
          <Sidebar>
            <H2>Feedback</H2>
            <Suspense
              fallback={
                <LoadingIndicator>Feedback loading...</LoadingIndicator>
              }
            >
              <FeedbackListLoader feedbacksPromise={feedbacksPromise} />
            </Suspense>
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
