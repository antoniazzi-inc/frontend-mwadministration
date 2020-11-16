import {Component, Vue, Watch} from "vue-property-decorator";
import {IPromotion, Promotion} from "@/shared/models/productms/PromotionModel";
import {AxiosResponse} from "axios";
import attributevaluesService from "@/shared/services/attribute-valuesService";
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {TypeBundleBased} from "@/shared/models/productms/TypeBundleBasedModel";
import {Discount} from "@/shared/models/productms/DiscountModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import attributesService from "@/shared/services/attributesService";
import typebundlebasedsService from "@/shared/services/type-bundle-basedsService";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {MoneyConfig} from "@/shared/models/moneyConfig";
import Store from "@/store";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";

@Component({
  props: {
    promotion: Object
  },
  components: {
    SearchableSelectComponent,
    ToggleSwitch
  },
  mounted() {

  }
})
export default class BundleBasedTabComponent extends mixins(CommonHelpers, Vue) {
  $refs!: {
    removeEntity: HTMLElement
  }
  public editMode: boolean
  public promotionCopy: IPromotion
  public selectedBundle: any
  public itemToDelete: any
  public selectedBundleIndex: any
  public wholeOrder: boolean
  public selectedDiscountType: any
  public discountQuantityAmount: any
  public multiSelectConfigProduct: ISearchableSelectConfig
  public multiSelectConfigAttributeValue: ISearchableSelectConfig
  public multiSelectConfigAttribute: ISearchableSelectConfig
  public attributeValueService: any
  public attributeService: any
  public typeBundleBasedService: any
  public discountPriceAmount: any
  public bundleToDelete: any
  public productService: any
  public moneyPercentage: any
  public singleSelectConfig: any
  public selectedProduct: any
  public useMoreDecimalst: boolean
  public money: any
  public allBundles: any[]
  public productText: any[];
  public allItems: any[];
  public attributesTexts: any[];
  public allDiscountTypes: any[];
  constructor() {
    super();
    this.editMode = false
    this.multiSelectConfigProduct = new SearchableSelectConfig('label',
      'labels.chooseProduct', '', true,
      false, false, false, false, false, false)
    this.multiSelectConfigAttributeValue = new SearchableSelectConfig('name',
      'labels.chooseFeatureValue', '', false,
      false, false, false, false, false, false)
    this.multiSelectConfigAttribute = new SearchableSelectConfig('label',
      'labels.chooseFeature', '', false,
      false, false, false, false, false, false)
    this.promotionCopy = new Promotion()
    this.selectedBundle = null
    this.itemToDelete = null
    this.bundleToDelete = null
    this.discountQuantityAmount = null
    this.useMoreDecimalst = false
    this.wholeOrder = false
    this.selectedBundleIndex = null
    this.selectedProduct = null
    this.selectedDiscountType = null
    this.discountPriceAmount = 0
    this.attributeValueService = attributevaluesService.getInstance()
    this.attributeService = attributesService.getInstance()
    this.typeBundleBasedService = typebundlebasedsService.getInstance()
    this.allBundles = []
    this.productText = []
    this.singleSelectConfig = new SearchableSelectConfig('label',
      'chooseProduct', '', false,
      false, false, false, false)
    this.allItems = []
    this.attributesTexts = []
    this.money = new MoneyConfig(',', '.', Store.state.currency, '', 2, false)
    this.moneyPercentage = new MoneyConfig(',', '.', '', ' %', 2, false)
    this.allDiscountTypes = [{
      id: 1,
      name: 'percentage',
      label: 'percentage'
    }, {
      id: 2,
      name: 'fixed',
      label: 'fixedAmount'
    }, {
      id: 3,
      name: 'noShipping',
      label: 'noShipping'
    }, {
      id: 4,
      name: 'freeItems',
      label: 'freeItems'
    }]
  }

  @Watch('promotion', {immediate: true, deep: true})
  public updatePromo(newVal: IPromotion) {
    let self = this;
    if (newVal) {
      this.promotionCopy = newVal
      if (newVal.typeBundleBaseds && newVal.typeBundleBaseds.length) {
        this.allBundles = newVal.typeBundleBaseds;
      }
    }
  }
  @Watch('useMoreDecimalst', {immediate: true, deep: true})
  public updateUseMoreDecimalst(newVal: any) {
    this.money.precision = newVal ? 3 : 2
  }
  public mounted() {
    this.allBundles = this.$props.promotion.typeBundleBaseds ? this.$props.promotion.typeBundleBaseds : [];
    this.promotionCopy = this.$props.promotion;
  }
  public previousState() {
      this.editMode = false
  }
  public getSelectedProducts(id:number, index:number){
    return new Promise(resolve => {
      let prodIndex = this.$store.state.lookups.products.findIndex((p:any)=> p.value.id === id)
      if(prodIndex > -1){
        resolve(this.$store.state.lookups.products[prodIndex]);
      }
    });

  }
  public getSelectedProductsAttributes(id:any, index:any) {
    let self = this;
    return new Promise(resolve => {
      let prodIndex = this.$store.state.lookups.products.findIndex((p:any)=> p.value.id === id)
      if(prodIndex > -1){
        let attr:any = [];
        let allAttr:any = [];
        const prod = this.$store.state.lookups.products[prodIndex].value
        $.each(prod.attributes, function (i, j) {
          self.attributeService.get(j.id).then((attribute:AxiosResponse) => {
            allAttr.push({
              label: self.getMultiLangName(prod.productLanguages).name + ' - ' + self.getMultiLangName(j.attributeLanguages).name,
              value: j,
              product: prod
            });
            attr.push({
              label: self.getMultiLangName(attribute.data.attributeLanguages).name,
              value: attribute.data
            });
          });
        });
        resolve({allAttributes: allAttr, selectedAttr: attr});
      }
    });
  }
  public getSelectedProductsAttributeValues(id:any, index:any) {
    let self = this;
    return new Promise(resolve => {
      let prodIndex = this.$store.state.lookups.products.findIndex((p:any)=> p.value.id === id)
      if(prodIndex > -1){
        const prod = this.$store.state.lookups.products[prodIndex].value
        let attrValue:any = [];
        let allAttributeValues:any = [];
        $.each(prod.attributes, function (i, j) {
          self.attributeService.get(j.id).then((attribute:AxiosResponse) => {
            $.each(j.attributeValues, function (k, v) {
              allAttributeValues.push({
                name: self.getMultiLangName(attribute.data.attributeLanguages).name + ' - ' + self.getMultiLangName(v.attributeValueLanguages).name,
                value: v
              });
            });
            attrValue.push({
              name: self.getMultiLangName(attribute.data.attributeLanguages).name,
              value: attribute.data
            });
          });
        });
        resolve({allAttributesValues: allAttributeValues, selectedAttributeValue: attrValue});
      }
    });
  }
  public editBundle(bundle: any, index: number) {
    let self = this;
    this.allItems = [];
    let items:any = [];
    if(bundle.itemsJson && bundle.itemsJson.products && bundle.itemsJson.products.length && !bundle.itemsJson.attributeValues) {
       $.each(bundle.itemsJson.products, function (k, v) {
        self.getSelectedProducts( v.id, index).then(selectedProducts => {
          self.getSelectedProductsAttributes( v.id, index).then(resp => {
            Vue.nextTick(function () {
              items.push({
                allProducts: self.$store.state.lookups.products,
                selectedProducts: selectedProducts,
                //@ts-ignore
                allAttributes: resp.allAttributes,
                selectedAttributes: null,
                allAttributeValues: [],
                selectedAttributeValues: null,
                selectedBundleQuantity: v.quantity
              });
              Vue.nextTick(function () {
                self.$set(self, 'selectedBundle', JSON.parse(JSON.stringify(bundle)));
                self.$set(self, 'allItems', items);
              });
            })
          });
        });
      });
    }

    if(bundle.itemsJson.attributeValues && bundle.itemsJson.attributeValues.length) {
      $.each(bundle.itemsJson.attributeValues, function (k, v) {
        let selectedProduct = null
        let allAttrs:any = []
        let allAttrVals:any = []
        let selectedAttrValues:any = []
        let selectedAttr:any = []
          self.$store.state.lookups.products.forEach((prod:any) => {
            if(prod.value.attributes && prod.value.attributes.length) {
              prod.value.attributes.forEach((attr:any)=> {
                let ind = attr.attributeValues.findIndex((attrValue:any)=> attrValue.id === v.id)
                if(ind > -1){
                  selectedProduct = prod
                  prod.value.attributes.forEach((attr:any) => {
                    if(prod.value.attributes.attributeValues)
                    prod.value.attributes.attributeValues.forEach((attrV:any) => {

                    })
                  })
                  prod.value.attributes.forEach((attr:any) => {
                    allAttrs.push({
                      label: self.getMultiLangName(prod.value.productLanguages).name + ' - ' +self.getMultiLangName(attr.attributeLanguages).name,
                      value: attr,
                      product: prod
                    })
                    attr.attributeValues.forEach((attrV:any)=>{
                      allAttrVals.push({
                        name: self.getMultiLangName(prod.value.productLanguages).name + ' - ' + self.getMultiLangName(attr.attributeLanguages).name + ' - ' + self.getMultiLangName(attrV.attributeValueLanguages).name,
                        value: attrV,
                        product: prod
                      })
                    })
                  })
                   selectedAttrValues.push({
                    name: self.getMultiLangName(attr.attributeValues[ind].attributeValueLanguages).name,
                    value: attr.attributeValues[ind],
                    product: prod
                  })
                   selectedAttr.push({
                    label: self.getMultiLangName(attr.attributeLanguages).name,
                    value: attr,
                    product: prod
                  })
                }
              })
            }
          })
        items.push({
          allProducts: self.$store.state.lookups.products,
          selectedProducts: selectedProduct,
          //@ts-ignore
          allAttributes: allAttrs,
          //@ts-ignore
          selectedAttributes: selectedAttr,
          //@ts-ignore
          allAttributeValues: allAttrVals,
          //@ts-ignore
          selectedAttributeValues: selectedAttrValues,
          selectedBundleQuantity: v.quantity
        });
      });
      Vue.nextTick(function () {
        self.$set(self, 'selectedBundle', JSON.parse(JSON.stringify(bundle)));
        self.$set(self, 'allItems', items);
      });
    } else {
      Vue.nextTick(function () {
        self.$set(self, 'selectedBundle', JSON.parse(JSON.stringify(bundle)));
        self.$set(self, 'allItems', items);
      });
    }
    this.populateDiscount(bundle)
    this.selectedBundleIndex = index;
    this.editMode = true;
  }

  public populateDiscount(bundle: any) {
    let discountType:any = this.getDiscountTypeString(bundle)
    this.selectedDiscountType = this.allDiscountTypes.find((e:any)=> e.name === discountType.name).id
    this.wholeOrder = bundle.discount.entireOrder
    if(discountType.id === 1){
      this.discountPriceAmount = bundle.discount.percentage
    } else if(discountType.id === 2) {
      this.discountPriceAmount = bundle.discount.fixed
    } else if(discountType.id === 4) {
      let selectedProd = this.$store.state.lookups.products.find((prod:any)=> prod.value.id === bundle.discount.freeItemsJson.products[0].id)
      this.discountQuantityAmount = bundle.discount.freeItemsJson.products[0].quantity
      this.addDiscountProduct(selectedProd)
    }
  }
  public copyBundle(item: any, index: number) {
    item.id = null;
    item.discount.id = undefined;
    item.discount.administrationId = null;
    item.discount.version = null;
    item.discount.createdOn = null;
    item.discount.updatedOn = null;
    this.typeBundleBasedService.post(item).then((resp:AxiosResponse) => {
      this.allItems.push(resp.data);
      this.$emit('updatePromo', undefined);
      this.editBundle(resp.data, this.allItems.length-1);
    });
  }
  public removeBundleItem(item: any, index: number) {
      this.allItems.splice(index, 1);
  }

  public prepareDeleteBundle(item: any) {
    this.itemToDelete = item
    this.bundleToDelete = item
  }

  public getBundleDiscount(bundle: any) {
    if (!bundle.discount) return '';
    if (bundle.discount.percentage > 0) {
      return bundle.discount.percentage + '%'
    } else if (bundle.discount.fixed > 0) {
      return bundle.discount.fixed + this.$store.state.currency;
    } else if (bundle.discount.noShipping) {
      return this.$t('labels.noShipping');
    } else if (bundle.discount.freeItemsJson) {
      return this.$t('labels.freeItems');
    }
  }
  public goBack() {
    this.$router.push('/promotions')
  }

  public getAttributeValueName(product:any){
    let self = this;
    return new Promise(resolve => {
      if(!product) resolve(false);
      this.attributeValueService.get(product).then((resp:AxiosResponse) => {
        if(resp && resp.data){
          resolve(self.getMultiLangName(resp.data.attributeValueLanguages).name);
        }
      });
    });
  }

  public getProductName(promo:any){
    let result = ''
      if(promo && promo.itemsJson && promo.itemsJson.products && promo.itemsJson.products.length > 0){
        promo.itemsJson.products.forEach((prod:any) =>{
          let prodIndex = this.$store.state.lookups.products.findIndex((p:any) => p.value.id === prod.id)
          if(prodIndex > -1) {
            result += ` ${prod.quantity} ${this.$store.state.lookups.products[prodIndex].label} `
          }
        })
      }
      return result
  }
  public getAttributeName(promo:any){
    let result = ''
    if(promo && promo.itemsJson && promo.itemsJson.attributeValues && promo.itemsJson.attributeValues.length > 0){
      promo.itemsJson.attributeValues.forEach((attrVal:any)=>{
        this.$store.state.lookups.products.forEach((prod:any) => {
          if(prod.value.attributes && prod.value.attributes.length) {
            prod.value.attributes.forEach((attr:any)=>{
              let ind = attr.attributeValues.findIndex((attrValue:any)=> attrValue.id === attrVal.id)
              if(ind > -1){
                result += ` ${attrVal.quantity} ${this.getMultiLangName(attr.attributeLanguages).name} -> ${this.getMultiLangName(attr.attributeValues[ind].attributeValueLanguages).name} `
              }
            })
          }
        })
      })
    }
    return result
  }

  public addNewBundle(){
    let newBundle = new TypeBundleBased();
    newBundle.discount = this.allBundles[0] ? this.allBundles[0].discount : new Discount();
    newBundle.itemsJson = {
      attributeValues: [],
      products:[]
    };
    if(this.allBundles.length === 0){
      this.addNewBundleItem();
    }
    this.editBundle(newBundle, this.allBundles.length ? this.allBundles.length - 1 : this.allBundles.length);
  }
  public addNewBundleItem(){
    this.allItems.push({
      allProducts: this.$store.state.lookups.products,
      selectedProducts: [],
      allAttributes: [],
      selectedAttributes: null,
      allAttributeValues: [],
      selectedAttributeValues: null,
      selectedBundleQuantity: null
    });
  }
  public addProduct(prod:any, itemIndex:any){
    let self = this;
    let allAttributes:any = [];
      let prodIndex = this.$store.state.lookups.products.findIndex((p:any)=> p.value.id === prod.value.id)
      if(prodIndex > -1){
        this.allItems[itemIndex].selectedProducts = this.$store.state.lookups.products[prodIndex];
      }
      $.each(this.$store.state.lookups.products[prodIndex].value.attributes, function (k, v) {
        allAttributes.push({
          label: self.getMultiLangName(prod.value.productLanguages).name + ' - ' + self.getMultiLangName(v.attributeLanguages).name,
          value: v,
          product: self.$store.state.lookups.products[prodIndex].value
        }) ;
      });
      this.allItems[itemIndex].allAttributes = allAttributes;
  }
  public removeProduct(prod:any, itemIndex:any){
    let self = this;
    let indexes:any = [];
    $.each(this.allItems[itemIndex].allAttributes, function (k, v) {
      if(v.product.id === prod.value.id){
        indexes.push(k);
      }
    });
    if(indexes.length > 0){
      let allAttrs = this.allItems[itemIndex].allAttributes;
      while(indexes.length) {
        allAttrs.splice(indexes.pop(), 1);
      }
      this.allItems[itemIndex].allAttributes = allAttrs;
    }
    Vue.nextTick(function () {
      self.allItems[itemIndex].selectedProducts = [];
      self.allItems[itemIndex].selectedAttributes = null;
      self.allItems[itemIndex].selectedAttributeValues = null;
    })
  }
  public addAttribute(attr:any, itemIndex:any){
    let self = this;
    let allAttributeValues:any = [];
    self.allItems[itemIndex].selectedAttributes = attr;
    $.each(attr.value.attributeValues, function (k, v) {
      allAttributeValues.push({
        name: attr.label + ' - ' + self.getMultiLangName(v.attributeValueLanguages).name,
        value: v,
        attribute: attr.value
      });
    });
    this.allItems[itemIndex].allAttributeValues = allAttributeValues;
  }
  public removeAttribute(attr:any, itemIndex:any){
    let indexes:any = [];
    $.each(this.allItems[itemIndex].allAttributeValues, function (k, v) {
      //@ts-ignore
      if(v.attribute.id === attr.value.id) {
        indexes.push(k);
      }
    });
    if(indexes.length > 0){
      let allAttrValues = this.allItems[itemIndex].allAttributeValues;
      while(indexes.length) {
        allAttrValues.splice(indexes.pop(), 1);
      }
      this.allItems[itemIndex].allAttributeValues = allAttrValues;
    }
    this.allItems[itemIndex].selectedAttributes = null;
    this.allItems[itemIndex].selectedAttributeValues = null;
  }
  public addAttributeValue(attr:any, itemIndex:any){
    this.allItems[itemIndex].selectedAttributeValues = attr;
  }
  public removeAttributeValue(attr:any, itemIndex:any){
    this.allItems[itemIndex].selectedAttributeValues = null;
  }

  public closeDialog(){
    //@ts-ignore
    $(this.$refs.removeEntity).modal('hide')
  }
  public removeBundle(){
    let self=this;
    this.typeBundleBasedService.delete(this.bundleToDelete.id).then((resp:AxiosResponse) => {
      if(!resp){
        return this.setAlert('bundleRemoveError', 'error')
      }
      if(this.promotionCopy.typeBundleBaseds){
        let ind = this.promotionCopy.typeBundleBaseds?.findIndex((e:any) => e.id === this.bundleToDelete.id)
        if(ind > -1) this.promotionCopy.typeBundleBaseds?.splice(ind, 1)
      }
      this.setAlert('bundleRemoved', 'success')
      this.$emit('updatePromo', undefined);
      this.cancelNewBundle();
    });
  }

  public cancelNewBundle(){
    this.selectedBundle = null;
    this.selectedBundleIndex = null;
    this.editMode = false;
    this.closeDialog();
  }
  public saveBundle(){
    let self = this
    let allProducts:any = [];
    let allAttributeValues:any = [];
    $.each(this.allItems, function (k, v) {
      if(v.selectedAttributeValues) {
        allAttributeValues.push({
          id: v.selectedAttributeValues.value.id,
          quantity: v.selectedBundleQuantity
        });
      }
      if(v.selectedProducts && !v.selectedAttributeValues) {
        allProducts.push({
          id: v.selectedProducts.value.id,
          quantity: v.selectedBundleQuantity
        });
      }
    });
    if(!this.selectedBundle.itemsJson){
      this.selectedBundle.itemsJson = {}
    }
    this.selectedBundle.itemsJson.attributeValues = allAttributeValues.length ? allAttributeValues : null;
    this.selectedBundle.itemsJson.products = allProducts.length ? allProducts : null;
    this.promotionCopy = this.$props.promotion;
    this.selectedBundle.promotion = {
      id: this.promotionCopy.id,
      version: this.promotionCopy.version
    };

    if(this.selectedDiscountType === 1){
      this.selectedBundle.discount = {
        percentage: this.discountPriceAmount,
        entireOrder: this.wholeOrder
      };
    } else if(this.selectedDiscountType === 2){
      this.selectedBundle.discount = {
        fixed: this.discountPriceAmount,
        entireOrder: this.wholeOrder
      }
    } else if(this.selectedDiscountType === 3){
      this.selectedBundle.discount = {
        noShipping: true
      }
    } else if(this.selectedDiscountType === 4){
      this.selectedBundle.discount = {
        freeItemsJson: {
          products: [{id: this.selectedProduct.value.id, quantity: this.discountQuantityAmount}],
          attributes: []//TODO ask P if this should be implemented
        }
      }
    }
    if(this.selectedBundle.id){
      this.typeBundleBasedService.put(this.selectedBundle).then((resp:AxiosResponse) => {
        if(!resp || !resp.data){
          return this.setAlert('promotionUpdateError', 'error')
        }
        this.$emit('updatePromo', undefined);
        this.editMode = false;
        this.selectedBundle = null;
        this.setAlert('promotionUpdated', 'success')
      });
    } else {
      this.typeBundleBasedService.post(this.selectedBundle).then((resp:AxiosResponse) => {
        if(!resp || !resp.data){
          return this.setAlert('promotionUpdateError', 'error')
        }
        this.$emit('updatePromo', undefined);
        this.editMode = false;
        this.selectedBundle = null;
        this.setAlert('promotionCreated', 'success')
      });
    }
  }

  public addDiscountProduct(prod:any){
    if(!prod) return
    this.selectedProduct = prod
  }
  public removeDiscountProduct(prod:any){
    this.selectedProduct = null
  }
}
