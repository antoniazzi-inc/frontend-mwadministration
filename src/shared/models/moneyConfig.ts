/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

import Store from '../../store/index'
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
    //this.decimal = this.decimal ? this.decimal : ','
    //this.thousands = this.thousands ? this.thousands : '.'
    this.decimal = ','
    this.thousands = '.'
    //this.prefix = this.prefix ? this.prefix : Store.state.currency
    //this.prefix = Store.state.currency + ' '
    //this.suffix = this.suffix ? this.suffix : ''
    //this.suffix = ''
    this.precision = this.precision && this.precision > 0 ? this.precision : 2
    this.masked = this.masked ? this.masked : false
  }
}
