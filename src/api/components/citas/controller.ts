import {Cita} from './model';
import {Request, Response} from 'express';
import { CitaService } from './services';
import logger from '../../../utils/logger';
import { DeleteInfoError, RecordNotFoundError, UpdateInfoError } from '../../../config/customErrors';

export interface CitaController{
    getAllAppointments(req: Request, res:Response):void;
    createAppointment(req: Request, res: Response):void;
    GetAppointmentById(req: Request, res: Response):Promise<void>;
    UpdateAppointment(req: Request, res: Response):Promise<void>;
    DeleteAppointment(req: Request, res: Response):Promise<void>;
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
            const id = parseInt(req.params.id);
            if(isNaN(id)){
                throw new Error("El id debe ser un numero entero");
            };
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

    public async UpdateAppointment(req: Request, res: Response):Promise<void>{
        try{
            const id = parseInt(req.params.id);
            if(isNaN(id)){
                throw new Error("El id debe ser un numero entero");
            };
            const CitaReq = req.body;
            const CitaX = await this.CitaServ.UpdateAppointment(id, CitaReq);
            if(CitaX){
                res.status(200).json(CitaX);
                logger.info(req.baseUrl+req.url+ " HTTP STATUS: "+res.statusCode);
            }    
        }catch(error){
            logger.error(error.message);
            if (error instanceof UpdateInfoError || error instanceof RecordNotFoundError){
                res.status(400).json({error_name: error.name, message:error.message});
            }else{
                res.status(400).json({error:"Error actualizando información"});
            }
        } 
    }
    
    public async DeleteAppointment(req: Request, res: Response):Promise<void>{
        try{
            const id = parseInt(req.params.id);
            if(isNaN(id)){
                throw new Error("El id debe ser un numero entero");
            };
            await this.CitaServ.DeleteAppointment(id);
            res.status(200).json({message:`la cita con id ${id} ha sido eliminada correctamente`});
            logger.info(req.baseUrl+req.url+ " HTTP STATUS: "+res.statusCode);
    
        }catch(error){
            logger.error(error.message);
            if (error instanceof RecordNotFoundError || error instanceof DeleteInfoError){
                res.status(400).json({error_name: error.name, message:error.message});
            }else{
                res.status(400).json({error:"Error eliminando la cita"});
            }
        } 
    }
}