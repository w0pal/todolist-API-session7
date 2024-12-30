const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage for tasks
let tasks = [
    { id: 1, title: "Learn Express.js", completed: false },
    { id: 2, title: "Create To-Do List API", completed: true },
    { id: 3, title: "Learn Operating Systems", completed: false },
];

let currentId = 1;

// Route to create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = { id: currentId++, title, description: description || '', completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Route to view a list of all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route to view a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

// Route to update a task by ID
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
});

// Route to delete a task based on ID
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
