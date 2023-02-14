'use strict';

const userService = require('../services/userService');

const getAll = async (req, res)=> {
  try {
    const users = await userService.getAll();
    res.send(users);

  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getById = async (req, res)=> {
  const userId = req.params.id;

  try {
    const users = await userService.getById(userId);
    res.send(users);

  } catch (error) {
    res.status(400).send(error.message);
  }
}

const create = async (req, res)=> {
  const user = req.body;

  try {
    const created = await userService.create(user);
    res.send(created);

  } catch (error) {
    res.status(400).send(error.message);
  }
}

const update = async (req, res)=> {
  const userId = req.params.id;
  const user = req.body;

  try {
    const updated = await userService.update(userId, user);
    res.send(updated);

  } catch (error) {
    res.status(400).send(error.message);
  }
}

const destroy = async (req, res)=> {
  
  try {
    const userId = req.params.id;
    const result = await userService.destroy(userId);
    res.send(result);

  } catch (error) {
    res.status(400).send(error.message);
  }
}

const execProcedure = async (req, res)=> {
  
  try {
    const userId = req.params.id;
    const result = await userService.execProcedure(userId);
    res.send(result);

  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
  execProcedure
}