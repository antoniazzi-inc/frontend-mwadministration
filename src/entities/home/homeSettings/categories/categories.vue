<template>
  <div class="container-fluid">

    <div class="d-flex justify-content-between mb-3">
      <div class="p-2" style="width:70%">
        <simple-search @onSearch="searchCategory"></simple-search>
      </div>
      <div class="p-4">
        <button tag="button" data-toggle="modal" data-target="#categoryModal" class="btn btn-primary float-right create-button" @click="resetCategory">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newCategory')}}</span>
        </button>
      </div>
    </div>

    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="$props.active"
      :table="'category'"
      :noDataLabel="'labels.noData'"
      @onEdit="editCategory"
      @onCopy="copyCategory"
      @onDelete="deleteCategory"
      :service="categoryService"/>


    <div class="onboarding-modal modal fade show" id="categoryModal" role="dialog" ref="categoryModal" tabindex="-1" style="padding-right: 15px; display: none;">
      <div class="modal-dialog modal-lg modal-centered" role="document">
        <div class="modal-content text-center">
          <button aria-label="Close" class="close" data-dismiss="modal" type="button"><span class="close-label">&nbsp;</span><span class="os-icon os-icon-close"></span></button>
          <div class="onboarding-side-by-side">
            <div class="onboarding-media" style="max-width:100px;">
              <img alt="" src="img/bigicon5.png" width="100px">
            </div>
            <div class="onboarding-content with-gradient" style="padding:1em; padding-top:2em; padding-left:3em;">
              <h4 class="onboarding-title" v-if="category && category.id === undefined">{{$t('labels.newCategory')}}</h4>
              <h4 class="onboarding-title" v-if="category && category.id > 0">{{$t('labels.editCategory')}}</h4>
              <div class="onboarding-text">
                In this example you can see a form where you can request some additional information from the customer when they land on the app page.
              </div>
              <form name="editForm" role="form" novalidate @submit.prevent.stop="saveCategory()">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="">{{$t('labels.code')}}</label>
                      <input type="text" ref="categoryCode" :class="{'form-control':true, invalid: errors.has('code')}" name="code" id="category-code"
                             v-model="category.code" v-validate="'required'"/>
                      <span class="text-danger small">{{ errors.first('code') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="">{{$t('labels.color')}}</label>
                      <div class="dropdown col-md-12" style="padding-left:0px">
                        <button :disabled="errors.any()>0" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true"
                                :style="{'background-color': category.color, width: '80px', height: '40px'}" aria-expanded="false"> &nbsp;
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dLabel">
                          <form>
                            <chrome-picker :value="colors" @input="updateColor"></chrome-picker>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-lg btn-white"  @click="closeModal">{{$t('buttons.close')}}</button>
                  <button type="submit" class="btn btn-lg btn-primary">{{$t('buttons.save')}}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>


<!--
    <div class="modal" data-backdrop="static" data-keyboard="false" id="categoryModal" tabindex="-1" role="dialog" ref="categoryModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form name="editForm" role="form" novalidate @submit.prevent.stop="saveCategory()">
          <div class="modal-header">
            <h5 v-if="category && category.id === undefined">{{$t('labels.newCategory')}}</h5>
            <h5 v-if="category && category.id > 0">{{$t('labels.editCategory')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mt-4">
                <div class="form-group">
                  <label class="form-control-label" for="category-code">{{$t('labels.code')}}</label>
                  <input type="text" ref="categoryCode" :class="{'form-control':true, invalid: errors.has('code')}" name="code" id="category-code"
                         v-model="category.code" v-validate="'required'"/>
                  <span class="text-danger small">{{ errors.first('code') }}</span>
                </div>
                <div class="form-group">
                  <label class="form-control-label" for="category-code">{{$t('labels.color')}}</label><br/>
                  <div class="dropdown col-md-12">
                    <button :disabled="errors.any()>0" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true"
                            :style="{'background-color': category.color, width: '100%', height: '20px'}" aria-expanded="false"> &nbsp;
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dLabel">
                      <form>
                      <chrome-picker :value="colors" @input="updateColor"></chrome-picker>
                      </form>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"  @click="closeModal">{{$t('buttons.close')}}</button>
            <button type="submit" class="btn btn-primary">{{$t('buttons.save')}}</button>
          </div>
          </form>
        </div>
      </div>
    </div>
-->

  </div>
</template>
<script type="ts" src="./categories.component.ts">
</script>
