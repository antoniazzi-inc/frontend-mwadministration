import { Component, Vue, Watch } from 'vue-property-decorator'
import * as RefrenceType from '@/shared/models/relationms/contact-history.model'
import {
  ContactHistory,
  ContactHistoryReferenceType,
  ContactHistoryType,
  IContactHistory
} from '@/shared/models/relationms/contact-history.model'
import { IRelationEntity, RelationEntity } from '@/shared/models/relationms/relationModel'
import ContactHistoryService from '@/shared/services/contactHistoryService'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import moment from 'moment'
import { DATE_TIME_LONG_FORMAT } from '@/shared/filters'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'

@Component({
  components: {
    flatPickr,
    Trumbowyg
  },
  props: {
    relation: Object,
    value: [Object, Array, String]
  }
})
export default class ContactWidget extends mixins(CommonHelpers, Vue) {
  $refs!: {
    deleteModalContactHistory: HTMLElement;
  }

  public contactHistoryService: any
  public editMode: boolean
  public contactTypes: any[]
  public contactDate: any
  public contactTimeConfig: any
  public editorConfig: any
  public relationCopy: IRelationEntity
  public itemToDelete: IContactHistory
  public valueToEdit: IContactHistory
  constructor () {
    super()
    this.editorConfig = {}
    this.contactTimeConfig = {
      allowInput: true,
      enableTime: true,
      time_24hr: true,
      altInput: false,
      dateFormat: 'Y-m-d'
    }
    this.relationCopy = new RelationEntity()
    this.editMode = false
    this.contactDate = moment().format('Y-m-d')
    this.itemToDelete = new ContactHistory()
    this.valueToEdit = new ContactHistory()
    this.contactHistoryService = ContactHistoryService.getInstance()
    this.contactTypes = [
      { value: 'EMAIL', label: 'email' },
      { value: 'PHONE', label: 'phone' },
      { value: 'TWITTER', label: 'twitter' },
      { value: 'BLOG', label: 'blog' },
      { value: 'FACEBOOK', label: 'facebook' },
      { value: 'INSTAGRAM', label: 'instagram' },
      { value: 'LINKEDIN', label: 'linkedin' },
      { value: 'LETTER', label: 'letter' },
      { value: 'WEBSITE', label: 'website' },
      { value: 'SOCIAL_MEDIA', label: 'socialMedia' },
      { value: 'MEETING', label: 'meeting' },
      { value: 'REAL_LIFE', label: 'realLife' },
      { value: 'ADVERTISEMENT', label: 'advertisement' },
      { value: 'UNSPECIFIED', label: 'unspecified' },
      { value: 'CRM_TASK', label: 'crmTask' }
    ]
  }

  @Watch('value', { immediate: true, deep: true })
  public valueChanged (newVal: any) {
    if (newVal && newVal.length > 0 && newVal[newVal.length - 1].id === undefined) {
      this.editContact(new ContactHistory(undefined, undefined, '', '', moment(),
        ContactHistoryType.EMAIL, undefined, undefined, undefined, undefined,
        undefined, { id: this.relationCopy.id, version: this.relationCopy.version }))
      this.contactDate = moment().format('Y-M-D')
    }
  }

  @Watch('relation', { immediate: true, deep: true })
  public fillRelation (newVal: any) {
    if (newVal) {
      this.relationCopy = newVal
    }
  }

  public removeConfirmed () {
    let index: any = null
    this.relationCopy.contactHistories?.forEach((item, ind) => {
      if (item.id === this.itemToDelete.id) {
        index = ind
      }
    })
    this.contactHistoryService.delete(this.itemToDelete.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.relationCopy.contactHistories?.splice(index, 1)
        this.setAlert('contactHistoryDeleted', 'success')
      } else {
        this.setAlert('contactHistoryDeleteError', 'error')
      }
      this.closeModal()
      this.cancelContact()
    })
  }

  public editContact (item: any) {
    this.valueToEdit = item
    if (!item.id) {
      this.valueToEdit.info = ''
    }
    this.contactDate = moment(item.contactTime).format('Y-M-D')
    this.editMode = true
  }

  public deleteContact (item: any) {
    this.itemToDelete = item
    this.closeModal()
  }

  public closeModal () {
    // @ts-ignore
    $(this.$refs.deleteModalContactHistory).modal('hide')
  }

  public getContactAvatar (item: any, index: any) {
    let className = ''
    console.log(item.contactType)
    switch (item.contactType) {
      case ContactHistoryType.EMAIL:
        className = 'fa fa-mail-bulk'
        break
      case ContactHistoryType.PHONE:
        className = 'fa fa-phone'
        break
      case ContactHistoryType.TWITTER:
        className = 'dashicons dashicons-twitter'
        break
      case ContactHistoryType.FACEBOOK:
        className = 'dashicons dashicons-facebook'
        break
      case ContactHistoryType.LINKEDIN:
        className = 'fa fa-linkedin-square'
        break
      case ContactHistoryType.LETTER:
        className = 'fa fa-envelope'
        break
      case ContactHistoryType.WEBSITE:
        className = 'dashicons dashicons-admin-site'
        break
      case ContactHistoryType.SOCIAL_MEDIA:
        className = 'dashicons dashicons-networking'
        break
      case ContactHistoryType.MEETING:
        className = 'dashicons dashicons-businessman'
        break
      case ContactHistoryType.REAL_LIFE:
        className = 'fa fa-handshake-o'
        break
      case ContactHistoryType.ADVERTISEMENT:
        className = 'fa fa-audio-description'
        break
      case ContactHistoryType.UNSPECIFIED:
        className = 'dashicons dashicons-info'
        break
      case ContactHistoryType.CRM_TASK:
        className = 'fa fa-tasks'
        break
      case ContactHistoryType.BLOG:
        className = 'fa fa-rss'
        break
    }
    console.log(className)
    return className
  }

  public cancelContact () {
    this.editMode = false
    this.valueToEdit = {}
    this.$emit('update', this.relationCopy)
  }

  public saveContact (index: any) {
    this.valueToEdit.contactTime = moment(this.contactDate)
    this.valueToEdit.referenceType = RefrenceType.ContactHistoryReferenceType.UNSPECIFIED
    this.valueToEdit.referenceTe = ContactHistoryReferenceType.UNSPECIFIED
    this.valueToEdit.relation = {
      id: this.relationCopy.id,
      createdOn: this.relationCopy.createdOn,
      updatedOn: this.relationCopy.updatedOn,
      version: this.relationCopy.version
    }
    if (this.valueToEdit.id) {
      this.contactHistoryService.put(this.valueToEdit).then((resp: AxiosResponse) => {
        if (resp) {
          this.cancelContact()
          this.setAlert('contactHistoryCreated', 'success')
        } else {
          this.setAlert('contactHistoryCreateError', 'error')
        }
      })
    } else {
      this.contactHistoryService.post(this.valueToEdit).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert('contactHistoryCreated', 'success')
          this.relationCopy.contactHistories ? this.relationCopy.contactHistories[this.relationCopy.contactHistories.length - 1] = resp.data : this.relationCopy.contactHistories = [resp.data]
          this.valueToEdit.id = resp.data.id
          this.cancelContact()
        }
      })
    }
  }
}
