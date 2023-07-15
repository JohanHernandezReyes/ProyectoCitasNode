import { DoctorContr, DoctorController } from './../api/components/doctores/controller';
import { DoctorService, DoctorServiceImp } from './../api/components/doctores/services';
import { doctorRepository } from './../api/components/doctores/repository';
import {Request, Response} from 'express';
import { Doctor, newDoctor } from '../api/components/doctores/model';

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
            createDoctor:jest.fn()
        },
        DoctorCont = new DoctorContr(DoctorServ);
        mockres.status = jest.fn().mockReturnThis();
        mockres.json = jest.fn().mockReturnThis();
    })

    //Probar el servicio
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
            const error = new Error("Error consultando la lista de doctores");
            (DoctorServ.getAllDoctors as jest.Mock).mockRejectedValue(error);
            await DoctorCont.getAllDoctors(mockreq, mockres);

            expect(DoctorServ.getAllDoctors).toHaveBeenCalled();
            expect(mockres.json).toHaveBeenCalledWith({message:error});
            expect(mockres.status).toHaveBeenCalledWith(400);
                
        })
    })
})