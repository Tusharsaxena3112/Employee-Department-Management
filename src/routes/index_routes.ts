import {Router} from 'express';
import {getEmployees,getHome,getEmployeeById,putEmployees,postEmployees,deleteEmployees,notFound} from "../controllers/index_controllers";
const router = Router();

// routes
router.get("/",getHome);

router.get('/employees',getEmployees); //getting details of the user.

router.get('/employees/:id',getEmployeeById);

router.put('/put/:id', putEmployees); //put means updating existing user

router.post('/post',postEmployees); //post means adding new user

router.delete('/delete/:id',deleteEmployees); //delete means deleting existing user.

router.get("*",notFound)

export default router;