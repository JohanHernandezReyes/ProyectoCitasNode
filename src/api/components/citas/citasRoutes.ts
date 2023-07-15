
import express, {Router} from 'express'
import logger from '../../../utils/logger';
import { CitaServiceImp } from './services';
import { CitaContr, CitaController } from './controller';

const router = Router();
const CitaService = new CitaServiceImp();
const citaCont:CitaController = new CitaContr(CitaService);

router.get('/list', citaCont.getAllAppointments.bind(citaCont))
router.post('/create', citaCont.createAppointment.bind(citaCont))


export default router;