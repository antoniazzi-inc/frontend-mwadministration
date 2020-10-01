import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
@Component({
  props: {
    value: Boolean,
    is: Object
  },
  components:{
    ToggleSwitch
  }
})
export default class ToggleSwitchComplexSearchComponent extends mixins(CommonHelpers, Vue) {
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

  public mounted(){
  }
}
