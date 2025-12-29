import Aside from "./Aside.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <Aside />
      <main className="content">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
