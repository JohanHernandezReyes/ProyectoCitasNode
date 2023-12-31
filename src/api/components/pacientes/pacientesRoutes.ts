import express, {Router} from 'express'
import logger from '../../../utils/logger';
import { PatientServiceImp } from './services';
import { PatientContr, PatientController } from './controller';
import { PacienteRepository } from './repository';

const router = Router();
const pacienteRepo = new PacienteRepository();
const PatientService = new PatientServiceImp(pacienteRepo);
const PatientCont:PatientController = new PatientContr(PatientService);

router.get('/list', PatientCont.getAllPatients.bind(PatientCont));
router.post('/create', PatientCont.createPatient.bind(PatientCont));
router.get('/:id', PatientCont.GetPatientById.bind(PatientCont));
router.put('/update/:id', PatientCont.UpdatePatient.bind(PatientCont));
router.delete('/delete/:id', PatientCont.DeletePatient.bind(PatientCont));

export default router;