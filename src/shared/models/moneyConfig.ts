export interface IMoneyConfig {
  decimal?: string;
  thousands?: string;
  prefix?: string;
  suffix?: string;
  precision?: number;
  masked?: boolean;
}

export class MoneyConfig implements IMoneyConfig {
  constructor (
    public decimal?: string,
    public thousands?: string,
    public prefix?: string,
    public suffix?: string,
    public precision?: number,
    public masked?: boolean
  ) {
    this.decimal = this.decimal ? this.decimal : ','
    this.thousands = this.thousands ? this.thousands : '.'
    this.prefix = this.prefix !== undefined ? this.prefix : '€'
    this.suffix = this.suffix ? this.suffix : ''
    this.precision = this.precision && this.precision >= 0 ? this.precision : 2
    this.masked = this.masked ? this.masked : false
  }
}
