import express, {Request, Response} from 'express'
import logger from './utils/logger';
import routes from './api/routes'
import {ErrorHandler} from './../middleware/ErrorHandler';

const app = express();
const port = 8025;


//verificación de la conexión
app.listen(port, () =>{
    logger.info ('Server is listening in port '+port);
})

//crear middleware para pasar las solicitudes (bodies) a json
app.use(express.json());


//usar el archivo routes, para enrutar hacia los endpoints
app.use('/api/v1/', routes);

//usar el middleware para manejo de errores generales
app.use(ErrorHandler);


