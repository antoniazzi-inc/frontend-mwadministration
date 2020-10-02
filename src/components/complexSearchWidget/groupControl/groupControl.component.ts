import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";

@Component({
  props: {
    groupCtrl: [Object, Array]
  },
  components: {}
})
export default class GroupControlComponent extends mixins(CommonHelpers, Vue) {
  public selectedRule: any
  public expanded: any

  constructor() {
    super();
    this.selectedRule = ""
    this.expanded = false
  }

  get ruleName() {
    if (this.selectedRule === "") {
      return this.$t('labels.selectRule');
    }
    return this.$t('labels.' + this.$props.groupCtrl.rules.find((r: any) => r.identifier === this.selectedRule).name + 'Title');
  }

  public setRule(rule: any) {
    this.expanded = false;
    this.selectedRule = rule;
  }

  public addRule(rule: any) {
    if (!this.selectedRule) {
      return;
    }
    this.$props.groupCtrl.addRule(this.selectedRule);
    this.selectedRule = "";
  }

  public toggleExpanded(){
    this.$set(this, 'expanded', !this.expanded)
  }
}

