import * as crypto from 'crypto'
import axios from 'axios'
axios.defaults.timeout = 5000
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.baseURL = 'https://api.pagopar.com/api/'
axios.defaults.validateStatus = function (status) {
  return status >= 100 && status < 1000
}

export class Pagopar {
  constructor ({ privateKey, publicKey }) {
    this.privateKey = privateKey
    this.publicKey = publicKey

    this.categories = {
      get: async () => {
        return axios.post('categorias/1.1/traer', {
          token_publico: this.publicKey,
          tipo_pedido: "CATEGORIAS",
          token: crypto.createHash('sha1').update(this.privateKey + 'CATEGORIAS').digest('hex')
        })
      }
    }

    this.cities = {
      get: async () => {
        return axios.post('ciudades/1.1/traer', {
          token_publico: this.publicKey,
          tipo_pedido: "CIUDADES",
          token: crypto.createHash('sha1').update(this.privateKey + 'CIUDADES').digest('hex')
        })

      }
    }

    this.payment = {
      create: async (payload) => {
        payload = JSON.parse(payload)
        payload.token = crypto.createHash('sha1').update(this.privateKey + payload.id_pedido_comercio + payload.monto_total).digest('hex')
        payload.public_key = this.publicKey
        payload.compras_items.forEach(item => {
          item.public_key = this.publicKey
        })
        return axios.post( 'comercios/1.1/iniciar-transaccion', payload)
      }
    }
  }
}
