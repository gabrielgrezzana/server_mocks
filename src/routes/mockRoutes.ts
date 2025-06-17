import { Router } from 'express';
import mockController from '../controller/mockController';
import mockControllerLogin from '../controller/mockControllerLogin';

const router: Router = Router();

// GET /server/mock
router.get('/', mockController.getDefault);

// GET /server/mock/test
router.get('/test', mockController.getTest);
router.get('/teste/df', mockController.getDefault);

router.get('/randomRigsData', mockController.getrandomData);

// GET /server/mock/rigs?count=100
router.get('/rigs', mockController.getRigs);

// GET /server/mock/rig (single random rig)
router.get('/rig', mockController.getRandomRig);

//POST /login
router.post('/login', mockControllerLogin.postLogin);

export default router;
