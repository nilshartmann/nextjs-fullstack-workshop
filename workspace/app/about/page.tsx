import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABOUT PAGE!!!!!!!!!!!!!",
};

// React SERVER Component

export default function AboutPage() {
  console.log("Gerendert um ", new Date().toLocaleTimeString());

  return <h1>About page!</h1>;
}
