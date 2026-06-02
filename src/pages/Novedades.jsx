import Layout from "../components/Layout";

import {
  useContext,
  useMemo,
  useState,
} from "react";

import {
  DataContext,
} from "../context/DataContext";

export default function Novedades() {
  const {
    novedades,
    setNovedades,
    sinNovedad,
    setSinNovedad,
  } =
    useContext(
      DataContext
    );

  const [busqueda,
    setBusqueda] =
    useState("");

  const pasarSinNovedad =
    (
      planilla
    ) => {
      const vh =
        novedades.find(
          (
            x
          ) =>
            x.planilla ===
            planilla
        );

      setSinNovedad([
        ...sinNovedad,
        {
          ...vh,
          novedades:
            [],
        },
      ]);

      setNovedades(
        novedades.filter(
          (
            x
          ) =>
            x.planilla !==
            planilla
        )
      );
    };

  const novedadesExpand =
    useMemo(
      () =>
        novedades.flatMap(
          (
            item
          ) =>
            item.novedades.map(
              (
                nov,
                index
              ) => ({
                id:
                  `${item.planilla}-${index}`,

                planilla:
                  item.planilla,

                placa:
                  item.placa,

                auxiliar:
                  item.auxiliar,

                vinculacion:
                  item.vinculacion,

                guia:
                  nov.guia,

                novedad:
                  nov.novedad,
              })
            )
        ),
      [novedades]
    );

  const filtrado =
    novedadesExpand.filter(
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

const copiarResumen = async () => {
  const estiloTitulo =
    "border:1px solid black;padding:5px;background:#4472C4;color:white;font-weight:bold;text-align:center;";

  const html = `
    <table style="border-collapse: collapse;">
      <thead>
        <tr>
          <th style="${estiloTitulo}">Planilla</th>
          <th style="${estiloTitulo}">Placa</th>
          <th style="${estiloTitulo}">Auxiliar</th>
          <th style="${estiloTitulo}">Vinculación</th>
          <th style="${estiloTitulo}">Guía</th>
          <th style="${estiloTitulo}">Novedad</th>
        </tr>
      </thead>
      <tbody>
        ${filtrado
          .map(
            (x) => `
              <tr>
                <td style="border:1px solid black;padding:5px;">${x.planilla}</td>
                <td style="border:1px solid black;padding:5px;">${x.placa || ""}</td>
                <td style="border:1px solid black;padding:5px;">${x.auxiliar || ""}</td>
                <td style="border:1px solid black;padding:5px;">${x.vinculacion || ""}</td>
                <td style="border:1px solid black;padding:5px;">${x.guia || ""}</td>
                <td style="border:1px solid black;padding:5px;">${x.novedad || ""}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;

  const blob = new Blob([html], {
    type: "text/html",
  });

  await navigator.clipboard.write([
    new ClipboardItem({
      "text/html": blob,
    }),
  ]);

  alert("Tabla copiada");
};

  return (
    <Layout active="novedad">

      <div className="table-container">

        <div className="table-header">

          <h2>
            Novedades
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

        <button
          className="primary-btn"
          onClick={
            copiarResumen
          }
          style={{
            marginBottom:
              20,
          }}
        >
          📋 Copiar resumen
        </button>

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
                Vinculación
              </th>

              <th>
                Guía
              </th>

              <th>
                Novedad
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
                    item.id
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
                      item.vinculacion
                    }
                  </td>

                  <td>
                    {
                      item.guia
                    }
                  </td>

                  <td>
                    {
                      item.novedad
                    }
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        pasarSinNovedad(
                          item.planilla
                        )
                      }
                    >
                      🟢
                    </button>
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}