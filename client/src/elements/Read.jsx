import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_empleado/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary mb-0">
            Detalle del Empleado #{id}
          </h3>
          <Link to="/" className="btn btn-outline-secondary">
            Volver
          </Link>
        </div>

        {/* Card */}
        <div className="card shadow-sm border-0">
          <div className="card-body">
            {data.map((empleado) => (
              <ul key={empleado.id} className="list-group list-group-flush">

                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">ID</span>
                  <span>{empleado.id}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">Nombre y Apellido</span>
                  <span>{empleado.name}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">Email</span>
                  <span>{empleado.email}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">Edad</span>
                  <span>{empleado.age}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">Género</span>
                  <span>{empleado.gender}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">Salario</span>
                  <span>${empleado.salary}</span>
                </li>

              </ul>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Read;
