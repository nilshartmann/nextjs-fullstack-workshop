import { ReactNode } from "react";

type RecipesLayoutProps = {
  children: ReactNode;
};

export default function RecipesLayout({ children }: RecipesLayoutProps) {
  return (
    <div className={"container mx-auto flex-grow border-2 p-4"}>{children}</div>
  );
}
