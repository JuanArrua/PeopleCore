const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')


const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empleados",
})

app.post('/add_user', (req, res) =>{
    const sql = "INSERT INTO detalles_empleado (`name`,`email`,`age`,`gender`,`salary`) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        req.body.salary,
    ]
    db.query(sql, values, (err, result)=>{
        if(err) 
            return res.json({message: 'Ocurrió algo inesperado' + err})
        return res.json({success: "Empleado agregado exitosamente"})
    })
})

app.get("/empleados", (req, res) => {
    const sql = "SELECT * FROM detalles_empleado";
    db.query(sql, (err, result) => {
        if (err) res.json({ message: "Server error" });
        return res.json(result);
    })
})

app.get("/get_empleado/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM detalles_empleado WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.post("/edit_user/:id", (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE detalles_empleado SET `name`=?, `email`=?, `age`=?, `gender`=?, `salary`=? WHERE ID=?";
    const values = [req.body.name, req.body.email, req.body.age, req.body.gender, req.body.salary, id];
    db.query(sql, values, (err, result) => {
        if(err) 
            return res.json({message: 'Ocurrió algo inesperado' + err})
        return res.json({success: "Empleado editado exitosamente"})
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM detalles_empleado WHERE id=?";
    const values = [id];
    db.query(sql, values, (err, result) => {
        if(err) 
            return res.json({message: 'Ocurrió algo inesperado' + err})
        return res.json({success: "Empleado eliminado exitosamente"})
    });
});

app.listen(port, ()=>{
    console.log('listening')
});