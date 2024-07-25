import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div>
      <Suspense fallback={"..."}>
        <LademittelDerLetzeMonate />
      </Suspense>

      <Suspense fallback={"..."}>
        <AndereUebersicht />
      </Suspense>
    </div>
  );
}

async function LademittelDerLetzeMonate() {
  const data = await fetch("http://....");

  return "";
}

async function AndereUebersicht() {
  const data = await fetch("http://....");

  return "";
}
