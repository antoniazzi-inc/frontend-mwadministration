<template>
  <div class="row mt-3">
    <div v-if="!editMode">
      <div class="menu-w menu-position-top menu-layout-mini sub-menu-style-over searchBarWrapper col-md-12 pb-4" v-if="relation.relationCustomFields && relation.relationCustomFields.length>0">
        <div class="element-search autosuggest-search-activator">
          <input class="searchBar" :placeholder="$t('vueadminApp.relationmsCustomField.home.search')" @input="searchFreeFields()" type="text" v-model="searchString">
        </div>
      </div>
      <div  class="support-index show-ticket-content" v-if="relationCopy.relationCustomFields && relationCopy.relationCustomFields.length">
        <div class="support-tickets">
          <div class="support-ticket" v-for="(item, index) in relationCopy.relationCustomFields" :key="index">
            <div class="st-body">
              <div class="avatar"><i style="font-size: 3rem;" class="dashicons dashicons-text"></i></div>
              <div class="st-meta">
                <i class="os-icon os-icon-edit" @click="editRelationField(item)"></i>
                <div class="os-icon os-icon-trash" @click="deleteRelationField(item)"></div>
              </div>
              <div class="ticket-content">
                <h6 class="ticket-title">
                  {{getName(item.customField.customFieldLanguages)}} : {{item.value === 'true' ? $t('global.yes') : item.value === 'false' ? $t('global.no') : item.value}}
                </h6>
                <div class="ticket-description">
                  <span class="label">{{$t('fieldType')}}: </span> <i :class="getClassName(item.customField.customFieldType)"></i> &nbsp; &nbsp;
                  <span class="label">{{$t('entity.detail.created')}} {{item.customField.createdOn | formatDate}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn btn-outline-primary" style="vertical-align: top" @click.prevent="newField">
          {{$t('vueadminApp.relationmsCustomField.home.add')}}
        </div>
      </div>
      <div v-else style="margin-left:1em; margin-top:2em;">
        <p>{{$t('vueadminApp.relationmsCustomField.notfound')}}</p>
        <div class="btn btn-outline-primary" @click.prevent="newField">
          {{$t('vueadminApp.relationmsCustomField.home.add')}}
        </div>
      </div>
    </div>
    <div v-show="editMode" class="col-md-7">
      <form novalidate>
        <div class="form-group" v-if="addNewField">
          <label>{{$t('vueadminApp.relationmsCustomField.home.select')}}</label>
          <single-select
            :class="{'valid': !$v.fieldToEdit.customField.$invalid, 'invalid': $v.fieldToEdit.customField.$invalid }"
            ref="multiSelect"
            :config="fieldsConfig"
            :values="selectedFields"
            @addNew="navigateToFieds"
            @onChange="addField"
            :options="allFields" id="freeFields" name="freeFields">
          </single-select>
        </div>
        <div v-else class="form-group">
          <label>{{$t('vueadminApp.relationmsCustomField.name')}}</label>
          <h5 class="title">{{getName(fieldToEdit.customField.customFieldLanguages)}}</h5>
        </div>
        <div class="form-group" v-if="fieldToEdit.customField.customFieldType === 'OPTION_LIST'">
          <label class="control-label">{{$t('entity.detail.selectValue')}}</label>
          <select :class="{'form-control': true, 'valid': !$v.selectedOptionValue.$invalid, 'invalid': $v.selectedOptionValue.$invalid }" v-model="selectedOptionValue">
            <option :key="index" :value="fieldToEdit.customField.customFieldOptions[index].value" v-for="(item, index) in fieldToEdit.customField.customFieldOptions">
              {{item.value}}
            </option>
          </select>
        </div>
        <div class="form-group" v-if="fieldToEdit.customField.customFieldType === 'TEXT'">
          <label class="control-label">{{$t('entity.detail.enterValue')}}</label>
          <input :class="{'form-control': true, 'valid': !$v.fieldToEdit.value.$invalid, 'invalid': $v.fieldToEdit.value.$invalid }" type="text" v-model="fieldToEdit.value"/>
        </div>
        <div class="form-group" v-if="fieldToEdit.customField.customFieldType === 'BOOLEAN'">
          <label class="control-label">{{$t('entity.detail.selectValue')}}</label>
          <select :class="{'form-control': true, 'valid': !$v.fieldToEdit.value.$invalid, 'invalid': $v.fieldToEdit.value.$invalid }" v-model="fieldToEdit.value">
            <option value="true">{{$t('global.yes')}}</option>
            <option value="false">{{$t('global.no')}}</option>
          </select>
        </div>
        <div class="buttons-w text-right">
          <button type="button" class="btn btn-outline-primary" @click.prevent="cancelFreeField">{{$t('entity.action.cancel')}}</button>
          <button type="button" :disabled="$v.fieldToEdit.$invalid" class="btn btn-primary" @click.prevent="saveFreeField">{{$t('entity.action.save')}}</button>
        </div>
      </form>
    </div>
    <div v-show="editMode" class="col-md-5">

    </div>
    <b-modal ref="removeEntityFreeField" id="removeEntityFreeField" >
      <span slot="modal-title"><span id="vueadminApp.relationmsCustomField.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
      <div class="mt-4">
        <p id="jhi-delete-relation-heading" v-bind:title="$t('vueadminApp.relationmsCustomField.delete.question')">Are you sure you want to delete this free field?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button type="button" class="btn btn-primary" id="jhi-confirm-delete-relation" v-text="$t('entity.action.delete')" v-on:click="removeField()">Delete</button>
      </div>
    </b-modal>
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
  }
  .searchBarWrapper{
    background: transparent;
    box-shadow: 0px 0px 0px 0px!important;
  }
  .support-index {
    margin-left:1em;
  }
</style>
