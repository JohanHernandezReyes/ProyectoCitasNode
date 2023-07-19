import { Paciente, newPaciente } from '../api/components/pacientes/model';
import { PacienteRepository } from '../api/components/pacientes/repository';
import { PatientServiceImp } from './../api/components/pacientes/services';


describe('PatientService', ()=>{
    let PatientServ:PatientServiceImp;
    let PatientRepo:PacienteRepository;
    beforeEach(() =>{
        PatientRepo = {
            queryPatients:jest.fn(),
            createPatient:jest.fn(),
            GetPatientById:jest.fn(),
            GetPatientByIdentif:jest.fn(),
            UpdatePatient:jest.fn(),
            DeletePatient:jest.fn()
        },
        PatientServ = new PatientServiceImp(PatientRepo);
    })

    //Probar el servicio de listar
    describe('queryPatients', ()=>{
        it("Debe obtener los datos de todos los pacientes", async()=>{
                const pacientes: Paciente[] =[
                    {id_paciente:1, nombre:'Ana', apellido:'Reyes', identif:'39537569', telefono:3144756032},
                    {id_paciente:2, nombre:'Matias', apellido:'Hernandez', identif:'1022221924'}
                ];
                //simular el resultado esperado
                (PatientRepo.queryPatients as jest.Mock).mockResolvedValue(pacientes);
                const result = await PatientServ.getAllPatients();

                expect(PatientRepo.queryPatients).toHaveBeenCalled();
                expect(result).toEqual(pacientes);
             
        });

        it("Debe retornar un array vacío cuando no encuentra pacientes",async () => {
            (PatientRepo.queryPatients as jest.Mock).mockResolvedValue([]);
            const result = await PatientServ.getAllPatients();

            expect(PatientRepo.queryPatients).toHaveBeenCalled();
            expect(result).toEqual([]);
                
        })
    })

    //Probar el servicio de crear
    describe('createPatient', ()=>{
        it("Realiza la creación de un nuevo paciente", async()=>{
                const paciente: Paciente = {id_paciente:2, nombre:'Matias', apellido:'Hernandez', identif:'1022221924'};
                //simular el resultado esperado
                const pacienteReq:newPaciente = {nombre:'Matias', apellido:'Hernandez', identif:'1022221924'};
                (PatientRepo.createPatient as jest.Mock).mockResolvedValue(paciente);
                const result = await PatientServ.createPatient(pacienteReq);

                expect(PatientRepo.createPatient).toHaveBeenCalledWith(pacienteReq);
                expect(result).toEqual(paciente);
             
        });

        it("Debe retornar un error si falla la creación del paciente",async () => {
            const error = new Error("Error al crear nuevo paciente");
            const pacienteReq:newPaciente = {nombre:'Matias', apellido:'Hernandez', identif:'1022221924'};                
            (PatientRepo.createPatient as jest.Mock).mockRejectedValue(error);

            await expect(PatientServ.createPatient(pacienteReq)).rejects.toThrowError(error);
            expect(PatientRepo.createPatient).toHaveBeenCalledWith(pacienteReq);        
        })
    })

    //Probar el servicio de consultar por Id
    describe('GetPatientById', ()=>{
        it("Consulta la info de un paciente especifico por su Id", async()=>{
            const paciente: Paciente = {id_paciente:2, nombre:'Matias', apellido:'Hernandez', identif:'1022221924'};
            (PatientRepo.GetPatientById as jest.Mock).mockResolvedValue(paciente);
            const result = await PatientServ.GetPatientById(2);

            expect(PatientRepo.GetPatientById).toHaveBeenCalledWith(2);
            expect(result).toEqual(paciente); 
        });

        it("Consulta la info de un paciente especifico por su Identificacion", async()=>{
            const paciente: Paciente = {id_paciente:2, nombre:'Matias', apellido:'Hernandez', identif:'1022221924'};
            (PatientRepo.GetPatientByIdentif as jest.Mock).mockResolvedValue(paciente);
            const result = await PatientRepo.GetPatientByIdentif("1022221924");
            expect(PatientRepo.GetPatientByIdentif).toHaveBeenCalledWith("1022221924");
            expect(result).toEqual(paciente); 
        });

        it("Debe retornar un error si no encuentra el Id", async () => {
            const error = new Error("Error al consultar el paciente especificado");
            (PatientRepo.GetPatientById as jest.Mock).mockRejectedValue(error);
            await expect(PatientServ.GetPatientById(2)).rejects.toThrowError(error);
            expect(PatientRepo.GetPatientById).toHaveBeenCalledWith(2);
        });

        it("Debe retornar un valor nulo si encuentra el Id definido como null", async () => {
            (PatientRepo.GetPatientById as jest.Mock).mockResolvedValue(null);
            const result = await PatientServ.GetPatientById(2);
            expect(PatientRepo.GetPatientById).toHaveBeenCalledWith(2);
            expect(result).toBeNull();
        });
    })

    
    //Probar el servicio de actualizar
    describe('UpdatePatient', ()=>{
        const pacienteupdates:Partial<Paciente> = {telefono: 7809832};
        const paciente: Paciente = {id_paciente:2, nombre:'Matias', apellido:'Hernandez', identif:'1022221924', telefono:undefined};
                
        it("Actualiza la info de un paciente especifico por su Id", async()=>{
                (PatientRepo.GetPatientById as jest.Mock).mockResolvedValue(paciente);
                const Patientbyid = await PatientServ.GetPatientById(4);
                expect(PatientRepo.GetPatientById).toHaveBeenCalledWith(4);
                expect(Patientbyid).not.toBeNull();
                
                const PatientRes: Paciente = {id_paciente:2, nombre:'Matias', apellido:'Hernandez', identif:'1022221924', telefono:7809832};;
                (PatientRepo.UpdatePatient as jest.Mock).mockResolvedValue(paciente);
                const result = await PatientServ.UpdatePatient(4, pacienteupdates);
                expect(PatientRepo.UpdatePatient).toHaveBeenCalledWith(4, pacienteupdates);
                expect({...paciente, ...result}).toEqual(PatientRes);             
        });

        it("Debe retornar un error si falla la actualizacion", async () => {
            (PatientRepo.GetPatientById as jest.Mock).mockResolvedValue(paciente);
            const Patientbyid = await PatientServ.GetPatientById(4);
            expect(PatientRepo.GetPatientById).toHaveBeenCalledWith(4);
            expect(Patientbyid).not.toBeNull();

            const error = new Error("Error actualizando información");
            (PatientRepo.UpdatePatient as jest.Mock).mockRejectedValue(error);
            await (expect(PatientRepo.UpdatePatient(4, pacienteupdates))).rejects.toThrowError(error);
        });
    })

})