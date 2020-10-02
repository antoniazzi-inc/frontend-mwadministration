import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";

@Component({
  props:{
    groupOperator: [Object, Array]
  },
  components: {
  }
})
export default class GroupOperatorComponent extends mixins(CommonHelpers, Vue){
public expanded: boolean
  constructor() {
    super();
    this.expanded = false
  }

  public selectOperator(operator:any) {
    this.expanded = false;
    this.$props.groupOperator.updateCurrentOperator(operator);
  }
  public toggleExpanded(){
    this.$set(this, 'expanded', !this.expanded)
  }
}

