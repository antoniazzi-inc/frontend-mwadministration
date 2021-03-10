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

import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import followupactionsService from '@/shared/services/followup-actionsService'
import { FollowupAction, IFollowupAction } from '@/shared/models/productms/FollowupActionModel'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'

@Component({
  props: {
    product: Object,
    clicked: Boolean
  },
  components: {
    SearchableSelectComponent,
    'toggle-switch': ToggleSwitch
  }
})
export default class FollowUpTabComponent extends mixins(CommonHelpers, Vue) {
    public followupActionService: any = followupactionsService.getInstance()
    public followupAction: any = new FollowupAction(undefined, undefined, undefined, undefined, undefined, undefined, undefined)
    public productCopy: IProduct = new Product();
    public allListManagers: any = [];
    public selectedTags: any = [];
    public customerAddToGroup: any = [];
    public customerRemoveFromGroup: any= [];
    public beneficiaryAddToGroup: any = [];
    public beneficiaryRemoveFromGroup: any = [];
    public selectedListManagers: any = [];
    public allGroups: any = [];
    public allTags: any = [];
    public multiSelectConfig: ISearchableSelectConfig = new SearchableSelectConfig('name',
      'labels.chooseOption', '', false,
      false, true, true, false)

    public multiSelectTagConfig: ISearchableSelectConfig = new SearchableSelectConfig('code',
      'labels.chooseOption', '', false,
      false, true, true, false)

  @Watch('clicked', {immediate: true, deep: true})
  public updateProduct(newVal:any){
      if(newVal) {
        this.productCopy = this.$props.product
        if(this.$props.product && this.$props.product.followupAction && this.$props.product.followupAction.id){
          this.followupAction = this.$props.product.followupAction
        } else {
          this.followupAction = new FollowupAction(undefined, undefined, undefined, undefined, undefined, undefined, undefined)
        }
        this.fillInObject()
      }
  }
    public mounted () {
      this.retrieve()
    }

    public retrieve () {
      this.allTags = this.$store.state.lookups.tags
      this.allGroups = this.$store.state.lookups.groups
    }

    public fillInObject () {
      const self = this
      self.selectedTags = []
      self.customerAddToGroup = []
      self.customerRemoveFromGroup = []
      self.beneficiaryAddToGroup = []
      self.beneficiaryRemoveFromGroup = []
      Vue.nextTick(function () {
        $.each(self.allTags, function (k, v: any) {
          $.each(self.followupAction.tagIdsJson, function (key, val: any) {
            if (v.id === val) {
              self.selectedTags.push(v)
            }
          })
        })
        $.each(self.allGroups, function (k, v: any) {
          if (self.followupAction && self.followupAction.addCustomerToGroupIdsJson) {
            $.each(self.followupAction.addCustomerToGroupIdsJson, function (key, val: any) {
              if (v.id === val) {
                self.customerAddToGroup.push(v)
              }
            })
          }
          if (self.followupAction && self.followupAction.removeCustomerFromGroupIdsJson) {
            $.each(self.followupAction.removeCustomerFromGroupIdsJson, function (key, val) {
              if (v.id === val) {
                self.customerRemoveFromGroup.push(v)
              }
            })
          }
          if (self.followupAction && self.followupAction.addBeneficiaryToGroupIdsJson) {
            $.each(self.followupAction.addBeneficiaryToGroupIdsJson, function (key, val) {
              if (v.id === val) {
                self.beneficiaryAddToGroup.push(v)
              }
            })
          }
          if (self.followupAction && self.followupAction.removeCustomerFromGroupIdsJson) {
            $.each(self.followupAction.removeBeneficiaryFromGroupIdsJson, function (key, val) {
              if (v.id === val) {
                self.beneficiaryRemoveFromGroup.push(v)
              }
            })
          }
        })
      })
    }

    public save () {
      const self = this
      self.followupAction.tagIdsJson = []
      self.followupAction.customerListManagerIdsJson = []
      self.followupAction.addCustomerToGroupIdsJson = []
      self.followupAction.removeCustomerFromGroupIdsJson = []
      self.followupAction.addBeneficiaryToGroupIdsJson = []
      self.followupAction.removeBeneficiaryFromGroupIdsJson = []
      $.each(this.selectedTags, function (k, v) {
        self.followupAction.tagIdsJson.push(v.id)
      })
      $.each(this.selectedListManagers, function (k, v) {
        self.followupAction.customerListManagerIdsJson.push(v.id)
      })
      $.each(this.customerAddToGroup, function (k, v) {
        self.followupAction.addCustomerToGroupIdsJson.push(v.id)
      })
      $.each(this.customerRemoveFromGroup, function (k, v) {
        self.followupAction.removeCustomerFromGroupIdsJson.push(v.id)
      })
      $.each(this.beneficiaryAddToGroup, function (k, v) {
        self.followupAction.addBeneficiaryToGroupIdsJson.push(v.id)
      })
      $.each(this.beneficiaryRemoveFromGroup, function (k, v) {
        self.followupAction.removeBeneficiaryFromGroupIdsJson.push(v.id)
      })
      this.followupAction.product = {
        id: this.productCopy.id,
        version: this.productCopy.version
      }
      if (this.followupAction.id) {
        this.followupActionService.put(this.followupAction).then((resp: AxiosResponse) => {
          this.setAlert('productUpdated', 'success')
        })
      } else {
        this.followupActionService.post(this.followupAction).then((resp: AxiosResponse) => {
          this.setAlert('productUpdated', 'success')
        })
      }
    }

    public goBack() {
      this.$router.push('/products')
    }

    public removeListManagerid (listMgr: any) {
      this.selectedListManagers = listMgr
    }

    public addListManagerId (listMgr: any) {
      this.selectedListManagers = listMgr
    }

    public removeGroupsid (group: any) {
      this.customerAddToGroup = group
    }

    public addGroupsId (group: any) {
      this.customerAddToGroup = group
    }

    public removeBeneficiaryGroupid (group: any) {
      this.beneficiaryAddToGroup = group
    }

    public addBeneficiaryGroupId (group: any) {
      this.beneficiaryAddToGroup = group
    }

    public removeBeneficiaryFromGroup (group: any) {
      this.beneficiaryRemoveFromGroup = group
    }

    public addBeneficiaryGroupsFromGroup (group: any) {
      this.beneficiaryRemoveFromGroup = group
    }

    public removeCustomerFromGroup (group: any) {
      this.customerRemoveFromGroup = group
    }

    public addCustomerToGroup (group: any) {
      this.customerRemoveFromGroup = group
    }

    public removeTags (tag: any) {
      this.selectedTags = tag
    }

    public addTags (tag: any) {
      this.selectedTags = tag
    }
}
