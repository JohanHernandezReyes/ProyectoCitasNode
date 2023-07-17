import {Request, Response, NextFunction} from 'express';

class CustomError extends Error{
    constructor(public statusCode: number, public message: string){
        super(message);
        this.name = "CustomError";
    }
}

const ErrorHandler = (error:any, req:Request, res:Response, next:NextFunction)=>{
    if(error instanceof CustomError){
        res.status(error.statusCode).json({error:error.message});
    }else if(error.message.includes("Unexpected token")){
        res.status(error.statusCode).json({error:"Body has a wrong structure"});
    }else{
        res.status(500).json({error:'Internal Server Error'});
    }

}

export {ErrorHandler};