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
import OrderLinesService from "@/shared/services/orderms/OrderLinesService";
import {order} from "@/shared/tabelsDefinitions";

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
    public orderLineService: any;
    public beneficiaryList: any;
    constructor(){
        super();
        this.orderCopy = new CartOrder()
        this.selectedBeneficiary = new Beneficiary()
        this.relationService = RelationService.getInstance()
        this.orderLineService = OrderLinesService.getInstance()
        this.selectedCopyBeneficiary = null
        this.selectedOrderLine = new OrderLine()
        this.selectedBeneficiaryAddress = new BeneficiaryDeliveryAddress()
        this.selectedCountry = null
        this.selectedOrderLineIndex = null
        this.orderLineToCopy = null
        this.selectedRelation = null
        this.orderLineToRemove = null
        this.allRelations = []
        this.beneficiaryList = []
        this.multiSelectConfigCountry = new SearchableSelectConfig('enName',
          'labels.country', '', false,
          false, true, false, false)
        this.singleSelectConfig = new SearchableSelectConfig('email',
          'labels.relation', '', false,
          false, true, false, false)
    }

    @Watch('order', {immediate: true, deep:true})
    public updateCart(newVal:any){
      if(newVal && newVal.id){
        this.orderCopy = newVal
        let beneficiaryList:any = []
        newVal.orderLines.forEach((line:IOrderLine) => {
          if(line.orderLineBeneficiary && line.orderLineBeneficiary.id) {
            let benefInd = beneficiaryList.findIndex((e:any) => e.relationId === line.orderLineBeneficiary?.beneficiaryRelationId)
            if(benefInd === -1){
              beneficiaryList.push(line)
            } else {
              let additionalProd = [line.orderProduct?.productName].concat(beneficiaryList.additionalProducts)
              beneficiaryList.additionalProducts = additionalProd
            }
          } else {
            beneficiaryList.push(line)
          }
        })
        this.beneficiaryList = beneficiaryList
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
    public saveBeneficiary(){
        this.selectedOrderLine.beneficiaryDeliveryAddress = this.selectedBeneficiaryAddress;
          this.orderLineService.put(this.selectedOrderLine).then((resp:AxiosResponse) => {
            if(resp && resp.data) {
              if(this.orderCopy.orderLines)
              this.orderCopy.orderLines[this.selectedOrderLineIndex] = resp.data;
              this.$emit('updateCart', this.orderCopy);
              this.closeEditModal();
              this.setAlert('beneficiaryUpdated', 'success')
            } else {
              this.setAlert('updateBeneficiaryError', 'error')
            }
          })
    }

    public removeBeneficiary(){
        let self = this;
      let orderLines:any = []
      if(this.orderCopy.orderLines){
      this.orderLineService.delete(this.orderCopy.orderLines[this.orderLineToRemove].id).then((resp:AxiosResponse) => {
        if(resp) {
          if(this.orderCopy.orderLines)
          orderLines = this.orderCopy.orderLines.filter(function (item, ind) {
            return ind !== self.orderLineToRemove;
          });
          this.orderCopy.orderLines = orderLines;
          this.setAlert('beneficiaryRemoved', 'success')
          this.$emit('updateCart', this.orderCopy);
          this.closeRemoveModal();
        } else {
          this.setAlert('beneficiaryRemoveError', 'error')
          this.closeRemoveModal();
        }
      })
      }
    }
    public addCountry(country:any){
        this.selectedCountry = country;
    }
    public removeCountry(country:any){
        this.selectedCountry = null;
    }
    public closeRemoveModal(){
      //@ts-ignore
      $(this.$refs.removeBeneficiary).modal('hide');
    }
    public closeEditModal(){
      //@ts-ignore
      $(this.$refs.editBeneficiary).modal('hide');
    }

}
