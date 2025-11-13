// IMport the mysql2 module
import mysql2 from "mysql2";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

const PORT = 3000;

const pool = mysql2
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  })
  .promise();

// set EJS as our view engine
app.set("view engine", "ejs");

app.use(express.static("public"));

// allows the app to parse form data (req.body)
app.use(express.urlencoded({ extended: true }));

// Create an array to store orders
const orders = [];

app.get("/db-test", async (req, res) => {
  try {
    const [orders] = await pool.query("SELECT * FROM orders");

    res.send(orders);
  } catch (error) {
    console.error("Database error:", error);
  }
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/contact-us", (req, res) => {
  res.render("contact");
});

app.get("/confirm", (req, res) => {
  res.render("confirmation", { orders });
});

app.get("/admin", async (req, res) => {
  try {
    const [orders] = await pool.query(
      "SELECT * FROM orders ORDER BY timestamp DESC"
    );
    res.render("admin", { orders });
  } catch (error) {
    console.error("Database error:", error);
  }
});

app.post("/submit-order", async (req, res) => {
  const order = req.body;
  console.log(order);
  order.timestamp = new Date();

  // write a query to insert a row in database
  const sql = `INSERT INTO orders(fname, lname, email, method, toppings, size, timestamp) VALUES (?,?,?,?,?,?,?)`;
  orders.push(order);

  // Create array of parameters
  const params = Object.values(order);

  console.log(params);

  try {
    const [result] = await pool.execute(sql, params);
    res.render("confirmation", { order });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
