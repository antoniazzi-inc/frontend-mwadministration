import { IBaseEntity } from './baseModel';

export interface ILocalTime extends IBaseEntity {
    hour?: number;
    minute?: number;
    second?: number;
    nano?: number;
}

export class LocalTime implements ILocalTime {
constructor(
    public hour?: number,
    public minute?: number,
    public second?: number,
    public nano?: number,
  ){
  }
};
