import axios from "axios";
import {GET_VERSION} from './endpoints'

export default class VersionService {
    async getVersionRequest(id){
        return new Promise(async (resolve, reject) => {
            const url = GET_VERSION(id);
            try{
                const response = await axios.get(url);
                resolve(response);
            } catch(error){
                reject(new Error('Ocorreu um erro ao recuperar marcas'))
            }
        })
    }
}