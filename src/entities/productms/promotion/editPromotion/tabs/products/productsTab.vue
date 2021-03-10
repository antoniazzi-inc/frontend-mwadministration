<!--
  - /*
  -  * Copyright 2018-2021 Antoniazzi Holding BV
  -  *
  -  * This program is free software: you can redistribute it and/or modify it
  -  * under the terms of the GNU General Public License as published by
  -  * the Free Software Foundation, either version 3 of the License,
  -  * or (at your option) any later version.
  -  *
  -  * This program is distributed in the hope that it will be useful,
  -  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  -  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  -  * GNU General Public License for more details.
  -  *
  -  * You should have received a copy of the GNU General Public License
  -  * along with this program. If not, see <https://www.gnu.org/licenses/>.
  -  */
  -->

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
