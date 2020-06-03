import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import followupactionsService from '@/shared/services/followup-actionsService'
import { FollowupAction, IFollowupAction } from '@/shared/models/FollowupActionModel'
import { IProduct, Product } from '@/shared/models/ProductModel'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'

@Component({
  props: {
    product: Object
  },
  components: {
    SearchableSelectComponent,
    'toggle-switch': ToggleSwitch
  }
})
export default class FollowUpTabComponent extends mixins(CommonHelpers, Vue) {
    public followupActionService: any = followupactionsService.getInstance()
    public followupAction: any = new FollowupAction(undefined, undefined, undefined, undefined, undefined, 0, false);
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

    @Watch('product', { immediate: true, deep: true })
    public updateProd (newVal: any) {
      this.productCopy = newVal
      this.followupAction = newVal.followupAction !== null ? newVal.followupAction : new FollowupAction(undefined, undefined, undefined, undefined, undefined, 0, false)
      this.fillInObject()
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
            $.each(self.followupAction.removeCustomerFromGroupIdsJson, function (key, val) {
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
        administrationId: this.productCopy.administrationId,
        version: this.productCopy.version,
        createdOn: this.productCopy.createdOn,
        updatedOn: this.productCopy.updatedOn,
        availableTo: this.productCopy.availableTo,
        availableFrom: this.productCopy.availableFrom,
        price: this.productCopy.price,
        tax: this.productCopy.tax,
        productLanguages: this.productCopy.productLanguages,
        productType: this.productCopy.productType
      }
      if (this.followupAction.id) {
        this.followupActionService().update(this.followupAction).then((resp: AxiosResponse) => {
          this.setAlert('productUpdated', 'success')
        })
      } else {
        const dto = {
          id: this.$props.product.id,
          followupAction: this.followupAction
        }
        this.followupActionService().create(dto).then((resp: AxiosResponse) => {
          this.setAlert('productUpdated', 'success')
        })
      }
    }

    public removeListManagerid (listMgr: any) {
      let index = null
      $.each(this.selectedListManagers, function (k, v) {
        if (v === listMgr.id) {
          index = k
        }
      })
      if (index !== null) {
        this.selectedListManagers.splice(index, 1)
      }
    }

    public addListManagerId (listMgr: any) {
      this.selectedListManagers = listMgr
    }

    public removeGroupsid (group: any) {
      let index = null
      $.each(this.customerAddToGroup, function (k, v) {
        if (v === group.id) {
          index = k
        }
      })
      if (index !== null) {
        this.customerAddToGroup.splice(index, 1)
      }
    }

    public addGroupsId (group: any) {
      this.customerAddToGroup = group
    }

    public removeBeneficiaryGroupid (group: any) {
      let index = null
      $.each(this.beneficiaryAddToGroup, function (k, v) {
        if (v === group.id) {
          index = k
        }
      })
      if (index !== null) {
        this.beneficiaryAddToGroup.splice(index, 1)
      }
    }

    public addBeneficiaryGroupId (group: any) {
      this.beneficiaryAddToGroup = group
    }

    public removeBeneficiaryFromGroup (group: any) {
      let index = null
      $.each(this.beneficiaryAddToGroup, function (k, v) {
        if (v === group.id) {
          index = k
        }
      })
      if (index !== null) {
        this.beneficiaryAddToGroup.splice(index, 1)
      }
    }

    public addBeneficiaryGroupsFromGroup (group: any) {
      this.beneficiaryRemoveFromGroup = group
    }

    public removeCustomerFromGroup (group: any) {
      let index = null
      $.each(this.customerRemoveFromGroup, function (k, v) {
        if (v === group.id) {
          index = k
        }
      })

      if (index !== null) {
        this.customerRemoveFromGroup.splice(index, 1)
      }
    }

    public addCustomerToGroup (group: any) {
      this.customerRemoveFromGroup = group
    }

    public removeTags (tag: any) {
      let index = null
      $.each(this.selectedTags, function (k, v) {
        if (v === tag.id) {
          index = k
        }
      })
      if (index !== null) {
        this.selectedTags.splice(index, 1)
      }
    }

    public addTags (tag: any) {
      this.selectedTags = tag
    }
}
