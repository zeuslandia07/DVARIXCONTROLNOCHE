import Layout from "../components/Layout";
import NovedadModal from "../components/NovedadModal";

import {
  useContext,
  useState,
} from "react";

import {
  DataContext,
} from "../context/DataContext";

export default function Control() {
  const {
    entregas,
    setEntregas,
    sinNovedad,
    setSinNovedad,
    novedades,
    setNovedades,
  } =
    useContext(
      DataContext
    );

  const [busqueda,
    setBusqueda] =
    useState("");

  const [modal,
    setModal] =
    useState(false);

  const [selected,
    setSelected] =
    useState(null);

  const marcarSinNovedad =
    (
      planilla
    ) => {
      const vh =
        entregas.find(
          (
            x
          ) =>
            x.planilla ===
            planilla
        );

      setSinNovedad([
        ...sinNovedad,
        vh,
      ]);

      setEntregas(
        entregas.filter(
          (
            x
          ) =>
            x.planilla !==
            planilla
        )
      );
    };

  const abrirModal =
    (item) => {
      setSelected(
        item
      );

      setModal(
        true
      );
    };

  const guardarNovedad =
    (data) => {
      setNovedades([
        ...novedades,
        data,
      ]);

      setEntregas(
        entregas.filter(
          (
            x
          ) =>
            x.planilla !==
            data.planilla
        )
      );
    };

  const filtrado =
    entregas.filter(
      (
        x
      ) =>
        x.planilla.includes(
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
    <Layout active="control">

      <div className="table-container">

        <div className="table-header">
          <h2>
            Control
            Operativo
          </h2>

          <input
            placeholder="Buscar..."
            value={
              busqueda
            }
            onChange={(
              e
            ) =>
              setBusqueda(
                e.target
                  .value
              )
            }
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>
                Planilla
              </th>
              <th>
                Placa
              </th>
              <th>
                Auxiliar
              </th>
              <th>
                Guías
              </th>
              <th>
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>

            {filtrado.map(
              (
                item
              ) => (
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
                      item.guias
                    }
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        marcarSinNovedad(
                          item.planilla
                        )
                      }
                    >
                      🟢
                    </button>

                    <button
                      onClick={() =>
                        abrirModal(
                          item
                        )
                      }
                    >
                      🔴
                    </button>

                  </td>
                </tr>
              )
            )}

          </tbody>
        </table>

      </div>

      {modal && (
        <NovedadModal
          item={
            selected
          }
          onClose={() =>
            setModal(
              false
            )
          }
          onGuardar={
            guardarNovedad
          }
        />
      )}

    </Layout>
  );
}