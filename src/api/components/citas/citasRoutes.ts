
import express, {Router} from 'express'
import logger from '../../../utils/logger';
import { CitaServiceImp } from './services';
import { CitaContr, CitaController } from './controller';
import { citaRepository } from './repository';

const router = Router();
const CitaRepo = new citaRepository();
const CitaService = new CitaServiceImp(CitaRepo);
const citaCont:CitaController = new CitaContr(CitaService);

router.get('/list', citaCont.getAllAppointments.bind(citaCont))
router.post('/create', citaCont.createAppointment.bind(citaCont))


export default router;