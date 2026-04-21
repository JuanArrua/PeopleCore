import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { formatSalary } from "../utils";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      setError("");

      api
        .get("/empleados")
        .then((res) => {
          if (Array.isArray(res.data)) {
            setData(res.data);
          } else {
            setData([]);
            setError("La API no devolvió una lista válida de empleados.");
          }
        })
        .catch(() => {
          setData([]);
          setError("No se pudo cargar la lista de empleados. Revisa la API y la base de datos.");
        });
    }
  }, [deleted]);

  function handleDelete(id) {
    api
      .delete(`/delete/${id}`)
      .then(() => {
        setDeleted(true);
      })
      .catch(() => {
        setError("No se pudo eliminar el empleado.");
      });
  }

  const totalEmployees = data.length;
  const averageAge = totalEmployees
    ? Math.round(data.reduce((acc, employee) => acc + Number(employee.age || 0), 0) / totalEmployees)
    : 0;
  const totalPayroll = data.reduce((acc, employee) => acc + Number(employee.salary || 0), 0);
  const averageSalary = totalEmployees ? totalPayroll / totalEmployees : 0;

  return (
    <div className="pc-page">
      <div className="pc-container">
        <section className="pc-hero">
          <div className="pc-toolbar">
            <div>
              <div className="pc-badge">April 2026 Workforce Snapshot</div>
              <h1 className="pc-title">PeopleCore Employee Hub</h1>
              <p className="pc-subtitle">
                Un dashboard de capital humano pensado para presentar equipos, compensación y datos de empleados
                con una experiencia clara, moderna y lista para recruiters o stakeholders corporativos.
              </p>
            </div>
            <div className="pc-actions">
              <Link className="pc-btn-secondary" to="/create">
                + Agregar Empleado
              </Link>
            </div>
          </div>
        </section>

        <section className="pc-metrics">
          <article className="pc-metric">
            <p className="pc-metric-label">Plantilla activa</p>
            <p className="pc-metric-value">{totalEmployees}</p>
            <p className="pc-metric-note">Empleados monitoreados en PeopleCore.</p>
          </article>
          <article className="pc-metric">
            <p className="pc-metric-label">Edad promedio</p>
            <p className="pc-metric-value">{averageAge || "-"}</p>
            <p className="pc-metric-note">Edad media actual de la nómina.</p>
          </article>
          <article className="pc-metric">
            <p className="pc-metric-label">Payroll mensual</p>
            <p className="pc-metric-value">{formatSalary(totalPayroll)}</p>
            <p className="pc-metric-note">Suma de salarios cargados en la base.</p>
          </article>
          <article className="pc-metric">
            <p className="pc-metric-label">Salario promedio</p>
            <p className="pc-metric-value">{formatSalary(averageSalary)}</p>
            <p className="pc-metric-note">Promedio salarial del equipo actual.</p>
          </article>
        </section>

        {error && <div className="alert alert-danger pc-alert">{error}</div>}

        <section className="pc-panel">
          <div className="pc-panel-header">
            <div>
              <h2 className="pc-panel-title">Directorio de empleados</h2>
              <p className="pc-panel-copy">Consulta, edita y elimina registros desde una interfaz ejecutiva y limpia.</p>
            </div>
            <span className="pc-pill">Live workforce data</span>
          </div>

          <div className="pc-table-wrap">
            <div className="table-responsive pc-table">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre y Apellido</th>
                    <th>Email</th>
                    <th>Edad</th>
                    <th>Género</th>
                    <th>Salario</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No hay empleados para mostrar.
                      </td>
                    </tr>
                  ) : (
                    data.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td className="fw-semibold">{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.age}</td>
                        <td>{employee.gender}</td>
                        <td>{formatSalary(employee.salary)}</td>
                        <td className="text-center">
                          <Link className="btn btn-outline-primary btn-sm me-2" to={`/read/${employee.id}`}>
                            Ver
                          </Link>
                          <Link className="btn btn-outline-warning btn-sm me-2" to={`/edit/${employee.id}`}>
                            Editar
                          </Link>
                          <button onClick={() => handleDelete(employee.id)} className="btn btn-outline-danger btn-sm">
                            Borrar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
