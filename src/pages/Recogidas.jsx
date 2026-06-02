import Layout from "../components/Layout";

import {
  useContext,
  useState,
} from "react";

import {
  DataContext,
} from "../context/DataContext";

export default function Recogidas() {

  const {
    recogidas,
    setRecogidas,
    recogidasCerradas,
    setRecogidasCerradas,
  } =
    useContext(
      DataContext
    );

  const [busqueda,
    setBusqueda] =
    useState("");

  const [copiado,
    setCopiado] =
    useState(null);

  const copiarPlanilla =
    (planilla) => {

      navigator.clipboard.writeText(
        planilla
      );

      setCopiado(planilla);

      setTimeout(() => {

        setCopiado(null);

      }, 2000);
    };

  const cerrarRecogida =
    (planilla) => {

      const vh =
        recogidas.find(
          (x) =>
            x.planilla ===
            planilla
        );

      if (!vh) return;

      setRecogidasCerradas([
        ...recogidasCerradas,
        vh,
      ]);

      setRecogidas(
        recogidas.filter(
          (x) =>
            x.planilla !==
            planilla
        )
      );
    };

  const devolverPendiente =
    (planilla) => {

      const vh =
        recogidasCerradas.find(
          (x) =>
            x.planilla ===
            planilla
        );

      if (!vh) return;

      setRecogidas([
        ...recogidas,
        vh,
      ]);

      setRecogidasCerradas(
        recogidasCerradas.filter(
          (x) =>
            x.planilla !==
            planilla
        )
      );
    };

  const filtrado =
    recogidas.filter(
      (x) =>
        x.planilla
          ?.toString()
          .includes(
            busqueda
          ) ||
        x.placa
          ?.toLowerCase()
          .includes(
            busqueda.toLowerCase()
          ) ||
        x.auxiliar
          ?.toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )
    );

  return (
    <Layout active="recogidas">

      <div className="table-container">

        <div className="table-header">

          <div>

            <h2>
              Recogidas
            </h2>

            <p>
              Pendientes:
              {" "}
              {
                recogidas.length
              }
              {" | "}
              Cerradas:
              {" "}
              {
                recogidasCerradas.length
              }
            </p>

          </div>

          <input
            placeholder="Buscar planilla, placa o auxiliar..."
            value={
              busqueda
            }
            onChange={(e) =>
              setBusqueda(
                e.target.value
              )
            }
          />

        </div>

        <table>

          <thead>
            <tr>
              <th>Planilla</th>
              <th>Placa</th>
              <th>Auxiliar</th>
              <th>Fecha</th>
              <th>Copiar</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>

            {filtrado.map(
              (item) => (
                <tr
                  key={
                    item.planilla
                  }
                >

                  <td>
                    {
                      item.planilla
                    }
                  </td>

                  <td>
                    {
                      item.placa
                    }
                  </td>

                  <td>
                    {
                      item.auxiliar
                    }
                  </td>

                  <td>
                    {
                      item.fecha
                    }
                  </td>

                  <td>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        copiarPlanilla(
                          item.planilla
                        )
                      }
                    >
                      {copiado === item.planilla
                        ? "✅ Copiado"
                        : "📋 Copiar"}
                    </button>

                  </td>

                  <td>

                    <button
                      onClick={() =>
                        cerrarRecogida(
                          item.planilla
                        )
                      }
                    >
                      ✅ Cerrar
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

        {recogidasCerradas.length >
          0 && (

          <>

            <h3
              style={{
                marginTop: 40,
                marginBottom: 15,
              }}
            >
              Recogidas Cerradas
            </h3>

            <table>

              <thead>
                <tr>
                  <th>Planilla</th>
                  <th>Placa</th>
                  <th>Auxiliar</th>
                  <th>Copiar</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>

                {recogidasCerradas.map(
                  (item) => (
                    <tr
                      key={
                        item.planilla
                      }
                    >

                      <td>
                        {
                          item.planilla
                        }
                      </td>

                      <td>
                        {
                          item.placa
                        }
                      </td>

                      <td>
                        {
                          item.auxiliar
                        }
                      </td>

                      <td>

                        <button
                          className="copy-btn"
                          onClick={() =>
                            copiarPlanilla(
                              item.planilla
                            )
                          }
                        >
                          {copiado === item.planilla
                            ? "✅ Copiado"
                            : "📋 Copiar"}
                        </button>

                      </td>

                      <td>

                        <button
                          onClick={() =>
                            devolverPendiente(
                              item.planilla
                            )
                          }
                        >
                          ↩️ Reabrir
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </>
        )}

      </div>

    </Layout>
  );
}