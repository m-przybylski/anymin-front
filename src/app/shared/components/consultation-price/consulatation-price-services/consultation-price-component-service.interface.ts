export interface IConsultationPriceComponentService {
  getPriceWithoutCommission(value: number): number;
  getMaxValidPriceWithoutCommission(): number;
  getMinGrossValidPrice(): number;
  getNettPrice(value: number): number;
  getGrossPrice(value: number): number;
  getMinValidPriceWithoutCommission(): number;
}
