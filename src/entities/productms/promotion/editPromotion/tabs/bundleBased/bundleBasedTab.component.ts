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

@Component({
  props: {
    promotion: Object
  },
  components: {
    SearchableSelectComponent
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
  public multiSelectConfigProduct: ISearchableSelectConfig
  public multiSelectConfigAttributeValue: ISearchableSelectConfig
  public multiSelectConfigAttribute: ISearchableSelectConfig
  public attributeValueService: any
  public attributeService: any
  public typeBundleBasedService: any
  public bundleToDelete: any
  public productService: any
  public allBundles: any[]
  public productText: any[];
  public allItems: any[];
  public attributesTexts: any[];
  constructor() {
    super();
    this.editMode = false
    this.multiSelectConfigProduct = new SearchableSelectConfig('label',
      'labels.chooseProduct', '', true,
      false, false, false, false)
    this.multiSelectConfigAttributeValue = new SearchableSelectConfig('name',
      'labels.chooseFeatureValue', '', false,
      false, false, false, false)
    this.multiSelectConfigAttribute = new SearchableSelectConfig('name',
      'labels.chooseFeature', '', false,
      false, false, false, false)
    this.promotionCopy = new Promotion()
    this.selectedBundle = null
    this.itemToDelete = null
    this.bundleToDelete = null
    this.selectedBundleIndex = null
    this.attributeValueService = attributevaluesService.getInstance()
    this.attributeService = attributesService.getInstance()
    this.typeBundleBasedService = typebundlebasedsService.getInstance()
    this.allBundles = []
    this.productText = []
    this.allItems = []
    this.attributesTexts = []
  }

  @Watch('promotion', {immediate: true, deep: true})
  public updatePromo(newVal: IPromotion) {
    let self = this;
    if (newVal) {
      this.promotionCopy = newVal
      if (newVal.typeBundleBaseds && newVal.typeBundleBaseds.length) {
        this.allBundles = newVal.typeBundleBaseds;
          $.each(this.allBundles, function (k, v) {
            if(v.itemsJson.products && v.itemsJson.products.length) self.getBundleProductInfo(v, k);
          });
          $.each(this.allBundles, function (k, v) {
            if(v.itemsJson.attributeValues && v.itemsJson.attributeValues.length) self.getBundleProductAttributesInfo(v, k);
          });
      }

    }
  }

  public mounted() {
    let self = this;
    this.allBundles = this.$props.promotion.typeBundleBaseds ? this.$props.promotion.typeBundleBaseds : [];
    if(this.allBundles.length){
      $.each(this.allBundles, function (k, v) {
        if(v.itemsJson.products && v.itemsJson.products.length) self.getBundleProductInfo(v, k);
      });
      $.each(this.allBundles, function (k, v) {
        if(v.itemsJson.attributeValues && v.itemsJson.attributeValues.length) self.getBundleProductAttributesInfo(v, k);
      });
    }
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
              name: self.getMultiLangName(prod.productLanguages).name + ' - ' + self.getMultiLangName(j.attributeLanguages).name,
              value: j,
              product: prod
            });
            attr.push({
              name: self.getMultiLangName(attribute.data.attributeLanguages).name,
              value: attribute.data
            });
          });
        });
        resolve({allAttributes: allAttr, selectedAttr: attr});
      }
    });
  }
  public editBundle(bundle: any, index: number) {
    let self = this;
    this.allItems = [];
    let items:any = [];
    if(bundle.itemsJson.products.length && !bundle.itemsJson.attributeValues) {
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
            })
          });
        });
      });
    }
    if(bundle.itemsJson.attributeValues && bundle.itemsJson.attributeValues.length) {
      $.each(bundle.itemsJson.attributeValues, function (k, v) {
        self.getSelectedProducts(v.id, index).then(selectedProducts => {
          self.getSelectedProductsAttributes(v.id, index).then(resp => {
            self.getSelectedProductsAttributeValues(v.id, index).then(resp1 => {
              items.push({
                allProducts: self.$store.state.lookups.products,
                selectedProducts: selectedProducts,
                //@ts-ignore
                allAttributes: resp.allAttributes,
                //@ts-ignore
                selectedAttributes: resp.selectedAttr,
                //@ts-ignore
                allAttributeValues: resp1.allAttributesValues,
                //@ts-ignore
                selectedAttributeValues: resp1.selectedAttributeValue,
                selectedBundleQuantity: v.quantity
              });
            });
          });
        });
      });
    }
    Vue.nextTick(function () {
      self.$set(self, 'selectedBundle', JSON.parse(JSON.stringify(bundle)));
      self.$set(self, 'allItems', items);
    });
    this.selectedBundleIndex = index;
    this.editMode = true;
  }
  public getSelectedProductsAttributeValues(id:any, index:any) {
    let self = this;
    return new Promise(resolve => {
      let prodIndex = this.$store.state.lookups.products.findIndex((p:any)=> p.value.id === id)
      if(prodIndex > -1){
        const prod = this.$store.state.lookups.products[prodIndex].value
        let attrValue:any = [];
        let allAttributeValues:any = [];
        $.each(prod.value.attributes, function (i, j) {
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
  public copyBundle(item: any, index: number) {
    item.id = null;
    item.discount.id = undefined;
    item.discount.administrationId = null;
    item.discount.version = null;
    item.discount.createdOn = null;
    item.discount.updatedOn = null;
    this.typeBundleBasedService.post(item).then((resp:AxiosResponse) => {
      this.allItems.push(resp.data);
      if(this.promotionCopy.typeBundleBaseds) this.promotionCopy.typeBundleBaseds.push(resp.data);
      this.$emit('updatePromotion', this.promotionCopy);
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

  public getBundleProductAttributesInfo(bundle:any, index:any){
    let self = this;
    let allProductAttributesTexts:any = [];
    if (bundle.itemsJson && bundle.itemsJson.attributeValues && bundle.itemsJson.attributeValues.length) {
      $.each(bundle.itemsJson.attributeValues, function (k, v) {
        self.getAttributeValueName(v.id).then((resp:any)=>{
          if(resp){
            allProductAttributesTexts.push(' ' + v.quantity + ' ' + resp);
          }
          Vue.nextTick(function () {
            self.$set(self.attributesTexts, index, allProductAttributesTexts.join());
          });
        });
      });
    }
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

  public getBundleProductInfo(bundle:any, index:number){
    let self = this;
    let allProductTexts:any = [];
    if(bundle.itemsJson && bundle.itemsJson.products && bundle.itemsJson.products.length) {
      $.each(bundle.itemsJson.products, function (k, v) {
        self.getProductName(v.id).then(resp=>{
          if(resp){
            allProductTexts.push(' ' + v.quantity + ' ' + resp);
          }
          Vue.nextTick(function () {
            self.$set(self.productText, index, allProductTexts.join());
          });
        });
      });
    }
  }

  public getProductName(product:any){
    let self = this;
    return new Promise(resolve => {
      if(!product) resolve(false);
      let prodIndex = this.$store.state.lookups.products.findIndex((p:any)=> p.value.id === product)
      if(prodIndex > -1) {
        const prod = this.$store.state.lookups.products[prodIndex].value
        resolve(prod.label);
      }
    });
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
        name: attr.name + ' - ' + self.getMultiLangName(v.attributeValueLanguages).name,
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
      if(!resp || !resp.data){
        return this.setAlert('bundleRemoveError', 'error')
      }
      this.setAlert('bundleRemoved', 'success')
      let index = null;
      $.each(this.promotionCopy.typeBundleBaseds, function (k, v:any) {
        if(self.bundleToDelete.id === v.id){
          index = k;
        }
      });
      if(index !== null){
        if(this.promotionCopy.typeBundleBaseds) this.promotionCopy.typeBundleBaseds.splice(index, 1);
        this.$emit('updatePromotion', this.promotionCopy);
      }
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
    this.selectedBundle.itemsJson.attributeValues = allAttributeValues.length ? allAttributeValues : null;
    this.selectedBundle.itemsJson.products = allProducts.length ? allProducts : null;
    this.promotionCopy = this.$props.promotion;
    this.selectedBundle.promotion = {
      id: this.promotionCopy.id,
      version: this.promotionCopy.version
    };
    this.selectedBundle.discount = {
      percentage: this.selectedBundle.discount.percentage,
      fixed: this.selectedBundle.discount.fixed,
      noShipping: this.selectedBundle.discount.noShipping,
      freeItemsJson: this.selectedBundle.discount.freeItemsJson,
      entireOrder: this.selectedBundle.discount.entireOrder
    };
    if(this.selectedBundle.id){
      this.typeBundleBasedService.put(this.selectedBundle).then((resp:AxiosResponse) => {
        if(!resp || !resp.data){
          return this.setAlert('promotionUpdateError', 'error')
        }
        if(this.promotionCopy.typeBundleBaseds) this.promotionCopy.typeBundleBaseds.push(resp.data);
        this.$emit('updatePromotion', this.promotionCopy);
        this.editMode = false;
        this.selectedBundle = null;
        this.setAlert('promotionUpdated', 'success')
      });
    } else {
      this.typeBundleBasedService.post(this.selectedBundle).then((resp:AxiosResponse) => {
        if(!resp || !resp.data){
          return this.setAlert('promotionUpdateError', 'error')
        }
        if(this.promotionCopy.typeBundleBaseds) this.promotionCopy.typeBundleBaseds.push(resp.data);
        this.$emit('updatePromotion', this.promotionCopy);
        this.editMode = false;
        this.selectedBundle = null;
        this.setAlert('promotionCreated', 'success')
      });
    }
  }
}
