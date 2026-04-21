const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = Number(process.env.PORT) || 5000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
  })
);
app.use(express.json());

const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_NAME"];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
  process.exit(1);
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }

  console.log("Database connected successfully.");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/add_user", (req, res) => {
  const { name, email, age, gender, salary } = req.body;

  if (!name || !email || !age || !gender || !salary) {
    return res.status(400).json({ message: "All employee fields are required." });
  }

  const sql = "INSERT INTO detalles_empleado (`name`,`email`,`age`,`gender`,`salary`) VALUES (?, ?, ?, ?, ?)";
  const values = [name, email, age, gender, salary];

  db.query(sql, values, (err) => {
    if (err) {
      return res.status(500).json({ message: "Unexpected error while creating employee." });
    }

    return res.status(201).json({ success: "Empleado agregado exitosamente" });
  });
});

app.get("/empleados", (_req, res) => {
  const sql = "SELECT * FROM detalles_empleado";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    return res.json(result);
  });
});

app.get("/get_empleado/:id", (req, res) => {
  const sql = "SELECT * FROM detalles_empleado WHERE `id` = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    return res.json(result);
  });
});

app.post("/edit_user/:id", (req, res) => {
  const { name, email, age, gender, salary } = req.body;
  const sql = "UPDATE detalles_empleado SET `name` = ?, `email` = ?, `age` = ?, `gender` = ?, `salary` = ? WHERE `id` = ?";
  const values = [name, email, age, gender, salary, req.params.id];

  db.query(sql, values, (err) => {
    if (err) {
      return res.status(500).json({ message: "Unexpected error while editing employee." });
    }

    return res.json({ success: "Empleado editado exitosamente" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM detalles_empleado WHERE `id` = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Unexpected error while deleting employee." });
    }

    return res.json({ success: "Empleado eliminado exitosamente" });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
