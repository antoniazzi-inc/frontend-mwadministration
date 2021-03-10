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

import { IBaseEntity } from '../baseModel';

export interface IPayButton extends IBaseEntity {
    emptyCart?: boolean;
    buttonName?: string;
    shoppingCartLanguage?: string;
    fontName?: string;
    fontUrl?: string;
    fontColor?: string;
    fontSize?: number;
    isBold?: boolean;
    isItalic?: boolean;
    backgroundColor?: string;
    borderColor?: string;
    borderThickness?: number;
    borderStyle?: string;
    shadowColor?: string;
    shadowSize?: string;
    width?: number;
    height?: number;
    roundCorners?: number;
    imageUrl?: string;
    imageSettings?: string;
}

export class PayButton implements IPayButton {
constructor(
    public emptyCart?: boolean,
    public buttonName?: string,
    public shoppingCartLanguage?: string,
    public fontName?: string,
    public fontUrl?: string,
    public fontColor?: string,
    public fontSize?: number,
    public isBold?: boolean,
    public isItalic?: boolean,
    public backgroundColor?: string,
    public borderColor?: string,
    public borderThickness?: number,
    public borderStyle?: string,
    public shadowColor?: string,
    public shadowSize?: string,
    public width?: number,
    public height?: number,
    public roundCorners?: number,
    public imageUrl?: string,
    public imageSettings?: string,
  ){
  }
};
