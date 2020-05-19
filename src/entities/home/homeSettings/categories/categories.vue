<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.categories')}}</span>
      <button tag="button" data-toggle="modal" data-target="#categoryModal" class="btn btn-primary float-right" @click="resetCategory">
       <i class="fas fa-plus"/>  <span>{{$t('labels.newCategory')}}</span>
      </button>
    </h2>
    <simple-search @onSearch="searchCategory"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="$props.active"
      :table="'category'"
      :noDataLabel="'labels.noData'"
      @onEdit="editCategory"
      @onCopy="copyCategory"
      @onDelete="deleteCategory"
      :service="categoryService"/>
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
  </div>
</template>
<script type="ts" src="./categories.component.ts">
</script>
