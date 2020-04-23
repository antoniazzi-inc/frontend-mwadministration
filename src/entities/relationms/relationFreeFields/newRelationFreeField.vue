<template>
  <div class="container-fluid text-left">
    <h2 v-if="freeField.id">{{$t('labels.editFreeField')}}</h2>
    <h2 v-if="!freeField.id">{{$t('labels.createNewFreeField')}}</h2>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent.stop="saveFreeField">
          <div class="form-row mt-3">
            <div class="col">
              <label>{{$t('labels.freeFieldType')}}</label>
              <select v-validate="'required'" @input="changeType" name="Free-Field-Type"
                      :class="{'form-control': true, invalid: errors.has('Free-Field-Type')}"
                      v-model="freeField.customFieldType">
                <option value="TEXT">{{$t('labels.text')}}</option>
                <option value="BOOLEAN">{{$t('labels.boolean')}}</option>
                <option value="OPTION_LIST">{{$t('labels.optionList')}}</option>
              </select>
              <span class="text-danger small">{{errors.first('Free-Field-Type')}}</span>
            </div>
          </div>
          <div class="form-row mt-3">
            <div class="col">
              <multi-language-component
                :config="multiLangConfig"
                :value="freeField.customFieldLanguages"
                @onAdd="addNewFreeFieldLanguage"
                @onChange="changeNewFreeFieldLanguage"
                @onRemove="removeFreeFieldLanguage"></multi-language-component>
            </div>
          </div>
          <div class="form-row mt-3 text-center">
            <div class="col-4">
              <label>{{$t('labels.userVisible')}}</label>
              <toggle-switch :on-text="$t('labels.yes')"
                             :off-text="$t('labels.no')"
                             :value.sync="freeField.userVisible"></toggle-switch>
            </div>
            <div class="col-4">
              <label>{{$t('labels.userEditable')}}</label>
              <toggle-switch :on-text="$t('labels.yes')"
                             :off-text="$t('labels.no')"
                             :value.sync="freeField.userEditable"></toggle-switch>
            </div>
            <div class="col-4">
              <label>{{$t('labels.gdprSpecialField')}}</label>
              <toggle-switch :on-text="$t('labels.yes')"
                             :off-text="$t('labels.no')"
                             :value.sync="freeField.gdprSpecialField"></toggle-switch>
            </div>
          </div>
          <div class="form-row mt-3">
            <div class="col">
              <label>{{$t('labels.category')}}</label>
              <searchable-select-component :config="searchableConfigCat"
                                           :options="$store.state.lookups.categories"
                                           :value="selectedCategory"
                                           @onChange="categoryUpdated"
                                           @onSelected="categoryUpdated"
                                           @onDelete="categoryRemoved"
              ></searchable-select-component>
            </div>
          </div>
          <div class="form-row mt-3">
            <div class="col text-right">
              <button type="button" class="btn btn-secondary" @click="cancel">{{$t('buttons.cancel')}}</button>
              <button type="submit" class="btn ml-2 btn-primary">{{$t('buttons.save')}}</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-6" v-if="freeField.customFieldType === 'OPTION_LIST'">
        <p class="text-center text-danger small">{{$t('labels.freeFieldOptionSaveWarning')}}</p>
        <div class="row">
          <div class="col-md-6 text-left">
            <h4>{{$t('labels.fieldOptions')}}</h4>
          </div>
          <div class="col-md-6 text-right">
            <button class="btn btn-outline-primary" @click="addNewFreeFieldOption">
              <i class="fa fa-plus"/>
              {{$t('labels.newOption')}}
            </button>
          </div>
        </div>
        <div class="form-row mt-3">
          <div class="col">
            <div class="scrollable">
              <draggable v-model="freeField.customFieldOptions" @end="changeIndex" class="dragArea col-md-12 p-2 white"
                         :options="{group:'people'}">
                <div v-show="!editMode" class="pipeline-item mt-2"
                     v-for="(option, index) in freeField.customFieldOptions" :key="index">
                  <div class="pi-controls">
                    <i class="fas fa-edit cursor-pointer text-warning" @click="editOption(option, index)"></i>
                    <i class="ml-2 fas cursor-pointer fa-trash-alt text-danger" data-toggle="modal"
                       data-target="#deleteModal" @click="prepareDeleteOption(index)"></i>
                  </div>
                  <div class="pi-body">
                    <div class="avatar"><i style="font-size: 2.5rem" class="fa fa-filter mr-3"></i></div>
                    <div class="pi-info">
                      <div class="h6 pi-name">{{getMultiLangName(option.customFieldOptionLanguages).name}}</div>
                      <div class="pi-sub">{{$t('labels.value')}}: {{option.value}}</div>
                      <div class="pi-sub" v-if="option.maxOccurrences > 0">{{$t('labels.maxOccurrences')}}:
                        {{option.maxOccurrences}}
                      </div>
                      <div class="pi-sub">{{$t('labels.freeFieldIndex')}}: {{option.customFieldIndex}}</div>
                    </div>
                  </div>
                  <div class="pi-foot">
                    <div class="extra-info">{{$t('labels.createdOn')}} {{option.createdOn | formatOnlyDate}}</div>
                    <div class="extra-info">{{$t('labels.updatedOn')}} {{option.updatedOn | formatOnlyDate}}</div>
                  </div>
                </div>
              </draggable>
            </div>
          </div>
        </div>
        <form @submit.prevent.stop="saveOptionField" v-if="editMode">
          <div class="form-row mt-3">
            <div class="col">
              <multi-language-component
                :config="multiLangConfigOption"
                :value="selectedOption.customFieldOptionLanguages"
                @onAdd="addNewFreeFieldOptionLanguage"
                @onChange="changeNewFreeFieldOptionLanguage"
                @onRemove="removeFreeFieldOptionLanguage"></multi-language-component>
            </div>
          </div>
          <div :class="{'form-row': true}">
            <div class="col">
              <label>{{$t('labels.value')}}</label>
              <input :class="{'form-control': true, invalid: errors.has('Value')}" v-validate="'required'"
                     name="Value" type="text" v-model="selectedOption.value"/>
              <span class="text-danger small">{{errors.first('Value')}}</span>
            </div>
          </div>
          <div :class="{'form-row mt-3': true}">
            <div class="col">
              <label>{{$t('labels.maxOccurrences')}}</label>
              <input :class="{'form-control': true, invalid: errors.has('Max-Occurrences')}" name="Max-Occurrences"
                     type="text"
                     v-model="selectedOption.maxOccurrences" v-validate="'numeric|min_value:1|required'"/>
              <span class="text-danger small">{{errors.first('Max-Occurrences')}}</span>
            </div>
          </div>
          <div class="form-row mt-3">
            <div class="col text-right">
              <button type="submit" class="btn btn-outline-primary mb-2 pull-right ml-2">
                <span v-if="selectedOption.id > 0">{{$t('buttons.save')}}</span>
                <span v-else>{{$t('buttons.create')}}</span>
              </button>
              <button type="submit" @click.prevent="cancelOptionField($event)"
                      class="btn btn-outline-warning mb-2 pull-right ml-2">
                {{$t('buttons.cancel')}}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" :id="'deleteModal'" tabindex="-1" role="dialog"
         ref="deleteModal">
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
            <button type="button" class="btn btn-primary" @click="removeOptionConfirmed">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./newRelationFreeField.component.ts" lang="ts"></script>
<style>
  .pipeline-item {
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
    position: relative;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);
  }

  .pipeline-item .pi-controls {
    position: absolute;
    top: 5px;
    right: 10px;
    line-height: 1;
  }

  .pipeline-item .pi-body {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 10px 15px;
  }

  .pipeline-item .pi-foot {
    background-color: #f1f4f8;
    padding: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 0px 0px 4px 4px;
  }
</style>
