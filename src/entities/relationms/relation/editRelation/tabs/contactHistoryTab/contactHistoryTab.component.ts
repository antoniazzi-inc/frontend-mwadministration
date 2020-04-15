import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {Component, Vue, Watch} from 'vue-property-decorator'
import {IRelationEntity, RelationEntity} from "@/shared/models/relationModel";
import ContactWidget from "@/entities/relationms/relation/editRelation/tabs/contactHistoryTab/contactWidget.vue";
import {ContactHistory, IContactHistory} from "@/shared/models/contact-history.model";

@Component({
  components: {
    ContactWidget
  },
  props: {
    rel: Object,
    active: Boolean
  }
})
export default class ContactHistoryTabComponent extends mixins(Vue, CommonHelpers) {
  public currentTab: string
  public searchString: string
  public editMode: boolean
  public relationCopy: IRelationEntity

  constructor () {
    super()
    this.currentTab = 'profile'
    this.searchString = ''
    this.editMode = false

    this.relationCopy = new RelationEntity()
  }

  @Watch('rel',{immediate:true, deep: true})
  public fillRelation(newVal:any) {
    if(newVal){
      this.relationCopy = newVal
    }
  }

  public addNewContact(){
      let newContact = new ContactHistory();
      newContact.info = ''
      this.relationCopy.contactHistories ? this.relationCopy.contactHistories.push(newContact) : this.relationCopy.contactHistories = [newContact];
      this.editMode = true;
  }
  closeEditMode(){
    this.editMode = false
  }
  public searchContacts(){}
  public retrieveRelation(relation:any){
    this.editMode = false
    this.$emit('update', relation);
    this.closeEditMode();
  }

}
