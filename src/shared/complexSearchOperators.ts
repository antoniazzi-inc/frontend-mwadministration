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

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import * as enTranslations from '@/i18n/en'
import * as deTranslations from '@/i18n/de'
import * as esTranslations from '@/i18n/es'
import * as frTranslations from '@/i18n/fr'
import * as nlTranslations from '@/i18n/nl'

Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages: {
    en: enTranslations,
    de: deTranslations,
    es: esTranslations,
    fr: frTranslations,
    nl: nlTranslations
  }
})
export const pointOperators = [
  { id: '=="{k}"', labelValue: '=', label: i18n.tc('labels.equals') },
  { id: '<="{k}"', labelValue: '<=', label: i18n.tc('labels.smallerOrEqual') },
  { id: '>"{k}"', labelValue: '>', label: i18n.tc('labels.bigger') }
]
export const numberOperators = [
  { id: '=="{k}"', labelValue: '=', label: i18n.tc('labels.equals') },
  { id: '!="{k}"', labelValue: '!=', label: i18n.tc('labels.notEqual') },
  { id: '<"{k}"', labelValue: '<', label: i18n.tc('labels.smaller') },
  { id: '<="{k}"', labelValue: '<=', label: i18n.tc('labels.smallerOrEqual') },
  { id: '>"{k}"', labelValue: '>', label: i18n.tc('labels.bigger') },
  { id: '>="{k}"', labelValue: '>=', label: i18n.tc('labels.biggerOrEqual') }
]
export const dateOperators = [
  { id: '<"{k}"', labelValue: '<', label: i18n.tc('labels.smaller') },
  { id: '<="{k}"', labelValue: '<=', label: i18n.tc('labels.smallerOrEqual') },
  { id: '>"{k}"', labelValue: '>', label: i18n.tc('labels.bigger') },
  { id: '>="{k}"', labelValue: '>=', label: i18n.tc('labels.biggerOrEqual') }
]
export const textOperators = [
  { id: '=="{k}"', labelValue: 'equals', label: i18n.tc('labels.equals') },
  { id: '=="*{k}*"', labelValue: 'contains', label: i18n.tc('labels.contains') },
  { id: '!="*{k}*"', labelValue: 'notcontains', label: i18n.tc('labels.notContains') },
  { id: '=null=true', labelValue: 'empty', label: i18n.tc('labels.empty') },
  { id: '=null=false', labelValue: 'notempty', label: i18n.tc('labels.notEmpty') },
  { id: '=="{k}*"', labelValue: 'begins', label: i18n.tc('labels.begins') },
  { id: '=="*{k}"', labelValue: 'ends', label: i18n.tc('labels.ends') }
]
export const tagOperators = [
  { id: '=in=({k})', labelValue: 'has', label: i18n.tc('labels.has') },
  { id: '=out=({k})', labelValue: 'hasnot', label: i18n.tc('labels.hasNot') }
]
export const equalOperators = [
  { id: '=="{k}"', labelValue: 'equals', label: i18n.tc('labels.equals') },
  { id: '!="{k}"', labelValue: 'notequals', label: i18n.tc('labels.notEquals') }
]
export const orderOperators = [
  { id: '=="{k}"', labelValue: 'ordered', label: i18n.tc('labels.ordered') },
  { id: '<"{k}"', labelValue: 'orderedbefore', label: i18n.tc('labels.orderedBefore') },
  { id: '>"{k}"', labelValue: 'orderedafter', label: i18n.tc('labels.orderedAfter') }
]
export const courseOperators = [
  { id: '=="{k}"', labelValue: 'appliedfor', label: i18n.tc('labels.appliedFor') },
  { id: '<"{k}"', labelValue: 'not_appliedfor', label: i18n.tc('labels.notAppliedFor') },
  { id: '>"{k}"', labelValue: 'started_before', label: i18n.tc('labels.startedBefore') },
  { id: '>"{k}"', labelValue: 'started_after', label: i18n.tc('labels.startedAfter') }
]
export const listmgrOperators = [
  { id: '=="{k}"', labelValue: 'started', label: i18n.tc('labels.started') },
  { id: '<"{k}"', labelValue: 'startedbefore', label: i18n.tc('labels.startedBefore') },
  { id: '>"{k}"', labelValue: 'startedafter', label: i18n.tc('labels.startedAfter') },
  { id: '=="{k}"', labelValue: 'stopped', label: i18n.tc('labels.stopped') },
  { id: '<"{k}"', labelValue: 'stoppedbefore', label: i18n.tc('labels.stoppedBefore') },
  { id: '>"{k}"', labelValue: 'stoppedafter', label: i18n.tc('labels.stoppedAfter') }
]
export const mailingOperators = [
  { id: '???', labelValue: 'sent', label: i18n.tc('labels.sent') },
  { id: '???', labelValue: 'opened', label: i18n.tc('labels.opened') },
  { id: '???', labelValue: 'bounced', label: i18n.tc('labels.bounced') },
  { id: '???', labelValue: 'notsent', label: i18n.tc('labels.notSent') }
]
export const linkOperators = [
  { id: '???', labelValue: 'clicked', label: i18n.tc('labels.clicked') },
  { id: '???', labelValue: 'notclicked', label: i18n.tc('labels.notClicked') },
  { id: '???', labelValue: 'clicked_before', label: i18n.tc('labels.clickedBefore') },
  { id: '???', labelValue: 'clicked_after', label: i18n.tc('labels.clickedAfter') },
  { id: '???', labelValue: 'freeSearch', label: i18n.tc('labels.freeSearch') }
]
export const emailOperators = [
  { id: '???', labelValue: 'sent', label: i18n.tc('labels.sent') },
  { id: '???', labelValue: 'notsent', label: i18n.tc('labels.notSent') },
  { id: '???', labelValue: 'opened', label: i18n.tc('labels.opened') },
  { id: '???', labelValue: 'notopened', label: i18n.tc('labels.notOpened') },
  { id: '???', labelValue: 'bounced', label: i18n.tc('labels.bounced') }
]
export const workflowOperators = [
  { id: '=="{k}"', labelValue: 'wflstarted', label: i18n.tc('labels.wflstarted') },
  { id: '=="{k}"', labelValue: 'wflnotstarted', label: i18n.tc('labels.wflnotstarted') },
  { id: '???', labelValue: 'wflended', label: i18n.tc('labels.wflended') },
  { id: '???', labelValue: 'wflpaststep', label: i18n.tc('labels.wflpaststep') },
  { id: '???', labelValue: 'wflrunning', label: i18n.tc('labels.wflrunning') }
]
export const yesnoOperators = [
  { id: '=null=false', labelValue: 'true', label: i18n.tc('labels.yes') },
  { id: '=null=true', labelValue: 'false', label: i18n.tc('labels.no') }
]
export const genderOperators = [
  { id: '=="{k}"', labelValue: 'M', label: i18n.tc('labels.male') },
  { id: '=="{k}"', labelValue: 'F', label: i18n.tc('labels.female') },
  { id: '=="{k}"', labelValue: '-', label: i18n.tc('labels.unspecified') }
]
export const groupOperators = [
  { id: '=="{k}"', labelValue: 'member', label: i18n.tc('labels.member') },
  { id: '!="{k}"', labelValue: 'notmember', label: i18n.tc('labels.notmember') },
  { id: '=out=({k})', labelValue: 'exclude', label: i18n.tc('labels.exclude') }
]
