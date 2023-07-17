import {Paciente} from './model';
import {Request, Response} from 'express';
import { PatientService } from './services';
import logger from '../../../utils/logger';
import { RecordNotFoundError } from '../../../config/customErrors';

export interface PatientController{
    getAllPatients(req: Request, res:Response):void;
    createPatient(req: Request, res: Response):void;
    GetPatientById(req: Request, res: Response):Promise<void>;
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
            res.status(400).json({error_name: error.name, message:error.message});
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
            res.status(400).json({error_name: error.name, message:error.message});
        });
    }

    public async GetPatientById(req: Request, res: Response):Promise<void>{
        try{
            const id = parseInt(req.params.id)
            const PacienteX = await this.PatientServ.GetPatientById(id);
            if(PacienteX){
                res.status(200).json(PacienteX);
                logger.info(req.baseUrl+req.url+ " HTTP STATUS: "+res.statusCode);
            }    
        }catch(error){
            logger.error(error.message);
            if (error instanceof RecordNotFoundError){
                res.status(400).json({error_name: error.name, message:error.message});
            }else{
                res.status(400).json({error:"Error consultando información"});
            }
        }    
    } 
}