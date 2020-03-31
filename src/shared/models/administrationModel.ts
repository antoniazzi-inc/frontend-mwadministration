import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
import { ICategoryEntity } from '@/shared/models/categoryModel'
import { ITagEntity } from '@/shared/models/tagModel'
import {
  IAdministrationSettings
} from '@/shared/models/administrationSettingsModel'
import { ICountry } from '@/shared/models/country.model'
import { IExternalSystem } from '@/shared/models/externalSystem.model'
export interface IAdministration extends IBaseEntity{
  name?: string;
  accessCode?: string;
  locked?: boolean;
  useShop?: boolean;
  useAutomation?: boolean;
  trial?: boolean;
  relationsLimit?: number;
  validFrom?: Moment;
  validTo?: Moment;
  country?: ICountry;
  administrationSettings?: IAdministrationSettings;
  categories?: ICategoryEntity[];
  tags?: ITagEntity[];
  externalSystems?: ITagEntity[];
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
  public validFrom?: Moment,
  public validTo?: Moment,
  public country?: ICountry,
  public administrationSettings?: IAdministrationSettings,
  public categories?: ICategoryEntity[],
  public tags?: ITagEntity[],
  public externalSystems?: IExternalSystem[],
  public langKey?: string
  ) {
    this.locked = this.locked || false
    this.useShop = this.useShop || false
    this.useAutomation = this.useAutomation || false
    this.trial = this.trial || false
  }
};
