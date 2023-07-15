import { DoctorServiceImp } from './services';
import { Doctor } from './model';
import express, {Router} from 'express'
import logger from '../../../utils/logger';
import { DoctorContr, DoctorController} from './controller';
import { doctorRepository } from './repository';

const router = Router();
const doctorRepo = new doctorRepository();
const DoctorService = new DoctorServiceImp(doctorRepo);
const doctorCont:DoctorController = new DoctorContr(DoctorService);

router.get('/list', doctorCont.getAllDoctors.bind(doctorCont))
router.post('/create', doctorCont.createDoctor.bind(doctorCont))



export default router;