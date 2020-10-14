import {Component, Inject, Vue} from 'vue-property-decorator';
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";

@Component({
    props: {
      order: Object
    },
    components: {

    }
})
export default class OrderInfoComponent extends mixins(CommonHelpers, Vue) {
    public haveBeneficiaries: boolean;
    constructor(){
        super();
        this.haveBeneficiaries = false;
    }

    public getAllBeneficiaries() {

    }
}
