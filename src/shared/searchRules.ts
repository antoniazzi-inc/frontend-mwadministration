import { mixins } from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import Store from '@/store/index'
import { ILanguage, Language } from '@/shared/models/language.model'
import RelationFIeldsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/relationFIeldsComplexSearch/relationFIeldsComplexSearch.vue";
import RelationFreeFIeldsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/relationFreeFIeldsComplexSearch/relationFreeFIeldsComplexSearch.vue";
import WorkflowSelectComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/WorkflowSelectComplexSearch/WorkflowSelectComplexSearch.vue";
import OrderComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/OrderComplexSearch/OrderComplexSearch.vue";
import IsAffiliateComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/isAffiliateComplexSearchComponent/isAffiliateComplexSearch.vue";
import IsCustomerComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/isCustomerComplexSearchComponent/isCustomerComplexSearch.vue";
import OrderQuantityComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/OrderQuantityComplexSearchComponent/OrderQuantityComplexSearch.vue";
import OrderAmountComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/OrderAmountComplexSearchComponent/OrderAmountComplexSearch.vue";
import RegionsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/RegionsComplexSearchComponent/RegionsComplexSearch.vue";
import LinkComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/LinkComplexSearchComponent/LinkComplexSearch.vue";
import EmailComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/EmailComplexSearchComponent/EmailComplexSearch.vue";
import MailingComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/MailingComplexSearchComponent/MailingComplexSearch.vue";
import ListManagerComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/ListManagerComplexSearchComponent/ListManagerComplexSearch.vue";
import TagsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/TagsComplexSearchComponent/TagsComplexSearch.vue";
import CategoriesComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/CategoriesComplexSearchComponent/CategoriesComplexSearch.vue";
import PointsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/PointsComplexSearchComponent/PointsComplexSearch.vue";
import GroupsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/GroupsComplexSearchComponent/GroupsComplexSearch.vue";
import CoursesSelectComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/CoursesSelectComplexSearch/CoursesSelectComplexSearch.vue";
export const CommonRules:any = [{
  identifier: 'relFields',
  name: 'relationField',
  component: RelationFIeldsComplexSearchComponent,
  initialValue: () => {return null},
},{
  identifier: 'freeFields',
  name: 'freeFields',
  component: RelationFreeFIeldsComplexSearchComponent,
  initialValue: () => {return null},
},{
  identifier: 'groups',
  name: 'groups',
  component: GroupsComplexSearchComponent,
  initialValue: () => {return null},
},{
  identifier: 'points',
  name: 'points',
  component: PointsComplexSearchComponent,
  initialValue: () => 0,
},{
  identifier: 'categories',
  name: 'categories',
  component: CategoriesComplexSearchComponent,
  initialValue: () => {return null},
},{
  identifier: 'tags',
  name: 'tags',
  component: TagsComplexSearchComponent,
  initialValue: () => {return null},
}]


export const AutomationRules:any = [{
  identifier: 'listManager',
  name: 'listManager',
  component: ListManagerComplexSearchComponent,
  initialValue: () => {return null},
},{
  identifier: 'workflow',
  name: 'workflow',
  component: WorkflowSelectComplexSearchComponent,
  initialValue: () => {return null},
},{
  identifier: 'mailing',
  name: 'mailing',
  component: MailingComplexSearchComponent,
  initialValue: () => {return null},
},{
  identifier: 'email',
  name: 'email',
  component: EmailComplexSearchComponent,
  initialValue: () => '',
},{
  identifier: 'link',
  name: 'link',
  component: LinkComplexSearchComponent,
  initialValue: () => '',
},{
  identifier: 'course',
  name: 'course',
  component: CoursesSelectComplexSearchComponent,
  initialValue: () => {return null},
}/*,{
  identifier: 'regions',
  name: 'regions',
  component: RegionsComplexSearchComponent,
  initialValue: () => {return null},
}*/]
export const ShopRules:any = [{
  identifier: 'orders',
  name: 'orders',
  component: OrderComplexSearchComponent,
  initialValue: () => {return null},
},{
  identifier: 'orderAmount',
  name: 'orderAmount',
  component: OrderAmountComplexSearchComponent,
  initialValue: () => 0,
},{
  identifier: 'orderQuantity',
  name: 'orderQuantity',
  component: OrderQuantityComplexSearchComponent,
  initialValue: () => {return 1},
},{
  identifier: 'isCustomer',
  name: 'isCustomer',
  component: IsCustomerComplexSearchComponent,
  initialValue: () => {return {value: true}},
},{
  identifier: 'isAffiliate',
  name: 'isAffiliate',
  component: IsAffiliateComplexSearchComponent,
  initialValue: () => {return {value: true}},
}]


export default class SearchRules extends mixins(Vue) {
    public commonRules: any;
    public shopRules: any;
    public automationRules: any;
    private allOperators: any;
    public getMultiLangName (langs: ILanguage[] | undefined | null) {
      const self = this
      if (langs && langs.length > 0) {
        let result = null
        langs.forEach(lang => {
          if (lang.langKey === Store.state.currentLanguage) {
            result = lang
          }
        })
        if (result) {
          return result
        } else {
          return new Language()
        }
      } else {
        return new Language()
      }
    }

    constructor (props: any) {
      super(props)
      this.allOperators = props.operator
      this.commonRules = [{
        id: 'relFields',
        label: 'labels.relationField',
        description: 'labels.relationFieldLabel',
        searchQuery: null,
        conditions: [
          {
            id: 'firstName',
            label: 'labels.firstName',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationProfile.firstName'
          },
          {
            id: 'LastName',
            label: 'labels.lastName',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationProfile.lastName'
          },
          {
            id: 'company',
            label: 'labels.company',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'companies.name'
          },
          {
            id: 'email',
            label: 'labels.email',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'email'
          },
          {
            id: 'created',
            label: 'labels.createdOn',
            value: null,
            outputElement: { type: 'date', options: null },
            operator: { id: 'dateOperators', type: 'singleSelect', options: this.allOperators.dateOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'createdOn'
          },
          {
            id: 'gender',
            label: 'labels.gender',
            value: null,
            outputElement: { type: 'singleSelect', options: this.allOperators.genderOperators },
            operator: { id: 'equalOperators', type: 'singleSelect', options: this.allOperators.equalOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationProfile.gender'
          },
          {
            id: 'postalCode',
            label: 'labels.postalCode',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationAddress.postalCode'
          },
          {
            id: 'city',
            label: 'labels.city',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationAddress.city'
          },
          {
            id: 'phone',
            label: 'labels.phone',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationPhone.number'
          },
          {
            id: 'website',
            label: 'labels.website',
            value: null,
            outputElement: { type: 'text', options: null },
            operator: { id: 'textOperators', type: 'singleSelect', options: this.allOperators.textOperators, secondLvlOperatorCondition: null },
            secondLvlCondition: null,
            searchQuery: 'relationProfile.website'
          },
          {
            id: 'birthDate',
            label: 'labels.birthDate',
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
        label: 'labels.freeFields',
        description: 'labels.freeFieldsComplexSearch',
        searchQuery: '(relationCustomFields.customField.id=={conditionId} and relationCustomFields.value)',
        searchQueryOption: '(relationCustomFields.customField.id=={conditionId} and relationCustomFields.customFieldOption.id=={conditionOptionId} and relationCustomFields.value)',
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
        label: 'labels.groups',
        searchQuery: 'relationGroups.groupId',
        description: 'labels.complexSearchGroups',
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
        label: 'labels.points',
        searchQuery: 'relationProfile.points',
        description: 'labels.complexSearchPoints',
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
        description: 'labels.complexSearchCategories',
        label: 'labels.category',
        conditions: [],
        operator: null,
        outputElement: {
          type: 'singleSelect',
          options: []
        }
      }, {
        id: 'tags',
        label: 'labels.tags',
        searchQuery: 'relationTags.tagId',
        description: 'labels.complexSearchTags',
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
          label: 'labels.listManager',
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
          label: 'labels.workflow',
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
          label: 'labels.mailing',
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
          label: 'labels.email',
          searchQuery: 'notKnown',
          description: 'labels.emailComplexSearch',
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
          label: 'labels.link',
          searchQuery: 'notKnown',
          description: 'labels.link',
          conditions: [],
          operator: null,
          outputElement: {}
        }, {
          id: 'regions',
          label: 'labels.regions',
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
          label: 'labels.orders',
          searchQuery: 'notKnown',
          description: 'labels.complexSearchOrders',
          conditions: [],
          operator: null,
          outputElement: null
        }, {
          id: 'orderamount',
          label: 'labels.orderAmount',
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
          label: 'labels.orderQuantity',
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
          label: 'labels.isCustomer',
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
          label: 'labels.isAffiliate',
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
          const finalTags: any = []
          lookups.tags.forEach((t: any) => {
            finalTags.push({
              label: t.code,
              value: t
            })
          })
          rule.outputElement.options = finalTags
        } else if (rule.id === 'categories') {
          const finalCats: any = []
          lookups.categories.forEach((t: any) => {
            finalCats.push({
              label: t.code,
              value: t
            })
          })
          rule.outputElement.options = finalCats
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
              label: self.getMultiLangName(freeField.customFieldLanguages).name,
              id: 'freeFields',
              outputElement: null,
              operator: null,
              secondLvlCondition: {
                id: 'freeFieldOptions',
                outputElement: { type: 'singleSelect', options: [] },
                applyCondition: 'freeFieldOptions'
              },
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
