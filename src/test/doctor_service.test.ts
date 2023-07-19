import { doctorRepository } from './../api/components/doctores/repository';
import { DoctorServiceImp } from './../api/components/doctores/services';
import { Doctor, newDoctor } from "../api/components/doctores/model";


describe('DoctorService', ()=>{
    let DoctorServ:DoctorServiceImp;
    let DoctorRepo:doctorRepository;
    beforeEach(() =>{
        DoctorRepo = {
            queryDoctors:jest.fn(),
            createDoctor:jest.fn(),
            GetDoctorById:jest.fn(),
            UpdateDoctor:jest.fn(),
            DeleteDoctor:jest.fn()
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

        it("Debe retornar un error si falla la creación del doctor",async () => {
            const error = new Error("Error al crear nuevo doctor");
            const doctorReq:newDoctor = {nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};                
            (DoctorRepo.createDoctor as jest.Mock).mockRejectedValue(error);

            await expect(DoctorServ.createDoctor(doctorReq)).rejects.toThrowError(error);
            expect(DoctorRepo.createDoctor).toHaveBeenCalledWith(doctorReq);     
        })
    })

    //Probar el servicio de consultar por Id
    describe('GetDoctorById', ()=>{
        it("Consulta la info de un doctor especifico por su Id", async()=>{
                const doctor: Doctor = {id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
                (DoctorRepo.GetDoctorById as jest.Mock).mockResolvedValue(doctor);
                const result = await DoctorServ.GetDoctorById(4);

                expect(DoctorRepo.GetDoctorById).toHaveBeenCalledWith(4);
                expect(result).toEqual(doctor);
             
        });

        it("Debe retornar un error si no encuentra el Id", async () => {
            const error = new Error("Error al consultar el doctor especificado");
            (DoctorRepo.GetDoctorById as jest.Mock).mockRejectedValue(error);
            await expect(DoctorServ.GetDoctorById(4)).rejects.toThrowError(error);
            expect(DoctorRepo.GetDoctorById).toHaveBeenCalledWith(4);
        });

        it("Debe retornar un valor nulo si encuentra el Id definido como null", async () => {
            (DoctorRepo.GetDoctorById as jest.Mock).mockResolvedValue(null);
            const result = await DoctorServ.GetDoctorById(4);
            expect(DoctorRepo.GetDoctorById).toHaveBeenCalledWith(4);
            expect(result).toBeNull();
        });
    })


    //Probar el servicio de actualizar
    describe('UpdateDoctor', ()=>{
        const doctorupdates:Partial<Doctor> = {consultorio:501};
        const doctor: Doctor = {id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
                
        it("Actualiza la info de un doctor especifico por su Id", async()=>{
                (DoctorRepo.GetDoctorById as jest.Mock).mockResolvedValue(doctor);
                const doctorbyid = await DoctorServ.GetDoctorById(4);
                expect(DoctorRepo.GetDoctorById).toHaveBeenCalledWith(4);
                expect(doctorbyid).not.toBeNull();
                
                const doctorRes: Doctor = {id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 501, correo:'edu_sarmiento523@hotmail.com', updated_at:new Date()};
                (DoctorRepo.UpdateDoctor as jest.Mock).mockResolvedValue(doctor);
                const result = await DoctorServ.UpdateDoctor(4, doctorupdates);
                expect(DoctorRepo.UpdateDoctor).toHaveBeenCalledWith(4, doctorupdates);
                expect({...doctor, ...result}).toEqual(doctorRes);             
        });

        it("Debe retornar un error si falla la actualizacion", async () => {
            (DoctorRepo.GetDoctorById as jest.Mock).mockResolvedValue(doctor);
            const doctorbyid = await DoctorServ.GetDoctorById(4);
            expect(DoctorRepo.GetDoctorById).toHaveBeenCalledWith(4);
            expect(doctorbyid).not.toBeNull();

            const error = new Error("Error actualizando información");
            (DoctorRepo.UpdateDoctor as jest.Mock).mockRejectedValue(error);
            await (expect(DoctorRepo.UpdateDoctor(4, doctorupdates))).rejects.toThrowError(error);
        });
    })
    
})