import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
@Component({
})
export default class OrderQuantityComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public value: number|null
  constructor() {
    super();
    this.value = null
  }
  @Watch('initialValue', {immediate: true, deep: true})
  public updateVal(newVal:any){
    debugger
    this.value = newVal
  }
}
