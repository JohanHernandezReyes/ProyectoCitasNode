import { doctorRepository } from './../api/components/doctores/repository';
import { DoctorServiceImp } from './../api/components/doctores/services';
import { Doctor, newDoctor } from "../api/components/doctores/model";

describe('DoctorService', ()=>{
    let DoctorServ:DoctorServiceImp;
    let DoctorRepo:doctorRepository;
    beforeEach(() =>{
        DoctorRepo = {
            queryDoctors:jest.fn(),
            createDoctor:jest.fn()
        },
        DoctorServ = new DoctorServiceImp(DoctorRepo);
    })

    //Probar el servicio de listar
    describe('queryDoctors', ()=>{
        it("Debe obtener los datos de todos los doctores", async()=>{
                const doctors: Doctor[] =[
                    {id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'},
                    {id_doctor:5, nombre:'Juan', apellido:'Perez', especialidad:'Pediatria', consultorio: 501, correo:'jperez_med@gmail.com'}
                ];
                //simular el resultado esperado
                (DoctorRepo.queryDoctors as jest.Mock).mockResolvedValue(doctors);
                const result = await DoctorServ.getAllDoctors();

                expect(DoctorRepo.queryDoctors).toHaveBeenCalled();
                expect(result).toEqual(doctors);
             
        });

        it("Debe retornar un array vacío cuando no encuentra doctores",async () => {
            (DoctorRepo.queryDoctors as jest.Mock).mockResolvedValue([]);
            const result = await DoctorServ.getAllDoctors();

            expect(DoctorRepo.queryDoctors).toHaveBeenCalled();
            expect(result).toEqual([]);
                
        })
    })

    //Probar el servicio de crear
    describe('createDoctor', ()=>{
        it("Realiza la creación de un nuevo doctor", async()=>{
                const doctor: Doctor = {id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
                //simular el resultado esperado
                const doctorReq:newDoctor = {nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
                (DoctorRepo.createDoctor as jest.Mock).mockResolvedValue(doctor);
                const result = await DoctorServ.createDoctor(doctorReq);

                expect(DoctorRepo.createDoctor).toHaveBeenCalledWith(doctorReq);
                expect(result).toEqual(doctor);
             
        });

        /*it("Debe retornar un status 400 si falla la creación del doctor",async () => {
            const doctor: Doctor = {id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
            const error = new Error("Error al crear nuevo doctor");
            const doctorReq:newDoctor = {nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};                
            (DoctorRepo.createDoctor as jest.Mock).mockRejectedValue(error);
            const result = await DoctorServ.createDoctor(doctorReq);

            expect(DoctorRepo.createDoctor).toHaveBeenCalledWith(doctorReq);
            expect(result).rejects.toThrowError();
                
        })*/
    })
})