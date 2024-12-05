const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.static('dist'))

app.use(express.json());


app.post("/users", async (req, res) => {
    
  const { name } = req.body;

  try {
    
    const user = await prisma.user.create({
      data: { name },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


app.post("/projects", async (req, res) => {
  const { name } = req.body;

  try {
    const project = await prisma.project.create({
      data: {
        name,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
});


app.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
