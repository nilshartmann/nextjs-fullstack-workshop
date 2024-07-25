import FeedbackList from "./FeedbackList.tsx";
import { GetRecipeFeedbacksResponse } from "@/app/components/api-types.ts";

type FeedbackListProps = {
  feedbacksPromise: Promise<GetRecipeFeedbacksResponse>;
};
export default async function FeedbackListLoader({
  feedbacksPromise,
}: FeedbackListProps) {
  console.log("FeedbackListLoader", Date.now());
  // const data = await fetchFeedback(recipeId);
  const data = await feedbacksPromise;

  return <FeedbackList feedbacks={data.feedbacks} />;
}
