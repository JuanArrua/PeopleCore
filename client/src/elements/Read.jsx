import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

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
          setError("La API devolvio un formato invalido para el empleado.");
        }
      })
      .catch(() => {
        setData([]);
        setError("No se pudo cargar el empleado.");
      });
  }, [id]);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary mb-0">Detalle del Empleado #{id}</h3>
          <Link to="/" className="btn btn-outline-secondary">
            Volver
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm border-0">
          <div className="card-body">
            {data.length === 0 ? (
              <p className="text-muted mb-0">No hay datos del empleado para mostrar.</p>
            ) : (
              data.map((employee) => (
                <ul key={employee.id} className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">ID</span>
                    <span>{employee.id}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Nombre y Apellido</span>
                    <span>{employee.name}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Email</span>
                    <span>{employee.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Edad</span>
                    <span>{employee.age}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Genero</span>
                    <span>{employee.gender}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-semibold">Salario</span>
                    <span>${employee.salary}</span>
                  </li>
                </ul>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Read;
