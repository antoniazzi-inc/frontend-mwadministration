import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

import { isArray, isObject, isString } from 'util'
import CommonHelpers from '@/shared/commonHelpers'
@Component
export default class Describer extends mixins(CommonHelpers, Vue) {
    public lang: string;
    public description: string;
    public toplevelLogicalOp: string;

    constructor () {
      super()
      this.lang = this.$store.state.currentLanguage
      this.description = ''
      this.toplevelLogicalOp = 'and'
    }

    public describe (rule: any) {
      this.toplevelLogicalOp = rule.logicalOperator ? rule.logicalOperator : 'and'
      const me = this
      const s: any = []
      if (rule.children) {
        rule.children.forEach(function (r: any) {
          s.push(me.workon(r))
        })
      }
      let finalStr = ''
      s.forEach((ruleDesc: any, ind: any) => {
        if (ind < s.length - 1) {
          finalStr += me.toplevelLogicalOp ? ruleDesc + ' ' + me.toplevelLogicalOp.toUpperCase() + ' ' : ruleDesc + ' '
        } else {
          finalStr += ruleDesc
        }
      })
      return finalStr
    }

    public workon (rule: any) {
      const me = this
      if (rule.query.children) {
        const Operator = rule.query.logicalOperator
        const s: any = []
        rule.query.children.forEach(function (r: any) {
          s.push(me.workon(r))
        })
        let finalStr = ''
        s.forEach((ruleDesc: any, ind: any) => {
          if (ind < s.length - 1) {
            finalStr += Operator ? ruleDesc + ' ' + Operator.toUpperCase() + ' ' : ruleDesc + ' '
          } else {
            finalStr += ruleDesc
          }
        })
        return finalStr
      }
      const desc = rule.query.ruleObj.description
      const condition = rule.query.condition ? rule.query.condition.label : ''
      const operator = rule.query.op ? rule.query.op.value ? rule.query.op.value.label : '' : ''
      let value = ''
      if (isString(rule.query.value.value)) {
        value = rule.query.value.value
      } else
      if (isString(rule.query.value)) {
        value = rule.query.value
      } else if (isArray(rule.query.value.value)) {
        let finalVal = ''
        rule.query.value.value.forEach((val: any, ind: any) => {
          if (ind < rule.query.value.value.length - 1) {
            finalVal += val.label + ','
          } else {
            finalVal += val.label
          }
        })
        value = finalVal
      } else if (isObject(rule.query.value)) {
        value = rule.query.value.value.label
      }
      const translation = this.$t(desc, { condition: condition, operator: operator, value: value })
      return translation
    }
}
