import { allowOrigin, checkMethod, pagopar } from './lib'

exports.handler = async ({ httpMethod, body }) => {
  try {
    const notAllowed = checkMethod(httpMethod, 'POST', 'content-type')
    if (notAllowed) return notAllowed

    const { status, data } = await pagopar.payment.create(body)

    return {
      statusCode : status,
      body: JSON.stringify(data),
      headers: { 'Access-Control-Allow-Origin': allowOrigin }
    }
  
  } catch (error) {
    console.log(error)
  }
}

// const payload = {
//   comprador: {
//     ruc: "4247903-7",
//     email: "fernandogoetz@gmail.com",
//     nombre: "Rudolph Goetz",
//     telefono: "0972200046",
//     direccion: "roque centurion miranda 1625",
//     ciudad: "1",
//     documento: "4247903",
//     coordenadas: "",
//     razon_social: "Rudolph Goetz",
//     tipo_documento: "CI",
//     direccion_referencia: null
//   },
//   public_key: process.env.PAGOPAR_PUBLIC,
//   monto_total: 134749,
//   tipo_pedido: "VENTA-COMERCIO",
//   compras_items: [
//     {
//       public_key: process.env.PAGOPAR_PUBLIC,
//       ciudad: "1",
//       nombre: "test nombre",
//       cantidad: 1,
//       categoria: "2165",
//       url_imagen: "https://test.com/test.jpg",
//       descripcion: "test description",
//       id_producto: 101,
//       precio_total: 134749,
//       vendedor_telefono: "0972200046",
//       vendedor_direccion: "",
//       vendedor_direccion_referencia: "",
//       vendedor_direccion_coordenadas: "",
//       peso: "13.00",
//       largo: "64.00",
//       ancho: "34.00",
//       alto: "34.00",
//       opciones_envio: {
//         metodo_aex: {
//           costo: "34749",
//           tiempo_entrega: "24"
//         }
//       }
//     }
//   ],
//   fecha_maxima_pago: "2020-01-04 14:14:48",
//   id_pedido_comercio: "1134",
//   descripcion_resumen: ""
// }
