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

import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
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
      if (typeof rule.query.value.value === 'string') {
        value = rule.query.value.value
      } else
      if (typeof rule.query.value === 'string') {
        value = rule.query.value
      } else if (Array.isArray(rule.query.value.value)) {
        let finalVal = ''
        rule.query.value.value.forEach((val: any, ind: any) => {
          if (ind < rule.query.value.value.length - 1) {
            finalVal += val.label + ','
          } else {
            finalVal += val.label
          }
        })
        value = finalVal
      } else if (typeof rule.query.value === 'object') {
        value = rule.query.value.value.label
      }
      const translation = this.$t(desc, { condition: condition, operator: operator, value: value })
      return translation
    }
}
