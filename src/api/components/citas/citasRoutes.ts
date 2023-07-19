
import express, {Router} from 'express'
import logger from '../../../utils/logger';
import { CitaServiceImp } from './services';
import { CitaContr, CitaController } from './controller';
import { citaRepository } from './repository';
import { doctorRepository } from '../doctores/repository';
import { PacienteRepository } from '../pacientes/repository';


const router = Router();
const CitaRepo = new citaRepository();
const doctorRepo = new doctorRepository();
const pacienteRepo = new PacienteRepository();
const CitaService = new CitaServiceImp(CitaRepo, doctorRepo, pacienteRepo);
const citaCont:CitaController = new CitaContr(CitaService);

router.get('/list', citaCont.getAllAppointments.bind(citaCont));
router.post('/create', citaCont.createAppointment.bind(citaCont));
router.get('/:id', citaCont.GetAppointmentById.bind(citaCont));
router.put('/update/:id', citaCont.UpdateAppointment.bind(citaCont));
router.delete('/delete/:id', citaCont.DeleteAppointment.bind(citaCont));


export default router;