import winston from 'winston'

const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf} = format;
const Localtimezone = ()=>{return new Date().toLocaleString()};
const myformat = printf(({level, timestamp, label, message}:{level:string, timestamp:Date, label:string, message:string})=>{
    return `Categoria: ${level}, Hora de evento:${timestamp}, tag:${label}, mensaje:${message}`;
});

const logger = createLogger(
    {
        level:'info',
        format:combine(
            label({label:"Log de evento"}),
            timestamp({format:Localtimezone}),
            myformat
        ),
        transports:[
            new transports.Console(),
            new transports.File({filename: 'logs/requests.log'}),
            new transports.File({filename: 'logs/error.log', level:'error'}),
        ]
    }
);

export default logger;