import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if(deleted){
        setDeleted(false)
    axios.get('/empleados')
    .then((res) => {
        setData(res.data);
    })
    .catch((err) => console.log(err));
  }
  }, [deleted]);

  function handleDelete(id){
    axios.delete(`/delete/${id}`)
    .then((res)=>{
        setDeleted(true)
    })
    .catch((err)=> console.log(err))
  }

  return (
  <div className="bg-light min-vh-100 py-4">
    <div className="container">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary mb-0">Empleados</h3>
        <Link className="btn btn-primary shadow-sm" to="/create">
          + Agregar Empleado
        </Link>
      </div>

      {/* Card */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-dark">
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
                {data.map((empleado) => (
                  <tr key={empleado.id}>
                    <td>{empleado.id}</td>
                    <td className="fw-semibold">{empleado.name}</td>
                    <td>{empleado.email}</td>
                    <td>{empleado.age}</td>
                    <td>{empleado.gender}</td>
                    <td>${empleado.salary}</td>
                    <td className="text-center">
                      <Link
                        className="btn btn-outline-primary btn-sm me-2"
                        to={`/read/${empleado.id}`}
                      >
                        Ver
                      </Link>
                      <Link
                        className="btn btn-outline-warning btn-sm me-2"
                        to={`/edit/${empleado.id}`}
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(empleado.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
);

}

export default Home;