import {Doctor} from './model';
import {Request, Response} from 'express';
import { DoctorService } from './services';
import logger from '../../../utils/logger';
import { RecordNotFoundError } from '../../../config/customErrors';

export interface DoctorController{
    getAllDoctors(req: Request, res:Response):void;
    createDoctor(req: Request, res: Response):void;
    GetDoctorById(req: Request, res: Response):Promise<void>;
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
            res.status(400).json({error_name: error.name, message:error.message});
        });
    }

    public createDoctor(req: Request, res: Response):void{
        const DoctorReq = req.body;
        //const DoctorX:Doctor = this.DoctorServ.createDoctor(DoctorReq);
        this.DoctorServ.createDoctor(DoctorReq).then((DoctorX)=>{ 
            res.status(201).json(DoctorX); 
            logger.info(req.baseUrl+req.url+ " HTTP STATUS: "+res.statusCode);},
        (error)=>{
            logger.error(error.message);
            res.status(400).json({error_name: error.name, message:error.message});
        });
    }       

    public async GetDoctorById(req: Request, res: Response):Promise<void>{
        try{
            const id = parseInt(req.params.id)
            const DoctorX = await this.DoctorServ.GetDoctorById(id);
            if(DoctorX){
                res.status(200).json(DoctorX);
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