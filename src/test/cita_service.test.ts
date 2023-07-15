import { Cita, newCita } from "../api/components/citas/model";
import { citaRepository } from "../api/components/citas/repository";
import { CitaServiceImp } from "../api/components/citas/services";


describe('CitaService', ()=>{
    let CitaServ:CitaServiceImp;
    let CitaRepo:citaRepository;
    beforeEach(() =>{
        CitaRepo = {
            queryAppointments:jest.fn(),
            createAppointment:jest.fn()
        },
        CitaServ = new CitaServiceImp(CitaRepo);
    })

    //Probar el servicio de listar
    describe('queryDoctors', ()=>{
        it("Debe obtener los datos de todos los doctores", async()=>{
                const Citas: Cita[] =[
                    {id_cita:1, horario:"07:30am", id_paciente:1, id_doctor:4, especialidad:'Psicologia'},
                    {id_cita:2, horario:"08:30am", id_paciente:2, id_doctor:5, especialidad:'Pediatria'}
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
    describe('createDoctor', ()=>{
        it("Realiza la creación de una nueva cita", async()=>{
                const Cita: Cita = {id_cita:2, horario:"08:30am", id_paciente:2, id_doctor:5, especialidad:'Pediatria'};
                //simular el resultado esperado
                const CitaReq:newCita = {horario:"08:30am", id_paciente:2, id_doctor:5, especialidad:'Pediatria'};
                (CitaRepo.createAppointment as jest.Mock).mockResolvedValue(Cita);
                const result = await CitaServ.createAppointment(CitaReq);

                expect(CitaRepo.createAppointment).toHaveBeenCalledWith(CitaReq);
                expect(result).toEqual(Cita);
             
        });

        /*it("Debe retornar un status 400 si falla la creación de la Cita",async () => {
            const Cita: Cita = {id_cita:2, horario:"08:30am", id_paciente:2, id_doctor:5, especialidad:'Pediatria'};
            const error = new Error("Error al crear nueva Cita");
            const CitaReq:newCita = { horario:"08:30am", id_paciente:2, id_doctor:5, especialidad:'Pediatria'};                
            (CitaRepo.createAppointment as jest.Mock).mockRejectedValue(error);
            const result = await CitaServ.createAppointment(CitaReq);

            expect(CitaRepo.createAppointment).toHaveBeenCalledWith(CitaReq);
            expect(result).rejects.toThrowError();
                
        })*/
    })
})