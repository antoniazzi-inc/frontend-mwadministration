import { Component, Prop, Vue } from 'vue-property-decorator'
import RuleComponent from '@/components/queryBuilder/rule/rule.vue'
import { mixins } from 'vue-class-component'
import index from '@/router'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'

@Component({
  components: {
    SearchableSelectComponent,
    rule: RuleComponent
  },
  props: ['type', 'query', 'index', 'rules', 'maxDepth', 'depth', 'styled', 'onlyActiveEntities']
})
export default class GroupComponent extends mixins(Vue) {
    public selectedRule: object;
    public selectedRules: [];
    public showDesc: boolean;

  public multiSelectConfig: SearchableSelectConfig = new SearchableSelectConfig('label',
    'labels.chooseOption', '', false,
    false, true, true, false)

  constructor () {
    super()
    // @ts-ignore
    this.selectedRules = []
    // @ts-ignore
    this.selectedRule = []
    this.showDesc = false
  }

  public created () {
    this.selectedRule = [this.$props.rules[0]]
  }

  get queryDesc () {
    // @ts-ignore
    return this.$parent.$parent.queryDesc
  }

  get classObject () {
    const classObject: any = {
      'panel panel-default': true
    }
    classObject['depth-' + this.$props.depth.toString()] = this.$props.styled
    return classObject
  }

  public ruleById (ruleId: any) {
    let rule = null
    this.$props.rules.forEach(function (value: any) {
      if (value.id === ruleId) {
        rule = value
        return false
      }
    })
    return rule
  }

  public toggleDesc () {
    this.showDesc = !this.showDesc
  }

  public addRule (e: any) {
    if (!e) return
    this.selectedRule = e
    // @ts-ignore
    this.selectedRules.push(e)
    // @ts-ignore
    this.query.children.push({
      type: 'rule',
      query: {
        // @ts-ignore
        rule: e.id,	// the rule name
        ruleObj: e,	// the rule name
        // @ts-ignore
        op: this.selectedRule.operator ? this.selectedRule.operator : null,						// operator ('contains', 'equals', 'orderedbefore', etc)
        // @ts-ignore
        value: this.selectedRule.id === 'orderamount' || this.selectedRule.id === 'orderquantity' ? 0 : '',
        date: '',						// date if rule includes a 'before' or 'after' clause
        attr: '',						// name of rel-field, free-field or id of email in case of a clicked-link rule
        attrvalue: ''					// comma-separated list of selected product atr_value pairs
      }
    })
  }

  public removeRule (rule: any) {
    let index = null
    // @ts-ignore
    this.query.children.forEach((child, k) => {
      if (child.query.rule === rule.id) {
        index = k
      }
    })
    if (index !== null) {
      this.removeChild(index)
    }
  }

  public addGroup (e: any) {
    // @ts-ignore
    if (this.depth < this.maxDepth) {
      // @ts-ignore
      this.query.children.push({
        type: 'group-component',
        query: {
          logicalOperator: 'and',
          children: []
        }
      })
    }
  }

  public collapseAccordion (index: any) {
    this.$root.$emit('bv::toggle::collapse', 'accordion-' + index)
  }

  public remove () {
    // @ts-ignore
    this.$emit('child-deletion-requested', this.index)
  }

  removeChild (index: any) {
    const self = this
    this.selectedRules.splice(index, 1)
    this.$nextTick(function () {
      // @ts-ignore
      self.query.children.splice(index, 1)
    })
  }
}
