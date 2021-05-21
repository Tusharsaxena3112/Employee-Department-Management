"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controllers_1 = require("../controllers/index_controllers");
const router = express_1.Router();
// routes
router.get("/", index_controllers_1.getHome);
router.get('/employees', index_controllers_1.getEmployees); //getting details of the user.
router.get('/employees/:id', index_controllers_1.getEmployeeById);
router.put('/put/:id', index_controllers_1.putEmployees); //put means updating existing user
router.post('/post', index_controllers_1.postEmployees); //post means adding new user
router.delete('/delete/:id', index_controllers_1.deleteEmployees); //delete means deleting existing user.
router.get("*", index_controllers_1.notFound);
exports.default = router;
//# sourceMappingURL=index_routes.js.map