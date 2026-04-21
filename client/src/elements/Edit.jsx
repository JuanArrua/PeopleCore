import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/get_empleado/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary mb-0">
            Editar Empleado #{id}
          </h3>
          <Link to="/" className="btn btn-outline-secondary">
            Volver
          </Link>
        </div>

        {/* Card */}
        <div className="card shadow-sm border-0">
          <div className="card-body">
            {data.map((student) => (
              <form key={student.id} onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre y Apellido</label>
                    <input
                      className="form-control"
                      type="text"
                      value={student.name}
                      required
                      onChange={(e) =>
                        setData([{ ...data[0], name: e.target.value }])
                      }
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      value={student.email}
                      required
                      onChange={(e) =>
                        setData([{ ...data[0], email: e.target.value }])
                      }
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Género</label>
                    <input
                      className="form-control"
                      type="text"
                      value={student.gender}
                      required
                      onChange={(e) =>
                        setData([{ ...data[0], gender: e.target.value }])
                      }
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Edad</label>
                    <input
                      className="form-control"
                      type="number"
                      value={student.age}
                      required
                      onChange={(e) =>
                        setData([{ ...data[0], age: e.target.value }])
                      }
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Salario</label>
                    <input
                      className="form-control"
                      type="number"
                      value={student.salary}
                      required
                      onChange={(e) =>
                        setData([{ ...data[0], salary: e.target.value }])
                      }
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-primary shadow-sm">
                    Guardar cambios
                  </button>
                </div>

              </form>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Edit;
