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

import { Moment } from 'moment'

import { IHelpCategory } from './help-category.model'
import { IHelpTag } from './help-tag.model'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ILanguage } from '@/shared/models/language.model'
import { HelpContentLanguage } from '@/shared/models/administrationms/help-content-language.model'

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
