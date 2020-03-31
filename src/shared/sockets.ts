import {Component, Vue} from "vue-property-decorator";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import store from '../store'
@Component
export default class Sockets extends Vue {
  public received_messages: any[];
  public send_message: any;
  public connected: boolean;
  public socket: any;
  public url: any;
  public store: any;
  public stompClient: any;

  constructor(props: any) {
    super(props)
    this.store = store
    this.socket = new SockJS('/socket')
    this.received_messages = []
    this.send_message = null
    this.connected = false
    this.stompClient = null
    this.url = props && props.url ? props.url : '/socket'
  }

  public connect() {
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, (frame: any) => {
        this.connected = true;
        this.stompClient.subscribe(`/session/1`, (tick: any) => {
          this.updateLookups(JSON.parse(tick.body))
        });
      },
      (error: any) => {
        console.log(error);
        this.connected = false;
      }
    );
  }
  public disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
    this.connected = false;
  }
  public updateLookups (obj:any){
    let self = this;
    switch (obj.action) {
      case 'update':
        let allToUpdate = this.store.state.lookups[obj.type]
        let indexToUpdate = null
        this.store.state.lookups[obj.type].forEach((item:any, ind:number)=>{
          if(item.id === obj.content.id){
            indexToUpdate = ind
          }
        })
        if(indexToUpdate !== null) {
          allToUpdate[indexToUpdate] = obj.content
          this.store.commit(obj.type, allToUpdate)
        }
        break;
      case 'created':
        debugger
        let allToCreate = self.store.state.lookups[obj.type]
        allToCreate.push(obj.content)
        this.store.commit(obj.type, allToCreate)
        break;
      case 'delete':
        let allToDelete = self.store.state.lookups[obj.type]
        let indexToDelete = null
        this.store.state.lookups[obj.type].forEach((item:any, ind:number)=>{
          if(item.id === obj.content.id){
            indexToDelete = ind
          }
        })
        if(indexToDelete !== null) {
          allToDelete.splice(indexToDelete, 1)
          this.store.commit(obj.type, allToDelete)
        }
        break;
    }
  }
}
