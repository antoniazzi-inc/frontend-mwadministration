<template>
  <div class="row mt-3">
    <div v-if="!editMode">
      <div class="menu-w menu-position-top menu-layout-mini sub-menu-style-over searchBarWrapper col-md-12 pb-4"
           v-if="relationCopy.relationCustomFields && relationCopy.relationCustomFields.length>0">
        <div class="element-search autosuggest-search-activator">
          <input class="searchBar" :placeholder="$t('labels.search')" @input="searchFreeFields()" type="text" v-model="searchString">
        </div>
      </div>
      <div  class="support-index show-ticket-content" v-if="relationCopy.relationCustomFields && relationCopy.relationCustomFields.length > 0">
        <div class="support-tickets">
          <div class="support-ticket mt-3" v-for="(item, index) in relationCopy.relationCustomFields" :key="index">
            <div class="st-body">
              <div class="avatar"><i style="font-size: 3rem;" class="dashicons dashicons-text"></i></div>
              <div class="st-meta m-2">
                <i class="fas fa-edit text-warning" @click="editRelationField(item)"></i>
                <div class="fas ml-2 fa-trash-alt text-danger" @click="deleteRelationField(item)"></div>
              </div>
              <div class="ticket-content">
                <h6 class="ticket-title">
                  {{getName(item.customField.customFieldLanguages)}} : {{item.value === 'true' ? $t('labels.yes') : item.value === 'false' ? $t('labels.no') : item.value}}
                </h6>
                <div class="ticket-description">
                  <span class="label">{{$t('labels.fieldType')}}: </span> <i :class="getClassName(item.customField.customFieldType)"></i> &nbsp; &nbsp;
                  <span class="label">{{$t('labels.createdOn')}} {{item.customField.createdOn | formatDate}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn btn-outline-primary" style="vertical-align: top" @click.prevent="newField">
          {{$t('buttons.add')}}
        </div>
      </div>
      <div v-else style="margin-left:1em; margin-top:2em;">
        <p>{{$t('labels.notfound')}}</p>
        <div class="btn btn-outline-primary" @click.prevent="newField">
          {{$t('buttons.add')}}
        </div>
      </div>
    </div>
    <div v-if="editMode" class="col-md-7">
      <form novalidate @submit.stop.prevent="saveFreeField">
        <div class="form-group" v-if="addNewField">
          <label>{{$t('labels.select')}}</label>
          <searchable-select-component :config="fieldsConfig"
                                       :options="allFields"
                                       :value="selectedFields"
                                       @onChange="addField"
                                       @onCreate="navigateToFieds"
                                       @onSelected="addField"
          ></searchable-select-component>
        </div>
        <div v-else class="form-group">
          <label>{{$t('labels.name')}}</label>
          <h5 v-if="fieldToEdit.customField" class="title">{{getName(fieldToEdit.customField.customFieldLanguages)}}</h5>
        </div>
        <div class="form-group" v-if="fieldToEdit.customField && fieldToEdit.customField.customFieldType === 'OPTION_LIST'">
          <label class="control-label">{{$t('labels.selectValue')}}</label>
          <select name="optionValue" :class="{'form-control': true, 'invalid': errors.has('optionValue') }" v-model="selectedOptionValue">
            <option :key="index" :value="fieldToEdit.customField.customFieldOptions[index].value" v-for="(item, index) in fieldToEdit.customField.customFieldOptions">
              {{item.value}}
            </option>
          </select>
          <span class="text-danger small">{{errors.first('optionValue')}}</span>
        </div>
        <div class="form-group" v-if="fieldToEdit.customField && fieldToEdit.customField.customFieldType === 'TEXT'">
          <label class="control-label">{{$t('labels.enterValue')}}</label>
          <input name="value" :class="{'form-control': true, 'invalid': errors.has('value') }" type="text" v-model="fieldToEdit.value"/>
          <span class="text-danger small">{{errors.first('value')}}</span>
        </div>
        <div class="form-group" v-if="fieldToEdit.customField && fieldToEdit.customField.customFieldType === 'BOOLEAN'">
          <label class="control-label">{{$t('labels.selectValue')}}</label>
          <select name="boolean-field-type" :class="{'form-control': true, 'invalid': errors.has('boolean-field-type') }" v-model="fieldToEdit.value">
            <option value="true">{{$t('labels.yes')}}</option>
            <option value="false">{{$t('labels.no')}}</option>
          </select>
          <span class="text-danger small">{{errors.first('boolean-field-type')}}</span>
        </div>
        <div class="buttons-w text-right">
          <button type="button" class="btn btn-outline-primary" @click.prevent="cancelFreeField">{{$t('buttons.cancel')}}</button>
          <button type="submit" class="btn btn-primary ml-2">{{$t('buttons.save')}}</button>
        </div>
      </form>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" :id="'deleteModal'" tabindex="-1" role="dialog" ref="deleteModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{$t('labels.confirmDelete')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mt-4">
              <h5>{{$t('labels.areYouSureToDelete')}}</h5>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="removeField()">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal" @click="closeDialog">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./freeFieldsSubTab.component.ts"></script>
<style scoped>
  .createdDate{
    color: grey;
    font-size: 0.7em;
  }
  .element-search{
    width: 100%!important;
    margin-left: 0px!important;
  }
  .searchBar{
    width: 100%!important;
    background: rgba(0, 0, 0, 0.2)!important;
    color: #fff;
    padding-left: 5%;
  }
  .searchBarWrapper{
    background: transparent;
    box-shadow: 0px 0px 0px 0px!important;
  }
  .support-index {
    margin-left:1em;
  }
</style>
