<template>
  <div class="tab-form-panel">
    <form>
      <div class="form-group mt-3 row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="control-label">{{$t('labels.selectProducts')}}</label>
            <searchable-select-component :config="multiSelectConfig"
                                         :options="$store.state.lookups.products"
                                         :value="selectedProducts"
                                         @onSelected="addProduct"
                                         @onDelete="removeProduct"/>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label class="control-label">{{$t('labels.selectProductCategories')}}</label>
            <searchable-select-component :config="multiSelectConfigCat"
                                         :options="$store.state.lookups.categories"
                                         :value="selectedCategories"
                                         @onSelected="addProductCategory"
                                         @onDelete="removeProductCategory"/>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="form-group">
            <label class="control-label">{{$t('labels.selectProductVariants')}}</label>
            <searchable-select-component :config="multiSelectConfigCat"
                                         :options="allAttributes"
                                         :value="currentAttributes"
                                         @onSelected="addProductVariant"
                                         @onDelete="removeProductVariant"/>
          </div>
        </div>
      </div>

      <div class="form-buttons-w text-right">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
        <button type="button" @click="previousState" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
      </div>


    </form>
  </div>
</template>
<script lang="ts" src="./productsTab.component.ts"></script>
