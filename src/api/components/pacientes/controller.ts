import {Paciente} from './model';
import {Request, Response} from 'express';
import { PatientService } from './services';
import logger from '../../../utils/logger';

export interface PatientController{
    getAllPatients(req: Request, res:Response):void;
    createPatient(req: Request, res: Response):void;
}

export class PatientContr implements PatientController{

    private PatientServ: PatientService;
    constructor (PatientServ: PatientService){
        this.PatientServ = PatientServ;
    }
    
    public getAllPatients(req: Request, res: Response): void {
        //const Patients:Paciente[] = this.PatientServ.getAllPatients();
        this.PatientServ.getAllPatients().then((Patients)=>{
            res.status(200).json(Patients);
            logger.info(req.baseUrl+req.url+" HTTP STATUS: "+res.statusCode);},
        (error)=>{
            logger.error(error);
            res.status(400).json({message:error});
        });     
    }

    public createPatient(req: Request, res: Response):void{
        const PacienteReq = req.body;
        //const PatientX:Paciente| null = this.PatientServ.createPatient(PacienteReq);
        this.PatientServ.createPatient(PacienteReq).then((PatientX)=>{
            res.status(201).json(PatientX);
            logger.info(req.baseUrl+req.url+" HTTP STATUS: "+res.statusCode);},
        (error)=>{
            logger.error(error);
            res.status(400).json({message:error});
        });
    }
}