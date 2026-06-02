import { useState } from "react";

const novedadesLista = [
  "NOVEDAD OPERACIONES",
  "VEHICULO NO RETORNA DOCUMENTACION AL AREA",
  "RECAUDO PENDIENTE POR LEGALIZAR",
  "ENTREGADO, PEND RECUPERACIÓN DE LA DOCUMENTACIÓN",
  "OTRO",
];

const vinculaciones = [
  "EXXE",
  "TERCERO",
  "RH",
  "FLEXCARGA",
  "CONDUCTOR",
];

export default function NovedadModal({
  item,
  onClose,
  onGuardar,
}) {
  const [vinculacion, setVinculacion] =
    useState("");

  const [detalles, setDetalles] =
    useState([
      {
        guia: "",
        novedad: "",
        otro: "",
      },
    ]);

  const agregarFila = () => {
    setDetalles([
      ...detalles,
      {
        guia: "",
        novedad: "",
        otro: "",
      },
    ]);
  };

  const actualizar = (
    index,
    campo,
    valor
  ) => {
    const copia = [...detalles];

    copia[index][campo] =
      valor;

    setDetalles(copia);
  };

  const guardar =
    () => {

      if (!vinculacion) {
        alert(
          "Selecciona tipo de vinculación"
        );
        return;
      }

      const datosLimpios =
        detalles.filter(
          (x) =>
            x.guia &&
            x.novedad
        );

      if (
        datosLimpios.length ===
        0
      ) {
        alert(
          "Debes agregar mínimo una novedad"
        );
        return;
      }

      onGuardar({
        ...item,
        vinculacion,
        novedades:
          datosLimpios.map(
            (n) => ({
              guia:
                n.guia,
              novedad:
                n.novedad ===
                "OTRO"
                  ? n.otro
                  : n.novedad,
            })
          ),
      });

      onClose();
    };

  return (
    <div
  className="modal-bg"
  onClick={onClose}
>

      <div
  className="modal-card"
  onClick={(e) =>
    e.stopPropagation()
  }
>

        <h2>
          Registrar
          novedad
        </h2>

        <div className="info-box">

          <p>
            <strong>
              Planilla:
            </strong>{" "}
            {
              item.planilla
            }
          </p>

          <p>
            <strong>
              Placa:
            </strong>{" "}
            {item.placa}
          </p>

          <p>
            <strong>
              Auxiliar:
            </strong>{" "}
            {
              item.auxiliar
            }
          </p>

        </div>

        <select
          value={
            vinculacion
          }
          onChange={(e) =>
            setVinculacion(
              e.target.value
            )
          }
        >
          <option value="">
            Selecciona
            vinculación
          </option>

          {vinculaciones.map(
            (v) => (
              <option
                key={v}
                value={v}
              >
                {v}
              </option>
            )
          )}
        </select>

        {detalles.map(
          (
            fila,
            index
          ) => (
            <div
              key={index}
              className="novedad-box"
            >

              <input
                type="text"
                placeholder="Guía o TODAS LAS GUIAS"
                value={
                  fila.guia
                }
                onChange={(
                  e
                ) =>
                  actualizar(
                    index,
                    "guia",
                    e.target
                      .value
                  )
                }
              />

              <select
                value={
                  fila.novedad
                }
                onChange={(
                  e
                ) =>
                  actualizar(
                    index,
                    "novedad",
                    e.target
                      .value
                  )
                }
              >
                <option value="">
                  Selecciona
                  novedad
                </option>

                {novedadesLista.map(
                  (
                    n
                  ) => (
                    <option
                      key={n}
                      value={n}
                    >
                      {n}
                    </option>
                  )
                )}
              </select>

              {fila.novedad ===
                "OTRO" && (
                <input
                  type="text"
                  placeholder="Escribir novedad"
                  value={
                    fila.otro
                  }
                  onChange={(
                    e
                  ) =>
                    actualizar(
                      index,
                      "otro",
                      e.target
                        .value
                    )
                  }
                />
              )}

            </div>
          )
        )}

        <button
          className="secondary-btn"
          onClick={
            agregarFila
          }
        >
          + Agregar otra novedad
        </button>

        <div className="modal-actions">

          <button
            onClick={
              onClose
            }
          >
            Cancelar
          </button>

          <button
            className="primary-btn"
            onClick={
              guardar
            }
          >
            Guardar
          </button>

        </div>

      </div>
    </div>
  );
}