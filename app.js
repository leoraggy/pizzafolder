import express from "express";

const app = express();

const PORT = 3000;

app.use(express.static("public"));

// allows the app to parse form data (req.body)
app.use(express.urlencoded({ extended: true }));

// Create an array to store orders
const orders = [];

app.get("/", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get("/contact-us", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

app.get("/confirm", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get("/admin", (req, res) => {
  res.send(orders);
});

app.post("/submit-order", (req, res) => {
  const order = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    method: req.body.method,
    toppings: req.body.toppings,
    size: req.body.size,
    comment: req.body.comment,
  };
  orders.push(order);
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
