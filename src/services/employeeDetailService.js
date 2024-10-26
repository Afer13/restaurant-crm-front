import axios from "axios";
import { URL } from "../static/URL";

const token = JSON.parse(localStorage.getItem("userData"))?.jwtToken;

const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
}

export class EmployeeDetailService {
    saveEmployee(data){
        return axios.post(URL + "/api/employeeDetails/save", data, config)
    }

    getAll(pageNumber){
        return axios.get(URL + "/api/employeeDetails/getAll?pageNumber=" + pageNumber,config )
    }

    savePhotos(files){
        return axios.post(URL + "/api/employeeIDCardPictures/save", files, config)
    }

    deleteById(id){
        return axios.delete(URL + "/api/employeeDetails/" + id, config)
    }

    getEmployeeDetailById(id){
        return  axios.get(URL + "/api/employeeDetails/" + id, config)
    }

    updateEmployee(data){
        return axios.put(URL + "/api/employeeDetails", data, config)
    }

    findEmployeeDetailByFullNameAndPosition(fullnameAndPosition){    
        return axios.get(URL + "/api/employeeDetails/findEmployeeDetailByFullNameAndPosition?fullNameAndPosition=" + fullnameAndPosition, config)
    }
}