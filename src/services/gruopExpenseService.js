import axios from "axios";
import { URL } from "../static/URL";

const token = JSON.parse(localStorage.getItem("userData"))?.jwtToken;

const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
}

export class GroupExpenseService {
    getAll(pageNumber){
        return axios.get(URL + "/api/groupExpenses/findAll?pageNumber=" + pageNumber, config);
    }
    save(data){
        return axios.post(URL + "/api/groupExpenses/save",data , config);
    }   

    findAll(){
        return axios.get(URL + "/api/groupExpenses/getAll", config)
    }

    update(data) {
        return axios.put(URL + "/api/groupExpenses/update", data, config)
    }

}