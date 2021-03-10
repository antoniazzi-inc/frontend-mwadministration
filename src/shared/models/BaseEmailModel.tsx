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

import { IBaseEntity } from './baseModel';

export interface IBaseEmail extends IBaseEntity {
    sendFromName?: string;
    sendToAddress?: string;
    sendFromAddress?: string;
    replyToName?: string;
    replyToAddress?: string;
    subject?: string;
    content?: string;
}

export class BaseEmail implements IBaseEmail {
constructor(
    public sendFromName?: string,
    public sendToAddress?: string,
    public sendFromAddress?: string,
    public replyToName?: string,
    public replyToAddress?: string,
    public subject?: string,
    public content?: string,
  ){
  }
};
