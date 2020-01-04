import { allowOrigin, checkMethod } from './lib'
import axios from 'axios'
import * as crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

exports.handler = async ({ httpMethod }) => {
  try {
    const notAllowed = checkMethod(httpMethod, 'GET')
    if (notAllowed) return notAllowed

    const payload = {
      token_publico: process.env.PAGOPAR_PUBLIC,
      tipo_pedido: "CIUDADES",
      token: crypto.createHash('sha1').update(process.env.PAGOPAR_PRIVATE + 'CIUDADES').digest('hex')
    }

    const {status, data } = await axios.post(
      'https://api.pagopar.com/api/ciudades/1.1/traer',
      payload
    )

    return {
      statusCode : status,
      body: JSON.stringify(data),
      headers: { 'Access-Control-Allow-Origin': allowOrigin }
    }
  
  } catch (error) {
    console.log(error)
  }
}