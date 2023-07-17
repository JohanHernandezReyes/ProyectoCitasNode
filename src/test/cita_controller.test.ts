import { Cita, newCita } from '../api/components/citas/model';
import { CitaService } from '../api/components/citas/services';
import { AppointmentCreationError, AppointmentGetAllError, RecordNotFoundError } from '../config/customErrors';
import { CitaContr, CitaController } from './../api/components/citas/controller';
import {Request, Response} from 'express';


//Mocking Express Request y Response
const mockreq = {} as Request;
const mockres = {} as Response;

//conexión  al service sin instanciar el repositorio
describe('CitaContr', ()=>{
    let CitaServ:CitaService;
    let CitaCont:CitaController;
    beforeEach(() =>{
        CitaServ = {
            getAllAppointments:jest.fn(),
            createAppointment:jest.fn(),
            GetAppointmentById:jest.fn()
        },
        CitaCont = new CitaContr(CitaServ);
        mockres.status = jest.fn().mockReturnThis();
        mockres.json = jest.fn().mockReturnThis();
    })

    //Probar el controlador de la funcion listar
    describe('getAllAppointments', ()=>{
        it("Debe obtener los datos de todas las citas", async()=>{
                const Citas: Cita[] =[
                    {id_cita:1, horario:"07:30am", identif_paciente:"39537569", id_doctor:4, especialidad:'Psicologia'},
                    {id_cita:2, horario:"08:30am", identif_paciente:"1022221924", id_doctor:5, especialidad:'Pediatria'}
                ];
                //simular el resultado esperado
                (CitaServ.getAllAppointments as jest.Mock).mockResolvedValue(Citas);
                await CitaCont.getAllAppointments(mockreq, mockres);

                expect(CitaServ.getAllAppointments).toHaveBeenCalled();
                expect(mockres.json).toHaveBeenCalledWith(Citas);
                expect(mockres.status).toHaveBeenCalledWith(200);
        });

        it("Debe manejar el error y retornar un status 400",async () => {
            const error = new AppointmentGetAllError("Error consultando la lista de citas");
            (CitaServ.getAllAppointments as jest.Mock).mockRejectedValue(error);
            await CitaCont.getAllAppointments(mockreq, mockres);

            expect(CitaServ.getAllAppointments).toHaveBeenCalled();
            expect(mockres.json).toHaveBeenCalledWith({error_name:error.name, message:error.message});
            expect(mockres.status).toHaveBeenCalledWith(400);
                
        })
    })

    //Probar el controlador de la funcion crear
    describe('createAppointment', ()=>{
        it("Realiza la creación de una nueva cita", async()=>{
                const cita: Cita ={id_cita:1, horario:"07:30am", identif_paciente:"39537569", id_doctor:4, especialidad:'Psicologia'};
                //simular el resultado esperado
                const citaReq:newCita = {horario:"07:30am", identif_paciente:"39537569", id_doctor:4, especialidad:'Psicologia'};                
                (mockreq.body as newCita) =  citaReq;
                (CitaServ.createAppointment as jest.Mock).mockResolvedValue(cita);
                await CitaCont.createAppointment(mockreq, mockres);

                expect(CitaServ.createAppointment).toHaveBeenCalledWith(citaReq);
                expect(mockres.json).toHaveBeenCalledWith(cita);
                expect(mockres.status).toHaveBeenCalledWith(201);
        });

        it("Debe manejar el error y retornar un status 400",async () => {
            const error = new AppointmentCreationError("Error al crear nueva cita");
            (mockreq.body) = {};
            (CitaServ.createAppointment as jest.Mock).mockRejectedValue(error);
            await CitaCont.createAppointment(mockreq, mockres);

            expect(CitaServ.createAppointment).toHaveBeenCalledWith({});
            expect(mockres.json).toHaveBeenCalledWith({error_name:error.name, message:error.message});
            expect(mockres.status).toHaveBeenCalledWith(400);      
        })
    })

    //Probar el controlador de la funcion consultar por Id
    describe('GetAppointmentById', ()=>{
        it("Consulta la info de una cita especifica por su Id", async()=>{
                const Cita: Cita =  {id_cita:2, horario:"08:30am", identif_paciente:"1022221924", id_doctor:5, especialidad:'Pediatria'};
                (mockreq.params) = {id:"2"};
                (CitaServ.GetAppointmentById as jest.Mock).mockResolvedValue(Cita);
                await CitaCont.GetAppointmentById(mockreq, mockres);

                expect(CitaServ.GetAppointmentById).toHaveBeenCalledWith(2);
                expect(mockres.json).toHaveBeenCalledWith(Cita);
                expect(mockres.status).toHaveBeenCalledWith(200);
        });

        it("Debe manejar el error y retornar un status 400 si no encuentra el Id",async () => {
            const error = new RecordNotFoundError("Error al consultar la cita especificada");
            (mockreq.params) = {id:"2"};
            (CitaServ.GetAppointmentById as jest.Mock).mockResolvedValue(null);
            (CitaServ.GetAppointmentById as jest.Mock).mockRejectedValue(error);
            await CitaCont.GetAppointmentById(mockreq, mockres);

            expect(CitaServ.GetAppointmentById).toHaveBeenCalledWith(2);
            expect(mockres.json).toHaveBeenCalledWith({error_name:error.name, message:error.message});
            expect(mockres.status).toHaveBeenCalledWith(400);
                
        })
    })
})