const express = require('express');
const asyncify = require('express-asyncify');
const { getAllTasks, getTask, deleteTask, addTask } = require('../data/tasks');

//
// task routes
//

const router = asyncify(express.Router());

router.get('/api/tasks', async (req, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
});
router.get('/api/tasks/:id', async (req, res) => {
  // find user
  const task = await getTask(+req.params.id);
  if (!task) {
    return res.status(404).json({
      code: 'Not Found',
      message: 'Task not found',
    });
  }

  // return resource
  return res.json(task);
});

/* POST /api/tasks
   {
     "completed": true
   }
  */
router.post('/api/tasks', async (req, res) => {
  // Get resource
  const resource = req.body;
  resource.id = new Date().valueOf();
  resource.completed = false;
  await addTask(resource);
  res.status(201).json(resource);
});

/* PATCH /api/tasks/12
   {
     "completed": true
   }
  */
router.patch('/api/tasks/:id', async (req, res) => {
  // Get resource
  const resource = req.body;
  const task = await getTask(+req.params.id);
  if (!task) {
    return res.status(404).json({
      code: 'Not Found',
      message: 'Task not found',
    });
  }

  task.completed = resource.completed;
  return res.status(200).json(task);
});

// DELETE /api/tasks/12
router.delete('/api/tasks/:id', async (req, res) => {
  const task = await getTask(+req.params.id);
  if (!task) {
    return res.status(204).json();
  }

  tasks = await deleteTask(task);
  return res.status(200).json(task);
});

module.exports = router;
