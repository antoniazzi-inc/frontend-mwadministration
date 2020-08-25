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
