import {Cita} from './model';
import {Request, Response} from 'express';
import { CitaService } from './services';
import logger from '../../../utils/logger';
import { RecordNotFoundError } from '../../../config/customErrors';

export interface CitaController{
    getAllAppointments(req: Request, res:Response):void;
    createAppointment(req: Request, res: Response):void;
    GetAppointmentById(req: Request, res: Response):Promise<void>;
}

export class CitaContr implements CitaController{

    private CitaServ: CitaService;
    constructor (CitaServ:CitaService){
        this.CitaServ = CitaServ;
    }
    
    public getAllAppointments(req: Request, res: Response): void {
        //const Citas:Cita[] = this.CitaServ.getAllAppointments();
        this.CitaServ.getAllAppointments().then((Citas)=>{
            res.status(200).json(Citas);
            logger.info(req.baseUrl+req.url+" HTTP STATUS: "+res.statusCode);},
        (error)=>{
            logger.error(error);
            res.status(400).json({error_name: error.name, message:error.message});
        });
    }

    public createAppointment(req: Request, res: Response):void{
        const citaReq = req.body;
        //const CitaX:Cita = this.CitaServ.createAppointment(citaReq);
        this.CitaServ.createAppointment(citaReq).then((CitaX)=>{
            res.status(201).json(CitaX);
            logger.info(req.baseUrl+req.url+" HTTP STATUS: "+res.statusCode);}, 
        (error)=>{
            logger.error(error);
            res.status(400).json({error_name: error.name, message:error.message});
        });
    }

    public async GetAppointmentById(req: Request, res: Response):Promise<void>{
        try{
            const id = parseInt(req.params.id)
            const CitaX = await this.CitaServ.GetAppointmentById(id);
            if(CitaX){
                res.status(200).json(CitaX);
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