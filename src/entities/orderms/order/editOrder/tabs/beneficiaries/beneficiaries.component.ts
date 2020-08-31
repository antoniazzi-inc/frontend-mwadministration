import Component, {mixins} from "vue-class-component";
import {Inject, Vue, Watch} from "vue-property-decorator";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import CommonHelpers from "@/shared/commonHelpers";
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";
import {IRelationEntity} from "@/shared/models/relationms/relationModel";
import {Beneficiary, IBeneficiary} from "@/shared/models/beneficiary.model";
import BeneficiaryDeliveryAddress, {IBeneficiaryDeliveryAddress} from "@/shared/models/orderms/BeneficiaryDeliveryAddressModel";
import OrderLine, {IOrderLine} from "@/shared/models/orderms/OrderLineModel";
import RelationService from "@/shared/services/relationService";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {AxiosResponse} from "axios";
import OrderLineBeneficiary from "@/shared/models/orderms/OrderLineBeneficiaryModel";

@Component({
    components:{
      SearchableSelectComponent
    },
    props:{
        order: {
            type: Object
        }
    }
})
export default class BeneficiariesComponent extends mixins(Vue,CommonHelpers){
    $refs!:{
      editBeneficiary:HTMLElement,
      removeBeneficiary:HTMLElement,
      copyBeneficiary:HTMLElement,
    }
    public selectedCountry: any;
    public orderCopy: ICartOrder;
    public relationService: any;
    public allRelations: IRelationEntity[];
    public selectedRelation: IRelationEntity[]|any;
    public selectedBeneficiary: IBeneficiary;
    public selectedCopyBeneficiary: any;
    public selectedBeneficiaryAddress: IBeneficiaryDeliveryAddress;
    public selectedOrderLine: IOrderLine;
    public orderLineToCopy: IOrderLine|any;
    public multiSelectConfigCountry: ISearchableSelectConfig;
    public selectedOrderLineIndex: any;
    public singleSelectConfig: ISearchableSelectConfig;
    public orderLineToRemove: any;
    constructor(){
        super();
        this.orderCopy = new CartOrder()
        this.selectedBeneficiary = new Beneficiary()
        this.relationService = RelationService.getInstance()
        this.selectedCopyBeneficiary = null
        this.selectedOrderLine = new OrderLine()
        this.selectedBeneficiaryAddress = new BeneficiaryDeliveryAddress()
        this.selectedCountry = null
        this.selectedOrderLineIndex = null
        this.orderLineToCopy = null
        this.selectedRelation = null
        this.orderLineToRemove = null
        this.allRelations = []
        this.multiSelectConfigCountry = new SearchableSelectConfig('enName',
          'labels.country', '', false,
          false, true, false, false)
        this.singleSelectConfig = new SearchableSelectConfig('email',
          'labels.relation', '', false,
          false, true, true, false)
    }

    @Watch('order', {immediate: true, deep:true})
    public updateCart(newVal:any){
      if(newVal){
        this.orderCopy = newVal
      }
    }
  public mounted(){
    this.retrieve();
  }
    public retrieve(){
        this.relationService.getAll({
            page: 0,
            size: 50,
            sort: 'id,asc'
        }).then((resp:AxiosResponse) => {
          if(resp && resp.data)
            this.$set(this, 'allRelations', resp.data.content);
        });
    }
    public editBeneficiary(orderLine:any, index:any){
        let self = this;
        Vue.nextTick(function () {
            self.selectedOrderLine = orderLine;
            self.selectedOrderLineIndex = index;
            self.selectedBeneficiary = orderLine.orderLineBeneficiary ? orderLine.orderLineBeneficiary : self.orderCopy.orderCustomer;
            if(orderLine.orderLineBeneficiary){
                if(orderLine.beneficiaryDeliveryAddress){
                    self.selectedBeneficiaryAddress = orderLine.beneficiaryDeliveryAddress;
                }
            } else {
                if(self.orderCopy.customerDeliveryAddress){
                    self.selectedBeneficiaryAddress = self.orderCopy.customerDeliveryAddress;
                }
            }
            let country = self.preselectCountry(self.selectedBeneficiaryAddress.countryId);
            self.selectedCountry = country;
        });
    }
    public prepareRemove(item:any, index:any){
        this.orderLineToRemove = index;
    }
    public copyBeneficiary(item:any, idnex:any){
        this.orderLineToCopy = JSON.parse(JSON.stringify(item));
    }
    public copyBenef(){
        let profile = this.selectedCopyBeneficiary.relationProfile;
        let firstName =  profile.firstName ? profile.firstName : '';
        let middleName =  profile.middleName ? profile.middleName : '';
        let lastName =  profile.lastName ? profile.lastName : '';
        let fullname = firstName + ' ' + middleName + ' ' + lastName;
        if(this.orderLineToCopy.orderLineBeneficiary === null){
            this.orderLineToCopy.orderLineBeneficiary = new OrderLineBeneficiary();
        }
        this.orderLineToCopy.orderLineBeneficiary.email = this.selectedCopyBeneficiary.email;
        this.orderLineToCopy.orderLineBeneficiary.fullName = fullname;
        this.orderLineToCopy.orderLineBeneficiary.beneficiaryRelationId = this.selectedCopyBeneficiary.id;
        this.orderLineToCopy.orderLineBeneficiary.title = this.selectedCopyBeneficiary.relationProfile.title;
        this.orderLineToCopy.beneficiaryDeliveryAddress = this.selectedCopyBeneficiary.relationAddresses[0];
        if(this.orderCopy.orderLines)
        this.orderCopy.orderLines.push(JSON.parse(JSON.stringify(this.orderLineToCopy)));
        else this.orderCopy.orderLines = [(JSON.parse(JSON.stringify(this.orderLineToCopy)))]
        this.selectedCopyBeneficiary = new Beneficiary();
        this.selectedBeneficiaryAddress = new BeneficiaryDeliveryAddress();
        this.orderLineToCopy = new CartOrder();
        this.setAlert('newBeneficiaryAdded','success')
        this.$emit('updateCart', this.orderCopy)
        this.closeCopyModal();
    }
    public saveBeneficiary(){
        this.selectedOrderLine.beneficiaryDeliveryAddress = this.selectedBeneficiaryAddress;
        if(this.orderCopy.orderLines)
        this.orderCopy.orderLines[this.selectedOrderLineIndex] = this.selectedOrderLine;
        this.$emit('updateCart', this.orderCopy);
        this.closeEditModal();
    }

    public removeBeneficiary(){
        let self = this;
      let orderLines:any = []
      if(this.orderCopy.orderLines){
        orderLines = this.orderCopy.orderLines.filter(function (item, ind) {
          return ind !== self.orderLineToRemove;
        });
      }
        this.orderCopy.orderLines = orderLines;
        this.$emit('updateCart', this.orderCopy);
        this.closeRemoveModal();
    }
    public addCountry(country:any){
        this.selectedCountry = country;
    }
    public removeCountry(country:any){
        this.selectedCountry = null;
    }
    public addCopyBeneficiary(beneficiary:any){
        this.selectedCopyBeneficiary = beneficiary;
    }
    public removeCopyBeneficiary(){
        this.selectedCopyBeneficiary = null;
    }
    public closeRemoveModal(){
      //@ts-ignore
      $(this.$refs.removeBeneficiary).modal('hide');
    }
    public closeEditModal(){
      //@ts-ignore
      $(this.$refs.editBeneficiary).modal('hide');
    }
    public closeCopyModal(){
      //@ts-ignore
        $(this.$refs.copyBeneficiary).modal('hide');
    }
}
