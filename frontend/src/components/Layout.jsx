import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

function Layout({ children }) {
  return (
    <main className="container grid  grid-cols-3 lg:grid-cols-4 ">
      <LeftPanel />
      <section className="col-span-2 border-x  border-x-zinc-800 text-white  ">
        {children}
      </section>
      <RightPanel className="hidden" />
    </main>
  );
}

export default Layout;
