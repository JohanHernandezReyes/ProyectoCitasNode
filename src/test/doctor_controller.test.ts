import { DoctorContr, DoctorController } from './../api/components/doctores/controller';
import { DoctorService, DoctorServiceImp } from './../api/components/doctores/services';
import { doctorRepository } from './../api/components/doctores/repository';
import {Request, Response} from 'express';
import { Doctor, newDoctor } from '../api/components/doctores/model';
import { DoctorCreationError, DoctorGetAllError, RecordNotFoundError, UpdateInfoError } from '../config/customErrors';

//Mocking Express Request y Response
const mockreq = {} as Request;
const mockres = {} as Response;

//conexión  al service sin instanciar el repositorio
describe('DoctorContr', ()=>{
    let DoctorServ:DoctorService;
    let DoctorCont:DoctorController;
    beforeEach(() =>{
        DoctorServ = {
            getAllDoctors:jest.fn(),
            createDoctor:jest.fn(),
            GetDoctorById:jest.fn(),
            UpdateDoctor:jest.fn(),
            DeleteDoctor:jest.fn()
        },
        DoctorCont = new DoctorContr(DoctorServ);
        mockres.status = jest.fn().mockReturnThis();
        mockres.json = jest.fn().mockReturnThis();
    })

    //Probar el controlador de la funcion listar
    describe('getAllDoctors', ()=>{
        it("Debe obtener los datos de todos los doctores", async()=>{
                const doctors: Doctor[] =[
                    {id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'},
                    {id_doctor:5, nombre:'Juan', apellido:'Perez', especialidad:'Pediatria', consultorio: 501, correo:'jperez_med@gmail.com'}
                ];
                //simular el resultado esperado
                (DoctorServ.getAllDoctors as jest.Mock).mockResolvedValue(doctors);
                await DoctorCont.getAllDoctors(mockreq, mockres);

                expect(DoctorServ.getAllDoctors).toHaveBeenCalled();
                expect(mockres.json).toHaveBeenCalledWith(doctors);
                expect(mockres.status).toHaveBeenCalledWith(200);
        });

        it("Debe manejar el error y retornar un status 400",async () => {
            const error = new DoctorGetAllError("Error consultando la lista de doctores");
            (DoctorServ.getAllDoctors as jest.Mock).mockRejectedValue(error);
            await DoctorCont.getAllDoctors(mockreq, mockres);

            expect(DoctorServ.getAllDoctors).toHaveBeenCalled();
            expect(mockres.json).toHaveBeenCalledWith({error_name:error.name, message:error.message});
            expect(mockres.status).toHaveBeenCalledWith(400);
                
        })
    })

    //Probar el controlador de la funcion crear
    describe('createDoctor', ()=>{
        it("Realiza la creación de un nuevo doctor", async()=>{
                const doctor: Doctor ={id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
                //simular el resultado esperado
                const doctorReq:newDoctor = {nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};                
                (mockreq.body as newDoctor) =  doctorReq;
                (DoctorServ.createDoctor as jest.Mock).mockResolvedValue(doctor);
                await DoctorCont.createDoctor(mockreq, mockres);

                expect(DoctorServ.createDoctor).toHaveBeenCalledWith(doctorReq);
                expect(mockres.json).toHaveBeenCalledWith(doctor);
                expect(mockres.status).toHaveBeenCalledWith(201);
        });

        it("No Debe permitir el envío de datos sin validar previamente por Joi",async () => {
            const error = new Error("\"nombre\" is required");
            (mockreq.body) = {};
            (DoctorServ.createDoctor as jest.Mock).mockRejectedValue(error)
            await expect(DoctorCont.createDoctor(mockreq, mockres)).rejects;            
        })
    })

    //Probar el controlador de la funcion consultar por Id
    describe('GetDoctorById', ()=>{
        it("Consulta la info de un doctor especifico por su Id", async()=>{
                const doctor: Doctor ={id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
                (mockreq.params) = {id:"4"};
                (DoctorServ.GetDoctorById as jest.Mock).mockResolvedValue(doctor);
                await DoctorCont.GetDoctorById(mockreq, mockres);

                expect(DoctorServ.GetDoctorById).toHaveBeenCalledWith(4);
                expect(mockres.json).toHaveBeenCalledWith(doctor);
                expect(mockres.status).toHaveBeenCalledWith(200);
        });

        it("Debe manejar el error y retornar un status 400 si no encuentra el Id",async () => {
            const error = new RecordNotFoundError("Error al consultar el doctor especificado");
            (mockreq.params) = {id:"4"};
            (DoctorServ.GetDoctorById as jest.Mock).mockResolvedValue(null);
            (DoctorServ.GetDoctorById as jest.Mock).mockRejectedValue(error);
            await DoctorCont.GetDoctorById(mockreq, mockres);

            expect(DoctorServ.GetDoctorById).toHaveBeenCalledWith(4);
            expect(mockres.json).toHaveBeenCalledWith({error_name:error.name, message:error.message});
            expect(mockres.status).toHaveBeenCalledWith(400);
                
        })
    })


    //Probar el controlador de la funcion actualizar
    describe('UpdateDoctor', ()=>{
        it("Actualiza la info de un doctor especifico por su Id", async()=>{
                const doctor: Doctor ={id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
                (mockreq.params) = {id:"4"};
                (DoctorServ.UpdateDoctor as jest.Mock).mockResolvedValue(doctor);
                await DoctorCont.UpdateDoctor(mockreq, mockres);

                expect(DoctorServ.UpdateDoctor).toHaveBeenCalledWith(4, {});
                expect(mockres.json).toHaveBeenCalledWith(doctor);
                expect(mockres.status).toHaveBeenCalledWith(200);
        });

        it("Debe manejar el error y retornar un status 400 si no encuentra el Id",async () => {
            const error = new RecordNotFoundError("No existe id en la base de datos");
            (mockreq.params) = {id:"4"};
            (DoctorServ.UpdateDoctor as jest.Mock).mockResolvedValue(null);
            (DoctorServ.UpdateDoctor as jest.Mock).mockRejectedValue(error);
            await DoctorCont.UpdateDoctor(mockreq, mockres);

            expect(DoctorServ.UpdateDoctor).toHaveBeenCalledWith(4, {});
            expect(mockres.json).toHaveBeenCalledWith({error_name:error.name, message:error.message});
            expect(mockres.status).toHaveBeenCalledWith(400);
                
        });

        it("Debe retornar un status 400 si hay un error de actualización",async () => {
            const error = new UpdateInfoError("Error actualizando información");
            (mockreq.body) = {};
            (DoctorServ.UpdateDoctor as jest.Mock).mockResolvedValue(null);
            (DoctorServ.UpdateDoctor as jest.Mock).mockRejectedValue(error);
            await DoctorCont.UpdateDoctor(mockreq, mockres);

            expect(DoctorServ.UpdateDoctor).toHaveBeenCalledWith(4,{});
            expect(mockres.json).toHaveBeenCalledWith({error_name:error.name, message:error.message});
            expect(mockres.status).toHaveBeenCalledWith(400);
                
        });
        
        
    })
})