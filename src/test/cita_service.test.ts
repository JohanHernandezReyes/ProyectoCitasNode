import { Cita, newCita } from "../api/components/citas/model";
import { citaRepository } from "../api/components/citas/repository";
import { CitaServiceImp } from "../api/components/citas/services";


describe('CitaService', ()=>{
    let CitaServ:CitaServiceImp;
    let CitaRepo:citaRepository;
    beforeEach(() =>{
        CitaRepo = {
            queryAppointments:jest.fn(),
            createAppointment:jest.fn(),
            GetAppointmentById:jest.fn()
        },
        CitaServ = new CitaServiceImp(CitaRepo);
    })

    //Probar el servicio de listar
    describe('queryAppointments', ()=>{
        it("Debe obtener los datos de todos los doctores", async()=>{
                const Citas: Cita[] =[
                    {id_cita:1, horario:"07:30am", identif_paciente:"39537569", id_doctor:4, especialidad:'Psicologia'},
                    {id_cita:2, horario:"08:30am", identif_paciente:"1022221924", id_doctor:5, especialidad:'Pediatria'}
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
                const Cita: Cita = {id_cita:2, horario:"08:30am", identif_paciente:"1022221924", id_doctor:5, especialidad:'Pediatria'};
                //simular el resultado esperado
                const CitaReq:newCita = {horario:"08:30am", identif_paciente:"1022221924", id_doctor:5, especialidad:'Pediatria'};
                (CitaRepo.createAppointment as jest.Mock).mockResolvedValue(Cita);
                const result = await CitaServ.createAppointment(CitaReq);

                expect(CitaRepo.createAppointment).toHaveBeenCalledWith(CitaReq);
                expect(result).toEqual(Cita);
             
        });

        it("Debe retornar un status 400 si falla la creación de la Cita",async () => {
            const error = new Error("Error al crear nueva Cita");
            const CitaReq:newCita = { horario:"08:30am", identif_paciente:"1022221924", id_doctor:5, especialidad:'Pediatria'};                
            (CitaRepo.createAppointment as jest.Mock).mockRejectedValue(error);
            
            await expect(CitaServ.createAppointment(CitaReq)).rejects.toThrowError(error);
            expect(CitaRepo.createAppointment).toHaveBeenCalledWith(CitaReq);      
        })
    })

    //Probar el servicio de consultar por Id
    describe('GetAppointmentById', ()=>{
        it("Consulta la info de una cita especifico por su Id", async()=>{
            const Cita: Cita =  {id_cita:2, horario:"08:30am", identif_paciente:"1022221924", id_doctor:5, especialidad:'Pediatria'};
            (CitaRepo.GetAppointmentById as jest.Mock).mockResolvedValue(Cita);
            const result = await CitaServ.GetAppointmentById(2);

            expect(CitaRepo.GetAppointmentById).toHaveBeenCalledWith(2);
            expect(result).toEqual(Cita); 
        });

        it("Debe retornar un status 400 si no encuentra el Id", async () => {
            const error = new Error("Error al consultar la cita especificada");
            (CitaRepo.GetAppointmentById as jest.Mock).mockRejectedValue(error);
            await expect(CitaServ.GetAppointmentById(2)).rejects.toThrowError(error);
            expect(CitaRepo.GetAppointmentById).toHaveBeenCalledWith(2);
        });

        it("Debe retornar un valor nulo si encuentra el Id definido como null", async () => {
            (CitaRepo.GetAppointmentById as jest.Mock).mockResolvedValue(null);
            const result = await CitaServ.GetAppointmentById(2);
            expect(CitaRepo.GetAppointmentById).toHaveBeenCalledWith(2);
            expect(result).toBeNull();
        });
    })

})