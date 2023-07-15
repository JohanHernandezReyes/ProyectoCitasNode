import {Cita} from './model';
import {Request, Response} from 'express';
import { CitaService } from './services';
import logger from '../../../utils/logger';

export interface CitaController{
    getAllAppointments(req: Request, res:Response):void;
    createAppointment(req: Request, res: Response):void;
}

export class CitaContr implements CitaController{

    private CitaServ: CitaService;
    constructor (CitaServ:CitaService){
        this.CitaServ = CitaServ;
    }
    
    public getAllAppointments(req: Request, res: Response): void {
        //const Citas:Cita[] = this.CitaServ.getAllAppointments();
        try{
            this.CitaServ.getAllAppointments().then((Citas)=>{
                res.status(200).json(Citas);
                logger.info(req.baseUrl+req.url+" HTTP STATUS: "+res.statusCode);
            })
        }
        catch(error){
            logger.error(error);
            console.log(res.status(400).json({mensaje:error}));
        }
    }

    public createAppointment(req: Request, res: Response):void{
        const citaReq = req.body;
        //const CitaX:Cita = this.CitaServ.createAppointment(citaReq);
        try{
            this.CitaServ.createAppointment(citaReq).then((CitaX)=>{
                res.status(201).json(CitaX);
                logger.info(req.baseUrl+req.url+" HTTP STATUS: "+res.statusCode); 
            })
        }    
        catch(error){
            logger.error(error);
            console.log(res.status(400).json({mensaje:error}));
        }
    }
}