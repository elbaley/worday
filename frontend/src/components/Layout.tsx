import { ReactNode } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

function Layout({ children }:{children:ReactNode}) {
  return (
    <main className="container grid  sm:grid-cols-3 lg:grid-cols-4 ">
      <LeftPanel />
      <section className="border-x border-x-zinc-800  text-white sm:col-span-2  ">
        {children}
      </section>
      <RightPanel className="hidden" />
    </main>
  );
}

export default Layout;
