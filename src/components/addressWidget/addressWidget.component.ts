import Component, {mixins} from 'vue-class-component'
import {Vue, Watch} from 'vue-property-decorator'
import {AddressType, IRelationAddress, RelationAddress} from "@/shared/models/relation-address.model";
import CommonHelpers from "@/shared/commonHelpers";
import { ICountry } from '@/shared/models/country.model';
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";

@Component({
  components:{
    ToggleSwitch,
    SearchableSelectComponent
  },
  props: {
    address: Object
  }
})
export default class AddressWidgetComponent extends mixins(CommonHelpers, Vue) {

  public addressCopy: IRelationAddress;
  public addressTypes: any;
  public searchableConfig: ISearchableSelectConfig;
  public editMode: boolean;
  public showMore: boolean;
  public newAddress: boolean;
  public selectedCountry: ICountry|null

  constructor() {
    super();
    this.addressTypes = {
      home: AddressType.HOME,
      other: AddressType.OTHER,
      postal: AddressType.POSTAL,
      work: AddressType.WORK,
    }
    this.searchableConfig = new SearchableSelectConfig('enName',
      'labels.country', '', true,
      false, false, false, false)
    this.editMode = false
    this.newAddress = false
    this.showMore = false
    this.selectedCountry = null
    this.addressCopy = new RelationAddress()
  }

  @Watch('address', {immediate: true, deep: true})
  public populate(newVal: any) {
    if (newVal) {
      this.addressCopy = newVal
      if(newVal && !newVal.id){
        this.newAddress = true
        this.selectedCountry = this.preselectCountry(150)
        this.addressCopy.countryId = this.preselectCountry(150).id
      } else {
        this.selectedCountry = this.preselectCountry(newVal.countryId)
      }
    }
  }

  public countryChanged(country:any) {
    this.selectedCountry = country
    this.addressCopy.countryId = country ? country.id : this.selectedCountry?.id
  }
  public validatePostalCode() {
    //TODO
  }

  public edit(entity: any) {
    this.editMode = true
    this.$emit('onEdit', this.addressCopy)
  }

  public remove() {
    this.$emit('onRemove', this.addressCopy)
  }
  public cancel() {
    this.$emit('onCancel')
    this.editMode = false
    this.newAddress = false
    if(!this.addressCopy.id) this.remove()
  }
  public save() {
    this.$validator.validateAll().then(resp=>{
      if(resp){
        this.$emit('onSave', this.addressCopy)
        this.cancel()
      }
    })
  }
}
