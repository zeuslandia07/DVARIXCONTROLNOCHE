import {
  LayoutDashboard,
  Truck,
  AlertTriangle,
  Package,
  CheckCircle,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Layout({
  children,
  active,
}) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div>

          <div className="logo-container">
            <img
              src={logo}
              alt="logo"
              className="sidebar-logo"
            />

            <h2>DVARIX</h2>
            <span>
              CONTROL NOCHE
            </span>
            <div className="sidebar-version">
  DVARIX v1.0
</div>
          </div>

          <nav className="menu">

            <button
              className={`menu-item ${
                active ===
                "dashboard"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                navigate("/")
              }
            >
              <LayoutDashboard />
              Dashboard
            </button>

            <button
              className={`menu-item ${
                active ===
                "control"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                navigate(
                  "/control"
                )
              }
            >
              <Truck />
              Control
            </button>

            <button
              className={`menu-item ${
                active ===
                "sin"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                navigate(
                  "/sin-novedad"
                )
              }
            >
              <CheckCircle />
              Sin Novedad
            </button>

            <button
              className={`menu-item ${
                active ===
                "novedad"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                navigate(
                  "/novedades"
                )
              }
            >
              <AlertTriangle />
              Novedades
            </button>

            <button
              className={`menu-item ${
                active ===
                "recogidas"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                navigate(
                  "/recogidas"
                )
              }
            >
              <Package />
              Recogidas
            </button>
          </nav>
        </div>
<div className="sidebar-user">
  👤 Admin
</div>
        <button
          className="logout-btn"
          onClick={
            cerrarSesion
          }
        >
          <LogOut />
          Cerrar sesión
        </button>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}