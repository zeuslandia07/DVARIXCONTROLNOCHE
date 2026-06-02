import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Control from "./pages/Control";
import SinNovedad from "./pages/SinNovedad";
import Novedades from "./pages/Novedades";
import Recogidas from "./pages/Recogidas";

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logged = localStorage.getItem("dvarix_auth");

    if (logged === "true") {
      setAuth(true);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      {!auth ? (
        <Route
          path="*"
          element={<Login setAuth={setAuth} />}
        />
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/control" element={<Control />} />
          <Route path="/sin-novedad" element={<SinNovedad />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/recogidas" element={<Recogidas />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;