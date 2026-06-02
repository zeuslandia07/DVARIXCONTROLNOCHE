import Layout from "../components/Layout";
import NovedadModal from "../components/NovedadModal";

import {
  useContext,
  useState,
} from "react";

import {
  DataContext,
} from "../context/DataContext";

export default function SinNovedad() {

  const {
    sinNovedad,
    setSinNovedad,
    novedades,
    setNovedades,
  } = useContext(
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

  const abrirModal =
    (item) => {
      setSelected(item);
      setModal(true);
    };

  const guardarNovedad =
    (data) => {

      setNovedades([
        ...novedades,
        data,
      ]);

      setSinNovedad(
        sinNovedad.filter(
          (x) =>
            x.planilla !==
            data.planilla
        )
      );
    };

  const filtrado =
    sinNovedad.filter(
      (x) =>
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
    <Layout active="sin">

      <div className="table-container">

        <div className="table-header">

          <h2>
            Sin Novedad
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
                Acción
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
                        abrirModal(
                          item
                        )
                      }
                    >
                      🔴
                      Pasar a
                      novedad
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