<template>
  <div class="tab-form-panel">
    <p class="mt-2" v-show="!editMode || !isInit || selectedProductFeature === null">{{$t('labels.productFeatures')}}</p>

    <div class="modal" data-backdrop="static" data-keyboard="false" id="removeEntityAttribute" tabindex="-1" role="dialog" ref="removeEntityAttribute">
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
            <button type="button" class="btn btn-primary" @click="removeAttribute">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" data-backdrop="static" data-keyboard="false" id="removeEntityAttributeOption" tabindex="-1" role="dialog" ref="removeEntityAttributeOption">
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
            <button type="button" class="btn btn-primary" @click="RemoveAttributeOption">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="form-desc" v-if="!editMode">
      <div class="row">
        <div class="col-md-9">
          <template v-if="productCopy.attributes && productCopy.attributes.length">
            <div class="accordion" id="accordionFeatures">
              <template @click.prevent="selectedProductFeature = item" v-for="(item, index) in productCopy.attributes">
                <div class="card prodfeature" :key="index">
                  <div class="card-header row pl-0 ml-0 pr-0 mr-0 align-items-center" :id="'headingOne' + index" data-toggle="collapse" :data-target="'#collapseOne' + index">
                    <h5 class="mb-0 col-md-10">
                      {{getAttributeName(item.attributeLanguages ? item.attributeLanguages : undefined)}}
                      <span style="color:#909090; font-size:0.8em; text-align: right; padding-left:1em;"> {{$t('labels.clickForOptions')}}...</span>
                    </h5>
                    <div class="col-md-2 text-right">
                      <i class="fas fa-edit text-success" @click="editAttribute(item)"/>
                      <i class="fas fa-trash-alt text-danger ml-2" data-toggle="modal" data-target="#removeEntityAttribute" @click.prevent="prepareRemoveAttribute(item)"/>
                    </div>
                  </div>
                  <div :id="'collapseOne' + index" class="collapse" :aria-labelledby="'headingOne' + index" data-parent="#accordionFeatures">
                    <div class="card-body">
                      <table class="table table-striped">
                        <thead>
                        <th>{{$t('labels.name')}}</th>
                        <th>{{$t('labels.fieldIndex')}}</th>
                        <th>{{$t('labels.additionalCosts')}}</th>
                        <th>{{$t('labels.stock')}}</th>
                        <th>&nbsp;</th>
                        </thead>
                        <tbody>
                        <tr v-for="(option, key) in item.attributeValues" :key="key">
                          <td>{{getAttributeName(productCopy.attributes[index].attributeValues[key].attributeValueLanguages)}}</td>
                          <td>{{option.orderIndex}}</td>
                          <td>{{option.price}} {{$store.state.currency}}</td>
                          <td>{{option.stock}}</td>
                          <td>
                            <div class="text-danger ml-3 cursor-pointer" data-target="#removeEntityAttributeOption" data-toggle="modal" @click.prevent="prepareRemoveAttributeOption(productCopy.attributes[index].attributeValues[key])">
                              <i class="fas fa-trash-alt text-danger"></i>
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div v-show="editMode && isInit && selectedProductFeature != null" id="editFeatureForm">
      <div class="row">
        <div class="col-md-6">
          <h3 v-if="selectedProductFeature && selectedProductFeature.id == undefined">{{$t('buttons.addFeature')}}</h3>
          <h3 v-else>{{$t('labels.editFeature')}}</h3>
          <form>
            <div class="form-group">
              <multi-language-component
                :config="multiLangConfig"
                :value="selectedProductFeature.attributeLanguages"
                @onAdd="addNewFeatureLang"
                @onChange="updateFeatureLang"
                @onRemove="removeFeatureLang"/>
            </div>
          <div class="form-group col-md-6 pt-3 pull-left">
            <label class="form-control-label">{{$t('labels.availableForCustomers')}}</label>
            <toggle-switch :on-text="$t('labels.yes')"
               :off-text="$t('labels.no')"
               :value.sync="selectedProductFeature.visibleInFrontEnd"/>
          </div>
            <div class="form-group col-md-6 pt-3 pull-left">
              <label class="form-control-label">{{$t('labels.multipleValues')}}</label>
              <toggle-switch :on-text="$t('labels.yes')"
                 :off-text="$t('labels.no')"
                 :value.sync="selectedProductFeature.multipleValues"/>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <h3 style="margin-bottom:0.9em;">{{$t('labels.productFeatureOptions')}}
            <button type="button" v-if="!editModeAttribute && isInit" @click.prevent="addNewAttributeOption" class="btn btn-primary float-right"><i class="fa fa-plus mr-2"></i>{{$t('labels.newAttributeOption')}}</button>
          </h3>
          <div class="ae-list-w" style="background-color:#f2f4f8; border:0; padding:2px;">
            <div class="scrollable">
              <draggable
                class="list-group"
                tag="ul"
                v-model="allOptions"
                v-bind="dragOptions"
                @start="dragging = true"
                @end="changeIndex">
                <transition-group type="transition" :name="!dragging ? 'flip-list' : null">
                  <template v-if="!editModeAttribute">
                    <li class="cursor-pointer pipeline-item mt-2" v-for="(option, key) in allOptions" :key="key">
                      <div class="pi-controls" v-if="option.stock > 0">
                        {{$t('labels.stock') | lower }}: {{option.stock}}
                      </div>
                      <div class="pi-body" style="cursor: grabbing">
                        <div class="pi-info">
                          <div class="h6 pi-name">{{getAttributeName(option.attributeValueLanguages)}}</div>
                          <div class="pi-sub">{{$t('labels.value')}}: {{option.value}}</div>
                        </div>
                      </div>
                      <div class="pi-foot" style="padding:0px; cursor: grabbing; padding-right: 0.4em; padding-left:0.6em;">
                        <div class="tags">
                          <i class="text-success fas fa-edit m-2" @click="editAttributeOption(option, key)" style="cursor: pointer"></i>
                          <i class="fas fa-trash-alt m-2 text-danger" data-toggle="modal" data-target="#removeEntityAttributeOption" @click.prevent="prepareRemoveAttributeOption(option)" style="cursor: pointer"></i>
                          <span style="color:#a0a0f0">&nbsp; [ordering: {{option.orderIndex}}]</span>
                        </div>
                        <a class="extra-info">
                          <span style="color:#707070">{{$t('labels.additionalCosts')}}: {{option.price | formatAmount}}</span>
                        </a>
                      </div>
                    </li>
                  </template>
                </transition-group>
              </draggable>
            </div>

            <div v-if="editModeAttribute && isInit" class="ml-3 mr-3 editOptionForm">
                <form class="needs-validation" novalidate>
                    <div class="form-group">
                      <multi-language-component
                        :config="multiLangConfigOption"
                        :value="selectedOption.attributeValueLanguages"
                        @onChange="updateFeatureOptionLang"
                        @onRemove="removeFeatureOptionLang"/>
                    </div>
                    <div :class="{'form-group': true}">
                        <label for="value">{{$t('labels.enterValue')}}</label>
                        <input :class="{'form-control': true, invalid: errors.has('value')}" name="value" id="value" type="text" v-model="selectedOption.value"/>
                    </div>
                    <div :class="{'form-group': true}">
                        <label>{{$t('labels.additionalCosts')}}</label>
                        <money v-model="selectedOption.price" style="max-width:150px" class="form-control" name="priceAmount"  v-bind="money"></money>
                    </div>
                    <div :class="{'form-group': true}">
                        <label>{{$t('labels.stock')}}</label>
                        <input v-model="selectedOption.stock" style="max-width:150px" class="form-control" type="number"/>
                    </div>
                    <div class="form-group row">
                      <div class="col-md-12 text-right">
                        <div class="form-buttons-w">
                          <button type="submit" @click.prevent="backToViewMode($event)" class="btn btn-outline-primary mb-2 pull-right">{{$t('buttons.cancel')}}</button>
                          <button type="submit" @click.prevent="saveOptionField($event)" class="btn btn-primary mb-2 ml-2"><span v-if="selectedOption.id > 0">{{$t('buttons.save')}}</span><span v-else>{{$t('buttons.saveOption')}}</span></button>
                        </div>
                      </div>
                    </div>
                </form>
            </div>

          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-right">
          <div class="form-buttons-w">
              <button class="btn btn-outline-primary" @click.prevent="cancel">{{$t('buttons.cancel')}}</button>
              <button class="btn btn-primary ml-2" @click.prevent="save" :disabled="($refs.featureLang && $refs.featureLang.selectedLang.name === '') || (selectedProductFeature.attributeValues && selectedProductFeature.attributeValues.length === 0)">{{$t('buttons.save')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="!editMode || !isInit || selectedProductFeature == null">
      <div class="col-md-12 text-right">
        <div class="form-buttons-w">
          <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
          <button type="button" class="btn btn-primary" @click.prevent="addNewFeature"><i class="fa fa-plus"></i> {{$t('buttons.addFeature')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./featuresTab.component.ts"></script>
<style scoped>
  #editFeatureForm {
    background-color: #f2f4f8;
    border: solid 1px #d0d0d0;
    margin:0.5em;
    margin-bottom:2em;
    border-radius: 10px;
    padding: 1em;
    box-shadow: 5px 20px 28px #aaa;
  }
  .prodfeature {
    margin-bottom:1em;
    padding:0px;
    border-radius: 16px;
    box-shadow: 4px 4px 4px #ccc;
    cursor: pointer;
  }
  .pipeline-item {
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
    position: relative;
    -webkit-box-shadow: 0px 5px 5px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0px 5px 5px 0 rgba(0, 0, 0, 0.2);
    border: 1px solid #e0e0e0;
  }
  .editOptionForm {
    background-color: #f9f9f9;
    border: solid 1px #d0d0d0;
    margin:0.5em;
    border-radius: 6px;
    padding: 1em;
    box-shadow: 5px 20px 28px #aaa;
  }
/*
  .hr-text {
      line-height: 1em;
      position: relative;
      outline: 0;
      border: 0;
      color: black;
      text-align: center;
      height: 1.5em;
      opacity: .5;
  }
  .hr-text::before {
      content: '';
      background: linear-gradient(to right, transparent, #818078, transparent);
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
  }
  .hr-text::after {
      content: attr(data-content);
      position: relative;
      display: inline-block;
      color: black;
      padding: 0 .5em;
      line-height: 1.5em;
      color: #818078;
      background-color: #fcfcfa;
  }
  .larger {
      font-size:1.2em;
      color: #909090;
  }
  .element-box {
      padding:0!important;
      padding-top:1em!important;
  }
 */
  a, a:active {
      color:#909090!important;
      background-color: transparent!important;
      border-color: transparent!important;
  }
</style>
