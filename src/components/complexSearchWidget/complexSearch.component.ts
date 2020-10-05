import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import QueryBuilder from 'query-builder-vue';
import GroupOperatorComponent from "@/components/complexSearchWidget/groupOperator/groupOperator.vue";
import RuleOperatorComponent from "@/components/complexSearchWidget/ruleOperator/ruleOperator.vue";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import GroupControlComponent from "@/components/complexSearchWidget/groupControl/groupControl.vue";
import {AutomationRules, CommonRules, ShopRules} from "@/shared/searchRules";
import RelationFIeldsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/relationFIeldsComplexSearch/relationFIeldsComplexSearch.vue";
import RelationFreeFIeldsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/relationFreeFIeldsComplexSearch/relationFreeFIeldsComplexSearch.vue";
import InputNumberComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/OrderQuantityComplexSearchComponent/OrderQuantityComplexSearch.vue";
import SearchableSelectComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/RegionsComplexSearchComponent/RegionsComplexSearch.vue";
@Component({
  props:{
    location: String
  },
  components: {
    RelationFIeldsComplexSearchComponent,
    RelationFreeFIeldsComplexSearchComponent,
    InputNumberComplexSearchComponent,
    SearchableSelectComplexSearchComponent,
    QueryBuilder,
    'group-operator-slot': GroupOperatorComponent,
    'rule-slot': RuleOperatorComponent,
    'group-ctrl-slot': GroupControlComponent,
    SearchableSelectComponent
  }
})
export default class ComplexSearchComponent extends mixins(CommonHelpers, Vue){
  public query:any
  public secondLvl:number
  constructor() {
    super();
    this.secondLvl = 0
    this.query = {
      operatorIdentifier: 'AND',
      children: []
    }
  }
  @Watch('query', {immediate: true, deep: true})
  public updateQuery(newVal:any){
    console.log('**********COMPLEX SEARCH QUERY**************')
    console.log(JSON.stringify(newVal))
    console.log('**********COMPLEX SEARCH QUERY**************')
    if(newVal && newVal.children && newVal.children.length) {
      newVal.children.forEach((child:any)=>{
        if(child.children && child.children.length){
          this.secondLvl++
        }
      })
    }
  }
  get config() {
    return {
      operators: [
        {
          name: 'labels.AND',
          identifier: 'AND',
        },
        {
          name: 'labels.OR',
          identifier: 'OR',
        },
      ],
      rules: this.getRules(),
      colors: ['hsl(88, 50%, 55%)', 'hsl(187, 100%, 45%)'],
    };
  }

  public getRules(){
    switch (this.$props.location) {
      case 'relations':
        let automationRules = AutomationRules
        let shopRules = ShopRules
        let result = CommonRules.concat(automationRules).concat(shopRules)
        return result
      case '':
        break;
      default:
        return CommonRules
    }
  }
}
