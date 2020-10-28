import axios from "axios";
import {GET_MAKE} from './endpoints'

export default class MakeService {
    async getMakeRequest(){
        return new Promise(async (resolve, reject) => {
            const url = GET_MAKE();
            try{
                const response = await axios.get(url);
                resolve(response);
            } catch(error){
                reject(new Error('Ocorreu um erro ao recuperar marcas'))
            }
        })
    }
}