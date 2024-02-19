let tasks = [
  {
    id: 1,
    name: "Faire la vaisselle",
    status: "done",
  },
  {
    id: 2,
    name: "Faire la cuisine",
    status: "todo",
  },
  {
    id: 3,
    name: "Faire le ménage",
    status: "todo",
  },
];
// recup toute les tasks sans détails
app.get("/tasks", (req, res) => {
  const taskRef = tasks.map((t) => `/task/${t.id}`);
  res.json(taskRef);
});
// recup la task avec l'id correspondant avec détails
app.get("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).send(`Task ${taskId} not found`);
  }
});

// ajoute une task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    name: req.body.name,
    status: req.body.status,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// modifie une task
app.put("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.name = req.body.name;
    task.status = req.body.status;
    res.json(task);
  } else {
    res.status(404).send(`Task ${taskId} not found`);
  }
});

// supprime une task
app.delete("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    tasks = tasks.filter((t) => t.id !== taskId);
    res.json(task);
  } else {
    res.status(404).send(`Task ${taskId} not found`);
  }
});
