import axios from "axios";
import { URL } from "../static/URL";
import { ImRadioChecked } from "react-icons/im";

const token = JSON.parse(localStorage.getItem("userData"))?.jwtToken;

const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
}

export class InnerGroupExpenseService{
    save(data){
        return axios.post(URL + "/api/innerGroupExpenses/save",data ,config)
    }

    findAllByGroupId(id, pageNumber){
        return axios.get(URL + "/api/innerGroupExpenses/findAllByInnerGroupId?innerGroupId="+ id + "&pageNumber=" + pageNumber, config)
    }

    findAllInnerGroupExpenses(){
        return axios.get(URL + "/api/innerGroupExpenses/findAllInnerGroupExpenses", config)
    }

    findAll(pageNumber){
        return axios.get(URL + "/api/innerGroupExpenses/findAll?pageNumber="+ pageNumber, config)
    }
    
    update(id, groupId){
        return axios.get(URL + "/api/innerGroupExpenses/update?id=" + id + "&groupId=" + groupId, config)
    }

    getAll(){
        return axios.get(URL + "/api/innerGroupExpenses/getAll",config)
    }

    updateInnerGroupExpense(data){
        return axios.put(URL + "/api/innerGroupExpenses/updateInnerGroupExpense", data, config)
    }

}