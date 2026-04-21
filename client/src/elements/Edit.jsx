import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../api";

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
          setData(res.data);
        } else {
          setData([]);
          setError("La API devolvio un formato invalido para editar el empleado.");
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
      setError("No hay datos validos para guardar.");
      return;
    }

    api
      .post(`/edit_user/${id}`, data[0])
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
          <h3 className="fw-bold text-primary mb-0">Editar Empleado #{id}</h3>
          <Link to="/" className="btn btn-outline-secondary">
            Volver
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm border-0">
          <div className="card-body">
            {data.length === 0 ? (
              <p className="text-muted mb-0">No hay datos del empleado para editar.</p>
            ) : (
              data.map((employee) => (
                <form key={employee.id} onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre y Apellido</label>
                      <input
                        className="form-control"
                        type="text"
                        value={employee.name}
                        required
                        onChange={(e) => setData([{ ...data[0], name: e.target.value }])}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="email"
                        value={employee.email}
                        required
                        onChange={(e) => setData([{ ...data[0], email: e.target.value }])}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Genero</label>
                      <input
                        className="form-control"
                        type="text"
                        value={employee.gender}
                        required
                        onChange={(e) => setData([{ ...data[0], gender: e.target.value }])}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Edad</label>
                      <input
                        className="form-control"
                        type="number"
                        value={employee.age}
                        required
                        onChange={(e) => setData([{ ...data[0], age: e.target.value }])}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Salario</label>
                      <input
                        className="form-control"
                        type="number"
                        value={employee.salary}
                        required
                        onChange={(e) => setData([{ ...data[0], salary: e.target.value }])}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-primary shadow-sm">
                      Guardar cambios
                    </button>
                  </div>
                </form>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
