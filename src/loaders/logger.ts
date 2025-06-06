import winston from 'winston'
import config from '../config'

const transports: winston.transport[] = []

// if (process.env.NODE_ENV !== 'development') {
//   transports.push(new winston.transports.Console())
// } else {
//   transports.push(
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.cli(),
//         winston.format.splat()
//       ),
//     })
//   )
// }

transports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.cli(),
      winston.format.splat()
    ),
  })
)

const Logger = winston.createLogger({
  level: config.logs.level || 'silly',
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),

    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
})

export default Logger
