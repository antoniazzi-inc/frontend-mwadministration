import { Moment } from 'moment'
import { IBaseEntity } from '@/shared/models/baseModel'

export interface IRegion extends IBaseEntity{
    name?: string;
    home?: boolean;
    abroad?: boolean;
    insideEu?: boolean;
    outsideEu?: boolean;
    countriesJson?: string;
}

export class Region implements IRegion {
  constructor (
        public id?: number,
        public administrationId?: number,
        public name?: string,
        public home?: boolean,
        public abroad?: boolean,
        public insideEu?: boolean,
        public outsideEu?: boolean,
        public countriesJson?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number
  ) {
    this.home = this.home || false
    this.abroad = this.abroad || false
    this.insideEu = this.insideEu || false
    this.outsideEu = this.outsideEu || false
  }
}
