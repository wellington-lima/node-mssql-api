'use strict';

const config = require('../config');
const sql = require('mssql');

const getAll = async ()=> {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQuery = "SELECT * FROM usuario;";

    const users = await pool.request().query(sqlQuery);
    return users.recordset;
    
  } catch (error) {
    return error.message;    
  }
}

const getById = async (userId) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQuery = "SELECT * FROM usuario WHERE idusuario = @userId;";
    const user = await pool.request()
                  .input('userId', sql.Int, userId)
                  .query(sqlQuery);

    return user.recordset;
    
  } catch (error) {
    return error.message;
  }
}

const create = async (user) => {
  const { name, login, password, adm } = user;

  try {
    let pool = await sql.connect(config.sql);
    const sqlQuery = `INSERT INTO usuario (nome, login, senha, adm) 
                      VALUES (@name, @login, @password, @adm); 
                      SELECT SCOPE_IDENTITY() as userId;`; //retorna o ultimo id inserido
    
    const result = await pool.request()
                  .input('name', sql.NVarChar(50), name)
                  .input('login', sql.NVarChar(20), login)
                  .input('password', sql.NVarChar(20), password)
                  .input('adm', sql.Int, adm) 
                  .query(sqlQuery);

    return result.recordset;
    
  } catch (error) {
    return error.message;
  }
}

const update = async (userId, user) => {
  const { name, login, password, adm } = user;

  try {
    let pool = await sql.connect(config.sql);
    const sqlQuery = `UPDATE usuario SET 
                      nome = @name,
                      login = @login,
                      senha = @password,
                      adm = @adm 
                      WHERE idusuario = @userId;

                      SELECT * FROM usuario WHERE idusuario = @userId;`; //retorna o ultimo id inserido
    
    const result = await pool.request()
                  .input('userId', sql.Int, userId)
                  .input('name', sql.NVarChar(50), name)
                  .input('login', sql.NVarChar(20), login)
                  .input('password', sql.NVarChar(20), password)
                  .input('adm', sql.Int, adm) 
                  .query(sqlQuery);

    return result.recordset;
    
  } catch (error) {
    return error.message;
  }
}

const destroy = async (userId) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQuery = "DELETE FROM usuario WHERE idusuario = @userId;";
    const result = await pool.request()
                  .input('userId', sql.Int, userId)
                  .query(sqlQuery);

    return result.recordset;
    
  } catch (error) {
    return error.message;
  }
}

const execProcedure  = async (userId) => {
  try {
    let pool = await sql.connect(config.sql);
    const procedureName = "proc_data_user";
    const result = await pool.request()
                  .input('id', sql.Int, userId)
                  .execute(procedureName);

    return result.recordset;
    
  } catch (error) {
    return error.message;
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