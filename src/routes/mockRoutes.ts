import { Router } from "express";
import mockController from "../controller/mockController";

const router: Router = Router();

// GET /server/mock
router.get('/', mockController.getDefault);

// GET /server/mock/test
router.get('/test', mockController.getTest);
router.get('/teste/df', mockController.getDefault);




export default router;