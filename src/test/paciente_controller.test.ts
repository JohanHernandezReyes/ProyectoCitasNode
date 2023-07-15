import { Paciente, newPaciente } from '../api/components/pacientes/model';
import { PatientService } from '../api/components/pacientes/services';
import { PatientContr, PatientController } from './../api/components/pacientes/controller';
import {Request, Response} from 'express';


//Mocking Express Request y Response
const mockreq = {} as Request;
const mockres = {} as Response;

//conexión  al service sin instanciar el repositorio
describe('PatientContr', ()=>{
    let PatientServ:PatientService;
    let PatientCont:PatientController;
    beforeEach(() =>{
        PatientServ = {
            getAllPatients:jest.fn(),
            createPatient:jest.fn()
        },
        PatientCont = new PatientContr(PatientServ);
        mockres.status = jest.fn().mockReturnThis();
        mockres.json = jest.fn().mockReturnThis();
    })

    //Probar el controlador de la funcion listar
    describe('getAllPatients', ()=>{
        it("Debe obtener los datos de todos los pacientes", async()=>{
                const pacientes: Paciente[] =[
                    {id_paciente:1, nombre:'Ana', apellido:'Reyes', identif:'39537569', telefono:3144756032},
                    {id_paciente:2, nombre:'Matias', apellido:'Hernandez', identif:'1022221924'}
                ];
                //simular el resultado esperado
                (PatientServ.getAllPatients as jest.Mock).mockResolvedValue(pacientes);
                await PatientCont.getAllPatients(mockreq, mockres);

                expect(PatientServ.getAllPatients).toHaveBeenCalled();
                expect(mockres.json).toHaveBeenCalledWith(pacientes);
                expect(mockres.status).toHaveBeenCalledWith(200);
        });

        it("Debe manejar el error y retornar un status 400",async () => {
            const error = new Error("Error consultando la lista de doctores");
            (PatientServ.getAllPatients as jest.Mock).mockRejectedValue(error);
            await PatientCont.getAllPatients(mockreq, mockres);

            expect(PatientServ.getAllPatients).toHaveBeenCalled();
            expect(mockres.json).toHaveBeenCalledWith({message:error});
            expect(mockres.status).toHaveBeenCalledWith(400);
                
        })
    })

    //Probar el controlador de la funcion crear
    describe('createPatient', ()=>{
        it("Realiza la creación de un nuevo paciente", async()=>{
                const paciente: Paciente = {id_paciente:1, nombre:'Ana', apellido:'Reyes', identif:'39537569', telefono:3144756032};
                //simular el resultado esperado
                const pacienteReq:newPaciente = { nombre:'Ana', apellido:'Reyes', identif:'39537569', telefono:3144756032};
                (mockreq.body as newPaciente) =  pacienteReq;
                (PatientServ.createPatient as jest.Mock).mockResolvedValue(paciente);
                await PatientCont.createPatient(mockreq, mockres);

                expect(PatientServ.createPatient).toHaveBeenCalledWith(pacienteReq);
                expect(mockres.json).toHaveBeenCalledWith(paciente);
                expect(mockres.status).toHaveBeenCalledWith(201);
        });

        it("Debe manejar el error y retornar un status 400",async () => {
            const error = new Error("Error al crear nuevo paciente");
            (mockreq.body) = {};
            (PatientServ.createPatient as jest.Mock).mockRejectedValue(error);
            await PatientCont.createPatient(mockreq, mockres);

            expect(PatientServ.createPatient).toHaveBeenCalledWith({});
            expect(mockres.json).toHaveBeenCalledWith({message:error});
            expect(mockres.status).toHaveBeenCalledWith(400);
                
        })
    })
})