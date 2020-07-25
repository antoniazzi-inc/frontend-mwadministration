<template>
  <div>
    <div class="row">
      <div class="element-wrapper col-md-6" v-if="!editMode">
        <div v-for="(item, index) in allBundles" :key="index" @click="selectedBundleIndex = index">
          <div class="support-index show-ticket-content col-md-12 mt-4">
            <div class="support-tickets ml-3 mr-0">
              <div :class="{'support-ticket': true}">
                <div class="st-body">
                  <div class="avatar"><i style="font-size: 3em" class="fas fa-box-open"></i></div>
                  <div class="st-meta">
                    <i class="fas fa-edit" @click="editBundle(item, index)"></i>
                    <div class="ui-icon-copy text-primary" @click="copyBundle(item, index)"></div>
                    <div v-if="allBundles && allBundles.length > 1" class="fas fa-trash-alt" data-toggle="modal" data-target="#removeEntity" @click="prepareDeleteBundle(item)"></div>
                  </div>
                  <div class="ticket-content">
                                <span class="label">
                                    <br/>
                                    <p>{{productText[index]}}</p>
                                    <p>{{attributesTexts[index]}}</p>
                                    <p>{{$t('labels.discount')}}: {{getBundleDiscount(item)}}</p>
                                </span><br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!editMode" class="element-wrapper col-md-6">
        <div class="element-wrapper col-md-6 mt-4">
          <button type="button" class="btn btn-outline-primary" @click="addNewBundle">{{$t('labels.addNewBundle')}}</button>
        </div>
      </div>
      <div v-if="editMode" class="element-wrapper col-md-12 mt-4">
        <button type="button" class="btn btn-outline-primary" @click="addNewBundleItem">{{$t('labels.AddNewItem')}}</button>
        <template v-for="(item, index) in allItems">
          <form class=" mt-4 form-inline" :key="index">
            <div class="form-group-inline ml-4" :key="index">
              <label class="form-control-label-inline">{{$t('labels.selectProduct')}}</label>
              <searchable-select-component :config="multiSelectConfigProduct"
                                           :options="item.allProducts"
                                           :value="allItems[index].selectedProducts"
                                           @onSelected="addProduct($event, index)"
                                           @onDelete="removeProduct($event, index)"/>
            </div>
            <div class="form-group-inline ml-4">
              <label class="form-control-label">{{$t('labels.selectProductFeature')}}</label>
              <searchable-select-component :config="multiSelectConfigAttribute"
                                           :options="item.allAttributes"
                                           :value="allItems[index].selectedAttributes"
                                           @onSelected="addAttribute($event, index)"
                                           @onDelete="removeAttribute($event, index)"/>
            </div>
            <div class="form-group-inline ml-4">
              <label class="form-control-label">{{$t('labels.selectProductFeatureValue')}}</label>
              <searchable-select-component :config="multiSelectConfigAttributeValue"
                                           :options="item.allAttributeValues"
                                           :value="allItems[index].selectedAttributeValues"
                                           @onSelected="addAttributeValue($event, index)"
                                           @onDelete="removeAttributeValue($event, index)"/>
            </div>
            <div class="form-group-inline ml-4">
              <label class="form-control-label">{{$t('labels.quantity')}}</label>
              <input type="number" name="selectedBundleQuantity" v-model="item.selectedBundleQuantity" :class="{'form-control':true, 'invalid': errors.has('selectedBundleQuantity')}"/> <br/>
              <small class="text-danger" v-if="errors.has('selectedBundleQuantity')">{{errors.first('selectedBundleQuantity')}}</small>
            </div>
            <div class="form-group-inline ml-4 mt-3">
              <i class="fas fa-trash-alt text-danger cursor-pointer" @click="removeBundleItem(item, index)" style="font-size: 0.8em;" ></i>
            </div>
            <hr/>
            <br/>
          </form>
        </template>
        <div class="buttons-w text-right mb-4 mt-3">
          <button type="button" class="btn btn-outline-primary" @click.prevent="previousState">{{$t('buttons.cancel')}}</button>
          <button type="button" @click="saveBundle" class="btn btn-primary ml-2">{{$t('buttons.save')}}</button>
        </div>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" :id="'removeEntity'" tabindex="-1" role="dialog" ref="removeEntity">
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
            <button type="button" class="btn btn-primary" @click="removeBundle()">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="ml-2 btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./bundleBasedTab.component.ts"></script>
