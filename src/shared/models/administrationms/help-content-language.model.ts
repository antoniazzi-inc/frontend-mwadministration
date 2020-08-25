import { IHelpContent } from './help-content.model'
import { IBaseEntity } from '@/shared/models/baseModel'

export interface IHelpContentLanguage extends IBaseEntity{
    langKey?: string;
    name?: string;
    intro?: string;
    content?: any;
    helpContent?: IHelpContent;
}

export class HelpContentLanguage implements IHelpContentLanguage {
  constructor (
      public id?: number,
      public administrationId?: number,
        public langKey?: string,
        public name?: string,
        public intro?: string,
        public content?: any,
        public helpContent?: IHelpContent
  ) {}
}
