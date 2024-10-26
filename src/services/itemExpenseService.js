import axios from "axios";
import { URL } from "../static/URL";

const token = JSON.parse(localStorage.getItem("userData"))?.jwtToken;

const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
}

export class ItemExpenseService {
    save(data){
        return axios.post(URL + "/api/itemExpenses",data, config)
    }

    update(data){
        return axios.put(URL + "/api/itemExpenses/update", data, config)
    }

    updateInnerGroup(data){
        return axios.put(URL + "/api/itemExpenses/updateInnerGroup", data, config)
    }

    findAllByItemExpenseName(itemExpenseName){
        return axios.get(URL + "/api/itemExpenses/findAllByItemExpenseName?itemExpenseName=" + itemExpenseName, config)
    }

    getAllByPageNumber(pageNumber){
        return axios.get(URL + "/api/itemExpenses/getAllByPageNumber?pageNumber=" +pageNumber, config)
    }
}