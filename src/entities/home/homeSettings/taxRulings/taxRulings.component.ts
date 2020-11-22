import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import moment from "moment";
@Component({
  props: {
    active: Boolean
  },
  components: {
  }
})
export default class TaxRulingsComponent extends mixins(CommonHelpers, Vue) {
    $refs!: {
    };
    constructor (props: any) {
      super(props)
    }

    public mounted () {
    }
}
