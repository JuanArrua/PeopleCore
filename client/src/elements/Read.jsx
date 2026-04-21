import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { formatSalary } from "../utils";

function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setError("");

    api
      .get(`/get_empleado/${id}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([]);
          setError("La API devolvió un formato inválido para el empleado.");
        }
      })
      .catch(() => {
        setData([]);
        setError("No se pudo cargar el empleado.");
      });
  }, [id]);

  return (
    <div className="pc-page">
      <div className="pc-container">
        <section className="pc-hero">
          <div className="pc-toolbar">
            <div>
              <div className="pc-badge">Employee profile</div>
              <h1 className="pc-title">Ficha individual del empleado</h1>
              <p className="pc-subtitle">
                Consulta la información personal y salarial del colaborador dentro de una vista simple, ordenada y ejecutiva.
              </p>
            </div>
            <div className="pc-actions">
              <Link to="/" className="pc-btn-secondary">
                Volver al dashboard
              </Link>
            </div>
          </div>
        </section>

        {error && <div className="alert alert-danger pc-alert">{error}</div>}

        <section className="pc-panel">
          <div className="pc-panel-header">
            <div>
              <h2 className="pc-panel-title">Detalle del registro #{id}</h2>
              <p className="pc-panel-copy">Información maestra del colaborador cargada actualmente en PeopleCore.</p>
            </div>
            <span className="pc-pill">Profile summary</span>
          </div>

          <div className="pc-detail-list">
            {data.length === 0 ? (
              <p className="text-muted mb-0">No hay datos del empleado para mostrar.</p>
            ) : (
              data.map((employee) => (
                <ul key={employee.id} className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">ID</span>
                    <span className="pc-detail-value">{employee.id}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Nombre y Apellido</span>
                    <span className="pc-detail-value">{employee.name}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Email</span>
                    <span className="pc-detail-value">{employee.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Edad</span>
                    <span className="pc-detail-value">{employee.age}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Género</span>
                    <span className="pc-detail-value">{employee.gender}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Salario</span>
                    <span className="pc-detail-value">{formatSalary(employee.salary)}</span>
                  </li>
                </ul>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Read;
