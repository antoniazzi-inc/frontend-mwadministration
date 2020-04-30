export const pointOperators = [
  { id: '==', labelValue: '=', label: 'labels.equals' },
  { id: '<=', labelValue: '<=', label: 'labels.smallerOrEqual' },
  { id: '>', labelValue: '>', label: 'labels.bigger' }
]
export const numberOperators = [
  { id: '==', labelValue: '=', label: 'labels.equals' },
  { id: '!=', labelValue: '!=', label: 'labels.notEqual' },
  { id: '<', labelValue: '<', label: 'labels.smaller' },
  { id: '<=', labelValue: '<=', label: 'labels.smallerOrEqual' },
  { id: '>', labelValue: '>', label: 'labels.bigger' },
  { id: '>=', labelValue: '>=', label: 'labels.biggerOrEqual' }
]
export const dateOperators = [
  { id: '<', labelValue: '<', label: 'labels.smaller' },
  { id: '<=', labelValue: '<=', label: 'labels.smallerOrEqual' },
  { id: '>', labelValue: '>', label: 'labels.bigger' },
  { id: '>=', labelValue: '>=', label: 'labels.biggerOrEqual' }
]
export const textOperators = [
  { id: '==', labelValue: 'equals', label: 'labels.equals' },
  { id: '==*{k}*', labelValue: 'contains', label: 'labels.contains' },
  { id: '!=*{k}*', labelValue: 'notcontains', label: 'labels.notContains' },
  { id: '=null=true', labelValue: 'empty', label: 'labels.empty' },
  { id: '=null=false', labelValue: 'notempty', label: 'labels.notEmpty' },
  { id: '==*{k}', labelValue: 'begins', label: 'labels.begins' },
  { id: '=={k}*', labelValue: 'ends', label: 'labels.ends' }
]
export const tagOperators = [
  { id: '=in=({k})', labelValue: 'has', label: 'labels.has' },
  { id: '=out=({k})', labelValue: 'hasnot', label: 'labels.hasNot' }
]
export const equalOperators = [
  { id: '==', labelValue: 'equals', label: 'labels.equals' },
  { id: '!=', labelValue: 'notequals', label: 'labels.notEquals' }
]
export const orderOperators = [
  { id: '==', labelValue: 'ordered', label: 'labels.ordered' },
  { id: '<', labelValue: 'orderedbefore', label: 'labels.orderedBefore' },
  { id: '>', labelValue: 'orderedafter', label: 'labels.orderedAfter' }
]
export const listmgrOperators = [
  { id: '==', labelValue: 'started', label: 'labels.started' },
  { id: '<', labelValue: 'startedbefore', label: 'labels.startedBefore' },
  { id: '>', labelValue: 'startedafter', label: 'labels.startedAfter' },
  { id: '==', labelValue: 'stopped', label: 'labels.stopped' },
  { id: '<', labelValue: 'stoppedbefore', label: 'labels.stoppedBefore' },
  { id: '>', labelValue: 'stoppedafter', label: 'labels.stoppedAfter' }
]
export const mailingOperators = [
  { id: '???', labelValue: 'sent', label: 'labels.sent' },
  { id: '???', labelValue: 'opened', label: 'labels.opened' },
  { id: '???', labelValue: 'bounced', label: 'labels.bounced' },
  { id: '???', labelValue: 'notsent', label: 'labels.notSent' }
]
export const linkOperators = [
  { id: '???', labelValue: 'clicked', label: 'labels.clicked' },
  { id: '???', labelValue: 'notclicked', label: 'labels.notClicked' }
]
export const emailOperators = [
  { id: '???', labelValue: 'sent', label: 'labels.sent' },
  { id: '???', labelValue: 'notsent', label: 'labels.notSent' },
  { id: '???', labelValue: 'opened', label: 'labels.opened' },
  { id: '???', labelValue: 'notopened', label: 'labels.notOpened' },
  { id: '???', labelValue: 'bounced', label: 'labels.bounced' }
]
export const workflowOperators = [
  { id: '==', labelValue: 'wflstarted', label: 'labels.wflstarted' },
  { id: '==', labelValue: 'wflnotstarted', label: 'labels.wflnotstarted' },
  { id: '???', labelValue: 'wflended', label: 'labels.wflended' },
  { id: '???', labelValue: 'wflpaststep', label: 'labels.wflpaststep' },
  { id: '???', labelValue: 'wflrunning', label: 'labels.wflrunning' }
]
export const yesnoOperators = [
  { id: '=null=false', labelValue: 'true', label: 'labels.yes' },
  { id: '=null=true', labelValue: 'false', label: 'labels.no' }
]
export const genderOperators = [
  { id: '==', labelValue: 'M', label: 'labels.male' },
  { id: '==', labelValue: 'F', label: 'labels.female' },
  { id: '==', labelValue: '-', label: 'labels.unspecified' }
]
export const groupOperators = [
  { id: '==', labelValue: 'member', label: 'labels.member' },
  { id: '!=', labelValue: 'notmember', label: 'labels.notmember' },
  { id: '=out=({k})', labelValue: 'exclude', label: 'labels.exclude' }
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
