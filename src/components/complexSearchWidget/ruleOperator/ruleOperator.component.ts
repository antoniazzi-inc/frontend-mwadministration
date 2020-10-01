import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class GroupOperatorComponent extends mixins(CommonHelpers, Vue){

}

