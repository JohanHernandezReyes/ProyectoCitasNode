import { Cita, newCita } from "../api/components/citas/model";
import { citaRepository } from "../api/components/citas/repository";
import { CitaServiceImp } from "../api/components/citas/services";
import { Doctor } from "../api/components/doctores/model";
import { doctorRepository } from "../api/components/doctores/repository";
import { Paciente } from "../api/components/pacientes/model";
import { PacienteRepository } from "../api/components/pacientes/repository";

describe('CitaService', ()=>{
    let CitaServ:CitaServiceImp;
    let CitaRepo:citaRepository;
    let doctorRepo:doctorRepository;
    let pacienteRepo:PacienteRepository;

    beforeEach(() =>{
        CitaRepo = {
            queryAppointments:jest.fn(),
            createAppointment:jest.fn(),
            GetAppointmentById:jest.fn(),
            UpdateAppointment:jest.fn(),
            DeleteAppointment:jest.fn()
        };
        pacienteRepo ={
            queryPatients:jest.fn(),
            createPatient:jest.fn(),
            GetPatientById:jest.fn(),
            GetPatientByIdentif:jest.fn(),
            UpdatePatient:jest.fn(),
            DeletePatient:jest.fn()
        };
        doctorRepo={
            queryDoctors:jest.fn(),
            createDoctor:jest.fn(),
            GetDoctorById:jest.fn(),
            UpdateDoctor:jest.fn(),
            DeleteDoctor:jest.fn()
        };

        CitaServ = new CitaServiceImp(CitaRepo, doctorRepo, pacienteRepo);
    })

    //Probar el servicio de listar
    describe('queryAppointments', ()=>{
        it("Debe obtener los datos de todos los doctores", async()=>{
                const Citas: Cita[] =[
                    {horario:"07:30am", identif_paciente:"39537569", nombre_doctor:"Juan Perez", nombre_paciente:"Ana Reyes", especialidad:'Psicologia', consultorio:101},
                    {horario:"08:30am", identif_paciente:"1022221924", nombre_doctor:"Eduardo Sarmiento", nombre_paciente:"Matias Hernandez", especialidad:'Pediatria', consultorio:301}
                ];
                //simular el resultado esperado
                (CitaRepo.queryAppointments as jest.Mock).mockResolvedValue(Citas);
                const result = await CitaServ.getAllAppointments();

                expect(CitaRepo.queryAppointments).toHaveBeenCalled();
                expect(result).toEqual(Citas);
             
        });

        it("Debe retornar un array vacío cuando no encuentra citas",async () => {
            (CitaRepo.queryAppointments as jest.Mock).mockResolvedValue([]);
            const result = await CitaServ.getAllAppointments();

            expect(CitaRepo.queryAppointments).toHaveBeenCalled();
            expect(result).toEqual([]);
                
        })
    })

    //Probar el servicio de crear
    describe('createAppointment', ()=>{
        it("Realiza la creación de una nueva cita", async()=>{
                const Cita: Cita = {horario:"08:30am", nombre_doctor:"Eduardo Sarmiento", especialidad:'Psicologia', nombre_paciente:"Matias Hernandez", consultorio:701, identif_paciente:"1022221924", created_at:undefined, updated_at:undefined};
                const doctor: Doctor =  {id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
                const paciente: Paciente = {id_paciente:2, nombre:'Matias', apellido:'Hernandez', identif:'1022221924'};
                //simular el resultado esperado
                (pacienteRepo.GetPatientByIdentif as jest.Mock).mockResolvedValue(paciente);
                (doctorRepo.GetDoctorById as jest.Mock).mockResolvedValue(doctor);
                const doctorRes = await doctorRepo.GetDoctorById(4);
                const patientRes = await pacienteRepo.GetPatientByIdentif("1022221924");
                expect(doctorRepo.GetDoctorById).toHaveBeenCalledWith(4);
                expect(pacienteRepo.GetPatientByIdentif).toHaveBeenCalledWith("1022221924");
                expect(doctorRes).toEqual(doctor);
                expect(patientRes).toEqual(paciente);

                const CitaReq:newCita = {horario:"08:30am",identif_paciente:patientRes.identif, id_doctor:doctorRes.id_doctor};
                (CitaRepo.createAppointment as jest.Mock).mockResolvedValue(Cita);
                const result = await CitaServ.createAppointment(CitaReq);
                expect(CitaRepo.createAppointment).toHaveBeenCalledWith(CitaReq);
                expect(result).toEqual(Cita);
             
        });

        it("Debe retornar un error si falla la creación de la Cita",async () => {
            const error = new Error("Error al crear nueva Cita");
            const CitaReq:newCita = { horario:"08:30am", identif_paciente:"1022221924", id_doctor:5};                
            (CitaRepo.createAppointment as jest.Mock).mockRejectedValue(error);
            
            await expect(CitaServ.createAppointment(CitaReq)).rejects.toThrowError(error.message);
            expect(CitaRepo.createAppointment).toHaveBeenCalledWith(CitaReq);      
        })
    })

    //Probar el servicio de consultar por Id
    describe('GetAppointmentById', ()=>{
        it("Consulta la info de una cita especifico por su Id", async()=>{
            const Cita: Cita =  {horario:"08:30am", nombre_doctor:"Eduardo Sarmiento", especialidad:'Psicologia', nombre_paciente:"Matias Hernandez", consultorio:701, identif_paciente:"1022221924", created_at:undefined, updated_at:undefined};
            const doctor: Doctor =  {id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
            const paciente: Paciente = {id_paciente:2, nombre:'Matias', apellido:'Hernandez', identif:'1022221924'};
           
            (pacienteRepo.GetPatientByIdentif as jest.Mock).mockResolvedValue(paciente);
            (doctorRepo.GetDoctorById as jest.Mock).mockResolvedValue(doctor);
            const doctorRes = await doctorRepo.GetDoctorById(4);
            const patientRes = await pacienteRepo.GetPatientByIdentif("1022221924");
            expect(doctorRepo.GetDoctorById).toHaveBeenCalledWith(4);
            expect(pacienteRepo.GetPatientByIdentif).toHaveBeenCalledWith("1022221924");
            expect(doctorRes).toEqual(doctor);
            expect(patientRes).toEqual(paciente);
            
            (CitaRepo.GetAppointmentById as jest.Mock).mockResolvedValue(Cita);
            const result = await CitaServ.GetAppointmentById(2);

            expect(CitaRepo.GetAppointmentById).toHaveBeenCalledWith(2);
            expect(result).toEqual(Cita); 
        });

        it("Debe retornar un error si no encuentra el Id", async () => {
            const error = new Error("Error al consultar la cita especificada");
            (CitaRepo.GetAppointmentById as jest.Mock).mockRejectedValue(error);
            await expect(CitaServ.GetAppointmentById(2)).rejects.toThrowError(error.message);
            expect(CitaRepo.GetAppointmentById).toHaveBeenCalledWith(2);
        });

        it("Debe retornar un valor nulo si encuentra el Id definido como null", async () => {
            const doctor: Doctor =  {id_doctor:4, nombre:'Eduardo', apellido:'Sarmiento', especialidad:'Psicologia', consultorio: 701, correo:'edu_sarmiento523@hotmail.com'};
            const paciente: Paciente = {id_paciente:2, nombre:'Matias', apellido:'Hernandez', identif:'1022221924'};
            (doctorRepo.GetDoctorById as jest.Mock).mockResolvedValue(doctor);
            (pacienteRepo.GetPatientByIdentif as jest.Mock).mockResolvedValue(paciente);

            const doctorRes = await doctorRepo.GetDoctorById(4);
            const patientRes = await pacienteRepo.GetPatientByIdentif("1022221924");
            expect(doctorRepo.GetDoctorById).toHaveBeenCalledWith(4);
            expect(pacienteRepo.GetPatientByIdentif).toHaveBeenCalledWith("1022221924");
            expect(doctorRes).toEqual(doctor);
            expect(patientRes).toEqual(paciente);
            
            (CitaRepo.GetAppointmentById as jest.Mock).mockResolvedValue(null);
            const result = await CitaServ.GetAppointmentById(2);
            expect(CitaRepo.GetAppointmentById).toHaveBeenCalledWith(2);
            expect(result).toBeNull();
        });
    })

})