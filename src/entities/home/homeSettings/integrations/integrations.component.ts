import { Component, Vue, Watch } from 'vue-property-decorator'
import { ExternalSystem, IExternalSystem, ExternalSystemType } from '@/shared/models/externalSystem.model'
import ExternalSystemsService from '@/shared/services/externalSystemsService'
import { AxiosResponse } from 'axios'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from "@/components/simpleSearch/simpleSearch.vue";
const allExternalSettings = {
  externalSystemType: '',
  className: '',
  url: '',
  key: '',
  level: '',
  addpack: '',
  delpack: '',
  cmd: '',
  force: '',
  email: '',
  get: '',
  account: '',
  version: '',
  blacklist: '',
  credentials: '',
  ftp_url: '',
  ftp_uid: '',
  ftp_pwd: '',
  klantnr: '',
  user: '',
  password: '',
  carrierdeb: '',
  carrierid: '',
  logoref: '',
  ftp: '',
  uid: '',
  pwd: '',
  port: '',
  senderid: '',
  course: '',
  host: '',
  flow: '',
  api: '',
  method: '',
  headers: '',
  body: '',
  threshold: '',
  activate: '',
  deactivate: '',
  security1: '',
  security2: '',
  username: '',
  filename: ''
}
@Component({
  components: {
    SearchableSelectComponent,
    'simple-search': SimpleSearchComponent
  },
  props: {
    active: Boolean
  }
})
export default class IntegrationsComponent extends mixins(CommonHelpers, Vue) {
  refs!: {
    deleteModal: HTMLElement;
  }

  public externalSystemsService: any
  public externalSystems: any
  public externalSystemType: any
  public searchableConfig: ISearchableSelectConfig
  public editMode: boolean
  public allExternalSystems: IExternalSystem[]
  public selectedExternalSystem: any
  public externalSystemToEdit: IExternalSystem
  public itemToRemove: IExternalSystem|null
  public clickedTab: string
  public settingsJSON: any
  constructor () {
    super()
    this.settingsJSON = allExternalSettings
    this.searchableConfig = new SearchableSelectConfig('label',
      'labels.externalSystems', '', true,
      false, true, false, false)
    this.externalSystemsService = ExternalSystemsService.getInstance()
    this.editMode = false
    this.selectedExternalSystem = null
    this.externalSystemType = {
      active: ExternalSystemType.ACTIVE,
      inactive: ExternalSystemType.INACTIVE,
      test: ExternalSystemType.TEST
    }
    this.clickedTab = ''
    this.allExternalSystems = []
    this.externalSystemToEdit = new ExternalSystem()
    this.itemToRemove = null
    this.externalSystems = []
  }

  public mounted () {
    this.externalSystems = [
      {
        id: 0,
        label: this.$t('labels.OptimizeMember'),
        type: 'optimizemember',
        fields: []
      },
      {
        id: 0,
        label: this.$t('labels.wishlistMember'),
        type: 'wishlistmember',
        fields: []
      },
      {
        id: 0,
        label: this.$t('labels.zapier'),
        type: 'zapier',
        fields: []
      },
      {
        id: 0,
        label: this.$t('labels.autorespondAPI'),
        type: 'api',
        fields: []
      },
      {
        id: 0,
        label: this.$t('labels.moneybird'),
        type: 'moneybird',
        fields: []
      },
      {
        id: 0,
        label: this.$t('labels.scanLaser'),
        type: 'scanlaser',
        fields: []
      },
      {
        id: 0,
        label: this.$t('labels.dwcconnect'),
        type: 'dwcconnect',
        fields: []
      },
      {
        id: 1,
        label: this.$t('labels.CourseFlow'),
        type: 'courseflow',
        fields: []
      },
      {
        id: 1,
        label: this.$t('labels.voucherProvider'),
        type: 'voucher_provider',
        fields: []
      },
      {
        id: 2,
        label: this.$t('labels.EBoekhouden'),
        type: 'eboekhouden',
        fields: []
      },
      {
        id: 3,
        label: this.$t('labels.salesForce'),
        type: 'salesforce',
        fields: []
      },
      {
        id: 3,
        label: this.$t('labels.learndash'),
        type: 'learndash',
        fields: []
      },
      {
        id: 5,
        label: this.$t('labels.Webhook'),
        type: 'webhook',
        fields: []
      },
      {
        id: 8,
        label: this.$t('labels.Kajabi'),
        type: 'kajabi',
        fields: []
      },
      {
        id: 9,
        label: this.$t('labels.aNewSpring'),
        type: 'anewspring',
        fields: []
      }
    ]
  }

  @Watch('active', { immediate: true, deep: true })
  public retrieveAllExternalSystems () {
    const pagination = {
      page: 0,
      size: 100000,
      sort: 'id,asc'
    }
    this.externalSystemsService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
      if (resp) {
        this.allExternalSystems = resp.data.content
      }
    })
  }

  public changeSelectedExternalSystems (system: any) {
    if (system) {
      this.selectedExternalSystem = system
      this.settingsJSON.externalSystemType = system.type
    }
  }

  public selectSelectedExternalSystems (system: any) {
    if (system) {
      this.selectedExternalSystem = system
      this.settingsJSON.externalSystemType = system.type
    }
  }

  public removeSelectedExternalSystems (system: any) {
    this.selectedExternalSystem = null
  }

  public save () {
    const self = this
    this.$validator.validateAll().then((status: boolean) => {
      if (status && self.selectedExternalSystem) {
        self.externalSystemToEdit.settingValueJson = JSON.stringify(self.settingsJSON)
        if (self.externalSystemToEdit.id) {
          self.externalSystemsService.put(self.externalSystemToEdit).then((resp: AxiosResponse) => {
            if (resp) {
              self.setAlert(self.$t('externalSystemUpdated'), 'success')
            } else {
              self.setAlert(self.$t('externalSystemError'), 'error')
            }
            self.cancel()
          })
        } else {
          self.externalSystemsService.post(self.externalSystemToEdit).then((resp: AxiosResponse) => {
            if (resp) {
              self.setAlert(self.$t('externalSystemCreated'), 'success')
            } else {
              self.setAlert(self.$t('externalSystemError'), 'error')
            }
            self.cancel()
          })
        }
      } else {
        self.setAlert(self.$t('fillRequiredFields'), 'error')
      }
    })
  }

  public searchIntegrations (query: string) {
    const fields: string[] = ['settingKey']
    const q: string = this.makeSimpleSearchQuery(fields, query, 'or')
    let pagination = {
      page: 0,
      size: 100000,
      sort: 'id,desc'
    }
    this.externalSystemsService.getAll(pagination, q).then((resp:AxiosResponse)=>{
      if(resp && resp.data){
        this.allExternalSystems = resp.data.content
      }
    })
  }

  public cancel () {
    this.editMode = false
    this.selectedExternalSystem = null
    this.externalSystemToEdit = new ExternalSystem()
    this.settingsJSON = allExternalSettings
    this.retrieveAllExternalSystems()
  }

  public editExternalSystem (externalSys: any) {
    this.clickedTab = this.clickedTab === externalSys.type ? this.clickedTab = '' : this.clickedTab = externalSys.type
    this.externalSystemToEdit = externalSys
    this.settingsJSON = JSON.parse(externalSys.settingValueJson)
    this.editMode = true
    const self = this
    this.externalSystems.forEach((sys: any, ind: number) => {
      if (sys.type === self.settingsJSON.externalSystemType) {
        self.selectedExternalSystem = sys
      }
    })
  }

  public newExternalSystem () {
    this.editMode = true
    this.settingsJSON = allExternalSettings
    this.externalSystemToEdit = new ExternalSystem()
  }

  public setRemoveExternalSystem (sys: any) {
    this.itemToRemove = sys
  }

  public removeConfirm () {
    if (this.itemToRemove && this.itemToRemove.id) {
      this.externalSystemsService.delete(this.itemToRemove.id).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert(this.$t('toastMessages.externalSystemRemoved'), 'success')
        } else {
          this.setAlert(this.$t('toastMessages.externalSystemError'), 'error')
        }
        this.retrieveAllExternalSystems()
        // @ts-ignore
        $(this.$refs.deleteModal).modal('hide')
      })
    }
  }

  public validateUrl (field: any, value: any) {
    if (this.settingsJSON[field] && !this.$validator.errors.has(field)) {
      this.settingsJSON[field] = this.checkForUrlHttps(value)
    }
  }
}
