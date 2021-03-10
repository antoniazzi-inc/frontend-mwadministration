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

import { Component, Vue, Watch } from 'vue-property-decorator'
import { Money } from 'v-money'
import { mixins } from 'vue-class-component'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import CommonHelpers from '@/shared/commonHelpers'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
import { IRegion } from '@/shared/models/administrationms/region.model'
import { ProductDeliveryMethod } from '@/shared/models/productms/ProductDeliveryMethodModel'
import { ITypePhysical, TypePhysical } from '@/shared/models/productms/TypePhysicalModel'
import typephysicalsService from '@/shared/services/type-physicalsService'
import productdeliverymethodsService from '@/shared/services/product-delivery-methodsService'
import { AxiosResponse } from 'axios'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import Store from '@/store/index'

@Component({
  props: {
    product: Object,
    clicked: Boolean
  },
  components: {
    SearchableSelectComponent,
    'toggle-switch': ToggleSwitch,
    money: Money
  }
})
export default class PhysicalTabComponent extends mixins(Vue, CommonHelpers) {
    public typePhysicalService: any = typephysicalsService.getInstance()
    public productDeliveryMethodService: any = productdeliverymethodsService.getInstance()
    public productCopy: IProduct|any = new Product();
    public productBackup: IProduct|null = null;
    public selectedRegion: IRegion|null = null;
    public itemToEdit: ProductDeliveryMethod|null = null;
    public itemPrice = 0;
    public basePrice = 0;
    public editItemMode = false;
    public itemToDelete: number|null = null;
    public allRegions: IRegion[] = [];
    public typePhysical: ITypePhysical|any = new TypePhysical();
    public multiSelectConfig: SearchableSelectConfig = new SearchableSelectConfig('name',
      'labels.chooseOption', '', false,
      false, true, true, false)

    public singleSelectConfig: SearchableSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseShippingMethod', '', false,
      false, true, false, false)

    public singleSelectRegionConfig: SearchableSelectConfig = new SearchableSelectConfig('name',
      'labels.chooseRegion', '', false,
      false, true, false, false)

    public allFulfilments = [];
    public allShippingMethods = [];
    public selectedShippingMethods = [];
    public selectedShippingMethod = null;
    public allCountries = this.$store.state.allCountries;
    public selectedFulfilments = [];
    public fulfilemtnParty = {
      name: '',
      description: ''
    };

    public money = {
      decimal: ',',
      thousands: '.',
      prefix: Store.state.currency,
      suffix: '',
      precision: 2,
      masked: false
    };

    @Watch('clicked', { immediate: true, deep: true })
    public updateClicked (newVal: any) {
      const self = this
      this.productCopy = this.$props.product
      this.typePhysical = this.$props.product.typePhysical ? this.$props.product.typePhysical : new TypePhysical()
      this.selectedShippingMethods = this.$props.product.productDeliveryMethods
      this.productBackup = this.productBackup === null ? JSON.parse(JSON.stringify(this.$props.product)) : this.productBackup
      $.each(this.typePhysical.shippingCostsJson, function (k, v: any) {
        let costIndex: any = null
        let country: any = {}
        $.each(self.allCountries, function (i, j: any) {
          if (v.regionId == j.id) {
            costIndex = k
            country = j
          }
        })
        if (costIndex !== null) {
          Vue.nextTick(function () {
            if (self.typePhysical.shippingCostsJson) self.typePhysical.shippingCostsJson[costIndex].regionId = country.id
          })
        }
      })
      this.retrieve()
    }
    public goBack() {
      this.$router.push('/products')
    }
    public retrieve () {
      const self = this
      const methods: any = []
      $.each(this.$store.state.lookups.deliveryMethods, function (k, v) {
        methods.push({
          name: self.getMultiLangName(v.deliveryMethodLanguages).name,
          value: v
        })
      })
      this.$set(this, 'allShippingMethods', methods)
      this.retrieveRegions()
    }

    public retrieveRegions () {
      const regions: any = []
      $.each(this.$store.state.lookups.regions, function (k, v) {
        regions.push({
          name: v.name,
          value: v
        })
      })
      this.allRegions = regions
    }

    public fulfilmentChanged (fulfilment: any) {}
    public removeFulfilment (fulfilment: any) {}
    public shippingMethodChanged (method: any) {
      this.selectedShippingMethod = method
    }

    public removeShippingMethod (method: any) {
      const index: any = null
      $.each(this.selectedShippingMethods, function (k, v: any) {
        if (v.value.id === method.value.id) {
          index; k
        }
      })
      if (index !== null && this.typePhysical.shippingCostsJson) {
        this.selectedShippingMethods.splice(index, 1)
        this.typePhysical.shippingCostsJson.splice(index, 1)
      }
    }

    public addNewShipping () {
      this.selectedRegion = null
      this.selectedShippingMethod = null
      this.itemPrice = 0
      this.basePrice = 0
    }

    public closeDialogShipping () {
      // @ts-ignore
      $(this.$refs.createProductPayment).modal('hide')
    }

    public closeDialogRemove () {
      // @ts-ignore
      $(this.$refs.removeEntityShipping).modal('hide')
    }

    public addNewShippingMethod () {
      if (this.editItemMode == true) {
        // @ts-ignore
        this.itemToEdit.regionId = this.selectedRegion.id

        if (this.itemToEdit) {
          // @ts-ignore
          this.itemToEdit.deliveryMethodId = this.selectedShippingMethod.value.id
          this.itemToEdit.basePrice = this.basePrice
          this.itemToEdit.itemPrice = this.itemPrice
          this.itemToEdit.product = {
            id: this.productCopy.id,
            version: this.productCopy.version
          }
        }
        this.productDeliveryMethodService.put(this.itemToEdit).then((resp: AxiosResponse) => {
          this.setAlert('deliveryMethodUpdated', 'success')
          this.closeDialogShipping()
          let index = null
          $.each(this.selectedShippingMethods, function (k, v: any) {
            if (v.id === resp.data.id) {
              index = k
            }
          })
          if (index) {
            this.$set(this.selectedShippingMethods, index, resp)
          }
          this.itemToEdit = null
          this.editItemMode = false
        })
      } else {
        const delivery = new ProductDeliveryMethod()
        // @ts-ignore
        delivery.deliveryMethodId = this.selectedShippingMethod.value.id
        // @ts-ignore
        delivery.regionId = this.selectedRegion.id
        delivery.basePrice = this.basePrice
        delivery.itemPrice = this.itemPrice
        delivery.product = {
          id: this.productCopy.id,
          version: this.productCopy.version
        }
        this.productDeliveryMethodService.post(delivery).then((resp: AxiosResponse) => {
          this.setAlert('deliveryMethodCreated', 'success')
          this.closeDialogShipping()
          // @ts-ignore
          this.selectedShippingMethods.push(resp.data)
          this.itemToEdit = null
          this.editItemMode = false
        })
      }
    }

    public prepareRemove (item: any) {
      this.itemToDelete = item
    }

    public editItem (item: any) {
      let region = null
      let method = null
      this.itemToEdit = item
      $.each(this.allRegions, function (k, v) {
        // @ts-ignore
        if (v.value.id === item.regionId) {
          region = v
        }
      })
      $.each(this.allShippingMethods, function (k, v: any) {
        if (v.value.id === item.deliveryMethodId) {
          method = v
        }
      })
      this.editItemMode = true
      this.selectedRegion = region
      this.selectedShippingMethod = method
      this.basePrice = item.basePrice
      this.itemPrice = item.itemPrice
    }

    public removeShipping () {
      // @ts-ignore
      this.productDeliveryMethodService.delete(this.selectedShippingMethods[this.itemToDelete].id).then(resp => {
        if (this.itemToDelete) { this.selectedShippingMethods.splice(this.itemToDelete, 1) }
        // @ts-ignore
        this.setAlert('deliveryMethodDeleted', 'success')
        this.itemToDelete = null
        this.closeDialogRemove()
      })
    }

    public regionChanged (region: any) {
      this.selectedRegion = region
    }

    public removeRegion (region: any) {
      this.selectedRegion = null
    }

    public save () {
      const self = this
      $.each(this.typePhysical.shippingCostsJson, function (k, v: any) {
        if (self.typePhysical.shippingCostsJson) { self.typePhysical.shippingCostsJson[k].regionId = v.regionId.id }
      })
      if (this.typePhysical.id) {
        this.typePhysical.weight = parseInt(this.typePhysical.weight)
        this.typePhysical.height = parseInt(this.typePhysical.height)
        this.typePhysical.depth = parseInt(this.typePhysical.depth)
        this.typePhysical.length = parseInt(this.typePhysical.length)
        this.typePhysicalService.put(this.typePhysical).then((resp: AxiosResponse) => {
          // @ts-ignore
          this.setAlert('productUpdated', 'success')
          this.typePhysical = resp.data
        })
      }
    }

    public cancel () {
      this.productCopy = this.productBackup
      this.typePhysical = this.productBackup ? this.productBackup.typePhysical : null
    }

    public getRegionName (item: any) {
      let name: any = ''
      $.each(this.allRegions, function (k, v: any) {
        // @ts-ignore
        if (v.value.id === item.regionId) {
          name = v.name
        }
      })
      return name
    }

    public getMethodName (item: any) {
      let name = ''
      $.each(this.allShippingMethods, function (k, v: any) {
        if (v.value.id === item.deliveryMethodId) {
          name = v.name
        }
      })
      return name
    }
}
