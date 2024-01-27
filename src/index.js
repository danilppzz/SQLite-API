import express from "express";
import { getAllUsers, getUser, deleteUser, updateUser, insertUser } from "../app.js";

const app = express();

app.use("/user", express.json());

app.get("/users", async (req, res) => {
  res.send(await getAllUsers());
});

app.get("/user/:id", async (req, res) => {
  const user = req.params.id;
  res.send(await getUser(user));
});

app.delete("/user/:id", async (req, res) => {
    const user = req.params.id;
    res.send(await deleteUser(user));
});

// No va el body
app.put("/user/:id", async (req, res) => {
    const data = {
        user_name: "example2",
        phone_number: "example2",
        email: "example2",
        password: "example2"
      };
    const id = req.params.id;
    await updateUser(id, data)
    res.status(200).send("User updated succesfully!");
});

app.post("/user", async (req, res) => {
    const data = {
        user_name: "example",
        phone_number: "example",
        email: "example",
        password: "example"
      };
    await insertUser(data)
    res.status(200).send("User created succesfully!");
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
