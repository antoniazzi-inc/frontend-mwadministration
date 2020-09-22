<template>
  <div class="tab-form-panel">

    <div v-if="!editMode">
      <div class="d-flex justify-content-between mb-3">
        <div class="p-2" style="width:50%">
          <input class="form-control" :placeholder="$t('labels.search')" @input="searchFreeFields()" type="text" v-model="searchString">
        </div>
        <div class="p-2">
          <button tag="button" data-toggle="modal" class="btn btn-primary float-right create-button" @click="newField">
            <i class="fas fa-plus"/>  <span>{{$t('buttons.add')}}</span>
          </button>
        </div>
      </div>
      <div class="table-responsive ff-table" v-if="relationCopy.relationCustomFields && relationCopy.relationCustomFields.length > 0">
        <table class="table table-lightborder">
          <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Value
            </th>
            <th class="text-center">
              {{$t('labels.fieldType')}}
            </th>
            <th>
              {{$t('labels.createdOn')}}
            </th>
            <th class="text-right">
              &nbsp;
            </th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(item, index) in relationCopy.relationCustomFields">
            <tr>
              <td>
                {{getName(item.customField.customFieldLanguages)}}
              </td>
              <td>
                {{item.value === 'true' ? $t('labels.yes') : item.value === 'false' ? $t('labels.no') : item.value}}
              </td>
              <td class="text-center">
                <i :class="getClassName(item.customField.customFieldType)"></i>
              </td>
              <td>
                {{item.customField.createdOn | formatDate}}
              </td>
              <td class="text-right">
                <div class="btn-group flex-btn-group-container text-center justify-content-center">
                  <div @click.prevent="editRelationField(item)" class="ml-3 text-primary cursor-pointer">
                    <i class="os-icon os-icon-ui-49" style="font-size:1.3em;"></i>
                  </div>
                  <div @click.prevent="deleteRelationField(item)" class="ml-3 text-primary cursor-pointer text-danger">
                    <i class="os-icon os-icon-ui-15" style="font-size:1.3em;"></i>
                  </div>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div v-else style="margin-left:1em; margin-top:2em;">
        <p>{{$t('labels.notfound')}}</p>
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
          <h4 v-if="fieldToEdit.customField" class="title">{{getName(fieldToEdit.customField.customFieldLanguages)}}</h4>
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

  .ff-table {
    margin-top: 1em;
    margin-right: 2em;
    background-color: #fff;
    padding: 1em;
    border-radius: 6px;
    border: 1px solid #e0e0e9;
    font-size:1.1em;
  }

  .ff-table td {
    color:#444;
  }

</style>
