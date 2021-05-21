"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.deleteEmployees = exports.putEmployees = exports.postEmployees = exports.getEmployeeById = exports.getEmployees = exports.getHome = void 0;
const database_1 = require("../database");
const getHome = (req, res, next) => {
    try {
        return res.status(200).json({
            message: "Welcome to Node.js Postgresql API",
            time: new Date(),
        });
    }
    catch (_a) {
        return res.status(404).json({
            error: "Not Found",
            time: new Date(),
        });
    }
};
exports.getHome = getHome;
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query("SELECT * FROM employee ORDER BY emp_id ASC");
        return res.status(200).json({
            entries: response.rows,
            time: new Date(),
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Internal Server Error",
            time: new Date(),
        });
    }
});
exports.getEmployees = getEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield database_1.pool.query("SELECT * FROM employee where emp_id = $1", [id]);
        return res.status(200).json({
            entries: response.rows,
            time: new Date(),
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Internal Server Error",
            time: new Date(),
        });
    }
});
exports.getEmployeeById = getEmployeeById;
const postEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emp_name, emp_age, emp_dept, emp_salary, emp_experience } = req.body;
    const response = yield database_1.pool.query("SELECT * FROM employee ORDER BY emp_id ASC");
    const id = response.rows.length + 1;
    try {
        const response = yield database_1.pool.query("INSERT INTO employee ( emp_id , emp_name, emp_age , emp_dept , emp_salary , emp_experience) VALUES ($1, $2 , $3 , $4 , $5 , $6)", [id, emp_name, emp_age, emp_dept, emp_salary, emp_experience]);
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
    }
    catch (_a) {
        return res.status(500).json({
            error: "Employee cannot be added",
            time: new Date(),
        });
    }
});
exports.postEmployees = postEmployees;
const putEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { experience } = req.body;
    try {
        const response = yield database_1.pool.query("UPDATE employee SET emp_experience = $1 WHERE emp_id = $2", [experience, id]);
        res.json({
            message: "Employee Experience Updated Successfully",
            body: {
                UpdatedEmployee: { emp_id: id, emp_experience: experience },
            },
            time: new Date(),
        });
    }
    catch (_b) {
        return res.status(500).json({
            error: "Cannot Update try next time",
            time: new Date(),
        });
    }
});
exports.putEmployees = putEmployees;
const deleteEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield database_1.pool.query('DELETE FROM employee where emp_id = $1', [
            id
        ]);
        res.json({
            message: `Employee with id: ${id} deleted successfully`,
            time: new Date(),
        });
    }
    catch (_c) {
        return res.status(500).json({
            error: "Cannot Delete try next time",
            time: new Date(),
        });
    }
});
exports.deleteEmployees = deleteEmployees;
const notFound = (req, res, next) => {
    return res.status(404).json({
        error: "Enter valid URL",
        time: new Date(),
    });
};
exports.notFound = notFound;
//# sourceMappingURL=index_controllers.js.map