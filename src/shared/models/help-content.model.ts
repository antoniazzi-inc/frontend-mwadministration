import { Moment } from 'moment'

import { IHelpCategory } from './help-category.model'
import { IHelpTag } from './help-tag.model'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ILanguage } from '@/shared/models/language.model'
import { HelpContentLanguage } from '@/shared/models/help-content-language.model'

export const enum HelpType {
    SCREEN = 'SCREEN',
    FIELD = 'FIELD',
    POPUP = 'POPUP',
    TUTORIAL = 'TUTORIAL',
    WIZARD = 'WIZARD',
    ONBOARDING = 'ONBOARDING',
    BACKGROUND = 'BACKGROUND',
    OTHER = 'OTHER'
}

export interface IHelpContent extends IBaseEntity{
    fieldCode?: string;
    screenCode?: string;
    tabCode?: string;
    popupCode?: string;
    helpType?: HelpType;
    helpContentLanguages?: HelpContentLanguage[];
    categories?: IHelpCategory[];
    tags?: IHelpTag[];
}

export class HelpContent implements IHelpContent {
  constructor (
      public id?: number,
      public administrationId?: number,
        public fieldCode?: string,
        public screenCode?: string,
        public tabCode?: string,
        public popupCode?: string,
        public helpType?: HelpType,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public helpContentLanguages?: HelpContentLanguage[],
        public categories?: IHelpCategory[],
        public tags?: IHelpTag[]
  ) {}
}
