import {Component, Vue, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {IRelationEntity, RelationEntity} from "@/shared/models/relationms/relationModel";
import {AxiosResponse} from "axios";
import RelationService from "@/shared/services/relationService";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {RelationProfile} from "@/shared/models/relationms/relation-profile.model";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import {Company, ICompany} from "@/shared/models/relationms/company.model";
import {RelationAddress} from "@/shared/models/relationms/relation-address.model";
import CustomerBillingAddress from "@/shared/models/orderms/CustomerBillingAddressModel";
import CustomerDeliveryAddress from "@/shared/models/orderms/CustomerDeliveryAddressModel";
import {Beneficiary} from "@/shared/models/beneficiary.model";
import {Country} from "@/shared/models/administrationms/country.model";
import RelationAddressService from "@/shared/services/relationAddressService";
import {PhoneType} from "@/shared/models/relationms/company-phone.model";
import companyService from "@/shared/services/companyService";
import * as validateVatNumber from '@/shared/vatValidator'
@Component({
  props: {
    cartOrder: Object
  },
  components: {
    SearchableSelectComponent,
    ToggleSwitch
  }
})
export default class Step1Component extends mixins(CommonHelpers, Vue) {
  $refs!: {
    addNewBeneficiary: HTMLElement,
    addCompany: HTMLElement,
    removeBeneficiaryConfirm: HTMLElement
  }
  public singleSelectConfig: ISearchableSelectConfig
  public singleSelectConfigCompany: ISearchableSelectConfig
  public searchableConfig: ISearchableSelectConfig
  public cartOrderCopy: ICartOrder
  public newBeneficiary: any
  public relationService: any
  public selectedDeliveryCountry: any
  public beneficiaryEmailContent: any
  public companyService: any
  public applicableTax: any
  public phoneTypes: any
  public selectedCompany: any
  public beneficiaryToDelete: any
  public selectedCountryBeneficiary: any
  public addressToUseInInvoice: any
  public selectedBillingCountry: any
  public selectedBeneficiaryRelation: any
  public addressToUseInInvoiceBeneficiary: any
  public beneficiaryAddress: any
  public isCompany: boolean
  public createNewBeneficiary: boolean
  public isDeliveryBilling: boolean
  public allRelations: any[]
  public allCompanies: any[]
  public beneficiaryList: any[]
  public selectedRelation: IRelationEntity
  public timer: any
  public newBeneficiaryError: any
  public relationAddressService: any
  public beneficiaryIndexToEdit: any
  public newCompanyCountry: any
  public newCompanyError: any
  public newCompany: ICompany

  constructor() {
    super()
    this.cartOrderCopy = new CartOrder()
    this.newCompany = new Company()
    this.singleSelectConfig = new SearchableSelectConfig('email',
      'labels.typeInToSearch', '', false,
      false, true, false, false, false, true)
    this.singleSelectConfigCompany = new SearchableSelectConfig('name',
      'labels.chooseCompany', 'buttons.addNew', false,
      true, true, false, false, false, true)
    this.searchableConfig = new SearchableSelectConfig('enName',
      'labels.chooseCountry', '', false,
      false, true, false, false)
    this.allRelations = []
    this.beneficiaryList = []
    this.allCompanies = []
    this.timer = null
    this.phoneTypes = {
      home: PhoneType.HOME,
      work: PhoneType.WORK,
      mobile: PhoneType.MOBILE
    }
    this.beneficiaryIndexToEdit = null
    this.selectedBillingCountry = null
    this.relationAddressService = RelationAddressService.getInstance()
    this.companyService = companyService.getInstance()
    this.beneficiaryToDelete = null
    this.selectedDeliveryCountry = null
    this.selectedCountryBeneficiary = new Country()
    this.newCompanyCountry = new Country()
    this.selectedBeneficiaryRelation = new RelationEntity(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, new RelationProfile())
    this.newBeneficiary = new Beneficiary()
    this.beneficiaryAddress = new RelationAddress()
    this.beneficiaryEmailContent = ''
    this.newCompanyError = ''
    this.newBeneficiaryError = ''
    this.applicableTax = 'reverse'
    this.addressToUseInInvoice = 'relation'
    this.addressToUseInInvoiceBeneficiary = 'relation'
    this.selectedCompany = new Company()
    this.createNewBeneficiary = false
    this.isCompany = false
    this.isDeliveryBilling = true
    this.selectedRelation = new RelationEntity()
    this.relationService = RelationService.getInstance()
  }

  @Watch('cartOrder', {immediate: true, deep: true})
  public updateCartOrder(newVal: any) {
    if (newVal) {
      this.cartOrderCopy = newVal
    }
  }

  @Watch('cartOrder.customerBillingAddress', {immediate: true, deep: true})
  public updateCustomerBillingAddr(newVal: any) {
    if (newVal) {
      this.selectedBillingCountry = this.preselectCountry(newVal.countryId ? newVal.countryId : 150)
      if (this.isDeliveryBilling) {
        let addr = newVal
        let relAddrId = newVal.id
        addr.id = undefined
        addr.version = undefined
        addr.administrationId = undefined
        addr.createdOn = undefined
        addr.updatedOn = undefined
        this.cartOrderCopy.customerDeliveryAddress = new CustomerDeliveryAddress(undefined, undefined, undefined, undefined,
          undefined, this.cartOrderCopy.orderCustomer?.relationId, relAddrId, addr.street, addr.houseNumber, addr.city,
          addr.countryId, addr.entranceNumber, addr.appartmentNumber, addr.postalCode, addr.addressType, undefined, undefined, undefined)
      }
    }
  }
  @Watch('createNewBeneficiary', {immediate: true, deep: true})
  public updateCreateNewBeneficiary(newVal: any) {
    if (newVal) {
     this.selectedBeneficiaryRelation = new RelationEntity(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, new RelationProfile())
    }
  }

  @Watch('isDeliveryBilling', {immediate: true, deep: true})
  public updateIsDeliveryBilling(newVal: any) {
    if (!newVal) {
      this.cartOrderCopy.customerDeliveryAddress = new CustomerDeliveryAddress()
    } else {
      this.cartOrderCopy.customerDeliveryAddress = this.cartOrderCopy.customerBillingAddress
    }
  }

  @Watch('addressToUseInInvoiceBeneficiary', {immediate: true, deep: true})
  public updateAddressToUseInInvoiceBeneficiary(newVal: any) {
    if(newVal === 'new'){
      this.beneficiaryAddress = new RelationAddress()
    } else {
      if (this.selectedBeneficiaryRelation && this.selectedBeneficiaryRelation.relationAddresses && this.selectedBeneficiaryRelation.relationAddresses.length) {
        let delAddrIndex = this.selectedBeneficiaryRelation.relationAddresses.findIndex((e: any) => e.usedForDelivery === true)
        if (delAddrIndex > -1) {
          this.beneficiaryAddress = this.selectedBeneficiaryRelation.relationAddresses[delAddrIndex]
        } else {
          this.beneficiaryAddress = this.selectedBeneficiaryRelation.relationAddresses[0]
        }
      this.selectedCountryBeneficiary = this.preselectCountry(this.beneficiaryAddress.countryId)
      }
    }
  }

  @Watch('selectedRelation', {immediate: true, deep: true})
  public watchRelationChange(newVal: any) {
    if (newVal && newVal.id) {
      this.singleSelectConfigCompany.enableAdd = true
    } else {
      this.singleSelectConfigCompany.enableAdd = false
    }
  }

  @Watch('isCompany', {immediate: true, deep: true})
  public isCompanyWatcher(newVal: any) {
    if (!newVal) {
      this.allCompanies = []
      this.selectedCompany = new Company()
      if (this.addressToUseInInvoice === 'company') {
        this.cartOrderCopy.customerBillingAddress = new CustomerBillingAddress()
        this.selectedBillingCountry = null
        this.addressToUseInInvoice = 'relation'
      }
    } else {
      if (this.selectedRelation && this.selectedRelation.companies){
        this.addressToUseInInvoice = 'company'
        this.allCompanies = this.selectedRelation.companies
      }
    }
  }

  @Watch('addressToUseInInvoice', {immediate: true, deep: true})
  public addressToUseInInvoiceWatcher(newVal: any) {
    switch (newVal) {
      case 'relation':
        if (this.selectedRelation.relationAddresses && this.selectedRelation.relationAddresses.length) {
          let addr = this.getCustomerBillingAddress(this.selectedRelation.relationAddresses)
          let relAddrId = addr.id
          addr.id = undefined
          addr.udaptedOn = undefined
          addr.createdOn = undefined
          addr.version = undefined
          addr.administrationId = undefined
          this.cartOrderCopy.customerBillingAddress = new CustomerBillingAddress(undefined, undefined, undefined, undefined,
            undefined, this.cartOrderCopy.orderCustomer?.relationId, relAddrId, addr.street, addr.houseNumber, addr.city,
            addr.countryId, addr.entranceNumber, addr.appartmentNumber, addr.postalCode, addr.addressType, undefined, undefined, undefined)
          this.selectedBillingCountry = this.preselectCountry(this.getCustomerBillingAddress(this.selectedRelation.relationAddresses).countryId)
        } else {
          this.selectedBillingCountry = null
          this.cartOrderCopy.customerBillingAddress = new CustomerBillingAddress()
        }
        break;
      case 'company':
        if (this.selectedCompany && this.selectedCompany.id) {
          this.cartOrderCopy.customerBillingAddress = {
            street: this.selectedCompany.addressStreet,
            houseNumber: this.selectedCompany.addressHouseNumber,
            city: this.selectedCompany.city,
            countryId: this.selectedCompany.countryId,
            postalCode: this.selectedCompany.postalCode,
          }
          this.selectedBillingCountry = this.preselectCountry(this.selectedCompany.countryId)
        } else {
          this.selectedBillingCountry = null
          this.cartOrderCopy.customerBillingAddress = new CustomerBillingAddress()
        }
        break;
      case 'new':
        this.cartOrderCopy.customerBillingAddress = new CustomerBillingAddress()
        this.selectedBillingCountry = null
        break;
      case 'default':
        if (this.selectedRelation.relationAddresses && this.selectedRelation.relationAddresses.length)
          this.cartOrderCopy.customerBillingAddress = this.selectedRelation.relationAddresses[0]
        break;
    }
  }

  public mounted() {
    this.selectedRelation.relationProfile = new RelationProfile()
    if (!this.cartOrderCopy.customerBillingAddress)
      this.cartOrderCopy.customerBillingAddress = new CustomerBillingAddress()
    this.selectedCompany = new Company()
  }

  public relationsChanged(rel: any) {
    if (rel) {
      this.selectedRelation = rel
      if (rel.relationAddresses){
        let addr:any = this.getCustomerBillingAddress(rel.relationAddresses)
        const relAddrId = addr.id
        addr.id = undefined
        addr.udaptedOn = undefined
        addr.createdOn = undefined
        addr.version = undefined
        addr.administrationId = undefined
        this.cartOrderCopy.customerBillingAddress = new CustomerBillingAddress(undefined, undefined, undefined, undefined,
          undefined, this.cartOrderCopy.orderCustomer?.relationId, relAddrId, addr.street, addr.houseNumber, addr.city,
          addr.countryId, addr.entranceNumber, addr.appartmentNumber, addr.postalCode, addr.addressType, undefined, undefined, undefined)
      }
      if (rel.companies)
        this.allCompanies = rel.companies
      else this.allCompanies = []
    }
  }

  public getCustomerBillingAddress(addresses: any) {
    let index = addresses.findIndex((e: any) => e.usedForBilling === true)
    if (index > -1) {
      this.selectedBillingCountry = this.preselectCountry(addresses[index].countryId)
      return addresses[index]
    } else {
      if(addresses && addresses[0]) {
        this.selectedBillingCountry = this.preselectCountry(addresses[0].countryId)
        return addresses[0]
      } else {
        this.selectedBillingCountry = this.preselectCountry(150)
        return new RelationAddress()
      }
    }
  }

  public doSearch(rel: any) {
    if(!rel && rel.length > 2) return
    const queryArray: any = []
    queryArray.push({
        mainOperator: 'or',
        children: [{
          key: 'email',
          value: rel,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }]
      },
      {
        mainOperator: 'or',
        children: [{
          key: 'relationProfile.firstName',
          value: rel,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }]
      })
    let finalQ = this.queryBuilder(queryArray)
    this.populateRelations(finalQ)
  }

  public populateRelations(query?: any) {
    const self = this
    const pagination = {
      page: 0,
      size: 100,
      sort: 'id,asc'
    }
    this.relationService.getAll(pagination, query ? query : undefined).then((resp: AxiosResponse) => {
      if (resp && resp.data) {
        Vue.nextTick(function () {
          self.allRelations = resp.data.content
        })
      }
    })
  }

  public searchRelation(rel: any) {
    if(rel.id) return
    if(rel.length < 3) return;
    const self = this
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      self.doSearch(rel)
    }, 500);
  }

  public removeRelation(rel: any) {
    this.selectedRelation = new RelationEntity()
    this.selectedRelation.relationProfile = new RelationProfile()
  }

  public addBeneficiaryRelation(rel: any) {
    if (rel) {
      this.selectedBeneficiaryRelation = rel
      if (rel.relationAddresses.length) {
        let delAddrIndex = rel.relationAddresses.findIndex((e: any) => e.usedForDelivery === true)
        if (delAddrIndex > -1) {
          this.beneficiaryAddress = rel.relationAddresses[delAddrIndex]
        } else {
          this.beneficiaryAddress = rel.relationAddresses[0]
        }
        this.selectedCountryBeneficiary = this.preselectCountry(this.beneficiaryAddress.countryId)
      }
      //this.beneficiaryList.push(rel)
    }
  }

  public removeBeneficiaryRelation(rel: any) {
    this.selectedBeneficiaryRelation = new RelationEntity(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, new RelationProfile())
    let index = this.beneficiaryList.findIndex((e) => e.id === rel.id)
    if (index > -1) {
      this.beneficiaryList.splice(index, 1)
    }
  }

  public companyChanged(comp: any) {
    if (comp) {
      this.selectedCompany = comp
      if (this.addressToUseInInvoice === 'company') {
        this.cartOrderCopy.customerBillingAddress = {
          street: comp.addressStreet,
          houseNumber: comp.addressHouseNumber,
          city: comp.city,
          countryId: comp.countryId,
          postalCode: comp.postalCode,
        }
        this.selectedBillingCountry = this.preselectCountry(comp.countryId)
      }
    }
  }

  public removeCompany(comp: any) {
    this.selectedCompany = new Company()
  }

  public billingCountryChanged(country: any) {
    this.selectedBillingCountry = country
    if (this.cartOrderCopy.customerBillingAddress && country && country.id) {
      this.cartOrderCopy.customerBillingAddress.countryId = country.id
    }
  }

  public billingCountryRemoved(country: any) {
    this.selectedBillingCountry = null
  }
  public companyCountryChanged(country: any) {
    if(!country) return
    this.newCompanyCountry = country
    this.newCompany.countryId = country.id
  }
  public urlValidate () {
    if (this.newCompany.website && !this.$validator.errors.has('company-website')) {
      this.newCompany.website = this.checkForUrlHttps(this.newCompany.website)
    }
  }
  public async validateVat () {
    try {
      if (this.newCompany.vatNumber != null) {
        let result = validateVatNumber.checkVATNumber(this.newCompany.vatNumber)
        if (result) {
          this.newCompanyError = ''
        } else {
          this.newCompanyError = this.$t('labels.vatNumberNotValid')
        }
      }
    } catch (e) {
      this.newCompanyError = e
    }
  }
  public companyCountryRemoved(country: any) {
    this.newCompanyCountry = null
  }

  public addCountryBeneficiary(country: any) {
    this.selectedCountryBeneficiary = country
    if (this.beneficiaryAddress && country && country.id) {
      this.beneficiaryAddress.countryId = country.id
    }
  }

  public removeCountryBeneficiary(country: any) {
    this.selectedCountryBeneficiary = null
  }

  public deliveryCountryChanged(country: any) {
    this.selectedDeliveryCountry = country
    if (this.cartOrderCopy.customerDeliveryAddress && country && country.id) {
      this.cartOrderCopy.customerDeliveryAddress.countryId = country.id
    }
  }

  public deliveryCountryRemoved(country: any) {
    this.selectedDeliveryCountry = null
  }

  public addNewBeneficiary() {
    this.newBeneficiary = new Beneficiary()
    this.selectedBeneficiaryRelation = new RelationEntity(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, new RelationProfile())
    this.beneficiaryAddress = new RelationAddress()
  }

  public editBeneficiary(item: any, index:number) {
    this.beneficiaryIndexToEdit = index
      this.selectedBeneficiaryRelation = item
      if(item.relationAddresses && item.relationAddresses.length) {
        let addrIndex = item.relationAddresses.findIndex((e:any)=>e.usedForDelivery === true)
        if(addrIndex > -1) {
          this.beneficiaryAddress = item.relationAddresses[addrIndex]
          this.selectedCountryBeneficiary = this.preselectCountry(item.relationAddresses[addrIndex].countryId)
        } else {
          this.beneficiaryAddress = item.relationAddresses[0]
          this.selectedCountryBeneficiary = this.preselectCountry(item.relationAddresses[0].countryId)
        }
      } else this.beneficiaryAddress = new RelationAddress()
  }

  public deleteBeneficiary(index: any) {
    this.beneficiaryToDelete = index
  }

  public deleteBeneficiaryConfirmed() {
    if(this.beneficiaryToDelete > -1){
      this.beneficiaryList.splice(this.beneficiaryToDelete , 1)
      this.beneficiaryToDelete = null
      // @ts-ignore
      $(this.$refs.removeBeneficiaryConfirm).modal('hide')
    }
  }

  public saveNewBeneficiary() {
    this.validateBeneficiary().then((resp:any)=>{
      if(resp.status){
        if(this.createNewBeneficiary){
          this.selectedBeneficiaryRelation.relationAddresses = [this.beneficiaryAddress]
          this.selectedBeneficiaryRelation.username = 'default_' + Math.random()
          this.selectedBeneficiaryRelation.password = Math.random()
          this.selectedBeneficiaryRelation.tfaEnabled = false
          this.relationService.post(this.selectedBeneficiaryRelation).then((resp:AxiosResponse) => {
            if(resp){
              this.setAlert('relationCreated', 'success')
              this.beneficiaryList.push(resp.data)
              // @ts-ignore
              $(this.$refs.addNewBeneficiary).modal('hide')
            } else {
              this.setAlert('relationCreateError', 'error')
            }
          })
        } else {
          if(this.beneficiaryIndexToEdit !== null) {
            this.beneficiaryList[this.beneficiaryIndexToEdit] = this.selectedBeneficiaryRelation
            this.beneficiaryIndexToEdit = null
          } else this.beneficiaryList.push(this.selectedBeneficiaryRelation)
          // @ts-ignore
          $(this.$refs.addNewBeneficiary).modal('hide')
        }
      } else {
        this.newBeneficiaryError = resp.msg
      }
    })
  }

  public getBeneficiaryAddress(item: any) {
    let street, houseNumber, city = '';
    let country = null;
    if (item.relationAddresses) {
      street = item.relationAddresses[0] && item.relationAddresses.street ? item.relationAddresses.street : '';
      houseNumber = item.relationAddresses[0] && item.relationAddresses.houseNumber ? item.relationAddresses.houseNumber : '';
      city =item.relationAddresses[0] && item.relationAddresses.city ? item.relationAddresses.city : '';
        country = this.getCountryById(this.beneficiaryAddress.countryId);
    }
    if (!country) {
      country = {
        enName: ''
      };
    }
    return street ? street : '' + ' ' + houseNumber ? houseNumber : '' + ', ' + city ? city : ''+ ' ' + country && country.enName ? country.enName : '';
  }

  public validateStep(){
    let self = this
    return new Promise(resolve => {
      let address = this.validateAddress(this.cartOrderCopy.customerDeliveryAddress)

      if(!self.selectedRelation.email) {
        resolve({status: false, msg: self.$t('labels.noCustomerSelected')})
      } else {
        if(self.selectedRelation.relationProfile && !self.selectedRelation.relationProfile.lastName){
          resolve({status: false, msg: self.$t('labels.noCustomerLastName')})
        } else if(self.selectedRelation.relationProfile && !self.selectedRelation.email){
          resolve({status: false, msg: self.$t('labels.noCustomerEmail')})
        }
      }
      if(self.isCompany) {
        if(!this.selectedCompany.id){
          resolve({status: false, msg: self.$t('labels.pleaseSelectCompany')})
        }
      }
      if(!address.status){
        resolve({status: false, msg: address.msg})
      }
      if(!self.isDeliveryBilling){
        let deliveryAddr = self.validateAddress(this.cartOrderCopy.customerDeliveryAddress)
        if(!deliveryAddr.status) {
          resolve({status: false, msg: address.msg})
        }
      }
      resolve({status: true})
    })
  }

  public validateBeneficiary(){
    let self = this
    return new Promise(resolve => {
      if(!self.selectedBeneficiaryRelation.email){
        resolve({status: false, msg: self.$t('labels.noCustomerSelected')})
      } else {
        if(self.selectedBeneficiaryRelation.relationProfile && !self.selectedBeneficiaryRelation.relationProfile.lastName){
          resolve({status: false, msg: self.$t('labels.noCustomerLastName')})
        } else if(self.selectedBeneficiaryRelation.relationProfile && !self.selectedBeneficiaryRelation.email){
          resolve({status: false, msg: self.$t('labels.noCustomerEmail')})
        }
      }
      let addr = self.validateAddress(self.beneficiaryAddress)
      if(!addr.status){
        resolve({status: false, msg: addr.msg})
      } else {
        resolve({status: true})
      }
    })
  }
  public createNewCompany(){
    //@ts-ignore
    $(this.$refs.addCompany).modal('show')
  }
  public saveRelationCompany(comp:any){
    if (this.selectedRelation.companies && this.selectedRelation.companies.length) {
      this.selectedRelation.companies.push({ id: comp.id, version: comp.version })
    } else {
      this.selectedRelation.companies = [{ id: comp.id, version: comp.version }]
    }
    const dto = this.selectedRelation
    this.relationService.put(dto).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('companyCreated', 'success')
        this.allCompanies.push(resp.data)
        this.selectedCompany = resp.data
        //@ts-ignore
        $(this.$refs.addCompany).modal('hide')
      } else {
        this.setAlert('companyCreateError', 'error')
      }
    })
  }
  public saveNewCompany(){
    this.$validator.validateAll('newCompanyForm').then(resp => {
      if(resp && this.newCompanyError === '') {
        this.newCompany.business = {
          id: this.$store.state.lookups.administrationBusiness[0].id,
          version: this.$store.state.lookups.administrationBusiness[0].version
        }
        this.newCompany.alias = this.newCompany.name
        this.companyService.post(this.newCompany).then((resp: AxiosResponse) => {
          if (resp) {
            this.saveRelationCompany(resp.data)
          } else {
            this.setAlert('companyCreateError', 'error')
          }
        })
      }
    })
  }
}
