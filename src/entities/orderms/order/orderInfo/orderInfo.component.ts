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
    public getBillingAddresses(){
        const billingAddr = this.$props.order.customerBillingAddress.street + ' ' + this.$props.order.customerBillingAddress.houseNumber + ', ' + this.$props.order.customerBillingAddress.postalCode
        + ' ' + this.$props.order.customerBillingAddress.city + ', ' + this.getCountryById(this.$props.order.customerBillingAddress.countryId).enName;
        return billingAddr;
    }
    public getDeliveryAddresses(){
        const deliverryAddr = this.$props.order.customerDeliveryAddress.street + ' ' + this.$props.order.customerDeliveryAddress.houseNumber + ', ' + this.$props.order.customerDeliveryAddress.postalCode
                + ' ' + this.$props.order.customerDeliveryAddress.city + ', ' + this.getCountryById(this.$props.order.customerDeliveryAddress.number).enName;
        return deliverryAddr;
    }
    public getAllBeneficiaries() {

    }
}
