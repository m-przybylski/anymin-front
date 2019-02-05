import { GetService, MoneyDto } from '@anymind-ng/api';

export class CallDetails {
  public sueId: string;
  public ratelRoomId?: string;
  public price: MoneyDto;
  public freeSeconds: number;
  public service?: GetService;

  constructor(
    sueId: string,
    ratelRoomId: string | undefined,
    price: MoneyDto,
    freeSeconds: number,
    service?: GetService,
  ) {
    this.sueId = sueId;
    this.ratelRoomId = ratelRoomId;
    this.price = price;
    this.freeSeconds = freeSeconds;
    this.service = service;
  }
}
