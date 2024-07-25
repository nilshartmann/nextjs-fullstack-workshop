"use client";

import { useTransition } from "react";

export default function PendingStatus() {
  const [isPending, startTransition] = useTransition();

  return (
    <div className={"b p-2"}>
      <button
        onClick={() => {
          startTransition(async () => {
            return new Promise((res) => {
              setTimeout(() => res(), 1000);
            });
          });
        }}
      >
        Los geht's!
      </button>
      IsPending: {String(isPending)}
    </div>
  );
}
