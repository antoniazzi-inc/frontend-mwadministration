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

import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";
import RelationFIeldsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/relationFIeldsComplexSearch/relationFIeldsComplexSearch.vue";
import RelationFreeFIeldsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/relationFreeFIeldsComplexSearch/relationFreeFIeldsComplexSearch.vue";
import InputNumberComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/OrderQuantityComplexSearchComponent/OrderQuantityComplexSearch.vue";
import SearchableSelectComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/RegionsComplexSearchComponent/RegionsComplexSearch.vue";
import WorkflowSelectComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/WorkflowSelectComplexSearch/WorkflowSelectComplexSearch.vue";
import OrderComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/OrderComplexSearch/OrderComplexSearch.vue";
import MoneyComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/TagsComplexSearchComponent/TagsComplexSearch.vue";
import ToggleSwitchComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/isAffiliateComplexSearchComponent/isAffiliateComplexSearch.vue";
@Component({
  props:{
    rules: [Array],
    ruleCtrl: [Array, Object],
    query: [Object,Array,String]
  },
  components: {
    RelationFIeldsComplexSearchComponent,
    RelationFreeFIeldsComplexSearchComponent,
    InputNumberComplexSearchComponent,
    SearchableSelectComplexSearchComponent,
    WorkflowSelectComplexSearchComponent,
    OrderComplexSearchComponent,
    MoneyComplexSearchComponent,
    ToggleSwitchComplexSearchComponent,
  }
})
export default class RuleOperatorComponent extends mixins(CommonHelpers, Vue){
  public ToggleSwitchComplexSearchComponent:any
  public MoneyComplexSearchComponent:any
  public OrderComplexSearchComponent:any
  public WorkflowSelectComplexSearchComponent:any
  public SearchableSelectComplexSearchComponent:any
  public InputNumberComplexSearchComponent:any
  public RelationFreeFIeldsComplexSearchComponent:any
  public RelationFIeldsComplexSearchComponent:any
  constructor() {
    super();
    this.ToggleSwitchComplexSearchComponent = ToggleSwitchComplexSearchComponent
    this.MoneyComplexSearchComponent = MoneyComplexSearchComponent
    this.OrderComplexSearchComponent = OrderComplexSearchComponent
    this.WorkflowSelectComplexSearchComponent = WorkflowSelectComplexSearchComponent
    this.SearchableSelectComplexSearchComponent = SearchableSelectComplexSearchComponent
    this.InputNumberComplexSearchComponent = InputNumberComplexSearchComponent
    this.RelationFreeFIeldsComplexSearchComponent = RelationFreeFIeldsComplexSearchComponent
    this.RelationFIeldsComplexSearchComponent = RelationFIeldsComplexSearchComponent
  }

  get ruleName() {
    return this.$props.rules
      .find((r:any) => r.component === this.$props.ruleCtrl.ruleComponent).name;
  }
}

