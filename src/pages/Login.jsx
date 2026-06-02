import { useState, useEffect } from "react";

import logo from "../assets/logo.png";

import {
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

export default function Login({
  setAuth,
}) {

  const navigate =
    useNavigate();

  const [usuario,
    setUsuario] =
    useState("");

  const [clave,
    setClave] =
    useState("");

  const [showPass,
    setShowPass] =
    useState(false);

  const [error,
    setError] =
    useState("");

  useEffect(() => {

    const auth =
      localStorage.getItem(
        "dvarix_auth"
      );

    if (auth === "true") {

      setAuth(true);

      navigate("/");
    }

  }, [
    navigate,
    setAuth,
  ]);

  const login =
    () => {

      const USER =
        "admin";

      const PASS =
        "DvarEX2026*";

      if (
        usuario
          .trim()
          .toLowerCase() ===
          USER &&
        clave.trim() ===
          PASS
      ) {

        localStorage.setItem(
          "dvarix_auth",
          "true"
        );

        setAuth(true);

        navigate("/");

      } else {

        setError(
          "Credenciales incorrectas"
        );
      }
    };

  return (
    <div className="login-page">

      <div className="login-card">

        <img
          src={logo}
          alt="DVARIX"
          className="login-logo"
        />

        <h1>DVARIX</h1>

        <p>
          Torre de Control Nocturna
        </p>

        <div className="security-badge">
          <ShieldCheck size={18}/>
          Acceso seguro
        </div>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e)=>
            setUsuario(
              e.target.value
            )
          }
        />

        <div className="password-box">

          <input
            type={
              showPass
                ? "text"
                : "password"
            }
            placeholder="Contraseña"
            value={clave}
            onChange={(e)=>
              setClave(
                e.target.value
              )
            }
            onKeyDown={(e)=>{
              if(
                e.key === "Enter"
              ){
                login();
              }
            }}
          />

          <button
            type="button"
            onClick={()=>
              setShowPass(
                !showPass
              )
            }
          >
            {showPass
              ? <EyeOff size={20}/>
              : <Eye size={20}/>
            }
          </button>

        </div>

        {error && (
          <p className="error-login">
            {error}
          </p>
        )}

        <button
          className="login-btn"
          onClick={login}
        >
          Ingresar
        </button>

        <span className="copyright">
          Powered by DVARIX © 2026
        </span>

      </div>

    </div>
  );
}
