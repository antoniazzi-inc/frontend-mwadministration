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
