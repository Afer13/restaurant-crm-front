import axios from "axios";
import { URL } from "../static/URL";

const token = JSON.parse(localStorage.getItem("userData"))?.jwtToken;

const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
}

export class ExpenseService{
    save(data){
        return axios.post(URL + "/api/expenses/save", data,config)
    }

    findAllByInnerGroupId(id, pageNumber){
        return axios.get(URL + "/api/expenses/findByItemExpenseId?groupId=" + id + "&pageNumber=" + pageNumber,config)
    }

    findAll(pageNumber){
        return axios.get(URL + "/api/expenses/findAll?pageNumber=" + pageNumber, config)
    }

    update(id, innerGroupId){
        return axios.get(URL + "/api/expenses/update?id="+id+"&innerGroupId=" + innerGroupId, config)
    }

    updateExpense(data){
        return axios.put(URL + "/api/expenses/updateExpense", data, config)
    }

    delete(id){
        return axios.delete(URL + "/api/expenses/" + id, config)
    }
}