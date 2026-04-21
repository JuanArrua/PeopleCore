import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { formatSalary, getSalaryDigits } from "../utils";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "Masculino",
    salary: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (Number(values.age) < 18) {
      setError("La edad minima permitida es 18 anos.");
      return;
    }

    api
      .post("/add_user", {
        ...values,
        age: Number(values.age),
        salary: Number(values.salary),
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("No se pudo guardar el empleado.");
      });
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary mb-0">Agregar Empleado</h3>
          <Link to="/" className="btn btn-outline-secondary">
            Volver
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre y Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={values.name}
                    onChange={(e) => setValues({ ...values, name: e.target.value })}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Genero</label>
                  <select
                    className="form-select"
                    value={values.gender}
                    onChange={(e) => setValues({ ...values, gender: e.target.value })}
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Edad</label>
                  <input
                    type="number"
                    className="form-control"
                    min="18"
                    required
                    value={values.age}
                    onChange={(e) => setValues({ ...values, age: e.target.value })}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Salario</label>
                  <input
                    type="text"
                    className="form-control"
                    inputMode="numeric"
                    placeholder="$ 800.000"
                    required
                    value={values.salary ? formatSalary(values.salary) : ""}
                    onChange={(e) =>
                      setValues({ ...values, salary: getSalaryDigits(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-primary shadow-sm">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
