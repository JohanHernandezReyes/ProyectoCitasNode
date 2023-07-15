import {Doctor} from './model';
import {Request, Response} from 'express';
import { DoctorService } from './services';
import logger from '../../../utils/logger';

export interface DoctorController{
    getAllDoctors(req: Request, res:Response):void;
    createDoctor(req: Request, res: Response):void;
}

export class DoctorContr implements DoctorController{

    private DoctorServ: DoctorService;
    constructor (DoctorServ:DoctorService){
        this.DoctorServ = DoctorServ;
    }
    
    public getAllDoctors(req: Request, res: Response): void {
        //const Doctors:Doctor[] = this.DoctorServ.getAllDoctors();
        this.DoctorServ.getAllDoctors().then((Doctors)=>{
            res.status(200).json(Doctors);
            logger.info(req.baseUrl+req.url + " HTTP STATUS: "+res.statusCode);},
        (error)=>{
            logger.error(error);
            console.log(res.status(400).json({message:error}));
        });
    }

    public createDoctor(req: Request, res: Response):void{
        const DoctorReq = req.body;
        //const DoctorX:Doctor = this.DoctorServ.createDoctor(DoctorReq);
        this.DoctorServ.createDoctor(DoctorReq).then((DoctorX)=>{ 
            res.status(201).json(DoctorX); 
            logger.info(req.baseUrl+req.url+ " HTTP STATUS: "+res.statusCode);},
        (error)=>{
            logger.error(error);
            console.log(res.status(400).json({message:error}));
        });
    }    
}