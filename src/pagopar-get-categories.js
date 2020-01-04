import { allowOrigin, checkMethod, pagopar} from './lib'

exports.handler = async ({ httpMethod }) => {
  try {
    const notAllowed = checkMethod(httpMethod, 'GET')
    if (notAllowed) return notAllowed

    const { status, data } = await pagopar.categories.get()

    return {
      statusCode : status,
      body: JSON.stringify(data),
      headers: { 'Access-Control-Allow-Origin': allowOrigin }
    }
  
  } catch (error) {
    console.log(error)
  }
}