import Layout from "../components/Layout";
import * as XLSX from "xlsx";

import {
  Upload,
  Truck,
  Clock3,
  CheckCircle,
  AlertTriangle,
  Package,
} from "lucide-react";

import { useContext } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from "recharts";

import { DataContext } from "../context/DataContext";

export default function Dashboard() {
const {
  entregas,
  setEntregas,
  recogidas,
  setRecogidas,
  recogidasCerradas,
  sinNovedad,
  novedades,
  reiniciarOperacion,
} = useContext(DataContext);

  const cargarExcel = (e) => {
    const archivo =
      e.target.files[0];

    if (!archivo) return;

    const reader =
      new FileReader();

    reader.onload = (
      evt
    ) => {
      const data =
        new Uint8Array(
          evt.target.result
        );

      const workbook =
        XLSX.read(data, {
          type: "array",
        });

      const hoja =
        workbook
          .SheetNames[0];

      const ws =
        workbook.Sheets[
          hoja
        ];

      const json =
        XLSX.utils.sheet_to_json(
          ws,
          {
            defval: "",
          }
        );

      const limpio =
        json.map(
          (row) => ({
            planilla:
              String(
                row.Planilla
              ),
            sucursal:
              row.Sucursal,
            placa:
              row.Placa,
            guias:
              Number(
                row.Guias
              ) || 0,
            ordenes:
              row.Ordenes,
            fecha:
              row[
                "Fecha Despacho"
              ],
            conductor:
              row.Conductor,
            auxiliar:
              row.Auxiliar,
            estado:
              "PENDIENTE",
          })
        );

      setEntregas(
        limpio.filter(
          (x) =>
            x.guias >= 1
        )
      );

      setRecogidas(
        limpio.filter(
          (x) =>
            x.guias === 0
        )
      );

      alert(
        "Excel cargado correctamente"
      );
    };

    reader.readAsArrayBuffer(
      archivo
    );
  };

  // ======================
  // MÉTRICAS REALES
  // ======================

  const totalPlanillas =
    entregas.length +
    sinNovedad.length +
    novedades.length;

  const totalGuias =
    [
      ...entregas,
      ...sinNovedad,
      ...novedades,
    ].reduce(
      (acc, item) =>
        acc +
        (Number(
          item.guias
        ) || 0),
      0
    );

  const guiasPendientes =
    entregas.reduce(
      (acc, item) =>
        acc +
        (Number(
          item.guias
        ) || 0),
      0
    );

  const guiasSinNovedad =
    sinNovedad.reduce(
      (acc, item) =>
        acc +
        (Number(
          item.guias
        ) || 0),
      0
    );

  const guiasConNovedad =
    novedades.reduce(
      (acc, item) =>
        acc +
        (Number(
          item.guias
        ) || 0),
      0
    );

  const guiasEntregadas =
    guiasSinNovedad +
    guiasConNovedad;

  const porcentaje =
  
    totalGuias === 0

      ? 0
      : Math.round(
          (guiasEntregadas /
            totalGuias) *
            100
        );
const vehiculosRuta =
  entregas.length;

const vehiculosGestionados =
  sinNovedad.length +
  novedades.length;

const totalRecogidas =
  recogidas.length +
  (recogidasCerradas?.length || 0);

const totalNovedades =
  novedades.reduce(
    (acc, item) =>
      acc +
      (item.novedades?.length || 0),
    0
  );

const gestionOperacion =
  totalPlanillas === 0
    ? 0
    : Math.round(
        (
          vehiculosGestionados /
          totalPlanillas
        ) * 100
      );

const resumenNovedades = {};

novedades.forEach((item) => {

  item.novedades?.forEach((nov) => {

    resumenNovedades[
      nov.novedad
    ] =
      (resumenNovedades[
        nov.novedad
      ] || 0) + 1;

  });

});
  const pieData = [
    {
      name:
        "Entregadas",
      value:
        guiasEntregadas,
    },
    {
      name:
        "Pendientes",
      value:
        guiasPendientes,
    },
  ];

const barData = [
  {
    estado:
      "Sin Novedad",
    total:
      sinNovedad.length,
  },
  {
    estado:
      "Con Novedad",
    total:
      novedades.length,
  },
];

  return (
    <Layout active="dashboard">

      <header className="topbar">

        <div>
          <h1>
            Dashboard
          </h1>

          <p>
            Torre de
            Control Nocturna
          </p>
        </div>

        <label className="upload-btn">
          <Upload />
          Subir Excel

          <input
            hidden
            type="file"
            accept=".xlsx,.xls"
            onChange={
              cargarExcel
            }
          />
        </label>
        <button
  onClick={
    reiniciarOperacion
  }
  style={{
    background:
      "#dc2626",
    color:
      "white",
    border:
      "none",
    padding:
      "12px 18px",
    borderRadius:
      "14px",
    cursor:
      "pointer",
    fontWeight:
      700,
    marginLeft:
      12,
  }}
>
  🗑️ Reiniciar
</button>

      </header>

<section className="cards">

  <div className="card">
    <Truck />
    <h3>Vehículos Ruta</h3>
    <span>{vehiculosRuta}</span>
  </div>

  <div className="card">
    <CheckCircle />
    <h3>Gestionados</h3>
    <span>{vehiculosGestionados}</span>
  </div>

  <div className="card">
    <Package />
    <h3>Total Guías</h3>
    <span>{totalGuias}</span>
  </div>

  <div className="card">
    <AlertTriangle />
    <h3>Guías Novedad</h3>
    <span>{guiasConNovedad}</span>
  </div>

  <div className="card">
    <Package />
    <h3>Recogidas</h3>
    <span>{totalRecogidas}</span>
  </div>

  <div className="card">
    <AlertTriangle />
    <h3>Total Novedades</h3>
    <span>{totalNovedades}</span>
  </div>

  <div
    className="card"
    style={{
      background:
        gestionOperacion >= 90
          ? "#16a34a"
          : gestionOperacion >= 50
          ? "#f59e0b"
          : "#dc2626",
      color: "white",
    }}
  >
    <h3>
      Gestión Operativa
    </h3>

    <span>
      {gestionOperacion}%
    </span>

    <p
      style={{
        marginTop: 10,
      }}
    >
      {gestionOperacion >= 90
        ? "🟢 Operación Controlada"
        : gestionOperacion >= 50
        ? "🟡 Operación en Curso"
        : "🔴 Operación Crítica"}
    </p>

  </div>

</section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "20px",
          marginTop:
            "30px",
        }}
      >

        <div className="card">

          <h3>
            Estado
            Operación
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={
                  pieData
                }
                dataKey="value"
              >
                <Cell />
                <Cell />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

        </div>

        <div className="card">

          <h3>
            Resumen
            Operativo
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={
                barData
              }
            >
              <CartesianGrid />
              <XAxis dataKey="estado" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </section>
<section
  style={{
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  }}
>

  <div className="card">

    <h3>
      Resumen de Novedades
    </h3>

    {Object.entries(
      resumenNovedades
    ).map(
      ([tipo, total]) => (

        <div
          key={tipo}
          style={{
            marginBottom: 10,
          }}
        >
          <strong>
            {total}
          </strong>{" "}
          - {tipo}
        </div>

      )
    )}

  </div>

  <div className="card">

    <h3>
      Vehículos
    </h3>

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <BarChart
        data={[
          {
            estado:
              "Ruta",
            total:
              vehiculosRuta,
          },
          {
            estado:
              "Gestionados",
            total:
              vehiculosGestionados,
          },
          {
            estado:
              "Recogidas",
            total:
              totalRecogidas,
          },
        ]}
      >

        <CartesianGrid />
        <XAxis dataKey="estado" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" />

      </BarChart>

    </ResponsiveContainer>

  </div>

</section>
    </Layout>
  );
}