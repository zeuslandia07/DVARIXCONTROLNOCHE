export default function Charts({ entregas, recogidas, novedades, avance }) {
  return (
    <div className="grid grid-4">
      <div className="card blue">
        <h3>Entregas</h3>
        <p>{entregas}</p>
      </div>

      <div className="card gray">
        <h3>Recogidas</h3>
        <p>{recogidas}</p>
      </div>

      <div className="card red">
        <h3>Novedades</h3>
        <p>{novedades}</p>
      </div>

      <div className="card green">
        <h3>Avance</h3>
        <p>{avance}%</p>
      </div>
    </div>
  );
}