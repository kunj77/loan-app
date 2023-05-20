import { LoginData, User, Loan } from "../typings";
import http from "./http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id: string) {
    return http.get(`/users/${id}`);
  }

  create(data: User) {
    return http.post("/users/create", data);
  }

  login(data: LoginData) {
    return http.post("/users/login", data);
  }

  getLoans(userId: string) {
    return http.get(`/users/${userId}/loans`);
  }

  getLoan(userId: string, loanId: string) {
    return http.get(`/users/${userId}/loans/${loanId}`);
  }

  initiateLoan(id: string) {
    return http.post(`/users/${id}/loans`);
  }

  submitLoan(id: string, data: {loanData: Loan, balanceSheet: any[]}, loanId: string) {
    if(loanId === null) {
      return http.post(`/users/${id}/loans`, data);
    } else {
      return http.post(`/users/${id}/loans/${loanId}`, data);
    }
  }
}

export default new UserDataService();