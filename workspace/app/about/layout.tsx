import { ReactNode } from "react";

type AboutLayoutProps = {
  children: ReactNode;
};
// export default function AboutLayout({ children }: AboutLayoutProps) {
export default function AboutLayout(props: AboutLayoutProps) {
  return (
    <>
      <div className={"border-2 p-4"}>
        <p>About Layout!</p>
        {props.children}
      </div>
    </>
  );
}
