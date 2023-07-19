import Joi from "joi";
import { especialidad } from "../../../../utils/common_models";

const createPatientSchema = Joi.object({
    nombre:Joi.string().required(),
    apellido:Joi.string().required(),
    identif:Joi.string().required(),
    telefono:Joi.number().max(9999999999), 
    created_at: Joi.date()
})

export {createPatientSchema};