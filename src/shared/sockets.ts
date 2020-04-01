import { Component, Vue } from 'vue-property-decorator'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import store from '../store'
import AdministrationService from "@/shared/services/administrationService";
import {AxiosResponse} from "axios";
@Component
export default class Sockets extends Vue {
  public administrationService: any
  public receivedMessages: any[];
  public sendMessage: any;
  public connected: boolean;
  public socket: any;
  public url: any;
  public store: any;
  public stompClient: any;

  constructor (props: any) {
    super(props)
    this.store = store
    this.administrationService = AdministrationService.getInstance()
    this.socket = new SockJS('api/administrationms/socket')
    this.receivedMessages = []
    this.sendMessage = null
    this.connected = false
    this.stompClient = null
    this.url = props && props.url ? props.url : '/socket'
  }

  public connect () {
    this.administrationService.get(this.store.state.userIdentity.administrationId).then((result:AxiosResponse)=>{
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.connect({}, (frame: any) => {
          this.connected = true
          this.stompClient.subscribe(`api/administrationms/api/session/${result.data.uid}`, (tick: any) => {
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

  public disconnect () {
    if (this.stompClient) {
      this.stompClient.disconnect()
    }
    this.connected = false
  }

  public updateLookups (obj: any) {
    const self = this
    debugger
    switch (obj.action) {
      case 'UPDATE':
        const allToUpdate = this.store.state.lookups[obj.type]
        let indexToUpdate = null
        this.store.state.lookups[obj.type].forEach((item: any, ind: number) => {
          if (item.id === obj.content.id) {
            indexToUpdate = ind
          }
        })
        if (indexToUpdate !== null) {
          allToUpdate[indexToUpdate] = obj.content
          this.store.commit(obj.type, allToUpdate)
        }
        break
      case 'CREATE':
        debugger
        const allToCreate = self.store.state.lookups[obj.type]
        allToCreate.push(obj.content)
        this.store.commit(obj.type, allToCreate)
        break
      case 'DELETE':
        const allToDelete = self.store.state.lookups[obj.type]
        let indexToDelete = null
        this.store.state.lookups[obj.type].forEach((item: any, ind: number) => {
          if (item.id === obj.content.id) {
            indexToDelete = ind
          }
        })
        if (indexToDelete !== null) {
          allToDelete.splice(indexToDelete, 1)
          this.store.commit(obj.type, allToDelete)
        }
        break
    }
  }
}
