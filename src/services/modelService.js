import axios from "axios";
import {GET_MODEL} from './endpoints'

export default class ModelService {
    async getModelRequest(id){
        return new Promise(async (resolve, reject) => {
            const url = GET_MODEL(id);
            debugger;
            try{
                const response = await axios.get(url);
                resolve(response);
            } catch(error){
                reject(new Error('Ocorreu um erro ao recuperar marcas'))
            }
        })
    }
}