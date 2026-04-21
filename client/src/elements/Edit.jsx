import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { formatSalary, getSalaryDigits } from "../utils";

function Edit() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");

    api
      .get(`/get_empleado/${id}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(
            res.data.map((employee) => ({
              ...employee,
              salary: String(Math.trunc(Number(employee.salary || 0))),
            }))
          );
        } else {
          setData([]);
          setError("La API devolvió un formato inválido para editar el empleado.");
        }
      })
      .catch(() => {
        setData([]);
        setError("No se pudo cargar el empleado para editar.");
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!data[0]) {
      setError("No hay datos válidos para guardar.");
      return;
    }

    if (Number(data[0].age) < 18) {
      setError("La edad mínima permitida es 18 años.");
      return;
    }

    if (!String(data[0].email).toLowerCase().endsWith("@gmail.com")) {
      setError("El email debe ser una dirección válida de Gmail.");
      return;
    }

    api
      .post(`/edit_user/${id}`, {
        ...data[0],
        email: String(data[0].email).toLowerCase(),
        age: Number(data[0].age),
        salary: Number(data[0].salary),
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
              <div className="pc-badge">Update employee record</div>
              <h1 className="pc-title">Editar perfil de empleado</h1>
              <p className="pc-subtitle">
                Actualiza los datos del colaborador manteniendo validaciones y formato consistente en toda la plataforma.
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
              <h2 className="pc-panel-title">Edición del registro #{id}</h2>
              <p className="pc-panel-copy">Ajusta la información del empleado sin salir del entorno de gestión.</p>
            </div>
          </div>

          <div className="pc-form-shell">
            {data.length === 0 ? (
              <p className="text-muted mb-0">No hay datos del empleado para editar.</p>
            ) : (
              data.map((employee) => (
                <form key={employee.id} onSubmit={handleSubmit}>
                  <div className="pc-form-grid">
                    <div className="pc-col-6">
                      <label className="pc-label">Nombre y Apellido</label>
                      <input
                        className="pc-input"
                        type="text"
                        value={employee.name}
                        required
                        onChange={(e) => setData([{ ...data[0], name: e.target.value }])}
                      />
                    </div>
                    <div className="pc-col-6">
                      <label className="pc-label">Email</label>
                      <input
                        className="pc-input"
                        type="email"
                        value={employee.email}
                        required
                        onChange={(e) => setData([{ ...data[0], email: e.target.value }])}
                      />
                    </div>

                    <div className="pc-col-4">
                      <label className="pc-label">Género</label>
                      <select
                        className="pc-select"
                        value={employee.gender}
                        onChange={(e) => setData([{ ...data[0], gender: e.target.value }])}
                      >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                      </select>
                    </div>
                    <div className="pc-col-4">
                      <label className="pc-label">Edad</label>
                      <input
                        className="pc-input"
                        type="number"
                        min="18"
                        value={employee.age}
                        required
                        onChange={(e) => setData([{ ...data[0], age: e.target.value }])}
                      />
                      <div className="pc-helper">Solo se aceptan edades desde 18 años en adelante.</div>
                    </div>
                    <div className="pc-col-4">
                      <label className="pc-label">Salario</label>
                      <input
                        className="pc-input"
                        type="text"
                        inputMode="numeric"
                        required
                        value={employee.salary ? formatSalary(employee.salary) : ""}
                        onChange={(e) => setData([{ ...data[0], salary: getSalaryDigits(e.target.value) }])}
                      />
                    </div>
                  </div>

                  <div className="pc-form-actions">
                    <Link to="/" className="pc-btn-ghost">
                      Cancelar
                    </Link>
                    <button type="submit" className="pc-btn-primary border-0">
                      Guardar cambios
                    </button>
                  </div>
                </form>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Edit;
