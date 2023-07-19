# ProyectoCitasNode
_______

**Acerca del proyecto:**
Proyecto elaborado como parte del desarrollo del curso BackEnd Intermedio, impartido por la Universidad Disstrital, como operador del programa Todos a la U. 

**Lenguaje, frameworks y librerias utilizadas:**
* Se codificó en lenguaje de programación _Typescript_ utilizando el framework _Express_.
* Se realiza la conexión a una base de datos de _PostgresSQL_ a través de _knex_.
* Cuenta con logs de eventos, personalizados con _Winston Logger_.
* Se incluye test unitarios mediante _Jest_.
* Se incluye validación de datos de creación mediante _Joi_.
  
**Servicios**:
El proyecto incluye la lógica de BackEnd para los siguientes servicios:
* Crear, consultar, modificar y eliminar doctores 
* Crear, consultar, modificar y eliminar pacientes
* Crear, consultar, modificar y eliminar las citas agendadas, mostrando al usuario info tanto del doctor como del paciente relacionado
