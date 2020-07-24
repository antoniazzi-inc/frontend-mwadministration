<template>
  <div>
    <form>
      <div class="row">
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
      <div class="row">
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
        <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
          <span v-text="$t('buttons.back')">Back</span>
        </button>
      </div>


    </form>
  </div>
</template>
<script lang="ts" src="./productsTab.component.ts"></script>
