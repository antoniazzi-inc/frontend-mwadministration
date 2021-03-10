/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

import {Component, Vue, Watch} from "vue-property-decorator";
import {IPromotion, Promotion} from "@/shared/models/productms/PromotionModel";
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {AxiosResponse} from "axios";
import promotionsService from "@/shared/services/promotionsService";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import attributevaluesService from "@/shared/services/attribute-valuesService";
@Component({
    props: {
        promotion: Object
    },
    components: {
      SearchableSelectComponent
    }
})
export default class ProductsTabComponent extends mixins(CommonHelpers, Vue) {
  public selectedProducts:any = [];
  public selectedCategories = [];
  public promotionService:any;
  public attributeValueService:any;
  public allCategories = [];
  public selectedProductCategories:any = [];
  public promotionCopy:IPromotion = new Promotion();
  public page:number = 0;
  public productsToRemove:any[] = [];
  public itemsPerPage:number = 10;
  public searchAttribute: string = '';
  public allAttributes:any[] = [];
  public currentAttributes:any[] = [];
  public multiSelectConfig: SearchableSelectConfig = new SearchableSelectConfig('label',
    'labels.chooseOption', '', false,
    false, true, true, false);
  public multiSelectConfigCat: SearchableSelectConfig = new SearchableSelectConfig('code',
    'labels.chooseOption', '', false,
    false, true, true, false);
  constructor() {
    super();
    this.promotionService = promotionsService.getInstance()
    this.attributeValueService = attributevaluesService.getInstance()
  }
  @Watch('$props.promotion', {immediate: true, deep: true})
  public updatePromo(newVal:any){
    if(!newVal) return
    this.promotionCopy = newVal;
    this.getPromotionProducts();
    this.getPromotionProductCategories();
    this.getPromotionAttributeValues();
    this.retrieveAttributes()
  }
  public clear() {
    this.searchAttribute = '';
    this.retrieveAttributes();
  }
  public getProductName(langs:any) {
    if(langs && langs.length){
      return this.getMultiLangName(langs).name ? this.getMultiLangName(langs).name : '';
    }
  }
  public getPromotionProducts(){
    let allProd:any = [];
    let self = this;
    if(this.promotionCopy.products && this.promotionCopy.products.length) {
      $.each(this.promotionCopy.products, function (k, v) {
        let prodIndex = self.$store.state.lookups.products.findIndex((e:any) => e.value.id === v.id)
        if(prodIndex > -1){
          allProd.push(self.$store.state.lookups.products[prodIndex])
        }
      });
      this.selectedProducts = allProd;
    }
  }
  public getPromotionProductCategories(){
    let self = this;
    let allCat:any = [];
    if(this.promotionCopy.promotionProductCategories && this.promotionCopy.promotionProductCategories.length) {
      $.each(this.promotionCopy.promotionProductCategories, function (k, v) {
        let catIndex = self.$store.state.lookups.categories.findIndex((e:any) => e.id === v.categoryId)
        if(catIndex > -1){
          allCat.push(self.$store.state.lookups.categories[catIndex])
        }
      });
      Vue.nextTick(function () {
        self.selectedCategories = allCat;
      });
    }
  }
  public getPromotionAttributeValues(){
    let self = this;
    let allAttributes:any = [];
    //@ts-ignore
    if(this.promotionCopy.attributeValues && this.promotionCopy.attributeValues.length) {
      //@ts-ignore
      $.each(this.promotionCopy.attributeValues, function (k, v:any) {

        let name = v.id + ' ' + self.getMultiLangName(v.attribute.product.productLanguages).name + ' [' + self.getMultiLangName(v.attribute.attributeLanguages).name + ' = ' + self.getMultiLangName(v.attributeValueLanguages).name + ']';
        console.log(name)
        allAttributes.push({
          code: name,
          value: v
        });
      });
      console.log(allAttributes)
      this.currentAttributes = allAttributes;
    }
  }
  public previousState(): void {
    this.$router.push('/entity/promotion');
  }
  public goBack() {
    this.$router.push('/promotions')
  }
  public removeProduct(product:any){
    let index = null;
    let dto = {
      promotionId: this.promotionCopy.id,
      req:{
        products: [{id: product.value.id}]
      }
    };
    this.promotionService.removeProducts(dto).then((resp:AxiosResponse) => {
      if(resp && resp.data){
        this.setAlert('ProductRemoved','success')
      } else {
        this.setAlert('ProductRemoveError','error')
      }
    });
    $.each(this.selectedProducts, function (k, v:any) {
      if(v.value.id === product.value.id){
        index = k;
      }
    });
    this.productsToRemove.push({id: product.value.id});
    if(index !== null){
      this.selectedProducts.splice(index, 1);
    }
  }
  public addProduct(product:any){
    let dto = {
      promotionId: this.promotionCopy.id,
      req:{
        products: [{
          id: product.value.id,
          version: product.value.version
        }]
      }
    };
    this.promotionService.assign(dto).then((resp:AxiosResponse) => {
      if(resp && resp.data){
        this.setAlert('promotionProductsUpdated','success')
      } else {
        this.setAlert('promotionProductsUpdateError','error')
      }
      this.selectedProducts.push(product);
    });
  }
  public removeProductCategory(cat:any){
    let index = null;
    let idToRemove = null;
    $.each(this.promotionCopy.promotionProductCategories, function (k, v:any) {
      if(v.categoryId === cat.id){
        idToRemove = v.id;
      }
    });
    $.each(this.selectedCategories, function (k, v:any) {
      if(v.id === cat.id){
        index = k;
      }
    });

    if(index !== null){
      this.selectedCategories.splice(index, 1);
      let dto = {
        promotionId: this.promotionCopy.id,
        req:{
          promotionProductCategories: [{id: idToRemove}]
        }
      };
      this.promotionService.removeProducts(dto).then((resp:AxiosResponse)=>{
        if(resp){
          this.setAlert('PromotionProductCategoryDeleted','success')
        } else {
          this.setAlert('PromotionProductCategoryDeleteError','error')
        }
      })
    }
  }
  public addProductCategory(cat:any){
    let dto = {
      promotionId: this.promotionCopy.id,
      req:{
        promotionProductCategories: [{categoryId: cat.id}]
      }
    };
    this.promotionService.assign(dto).then((resp:AxiosResponse) => {
      if(resp && resp.data){
        this.setAlert('promotionProductsCategoryAdded','success')
        this.selectedProductCategories.push(resp.data);
      } else {
        this.setAlert('promotionProductsCategoryAddError','error')
      }

    });
  }
  public addProductVariant(variant:any){
    let dto = {
      promotionId: this.promotionCopy.id,
      req:{
        attributeValues: [{id: variant.value.id, version: variant.value.version}]
      }
    };
    this.promotionService.assign(dto).then((resp:AxiosResponse) => {
      if(resp && resp.data){
        this.setAlert('promotionProductVariantAdded','success')
        this.promotionCopy = resp.data
        this.$emit('updatePromo', this.promotionCopy)
      } else {
        this.setAlert('promotionProductVariantAddError','error')
      }
    });
  }
  public removeProductVariant(variant:any){
    let index:any = null;
    let dto = {
      promotionId: this.promotionCopy.id,
      req:{
        attributeValues: [{id: variant.value.id, version: variant.value.version}]
      }
    };
    this.promotionService.removeProducts(dto).then((resp:AxiosResponse) => {
      if(resp){
        this.setAlert('promotionProductsDeleted','success')
        $.each(this.currentAttributes, function (k, v) {
          if(v.value.id === variant.value.id){
            index = k;
          }
        });
        if(index !== null){
          this.currentAttributes.splice(index, 1);
        }
      } else {
        this.setAlert('promotionProductsDeleteError','error')
      }
    });
  }
  public retrieveAttributes(){
    let self = this;
    const paginationQuery = {
      page: 0,
      size: 100000,
      sort: []
    };
    this.attributeValueService.getAll(paginationQuery).then((respAttr:AxiosResponse) => {
      let attrs:any = [];
      $.each(respAttr.data.content, function (k, v) {
        let attrName = v.id + ' ' + self.getProductName(v.attribute.product.productLanguages) + ' [' + self.getProductName(v.attribute.attributeLanguages) + ' = ' + self.getProductName(v.attributeValueLanguages) + ']'
        attrs.push({
          code: attrName,
          value: v
        });
      });
      this.allAttributes = attrs;
    })
  }
}
