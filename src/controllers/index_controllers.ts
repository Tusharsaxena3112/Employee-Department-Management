import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";

export const getHome = (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Welcome to Node.js Postgresql API",
      time: new Date(),
    });
  } catch {
    return res.status(404).json({
      error: "Not Found",
      time: new Date(),
    });
  }
};

export const getEmployees = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      "SELECT * FROM employee ORDER BY emp_id ASC"
    );
    return res.status(200).json({
      entries: response.rows,
      time: new Date(),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Internal Server Error",
      time: new Date(),
    });
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  try {
    const response: QueryResult = await pool.query(
      "SELECT * FROM employee where emp_id = $1",
      [id]
    );
    return res.status(200).json({
      entries: response.rows,
      time: new Date(),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Internal Server Error",
      time: new Date(),
    });
  }
};

export const postEmployees = async (req: Request, res: Response) => {
  const { emp_name, emp_age, emp_dept, emp_salary, emp_experience } = req.body;
  const response: QueryResult = await pool.query(
    "SELECT * FROM employee ORDER BY emp_id ASC"
  );
  const id = response.rows.length + 1;
  try {
    const response = await pool.query(
      "INSERT INTO employee ( emp_id , emp_name, emp_age , emp_dept , emp_salary , emp_experience) VALUES ($1, $2 , $3 , $4 , $5 , $6)",
      [id, emp_name, emp_age, emp_dept, emp_salary, emp_experience]
    );
    res.json({
      message: "Employee Added successfully",
      body: {
        employee: {
          id,
          emp_name,
          emp_age,
          emp_dept,
          emp_salary,
          emp_experience,
        },
      },
      time: new Date(),
    });
  } catch {
    return res.status(500).json({
      error: "Employee cannot be added",
      time: new Date(),
    });
  }
};

export const putEmployees = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { experience } = req.body;
  try {
    const response = await pool.query(
      "UPDATE employee SET emp_experience = $1 WHERE emp_id = $2",
      [experience, id]
    );
    res.json({
      message: "Employee Experience Updated Successfully",
      body: {
        UpdatedEmployee: { emp_id: id, emp_experience: experience },
      },
      time: new Date(),
    });
  } catch {
    return res.status(500).json({
      error: "Cannot Update try next time",
      time: new Date(),
    });
  }
};

export const deleteEmployees = async (req:Request, res:Response):Promise<Response> => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM employee where emp_id = $1', [
        id
    ]);
    res.json({
      message:`Employee with id: ${id} deleted successfully`,
      time:new Date(),
    });
  } catch {
    return res.status(500).json({
      error: "Cannot Delete try next time",
      time: new Date(),
    });
  }
};

export const notFound = (req, res, next) => {
  return res.status(404).json({
    error: "Enter valid URL",
    time: new Date(),
  });
};
