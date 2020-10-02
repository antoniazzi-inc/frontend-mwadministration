import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
@Component({
  props: {
    value: Boolean
  },
  components:{
    ToggleSwitch
  }
})
export default class IsCustomerComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public initalValue:boolean
  public label:string
  constructor() {
    super();
    this.initalValue = false
    this.label = ''
  }

  @Watch('value', {immediate: true, deep: true})
  public updateVal(newVal:any){
    this.initalValue = newVal
  }
  @Watch('initalValue', {immediate: true, deep: true})
  public updateInitalValue(newVal:any){
    this.$emit('input', {attribute: null, subAttribute: null, operator: null, value: newVal})
  }

  public mounted(){
  }
}
