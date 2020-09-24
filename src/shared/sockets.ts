import { Component, Vue } from 'vue-property-decorator'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import store from '../store'
import AdministrationService from '@/shared/services/administrationService'
import { AxiosResponse } from 'axios'
import { EventBus } from './eventBus'
import CommonHelpers from "@/shared/commonHelpers";
import {mixins} from "vue-class-component";
import {Store} from "vuex";
@Component
export default class Sockets extends mixins(CommonHelpers, Vue) {
  public administrationService: any
  public receivedMessages: any[];
  public sendMessage: any;
  public connected: boolean;
  public connectedRelation: boolean;
  public connectedProduct: boolean;
  public socket: any;
  public relationSocket: any;
  public productSocket: any;
  public store: any;
  public stompClient: any;
  public stompClientRelation: any;
  public stompClientProduct: any;

  constructor () {
    super()
    this.store = store
    this.administrationService = AdministrationService.getInstance()
    this.socket = null
    this.relationSocket = null
    this.productSocket = null
    this.receivedMessages = []
    this.sendMessage = null
    this.connected = false
    this.connectedRelation = false
    this.connectedProduct = false
    this.stompClient = null
    this.stompClientRelation = null
    this.stompClientProduct = null
  }

  public connect () {
    this.socket = new SockJS('/administrationms/socket')
    return new Promise(resolve => {
      this.administrationService.get(this.store.state.userIdentity.administrationId).then((result: AxiosResponse) => {
        this.store.commit('updateAdministration', result.data)
        this.stompClient = Stomp.over(this.socket)
        this.stompClient.connect({}, (frame: any) => {
            this.connected = true
            this.stompClient.subscribe(`/session/${result.data.uid}`, (tick: any) => {
              this.updateLookups(JSON.parse(tick.body))
            })
            resolve(true)
          },
          (error: any) => {
            console.log(error)
            resolve(false)
            this.connected = false
          }
        )
      })
    })
  }

  public connectRelation () {
    this.relationSocket = new SockJS('/relationms/socket')
    return new Promise(resolve => {
    this.administrationService.get(this.store.state.userIdentity.administrationId).then((result: AxiosResponse) => {
      this.stompClientRelation = Stomp.over(this.relationSocket)
      this.stompClientRelation.connect({}, (frame: any) => {
        this.connectedRelation = true
        this.stompClientRelation.subscribe(`/session/${result.data.uid}`, (tick: any) => {
          const resp = JSON.parse(tick.body)
          if (resp && resp.type && resp.type.toLowerCase() === 'relation' && resp.action && resp.action.toLowerCase() === 'create') {
            EventBus.$emit('refreshRelations', resp.content)
            localStorage.removeItem('isImporting')
          } else {
            this.updateLookups(resp)
            resolve(false)
          }
        })
          resolve(true)
      },
      (error: any) => {
        console.log(error)
        this.connectedRelation = false
      }
      )
    })
    })
  }
  public connectProduct () {
    this.productSocket = new SockJS('/productms/socket')
    return new Promise(resolve => {
    this.administrationService.get(this.store.state.userIdentity.administrationId).then((result: AxiosResponse) => {
      this.stompClientProduct = Stomp.over(this.productSocket)
      this.stompClientProduct.connect({}, (frame: any) => {
        this.connectedProduct = true
        this.stompClientProduct.subscribe(`/session/${result.data.uid}`, (tick: any) => {
          const resp = JSON.parse(tick.body)
          this.updateLookups(resp)
        })
          resolve(true)
      },
      (error: any) => {
        console.log(error)
        this.connectedProduct = false
        resolve(false)
      }
      )
    })
    })
  }

  public disconnect () {
    if (this.stompClient) {
      this.stompClient.disconnect()
    }
    if (this.stompClientRelation) {
      this.stompClientRelation.disconnect()
    }
    if (this.stompClientProduct) {
      this.stompClientProduct.disconnect()
    }
    this.connected = false
    this.connectedRelation = false
    this.connectedProduct = false
  }

  public updateLookups (obj: any) {
    const self = this
    let lookupData = []
    let lookupName = ''
    switch (obj.type.toLowerCase()) {
      case 'category':
        lookupData = this.store.state.lookups.categories
        lookupName = 'categories'
        break
      case 'tag':
        lookupData = this.store.state.lookups.tags
        lookupName = 'tags'
        break
      case 'taxrate':
        lookupData = this.store.state.lookups.taxRates
        lookupName = 'taxRates'
        break
      case 'relationgroup':
        lookupData = this.store.state.lookups.groups
        lookupName = 'groups'
        break
      case 'customfield':
        obj.content = {
          label: this.getMultiLangName(obj.content.customFieldLanguages).name,
          value: obj.content
        }
        lookupData = this.store.state.lookups.freeFields
        lookupName = 'freeFields'
        break
      case 'promotion':
        obj.content = {
          label: this.getMultiLangName(obj.content.promotionLanguages).name,
          value: obj.content
        }
        lookupData = this.store.state.lookups.promotions
        lookupName = 'promotions'
        break
      case 'product':
        obj.content = {
          label: this.getMultiLangName(obj.content.productLanguages).name,
          value: obj.content
        }
        lookupData = this.store.state.lookups.products
        lookupName = 'products'
        break
      case 'course':
        obj.content = {
          label: this.getMultiLangName(obj.content.courseLanguages).name,
          value: obj.content
        }
        lookupData = this.store.state.lookups.courses
        lookupName = 'courses'
        break
      case 'paymentmethod':
        obj.content = {
          label: this.getMultiLangName(obj.content.paymentMethodLanguages).name,
          value: obj.content
        }
        lookupData = this.store.state.lookups.paymentMethods
        lookupName = 'paymentMethods'
        break
      case 'deliverymethod':
        obj.content = {
          label: this.getMultiLangName(obj.content.deliveryMethodLanguages).name,
          value: obj
        }
        lookupData = this.store.state.lookups.deliveryMethods
        lookupName = 'deliveryMethods'
        break
      case 'invoicetemplate':
        obj.content = {
          label: obj.content.name,
          value: obj.content
        }
        lookupData = this.store.state.lookups.invoiceTemplates
        lookupName = 'invoiceTemplates'
        break
    }
    if (lookupName === '') {
      return
    }
    let allToUpdate = []; let allToCreate = []; let allToDelete = []
    let indexToUpdate = null
    let indexToDelete = null
    switch (obj.action) {
      case 'UPDATE':
        allToUpdate = lookupData
        indexToUpdate = null
        this.store.state.lookups[lookupName].forEach((item: any, ind: number) => {
          if (item.id === obj.content.id) {
            indexToUpdate = ind
          }
        })
        if (indexToUpdate !== null) {
          allToUpdate[indexToUpdate] = obj.content
          this.store.commit(lookupName, allToUpdate)
        }
        break
      case 'CREATE':
        allToCreate = lookupData
        allToCreate.push(obj.content)
        this.store.commit(lookupName, allToCreate)
        break
      case 'DELETE':
        allToDelete = self.store.state.lookups[lookupName]
        indexToDelete = this.store.state.lookups[lookupName].findIndex((x:any) => {x.id === obj.content.id})
        if (indexToDelete > -1) {
          allToDelete.splice(indexToDelete, 1)
          this.store.commit(lookupName, allToDelete)
        }
        break
    }
  }
}
