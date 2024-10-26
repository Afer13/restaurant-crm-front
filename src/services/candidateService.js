import axios from "axios";
import { URL } from "../static/URL";


const token = JSON.parse(localStorage.getItem("userData"))?.jwtToken;

const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
}



export class CandidateService {

    save (value){
        return axios.post( URL+"/api/candidates/save", value, config)
    }

    getAll(page, firstNameOrPhoneNumber, rowsPerPage){
        const encodedFirstNameOrPhoneNumber = encodeURIComponent(firstNameOrPhoneNumber);
    
        
        return axios.get(URL+"/api/candidates/getAll?pageNumber=" +page + "&firstNameOrPhoneNumber=" + encodedFirstNameOrPhoneNumber + "&rowsPerPage=" + rowsPerPage + "&sortDirection=asc&sortProperty=id", config)
    }

    getCount(){
        return axios.get(URL+"/api/candidates/getCount", config)
    }

    findByFirstNameContainsIgnoreCase(firstName){
        const encodedFirstName = encodeURIComponent(firstName);
        return axios.get(URL+"/api/candidates/findByFirstNameContainsIgnoreCase?firstNameOrPhoneNumber="+encodedFirstName, config)
    }

    findByCandidateId(candidateId){
        return axios.get(URL + "/api/candidates/findByCandidateId?candidateId=" + candidateId);
    }

    updateCashback(value){
        return axios.put(URL + "/api/candidates/updateCashback", value, config)
    }

    findById(id){
        return axios.get(URL + "/api/candidates/findById?id=" + id, config)
    }

    update(data){
        return axios.put(URL + "/api/candidates/update", data, config)
    }

    findByOrderIsNullAndFullNameContainsIgnoreCase(firstName, pageNumber, rowsPerPage){
        const encodedFirstName = encodeURIComponent(firstName);
        return axios(URL + "/api/candidates/findByOrderIsNullAndFullNameContainsIgnoreCase?pageNumber=" + pageNumber + "&firstName=" + encodedFirstName + "&rowsPerPage=" + rowsPerPage + "&sortDirection=asc&sortProperty=id", config)
    }

    findByOrderIsNotNullAndFullNameContainsIgnoreCase(firstName, pageNumber, rowsPerPage){
        const encodedFirstName = encodeURIComponent(firstName);
        return axios.get(URL + "/api/candidates/findByOrderIsNotNullAndFullNameContainsIgnoreCase?pageNumber=" + pageNumber + "&firstName=" + encodedFirstName + "&rowsPerPage=" + rowsPerPage + "&sortDirection=asc&sortProperty=id", config)
    }

    countCandidatesByOrderIsNotNull(){
        return axios.get(URL + "/api/candidates/countCandidatesByOrderIsNotNull", config)
    }

    countCandidatesByOrderIsNull(){
        return axios.get(URL + "/api/candidates/countCandidatesByOrderIsNull", config)
    }

    countAllCandidate(){
        return axios.get(URL + "/api/candidates/countAllCandidates", config)
    }
    filterByFoodDepartment(data){
        return axios.post(URL + "/api/candidates/filterByFoodDepartment", data, config)
    }
}