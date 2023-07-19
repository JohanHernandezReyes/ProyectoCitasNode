import Joi from "joi";
import { especialidad } from "../../../../utils/common_models";

const createDoctorSchema = Joi.object({
    nombre:Joi.string().required(),
    apellido:Joi.string().required(),
    especialidad:Joi.string().required().valid(...Object.values(especialidad)),
    consultorio:Joi.number().integer().min(100).max(999).required(),
    correo:Joi.string(), 
    created_at: Joi.date()
})

export {createDoctorSchema}