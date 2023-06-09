const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  try {
    await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [
      req.body.description,
    ]);
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/:id", async (req, res) => {
  try {
    await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [
      req.body.description,
      req.params.id,
    ]);
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM todo WHERE id = $1", [req.params.id]);
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen("5000", () => console.log("Server Started"));
