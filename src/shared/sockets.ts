import { Component, Vue } from 'vue-property-decorator'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import store from '../store'
import AdministrationService from '@/shared/services/administrationService'
import { AxiosResponse } from 'axios'
import { EventBus } from './eventBus'
@Component
export default class Sockets extends Vue {
  public administrationService: any
  public receivedMessages: any[];
  public sendMessage: any;
  public connected: boolean;
  public connectedRelation: boolean;
  public socket: any;
  public relationSocket: any;
  public url: any;
  public store: any;
  public stompClient: any;
  public stompClientRelation: any;

  constructor (props: any) {
    super(props)
    this.store = store
    this.administrationService = AdministrationService.getInstance()
    this.socket = new SockJS('/socket')
    this.relationSocket = new SockJS('/relation-socket')
    this.receivedMessages = []
    this.sendMessage = null
    this.connected = false
    this.connectedRelation = false
    this.stompClient = null
    this.stompClientRelation = null
    this.url = props && props.url ? props.url : '/socket'
  }

  public connect () {
    this.administrationService.get(this.store.state.userIdentity.administrationId).then((result: AxiosResponse) => {
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.connect({}, (frame: any) => {
        this.connected = true
        this.stompClient.subscribe(`/session/${result.data.uid}`, (tick: any) => {
          this.updateLookups(JSON.parse(tick.body))
        })
      },
      (error: any) => {
        console.log(error)
        this.connected = false
      }
      )
    })
  }

  public connectRelation () {
    this.administrationService.get(this.store.state.userIdentity.administrationId).then((result: AxiosResponse) => {
      this.stompClientRelation = Stomp.over(this.relationSocket)
      this.stompClientRelation.connect({}, (frame: any) => {
        this.connectedRelation = true
        this.stompClientRelation.subscribe(`/session/${result.data.uid}`, (tick: any) => {
          const resp = JSON.parse(tick.body)
          if (resp && resp.type && resp.type.toLowerCase() === 'relation' && resp.action && resp.action.toLowerCase() === 'create') {
            EventBus.$emit('refreshRelations', resp.content)
          } else {
            this.updateLookups(resp)
          }
        })
      },
      (error: any) => {
        console.log(error)
        this.connected = false
      }
      )
    })
  }

  public disconnect () {
    if (this.stompClient) {
      this.stompClient.disconnect()
    }
    if (this.stompClientRelation) {
      this.stompClientRelation.disconnect()
    }
    this.connected = false
    this.connectedRelation = false
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
        indexToDelete = null
        this.store.state.lookups[lookupName].forEach((item: any, ind: number) => {
          if (item.id === obj.content.id) {
            indexToDelete = ind
          }
        })
        if (indexToDelete !== null) {
          allToDelete.splice(indexToDelete, 1)
          this.store.commit(lookupName, allToDelete)
        }
        break
    }
  }
}
