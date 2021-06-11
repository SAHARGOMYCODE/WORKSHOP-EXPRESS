//1. import express
const express = require("express");

//2. init express
const app = express();

//3. creation your endpoints
// app.get("/", (req, res) => {
//   res.send("hello");
// });

//4. run server
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`the server is running on ${port}`);
});
//5. serve public file
app.use(express.static("public"));

//6. parse the data
app.use(express.json());

let users = [
  {
    name: "sahar",
    age: 29,
    id: 1,
  },
  {
    name: "sourour",
    age: 30,
    id: 2,
  },
  {
    name: "oussama",
    age: 32,
    id: 3,
  },
];
console.log(users);

//Get list of users
// GET /api/users
app.get("/api/users", (req, res) => {
  // res.send(users);
  res.status(200).json(users);
});

//ADD list of users
// POST /api/users
// description : add new users
app.post("/api/users", (req, res) => {
  let newUser = { ...req.body, id: Math.random() };
  users.push(newUser);
  res.status(200).json({
    msg: "user added with success",
    users,
  });
});

//delete user
//delete /api/users/:id
// description : delete user
app.delete("/api/users/:id", (req, res) => {
  let id = Number(req.params.id);
  console.log(req.params);
  users = users.filter((user) => user.id !== id);
  res.status(200).json({
    msg: "user has been deleted",
    users,
  });
});

//update user
//PUT /api/users/:id
// description : update user
app.put("/api/users/:id", (req, res) => {
  let id = Number(req.params.id);
  users = users.map((user) =>
    user.id === id ? { ...user, ...req.body } : user
  );
  res.status(200).json({
    msg: "user has been updated",
    users,
  });
});
