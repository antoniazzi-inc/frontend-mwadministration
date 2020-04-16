import {Component, Inject, Vue, Watch} from "vue-property-decorator";

import relationFreeFieldService from "@/shared/services/relationFreeFieldService";
import relationFreeFieldOptionService from "@/shared/services/relationFreeFieldOptionService";
import {IRelationEntity, RelationEntity} from "@/shared/models/relationModel";
import {AxiosResponse} from "axios";
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {CustomField, ICustomField} from "@/shared/models/custom-field.model";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.component";


@Component({
  props:{
    relation: Object
  },
  components: {
    SearchableSelectComponent
  }
})
export default class FreeFieldSubTabComponent extends mixins(CommonHelpers, Vue) {
  refs!:{
    removeEntityFreeField:HTMLElement
  }
  public customFieldService = relationFreeFieldService.getInstance()
  public relationCustomFieldService = relationFreeFieldOptionService.getInstance()
  public editMode = false;
  public searchString = '';
  public addNewField = false;
  public relationCopy: IRelationEntity|null = null;
  public selectedOptionValue: any = null;
  public fieldsConfig = {
    required: false,
    placeholder: 'selectField',
    trackBy: 'name',
    enableAdd: true,
    allowEmpty: true,
    addCaption: 'createNewField'
  };
  public selectedFields: ICustomField[] = [];
  public allCustomFields: ICustomField[] = [];
  public itemToDelete: ICustomField = {};
  public fieldToEdit = {
    customField: new CustomField(),
    value: '',
    id: undefined,
    updatedOn: null,
    createdOn: null,
    version: ''
  };
  public allFields: ICustomField[] = [];

  @Watch('rel', {immediate: true, deep: true})
  public fillRel(newVal:any){
    this.relationCopy = JSON.parse(JSON.stringify(newVal));
  }
  @Watch('selectedOptionValue', {immediate: true, deep: true})
  public fillVal(newVal:any){
    this.fieldToEdit.value = newVal
  }

  public created() {
    this.relationCopy = new RelationEntity();
    this.fieldToEdit = {
      customField: new CustomField(),
      value: '',
      id: undefined,
      updatedOn: null,
      createdOn: null,
      version: ''
    };
    this.retrieveAllCustomFields();
  }
  public mounted(){
    this.relationCopy = this.$props.relation;
    this.searchString = '';
  }
  public retrieveAllCustomFields(){
    let self = this;
    let pagination = {
      page: 0,
      size: 10000,
      sort: ['id,asc']
    }
    this.customFieldService.getAll(pagination, null).then((resp:AxiosResponse) => {
      if (resp.data){
        self.allCustomFields = resp.data;
        self.getAllFreeFields(resp.data);
      }
    })
  }
  public closeModal(){
    console.log('TODO implement closeModal');
  }
  public removeConfirmed(){
    console.log('TODO implement removeConfirmed');
  }
  public searchFreeFields(){
    console.log('TODO implement searchFreeFields');
  }
  public editRelationField(item:any){
    if(item.customField.customFieldType === 'OPTION_LIST'){
      this.selectedOptionValue = item.value
    }
    this.fieldToEdit = item;
    this.editMode = true;
    this.addNewField = false;
  }
  public getAllFreeFields (allFields:any) {
    let self = this;
    let all:any = [];
    $.each(allFields, function (k, v) {
      let toSkip = false;
      if(self.relationCopy) $.each(self.relationCopy.relationCustomFields, function (key, val:any) {
        if(val.customField.id === v.id){
          toSkip = true;
        }
      });
      if(!toSkip){
        all.push({
          code: v.code,
          customFieldLanguages: v.customFieldLanguages,
          customFieldOptions: v.customFieldOptions,
          createdOn: v.createdOn,
          updatedOn: v.updatedOn,
          customFieldType: v.customFieldType,
          id: v.id,
          gdprSpecialField: v.gdprSpecialField,
          version: v.version,
          administrationId: v.administrationId,
          userEditable: v.userEditable,
          userVisible: v.userVisible,
          name:  v.customFieldLanguages && v.customFieldLanguages.length > 0 ? v.customFieldLanguages[0].name : ''
        });
      }
    });
    this.allFields = all;
  }
  public deleteRelationField(item:any){
    $(this.$refs.removeEntityFreeField).show();
    this.itemToDelete = item;
  }
  public removeField(){
    let self = this;
    if(this.itemToDelete.id) this.relationCustomFieldService.delete(this.itemToDelete.id).then((resp:AxiosResponse)=>{
      let index = null;
      if(self.relationCopy)
      $.each(self.relationCopy.relationCustomFields, function (k, v:any) {
        if(v.id === self.itemToDelete.id){
          index = k;
        }
      });
      if(index !== null && self.relationCopy && self.relationCopy.relationCustomFields){
        self.relationCopy.relationCustomFields.splice(index, 1);
      }
      this.setAlert(this.$t('toastMessages.customFieldDeleted'), 'success')
      this.closeDialog();
      this.getAllFreeFields(this.allCustomFields);
    });
  }
  public closeDialog(){
    (<any>this.$refs.removeEntityFreeField).hide();
    this.itemToDelete = {};
    this.$emit('retrieveRelation', this.relationCopy);
  }
  public getClassName(type:any){
    switch (type) {
      case 'OPTION_LIST':
        return 'fa fa-filter';
      case 'BOOLEAN':
        return 'fab fa-nintendo-switch';
      case 'TEXT':
        return 'fa fa-font';
    }
  }
  public getName(langs:any){
    if (!langs) return '';
    let lang = '';
    let self = this;
    $.each(langs, function (k, v) {
      if(v.langKey === self.$store.state.currentLanguage){
        lang = v.name;
      }
    });
    if(lang !== ''){
      return lang;
    }else{
      return langs[0] ? langs[0].name : '';
    }
  }
  public newField(){
    this.editMode = true;
    this.addNewField = true;
    this.getAllFreeFields(this.allCustomFields);
  }
  public navigateToFieds(){
    if(this.relationCopy) this.$router.push('/entity/custom-field/new/?rel=' + this.relationCopy.id);
  }
  public addField(field:any){
    this.fieldToEdit = {
      customField: field,
      value: field.value,
      id: undefined,
      createdOn: null,
      updatedOn: null,
      version: '',
    };
    this.addNewField = true;
    this.editMode = true;
    this.getAllFreeFields(this.allCustomFields);
  }
  public saveFreeField(){
    let self = this;
    if (this.relationCopy){
    let dto = {
      "customField": {
        "id": this.fieldToEdit.customField.id,
        "administrationId": this.relationCopy.administrationId,
        "code": this.fieldToEdit.customField.code,
        "userVisible": this.fieldToEdit.customField.userVisible,
        "userEditable": this.fieldToEdit.customField.userEditable,
        "gdprSpecialField": this.fieldToEdit.customField.gdprSpecialField,
        "customFieldType": this.fieldToEdit.customField.customFieldType,
        "createdOn": this.fieldToEdit.customField.createdOn,
        "updatedOn": this.fieldToEdit.customField.updatedOn,
        "version": this.fieldToEdit.customField.version,
        "customFieldLanguages": this.fieldToEdit.customField.customFieldLanguages,
        "customFieldOptions": this.fieldToEdit.customField.customFieldOptions
      },
      "relation": {
        "id": this.relationCopy.id,
        "version": this.relationCopy.version
      },
      "value": this.fieldToEdit.value
    };
    if(this.fieldToEdit.customField.customFieldType === 'OPTION_LIST'){
      dto.value = this.selectedOptionValue;
    }
    if(this.fieldToEdit.id){
      this.relationCustomFieldService.put(dto).then((resp:AxiosResponse)=>{
        let index = null;
        if(self.relationCopy)
        $.each(self.relationCopy.relationCustomFields, function (k, v:any) {
          if(v.id === resp.data.id){
            index = k;
          }
        });
        if(index !== null && self.relationCopy && self.relationCopy.relationCustomFields){
          self.relationCopy.relationCustomFields[index] = resp.data;
        }
        this.setAlert(this.$t('toastMessages.relationCustomFieldUpdated'), 'success')
        this.cancelFreeField();
        self.$emit('retrieveRelation', self.relationCopy);
      })
    }else{
      this.relationCustomFieldService.post(dto).then((resp:AxiosResponse)=>{
        if(self.relationCopy && self.relationCopy.relationCustomFields) self.relationCopy.relationCustomFields.push(resp.data);
        // @ts-ignore
        this.setAlert(this.$t('toastMessages.relationCustomFieldCreated'), 'success')
        this.cancelFreeField();
        self.$emit('retrieveRelation', self.relationCopy);
      })
    }
    }

  }
  public cancelFreeField(){
    this.editMode = false;
    this.addNewField = false;
    this.fieldToEdit = {
      customField: new CustomField(),
      value: '',
      id: undefined,
      updatedOn: null,
      createdOn: null,
      version: ''
    };
    this.$emit('retrieveRelation', this.relationCopy);
  }
}
