import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";
@Component
export default class RelationFIeldsComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  constructor() {
    super();
  }
}
