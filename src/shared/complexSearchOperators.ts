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
  { id: '==', labelValue: '=', label: i18n.tc('labels.equals') },
  { id: '<=', labelValue: '<=', label: i18n.tc('labels.smallerOrEqual') },
  { id: '>', labelValue: '>', label: i18n.tc('labels.bigger') }
]
export const numberOperators = [
  { id: '==', labelValue: '=', label: i18n.tc('labels.equals') },
  { id: '!=', labelValue: '!=', label: i18n.tc('labels.notEqual') },
  { id: '<', labelValue: '<', label: i18n.tc('labels.smaller') },
  { id: '<=', labelValue: '<=', label: i18n.tc('labels.smallerOrEqual') },
  { id: '>', labelValue: '>', label: i18n.tc('labels.bigger') },
  { id: '>=', labelValue: '>=', label: i18n.tc('labels.biggerOrEqual') }
]
export const dateOperators = [
  { id: '<', labelValue: '<', label: i18n.tc('labels.smaller') },
  { id: '<=', labelValue: '<=', label: i18n.tc('labels.smallerOrEqual') },
  { id: '>', labelValue: '>', label: i18n.tc('labels.bigger') },
  { id: '>=', labelValue: '>=', label: i18n.tc('labels.biggerOrEqual') }
]
export const textOperators = [
  { id: '==', labelValue: 'equals', label: i18n.tc('labels.equals') },
  { id: '==*{k}*', labelValue: 'contains', label: i18n.tc('labels.contains') },
  { id: '!=*{k}*', labelValue: 'notcontains', label: i18n.tc('labels.notContains') },
  { id: '=null=true', labelValue: 'empty', label: i18n.tc('labels.empty') },
  { id: '=null=false', labelValue: 'notempty', label: i18n.tc('labels.notEmpty') },
  { id: '==*{k}', labelValue: 'begins', label: i18n.tc('labels.begins') },
  { id: '=={k}*', labelValue: 'ends', label: i18n.tc('labels.ends') }
]
export const tagOperators = [
  { id: '=in=({k})', labelValue: 'has', label: i18n.tc('labels.has') },
  { id: '=out=({k})', labelValue: 'hasnot', label: i18n.tc('labels.hasNot') }
]
export const equalOperators = [
  { id: '==', labelValue: 'equals', label: i18n.tc('labels.equals') },
  { id: '!=', labelValue: 'notequals', label: i18n.tc('labels.notEquals') }
]
export const orderOperators = [
  { id: '==', labelValue: 'ordered', label: i18n.tc('labels.ordered') },
  { id: '<', labelValue: 'orderedbefore', label: i18n.tc('labels.orderedBefore') },
  { id: '>', labelValue: 'orderedafter', label: i18n.tc('labels.orderedAfter') }
]
export const courseOperators = [
  { id: '==', labelValue: 'appliedfor', label: i18n.tc('labels.appliedFor') },
  { id: '<', labelValue: 'not_appliedfor', label: i18n.tc('labels.notAppliedFor') },
  { id: '>', labelValue: 'started_before', label: i18n.tc('labels.startedBefore') },
  { id: '>', labelValue: 'started_after', label: i18n.tc('labels.startedAfter') }
]
export const listmgrOperators = [
  { id: '==', labelValue: 'started', label: i18n.tc('labels.started') },
  { id: '<', labelValue: 'startedbefore', label: i18n.tc('labels.startedBefore') },
  { id: '>', labelValue: 'startedafter', label: i18n.tc('labels.startedAfter') },
  { id: '==', labelValue: 'stopped', label: i18n.tc('labels.stopped') },
  { id: '<', labelValue: 'stoppedbefore', label: i18n.tc('labels.stoppedBefore') },
  { id: '>', labelValue: 'stoppedafter', label: i18n.tc('labels.stoppedAfter') }
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
  { id: '==', labelValue: 'wflstarted', label: i18n.tc('labels.wflstarted') },
  { id: '==', labelValue: 'wflnotstarted', label: i18n.tc('labels.wflnotstarted') },
  { id: '???', labelValue: 'wflended', label: i18n.tc('labels.wflended') },
  { id: '???', labelValue: 'wflpaststep', label: i18n.tc('labels.wflpaststep') },
  { id: '???', labelValue: 'wflrunning', label: i18n.tc('labels.wflrunning') }
]
export const yesnoOperators = [
  { id: '=null=false', labelValue: 'true', label: i18n.tc('labels.yes') },
  { id: '=null=true', labelValue: 'false', label: i18n.tc('labels.no') }
]
export const genderOperators = [
  { id: '==', labelValue: 'M', label: i18n.tc('labels.male') },
  { id: '==', labelValue: 'F', label: i18n.tc('labels.female') },
  { id: '==', labelValue: '-', label: i18n.tc('labels.unspecified') }
]
export const groupOperators = [
  { id: '==', labelValue: 'member', label: i18n.tc('labels.member') },
  { id: '!=', labelValue: 'notmember', label: i18n.tc('labels.notmember') },
  { id: '=out=({k})', labelValue: 'exclude', label: i18n.tc('labels.exclude') }
]

/* Example of Rule object for complex search */
const ruleFullExample = {
  id: '',
  label: '',
  conditions: [
    {
      id: '',
      label: '',
      value: null,
      outputElement: { type: '', options: [] },
      operator: { id: '', type: '', options: [], secondLvlOperatorCondition: null },
      secondLvlCondition: {
        id: '',
        outputElement: {
          type: '',
          options: []
        }
      },
      searchQuery: '',
      description: ''
    }
  ],
  operator: {
    id: '',
    type: '',
    options: [],
    secondLvlOperatorCondition: {
      id: '',
      outputElement: {
        type: '',
        options: []
      }
    }
  },
  outputElement: {
    type: '',
    options: []
  }
}
