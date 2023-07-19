
class DoctorGetAllError extends Error{
    constructor(message:string){
        super(message);
        this.name = "DoctorGetAllError";
    }
}

class DoctorCreationError extends Error{
    constructor(message:string){
        super(message);
        this.name = "DoctorCreationError";
    }
}

class PatientGetAllError extends Error{
    constructor(message:string){
        super(message);
        this.name = "PatientGetAllError";
    }
}

class PatientCreationError extends Error{
    constructor(message:string){
        super(message);
        this.name = "PatientCreationError";
    }
}

class AppointmentGetAllError extends Error{
    constructor(message:string){
        super(message);
        this.name = "AppointmentGetAllError";
    }
}

class AppointmentCreationError extends Error{
    constructor(message:string){
        super(message);
        this.name = "AppointmentCreationError";
    }
}


class RecordNotFoundError extends Error{
    constructor(message:string, component_name?:string){
        super(message);
        this.name = "RecordNotFoundError from the entity "+component_name;
    }
}

class UpdateInfoError extends Error{
    constructor(message:string, component_name?:string){
        super(message);
        this.name = "UpdateInfoError in the entity "+component_name;
    }
}

class DeleteInfoError extends Error{
    constructor(message:string, component_name?:string){
        super(message);
        this.name = "DeleteInfoError in the entity "+component_name;
    }
}

export {DoctorGetAllError, 
       DoctorCreationError,
       PatientGetAllError,
       PatientCreationError,
       AppointmentGetAllError,
       AppointmentCreationError,
       RecordNotFoundError,
       UpdateInfoError,
       DeleteInfoError
}
