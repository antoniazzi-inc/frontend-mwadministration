import { ICompany } from './company.model'
import { Moment } from 'moment'
export interface IBusiness {
    id?: number;
    administrationId?: number;
    name?: string;
    description?: string;
    website?: string;
    createdOn?: Moment;
    updatedOn?: Moment;
    version?: number;
    companies?: ICompany[];
}

export class Business implements IBusiness {
  constructor (
        public id?: number,
        public administrationId?: number,
        public name?: string,
        public description?: string,
        public website?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public companies?: ICompany[]
  ) {}
}
