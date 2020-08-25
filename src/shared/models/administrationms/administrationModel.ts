import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
import { ICategoryEntity } from '@/shared/models/administrationms/categoryModel'
import { ITagEntity } from '@/shared/models/administrationms/tagModel'
import {
  IAdministrationSettings
} from '@/shared/models/administrationms/administrationSettingsModel'
import { ICountry } from '@/shared/models/administrationms/country.model'
import { IExternalSystem } from '@/shared/models/externalSystem.model'
import { IAdministrationBusiness } from '@/shared/models/administrationms/administration-business.model'
export interface IAdministration extends IBaseEntity{
  name?: string;
  accessCode?: string;
  locked?: boolean;
  useShop?: boolean;
  useAutomation?: boolean;
  trial?: boolean;
  relationsLimit?: number;
  uid?: string;
  validFrom?: Moment;
  validTo?: Moment;
  country?: ICountry;
  administrationSettings?: IAdministrationSettings;
  categories?: ICategoryEntity[];
  tags?: ITagEntity[];
  externalSystems?: IExternalSystem[];
  administrationBusiness?: IAdministrationBusiness;
  langKey?: string;
}

export class AdministrationEntity implements IAdministration {
  constructor (
    public id?: number,
    public administrationId?: number,
    public name?: string,
  public accessCode?: string,
  public locked?: boolean,
  public useShop?: boolean,
  public useAutomation?: boolean,
  public trial?: boolean,
  public relationsLimit?: number,
  public uid?: string,
  public validFrom?: Moment,
  public validTo?: Moment,
  public country?: ICountry,
  public administrationSettings?: IAdministrationSettings,
  public categories?: ICategoryEntity[],
  public tags?: ITagEntity[],
  public externalSystems?: IExternalSystem[],
    public administrationBusiness?: IAdministrationBusiness,
  public langKey?: string
  ) {
    this.locked = this.locked || false
    this.useShop = this.useShop || false
    this.useAutomation = this.useAutomation || false
    this.trial = this.trial || false
    this.relationsLimit = this.relationsLimit || 100000
  }
};
