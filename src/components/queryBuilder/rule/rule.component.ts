import { Component, Inject, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { Money } from 'v-money'

import ConditionComponentComponent from '@/components/queryBuilder/rule/conditionComponent/conditionComponent.vue'
import CommonHelpers from '@/shared/commonHelpers'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'

@Component({
  components: {
    SearchableSelectComponent,
    'flat-pickr': flatPickr,
    money: Money,
    'condition-component': ConditionComponentComponent
  },
  props: {
    query: {
      type: Object
    },
    index: {
      type: Number
    },
    rule: {
      type: Object
    },
    styled: {
      type: Boolean
    }
  }
})
export default class RuleComponent extends mixins(Vue, CommonHelpers) {
    public selectedCondition: any;
    public localQuery: any;
    public finalQuery: any;
    public hideValue: any;
    public productService: any;
    public singleSelectConfig = new SearchableSelectConfig('label',
      '', '', false,
      false, false, false, false)

    constructor (props: any) {
      super(props)
      this.selectedCondition = null
      this.localQuery = null
      this.finalQuery = {
        op: null,
        value: null,
        attr: null,
        attrvalue: null
      }
      this.hideValue = false
    }

    public mounted () {
      this.localQuery = this.$props.query
      if (this.$props.rule && this.$props.rule.conditions && !this.selectedCondition) {
        this.addCondition(this.$props.rule.conditions[0])
      } else if (this.$props.rule && this.$props.rule.operator) {
        this.selectedCondition = this.$props.rule.operator[0]
      }
    }

    public addCondition (condition: any) {
      const self = this
      const allAttributes: any = []
      if (!condition) return false
      if ((condition.id === 'orderamount' || condition.id === 'orderquantity')) {
        this.localQuery.value = 0
      }
      this.selectedCondition = condition
      this.$set(this.localQuery, 'ruleObj', this.$props.rule)
      this.$set(this.localQuery, 'condition', condition)
      if (this.selectedCondition.secondLvlCondition) {
        if (this.selectedCondition.secondLvlCondition.id === 'attributes') {
          this.productService().find(this.selectedCondition.value.id).then((resp: any) => {
            resp.attributes.forEach((attribute: any) => {
              allAttributes.push({
                label: self.getMultiLangName(attribute.attributeLanguages).name,
                value: attribute
              })
            })
            self.$set(self.selectedCondition.secondLvlCondition.outputElement, 'options', allAttributes)
          })
        } else if (this.selectedCondition.secondLvlCondition.id === 'freeFieldOptions') {
          if (this.selectedCondition.customFieldOptions && this.selectedCondition.customFieldOptions.length) {
            const options: any = []
            this.selectedCondition.customFieldOptions.forEach((option: any) => {
              options.push({
                label: self.getMultiLangName(option.customFieldOptionLanguages).name,
                value: option
              })
            })
            self.$set(self.selectedCondition.secondLvlCondition.outputElement, 'options', options)
          }
        }
      }
    }

    public showSecondLvlOption (props: any) {
      if (props.selectedValue.labelValue === 'wflpaststep') {
        this.$set(this.localQuery.op.secondLvlOperatorCondition.outputElement, 'options', this.$store.state.lookups.products)
      } else {
        this.$set(this.localQuery.op.secondLvlOperatorCondition.outputElement, 'options', [])
      }
    }

    public removeCondition () {
      this.selectedCondition = null
    }

    public remove () {
      this.$emit('child-deletion-requested', this.$props.index)
    }

    public updateConditionOperator (value: any) {
      if (value.value.labelValue.toLowerCase().match('empty')) {
        this.hideValue = true
      } else {
        this.hideValue = false
      }
      this.$set(this.localQuery, 'op', value)
    }

    public updateConditionSecondLevelCond (value: any) {
      if (value.value.labelValue.toLowerCase().match('empty')) {
        this.hideValue = true
      } else {
        this.hideValue = false
      }
      this.$set(this.localQuery, 'attr', value)
      this.$set(this.localQuery, 'attrvalue', value.value)
    }

    public updateConditionOutput (value: any) {
      this.$set(this.localQuery, 'value', value)
    }

    public updateOperatorSecondLevelCond (value: any) {
      this.$set(this.localQuery, 'attr', value)
      this.$set(this.localQuery, 'attrvalue', value.value)
    }

    public updateOperator (value: any) {
      if (value.value.labelValue.toLowerCase().match('empty')) {
        this.hideValue = true
      } else {
        this.hideValue = false
      }
      this.$set(this.localQuery, 'op', value)
    }

    public updateRuleOutputEl (value: any) {
      this.$set(this.localQuery, 'value', value)
    }
}
