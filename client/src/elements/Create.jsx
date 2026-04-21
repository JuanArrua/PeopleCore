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
      setError("La edad mínima permitida es 18 años.");
      return;
    }

    if (!values.email.toLowerCase().endsWith("@gmail.com")) {
      setError("El email debe ser una dirección válida de Gmail.");
      return;
    }

    api
      .post("/add_user", {
        ...values,
        email: values.email.toLowerCase(),
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
    <div className="pc-page">
      <div className="pc-container">
        <section className="pc-hero">
          <div className="pc-toolbar">
            <div>
              <div className="pc-badge">Alta de talento</div>
              <h1 className="pc-title">Nuevo registro de empleado</h1>
              <p className="pc-subtitle">
                Incorpora un nuevo colaborador al directorio con sus datos personales, laborales y salariales.
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
              <h2 className="pc-panel-title">Formulario de alta</h2>
              <p className="pc-panel-copy">Completa la información base del empleado antes de incorporarlo al directorio.</p>
            </div>
          </div>

          <div className="pc-form-shell">
            <form onSubmit={handleSubmit}>
              <div className="pc-form-grid">
                <div className="pc-col-6">
                  <label className="pc-label">Nombre y Apellido</label>
                  <input
                    type="text"
                    className="pc-input"
                    required
                    value={values.name}
                    onChange={(e) => setValues({ ...values, name: e.target.value })}
                  />
                </div>

                <div className="pc-col-6">
                  <label className="pc-label">Email</label>
                  <input
                    type="email"
                    className="pc-input"
                    required
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                  />
                </div>

                <div className="pc-col-4">
                  <label className="pc-label">Género</label>
                  <select
                    className="pc-select"
                    value={values.gender}
                    onChange={(e) => setValues({ ...values, gender: e.target.value })}
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>

                <div className="pc-col-4">
                  <label className="pc-label">Edad</label>
                  <input
                    type="number"
                    min="18"
                    className="pc-input"
                    required
                    value={values.age}
                    onChange={(e) => setValues({ ...values, age: e.target.value })}
                  />
                </div>

                <div className="pc-col-4">
                  <label className="pc-label">Salario</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="pc-input"
                    placeholder="$ 800.000"
                    required
                    value={values.salary ? formatSalary(values.salary) : ""}
                    onChange={(e) => setValues({ ...values, salary: getSalaryDigits(e.target.value) })}
                  />
                </div>
              </div>

              <div className="pc-form-actions">
                <Link to="/" className="pc-btn-ghost">
                  Cancelar
                </Link>
                <button type="submit" className="pc-btn-primary border-0">
                  Guardar empleado
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Create;
