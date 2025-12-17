import Aside from "./Aside.jsx";
import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <Aside />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
