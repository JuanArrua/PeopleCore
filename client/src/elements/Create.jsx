import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    salary: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    api
      .post("/add_user", values)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
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
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Genero</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) =>
                      setValues({ ...values, gender: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Edad</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={(e) =>
                      setValues({ ...values, age: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Salario</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={(e) =>
                      setValues({ ...values, salary: e.target.value })
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
