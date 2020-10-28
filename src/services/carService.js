import axios from "axios";
import {GET_VEHICLES} from './endpoints'

export default class CarService {
    async getCarRequest(number){
        return new Promise(async (resolve, reject) => {
            const url = GET_VEHICLES(number);
            try{
                const response = await axios.get(url);
                resolve(response);
            } catch(error){
                reject(new Error('Ocorreu um erro ao recuperar marcas'))
            }
        })
    }
}