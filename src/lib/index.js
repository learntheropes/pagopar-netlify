import dotenv from 'dotenv'
dotenv.config()
import { Pagopar } from './pagopar'

export const allowOrigin = (process.env.URL) ? '*' : 'http://localhost:3000'

export const returnError = (message) => {
  return {
    statusCode : 400,
    body: JSON.stringify({ error: message }),
    headers: { 'Access-Control-Allow-Origin': allowOrigin }
  }
}

export const checkMethod = (httpMethod, method, allowedHeaders) => {
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Headers': allowedHeaders || '',
        'Access-Control-Allow-Methods': method
      }
    }
  }
  else if (httpMethod !== method && httpMethod !== 'OPTIONS') {
    return {
      statusCode : 405,
      body: 'Method Not Allowed',
      headers: {
        'Access-Control-Allow-Origin': allowOrigin,
        'Allow': method
      }
    }
  }
  else return null
}

export const pagopar = new Pagopar({
  privateKey: process.env.PAGOPAR_PRIVATE,
  publicKey: process.env.PAGOPAR_PUBLIC
})
