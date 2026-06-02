import {
  createContext,
  useEffect,
  useState,
} from "react";

export const DataContext =
  createContext();

export function DataProvider({
  children,
}) {

  const [
    entregas,
    setEntregas,
  ] = useState(() => {
    return JSON.parse(
      localStorage.getItem(
        "entregas"
      )
    ) || [];
  });

  const [
    recogidas,
    setRecogidas,
  ] = useState(() => {
    return JSON.parse(
      localStorage.getItem(
        "recogidas"
      )
    ) || [];
  });

  const [
    sinNovedad,
    setSinNovedad,
  ] = useState(() => {
    return JSON.parse(
      localStorage.getItem(
        "sinNovedad"
      )
    ) || [];
  });

  const [
    novedades,
    setNovedades,
  ] = useState(() => {
    return JSON.parse(
      localStorage.getItem(
        "novedades"
      )
    ) || [];
  });

  const [
    recogidasCerradas,
    setRecogidasCerradas,
  ] = useState(() => {
    return JSON.parse(
      localStorage.getItem(
        "recogidasCerradas"
      )
    ) || [];
  });

  // ==================
  // GUARDADO AUTO
  // ==================

  useEffect(() => {
    localStorage.setItem(
      "entregas",
      JSON.stringify(
        entregas
      )
    );
  }, [entregas]);

  useEffect(() => {
    localStorage.setItem(
      "recogidas",
      JSON.stringify(
        recogidas
      )
    );
  }, [recogidas]);

  useEffect(() => {
    localStorage.setItem(
      "sinNovedad",
      JSON.stringify(
        sinNovedad
      )
    );
  }, [sinNovedad]);

  useEffect(() => {
    localStorage.setItem(
      "novedades",
      JSON.stringify(
        novedades
      )
    );
  }, [novedades]);

  useEffect(() => {
    localStorage.setItem(
      "recogidasCerradas",
      JSON.stringify(
        recogidasCerradas
      )
    );
  }, [
    recogidasCerradas,
  ]);

  // ==================
  // REINICIAR
  // ==================

  const reiniciarOperacion =
    () => {

      const ok =
        window.confirm(
          "¿Seguro que deseas reiniciar la operación?"
        );

      if (!ok) return;

      setEntregas([]);
      setRecogidas([]);
      setSinNovedad([]);
      setNovedades([]);
      setRecogidasCerradas([]);

      localStorage.removeItem(
        "entregas"
      );

      localStorage.removeItem(
        "recogidas"
      );

      localStorage.removeItem(
        "sinNovedad"
      );

      localStorage.removeItem(
        "novedades"
      );

      localStorage.removeItem(
        "recogidasCerradas"
      );

      alert(
        "Operación reiniciada"
      );
    };

  return (
    <DataContext.Provider
      value={{
        entregas,
        setEntregas,

        recogidas,
        setRecogidas,

        sinNovedad,
        setSinNovedad,

        novedades,
        setNovedades,

        recogidasCerradas,
        setRecogidasCerradas,

        reiniciarOperacion,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}