import axios from "axios";
import { URL } from "../static/URL";

const token = JSON.parse(localStorage.getItem("userData"))?.jwtToken;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};



export class OrderService {
  save(value) {
    return axios.post(URL + "/api/orders/save", value, config);
  }

  findByOpenCheckAtIsNotNullOrderByOpenCheck(pageNumber, isEarly) {
    return axios
      .get(
        URL + "/api/orders/findByOpenCheckAtIsNotNullOrderByOpenCheck?pageNumber=" + pageNumber + "&isEarly=" +isEarly,
        config
      );
  }

  findByOpenCheckAtIsNullOrderByOpenCheck(pageNumber, isEarly) {
    return axios
      .get(
        URL + "/api/orders/findByOpenCheckAtIsNullOrderByOpenCheck?pageNumber=" + pageNumber + "&isEarly=" +isEarly,
        config
      );
  }
  updateOrderByCandidateId(value) {
    return axios.put(
        URL + "/api/orders/updateOrderByCandidateId",
      value,
      config
    );
  }

  getCount(){
    return axios.get(URL+"/api/orders/countNullCandidateId", config)
  }

  findByCandidateIdOrderByOpenCheckAtCandidateAsc(id, pageNumber){

    return axios.get(URL+"/api/orders/findByCandidateIdOrderByOpenCheckAtCandidateAsc?id="+id + "&pageNumber=" + pageNumber + "&pageSize=10", config)
  }

  findByCandidateIdOrderByOpenCheckAtCandidateDesc(id, pageNumber){
    return axios.get(URL+"/api/orders/findByCandidateIdOrderByOpenCheckAtCandidateDesc?id="+id + "&pageNumber=" + pageNumber + "&pageSize=10", config)
  }

  getSumAmountsByCandidateId(id){
    return axios.get(URL+"/api/orders/getSumAmountsByCandidateId?id="+ id,config)
  }

  findOrderWithoutCandidateDtoById(id){
    return axios.get(URL + "/api/orders/findOrderWithoutCandidateDtoById?id=" +id, config)
  }

  countByCandidateId(candidateId){
    return axios.get(URL + "/api/orders/countByCandidateId?candidateId=" + candidateId, config)
  }
  updateIsIgnoreToTrue(value){
    return axios.put(URL + "/api/orders/updateIsIgnoreToTrue",value, config)
  }

  findByDocNumberContains(pageNumber, docNumber){


    return axios.get(URL + "/api/orders/findByDocNumberContains?pageNumber="+ pageNumber + "&docNumber=" + docNumber, config)
  }
}
