
import { mixins } from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import CommonHelpers from '@/shared/commonHelpers'

export default class SearchRules extends mixins(CommonHelpers, Vue) {
    public commonRules: any;
    public shopRules: any;
    public automationRules: any;
    private allOperators: any;

    constructor (props: any) {
      super(props)
      this.allOperators = props.operator
      this.commonRules = [{
        id: 'relFields',
        label: 'Relation Fields',
        description: 'labels.relationField',
        searchQuery: null,
        conditions: [
          {
            id: 'firstName',
            label: 'First Name',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationProfile.firstName'
          },
          {
            id: 'LastName',
            label: 'Last Name',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationProfile.lastName'
          },
          {
            id: 'company',
            label: 'Company',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'companies.name'
          },
          {
            id: 'email',
            label: 'email',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'email'
          },
          {
            id: 'created',
            label: 'Created On',
            value: null,
            outputElement: { type: 'date', options: null },
            operator: { id: 'dateOperators', type: 'singleSelect', options: this.allOperators.dateOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'createdOn'
          },
          {
            id: 'gender',
            label: 'Gender',
            value: null,
            outputElement: { type: 'singleSelect', options: this.allOperators.genderOperators },
            operator: { id: 'equalOperators', type: 'singleSelect', options: this.allOperators.equalOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationProfile.gender'
          },
          {
            id: 'postalCode',
            label: 'Postal Code',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationAddress.postalCode'
          },
          {
            id: 'city',
            label: 'City',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationAddress.city'
          },
          {
            id: 'phone',
            label: 'Phone',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationPhone.number'
          },
          {
            id: 'website',
            label: 'Website',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationProfile.website'
          },
          {
            id: 'birthDate',
            label: 'Birth Date',
            value: null,
            outputElement: { type: 'date', options: null },
            operator: { id: 'dateOperators', type: 'singleSelect', options: this.allOperators.dateOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationProfile.birthDate'
          }

        ],
        operator: null,
        outputElement: null
      },
      {
        id: 'freefields',
        label: 'Free Fields',
        description: 'labels.freeFields',
        searchQuery: '(relationCustomFields.customField.id=={conditionId} and relationCustomFields.value)',
        conditions: [],
        operator: {
          id: 'textOperators',
          type: 'singleSelect',
          options: this.allOperators.textOperators,
          secondLvlOperatorCondition: null
        },
        outputElement: {
          type: 'text',
          options: null
        }
      }, {
        id: 'groups',
        label: 'Groups',
        searchQuery: 'relationGroups.groupId',
        description: 'labels.groups',
        conditions: [],
        operator: {
          id: 'groupOperators',
          type: 'singleSelect',
          options: this.allOperators.groupOperators,
          secondLvlOperatorCondition: null
        },
        outputElement: {
          type: 'singleSelect',
          options: null
        }
      }, {
        id: 'points',
        label: 'Points',
        searchQuery: 'relationProfile.points',
        description: 'labels.points',
        conditions: [],
        operator: {
          id: 'pointOperators',
          type: 'singleSelect',
          options: this.allOperators.pointOperators,
          secondLvlOperatorCondition: null
        },
        outputElement: {
          type: 'number',
          options: null
        }
      }, {
        id: 'categories',
        searchQuery: 'relationProfile.categoryId',
        description: 'labels.categories',
        label: 'Category',
        conditions: [],
        operator: null,
        outputElement: {
          type: 'singleSelect',
          options: []
        }
      }, {
        id: 'tags',
        label: 'Tags',
        searchQuery: 'relationTags.tagId',
        description: 'labels.tags',
        conditions: [],
        operator: {
          id: 'textOperators',
          type: 'singleSelect',
          options: this.allOperators.tagOperators,
          secondLvlOperatorCondition: null
        },
        outputElement: {
          type: 'multiSelect',
          options: null
        }
      }]
      this.automationRules = [
        {
          id: 'listmgr',
          label: 'List Manager',
          searchQuery: 'notKnown',
          description: 'labels.listmgr',
          conditions: [],
          operator: {
            id: 'listmgrOperators',
            type: 'singleSelect',
            options: this.allOperators.listmgrOperators,
            secondLvlOperatorCondition: null
          },
          outputElement: {
            type: 'date',
            options: null
          }
        }, {
          id: 'workflow',
          label: 'Workflow',
          searchQuery: 'notKnown',
          description: 'labels.workflow',
          conditions: [],
          operator: {
            id: 'workflowOperators',
            type: 'singleSelect',
            options: this.allOperators.workflowOperators,
            secondLvlOperatorCondition: {
              id: 'wflpaststep',
              outputElement: { type: 'singleSelect', options: [] },
              applyCondition: 'workflowSteps'
            }
          },
          outputElement: {
            type: 'date',
            options: null
          }
        }, {
          id: 'mailing',
          label: 'Mailing',
          searchQuery: 'notKnown',
          description: 'labels.mailing',
          conditions: [],
          operator: {
            id: 'mailingOperators',
            type: 'singleSelect',
            options: this.allOperators.mailingOperators,
            secondLvlOperatorCondition: null
          },
          outputElement: []
        }, {
          id: 'email',
          label: 'Email',
          searchQuery: 'notKnown',
          description: 'labels.email',
          conditions: [],
          operator: {
            id: 'emailOperators',
            type: 'singleSelect',
            options: this.allOperators.emailOperators,
            secondLvlOperatorCondition: null
          },
          outputElement: {
            type: 'singleSelect',
            options: []
          }
        }, {
          id: 'link',
          label: 'Link',
          searchQuery: 'notKnown',
          description: 'labels.link',
          conditions: [],
          operator: null,
          outputElement: {}
        }, {
          id: 'regions',
          label: 'Regions',
          searchQuery: 'notKnown',
          conditions: [],
          operator: null,
          outputElement: {
            type: 'singleSelect',
            options: null
          }
        }
      ]
      this.shopRules = [
        {
          id: 'orders',
          label: 'Orders',
          searchQuery: 'notKnown',
          description: 'labels.orders',
          conditions: [],
          operator: null,
          outputElement: null
        }, {
          id: 'orderamount',
          label: 'Order Amount',
          searchQuery: 'notKnown',
          conditions: [],
          operator: {
            id: 'numberOperators',
            type: 'singleSelect',
            options: this.allOperators.numberOperators,
            secondLvlOperatorCondition: null
          },
          outputElement: {
            type: 'money',
            options: null
          }
        }, {
          id: 'orderquantity',
          label: 'Order Quantity',
          searchQuery: 'notKnown',
          description: 'labels.orderQuantity',
          conditions: [],
          operator: {
            id: 'numberOperators',
            type: 'singleSelect',
            options: this.allOperators.numberOperators,
            secondLvlOperatorCondition: null
          },
          outputElement: {
            type: 'number',
            options: null
          }
        }, {
          id: 'iscustomer',
          label: 'Is Customer',
          searchQuery: 'customer',
          description: 'labels.isCustomer',
          conditions: [],
          operator: null,
          outputElement: {
            type: 'singleSelect',
            options: this.allOperators.yesnoOperators
          }
        }, {
          id: 'isAffiliate',
          label: 'Is Affiliate',
          searchQuery: 'affiliateId',
          description: 'labels.isAffiliate',
          conditions: [],
          operator: null,
          outputElement: {
            type: 'singleSelect',
            options: this.allOperators.yesnoOperators
          }
        }
      ]
    }

    public relationSearchRules (lookups: any) {
      const includeAutomation = true
      const includeShop = true
      let rules: any = []
      const self = this
      // get all applicable rules
      rules = rules.concat(self.commonRules)
      if (includeAutomation) {
        rules = rules.concat(self.automationRules)
      }
      if (includeShop) {
        rules = rules.concat(self.shopRules)
      }
      // insert this.lookups
      rules.forEach(function (rule: any) {
        if (rule.id === 'tags') {
          rule.outputElement.options = lookups.tags
        } else if (rule.id === 'categories') {
          rule.outputElement.options = lookups.categories
        } else if (rule.id === 'relFields' && lookups.allCountries.length) {
          rule.conditions.push({
            id: 'country',
            label: 'Country',
            value: null,
            outputElement: { type: 'singleSelect', options: lookups.allCountries },
            operator: { type: 'singleSelect', options: self.allOperators.equalOperators },
            secondLvlCondition: null,
            searchQuery: ''
          })
        } else if (rule.id === 'freefields') {
          rule.conditions = []
          lookups.freeFields.forEach((freeField: any) => {
            rule.conditions.push({
              ...freeField,
              id: 'freeFields',
              outputElement: null,
              operator: null,
              secondLvlCondition: null,
              searchQuery: ''
            })
          })
        } else if (rule.id === 'mailing' && lookups.products) {
          rule.outputElement = { type: 'singleSelect', options: lookups.products }
        } else if (rule.id === 'listmgr' && lookups.products) {
          rule.conditions = []
          lookups.products.forEach((listMgr: any) => {
            rule.conditions.push({
              ...listMgr,
              id: 'listManager',
              outputElement: null,
              operator: null,
              secondLvlCondition: null,
              searchQuery: ''
            })
          })
        } else if (rule.id === 'orders') {
          rule.operator = {
            type: 'singleSelect',
            options: self.allOperators.orderOperators,
            secondLvlOperatorCondition: null
          }
          rule.conditions = []
          lookups.products.forEach((product: any) => {
            rule.conditions.push({
              ...product,
              id: 'products',
              outputElement: null,
              operator: null,
              secondLvlCondition: {
                id: 'attributes',
                outputElement: { type: 'singleSelect', options: [] },
                applyCondition: 'attributes'
              },
              searchQuery: ''
            }
            )
          })
          rule.outputElement = { type: 'date', options: null }
        } else if (rule.id === 'groups') {
          rule.outputElement = { type: 'singleSelect', options: lookups.groups }
        } else if (rule.id === 'workflow' && lookups.products) {
          rule.conditions = []
          lookups.products.forEach((workflow: any) => {
            rule.conditions.push({
              ...workflow,
              id: 'workflows',
              outputElement: null,
              operator: null,
              secondLvlCondition: null,
              searchQuery: ''
            })
          })
        } else if (rule.id === 'email') {

        } else if (rule.id === 'regions') {
          rule.outputElement = {
            type: 'singleSelect', options: lookups.regions
          }
        } else if (rule.id === 'link') {
          rule.operator = { type: 'singleSelect', options: self.allOperators.linkOperators, secondLvlOperatorCondition: null }
          rule.outputElement = { type: 'singleSelect', options: lookups.links ? lookups.links : [] }
        }
      })
      return rules
    }
}
