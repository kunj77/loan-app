import http from "./http-common";

class AccountingProviderService {
  getAllProviders() {
    return http.get("/accountingProvider/all");
  }
  getBalanceSheet(companyTaxId: number) {
    return http.get(`/accountingProvider/balance-sheet/${companyTaxId}`);
  }
}

export default new AccountingProviderService();