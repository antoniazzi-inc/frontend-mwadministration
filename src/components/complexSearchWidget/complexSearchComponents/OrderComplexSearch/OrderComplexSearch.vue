<template>
  <form>
    <div class="form-group">
      <div class="form-group">
        <searchable-select-component :config="productSingleSelectConfig"
                                     :options="$store.state.lookups.products"
                                     :value="selectedProduct"
                                     @onSelected="addProduct"
                                     @onDelete="removeProduct"/>
      </div>
      <div class="form-group" v-if="allProductAttributes && allProductAttributes.length">
        <searchable-select-component :config="productAttributeSingleSelectConfig"
                                     :options="allProductAttributes"
                                     :value="selectedProductAttribute"
                                     @onSelected="addProductAttribute"
                                     @onDelete="removeProductAttribute"/>
      </div>
      <searchable-select-component :config="operatorsSingleSelectConfig"
                                   :options="allOperators"
                                   :value="selectedOperator"
                                   @onSelected="addOperator"
                                   @onDelete="removeOperator"/>
    </div>
    <div class="form-group">
      <div class="dateHolder date-input">
        <flat-pickr :config="dateConfig" class="single-daterange form-control" v-model="dateValue"/>
        <i class="fa fa-times clearDate cursor-pointer" @click="dateValue=null">
          <span aria-hidden="true" class="sr-only">X</span>
        </i>
      </div>
    </div>
  </form>
</template>
<script src="./OrderComplexSearch.component.ts"/>
