import {Component, Watch} from 'vue-property-decorator';
import {mixins} from "vue-class-component";
import {Money} from 'v-money'
import MultiLanguageComponent from "@/components/multiLanguage/MultiLanguage.vue";
import CommonHelpers from "@/shared/commonHelpers";
import CartOrdersService from "@/shared/services/orderms/CartOrdersService";
import {AxiosResponse} from "axios";

const beforeRouteEnter = (to:any, from:any, next:any) => {
    next((vm:any) => {});
};

@Component({
    beforeRouteEnter,
    props:{
        order:{
            type: Object
        }
    },
    components: {
        MultiLanguageComponent,
        'money': Money
    },
    watch: {

    },
    mounted(){
    }
})
export default class OrderPreviewComponent extends mixins(CommonHelpers) {
    public cartOrderService:any;
    public wholeOrder:any;
    public invoicePreview:any;
    public allTaxes:any[];
    constructor() {
        super();
        this.wholeOrder = {};
        this.allTaxes = [];
        this.cartOrderService = CartOrdersService.getInstance();
        this.invoicePreview = {
            totalProducts: 0,
            totalProductsNetto: 0,
            totalDiscounts: 0,
            noShippingCost: false,
            totalProductsGross: 0,
            grandTotal: 0,
            totalTaxesMap: {},
            invoiceDate: '',
            invoiceDeliveryDate:  '',
            invoiceSendDate: '',
            selectedPaymentMethod: {}
        };
    }
    @Watch('order.orderLines', {immediate: true, deep: true})
    public changeCartOrder(newVal:any) {
      if(newVal) this.updateCart()
    }
    @Watch('order.orderDiscountLines', {immediate: true, deep: true})
    public changeCartOrderDiscount(newVal:any) {
      if(newVal) this.updateCart()
    }
    public getCustomerRelationAddress(){
        let addr = this.$props.order.customerBillingAddress;
        if(addr){
            let country = this.getCountryById(addr.countryId).enName;
            return `${addr.street} ${addr.houseNumber}, ${addr.postalCode} ${addr.city} ${country}`
        }
        return '';
    }
    public getDeliveryMethodName(method:any){
        return method.orderLineDeliveryMethod.name;
    }
    public getBeneficiaries(orderLine:any){
        if(orderLine.orderLineBeneficiary && orderLine.orderLineBeneficiary.email){
            return orderLine.orderLineBeneficiary.email
        }
    }

    public updateCart(){
      this.cartOrderService.updateCart(this.$props.order).then((resp:AxiosResponse)=>{
        if(resp && resp.data)
        this.invoicePreview = resp.data
      })
    }
}
