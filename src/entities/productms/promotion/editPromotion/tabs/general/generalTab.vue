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
      <div class="form-row mt-3">
        <div class="form-group col-12">
          <multi-language-component
            :config="multiLangConfig"
            :value="promotion.promotionLanguages"
            @onAdd="addPromotionLang"
            @onChange="changePromotionLang"
            @onRemove="removePromotionLang"/>
        </div>
      </div>

      <div class="form-group mt-3 row">
        <div class="col-md-2">
          <label>{{ $t('labels.validFrom') }}</label>
          <div class="dateHolder date-input">
            <flat-pickr :config="validFromConfig" class="single-daterange form-control" id="validFromDate"
                        v-model="availableFrom"/>
          </div>
        </div>
        <div class="col-md-2">
          <label>{{ $t('labels.validTo') }}</label>
          <div class="dateHolder date-input">
            <flat-pickr :config="validToConfig" v-model="availableTo" class="single-daterange form-control"/>
            <i class="fa fa-times clearDate cursor-pointer" @click="availableTo=null">
              <span aria-hidden="true" class="sr-only">X</span>
            </i>
          </div>
          <span class="small text-danger" v-if="showDateError()">{{ $t('labels.validToMustBeAfterValidFrom') }}</span>
        </div>
        <div class="col-md-8"></div>
      </div>

      <div class="form-group mt-3 row">
        <div class="col-md-3" v-if="promotionCopy.promotionType !== 'BUNDLE'">
          <label>{{ $t('labels.discountType') }}</label>
          <select class="form-control" style="max-width:200px;" v-model="selectedDiscountType">
            <option v-for="(item, index) in allDiscountTypes" :key="index" v-bind:value=item.id>{{ item.label }}
            </option>
          </select>
        </div>
        <div class="col-md-6 mt-1 pr-0 disc-details">
          <template v-if="promotionCopy.promotionType !== 'BUNDLE'">
            <div :class="{'form-group': true}" v-if="selectedDiscountType===1 || selectedDiscountType===2">
              <label class="control-label" v-if="selectedDiscountType===1">{{ $t('labels.percentageAmount') }}</label>
              <label class="control-label" v-if="selectedDiscountType===2">{{ $t('labels.fixedAmount') }}</label>
              <money v-if="selectedDiscountType===1" style="max-width:200px;" v-model="discountPriceAmount"
                     class="form-control" name="discountAmount1" v-bind="moneyPercentage"></money>
              <money v-else-if="selectedDiscountType===2" style="max-width:200px;" v-model="discountPriceAmount"
                     class="form-control" name="discountAmount" v-bind="money"></money>
              <div v-else-if="selectedDiscountType === 2" class="form-group">
                <label class="control-label">{{ $t('labels.useThreeDecimals') }}</label>
                <toggle-switch id="productArchived"
                               :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="useMoreDecimalst"></toggle-switch>
              </div>
            </div>
            <div :class="{'form-group': true}" v-if="selectedDiscountType===4">
              <label class="control-label">{{ $t('labels.FreeItem') }}</label>
              <searchable-select-component :config="singleSelectConfig"
                                           :options="$store.state.lookups.products"
                                           :value="selectedProduct"
                                           @onChange="addProduct"
                                           @onDelete="removeProduct"
                                           style="max-width:80%"/>
            </div>
            <div :class="{'form-group': true}" v-if="selectedDiscountType===4">
              <label class="control-label">{{ $t('labels.quantityAmount') }}</label>
              <input type="number" style="max-width:200px;" class="form-control" name="discountAmount"
                     v-model="discountQuantityAmount"/>
            </div>
          </template>
          <div class="row mt-3">
            <div class="form-group col-md-6">
              <div class="row">
                <div class="col-md-12">
                  <label class="control-label">{{ $t('labels.repeatInCaseOfSubscription') }}</label>
                  <toggle-switch
                    :on-text="$t('labels.yes')"
                    :off-text="$t('labels.no')"
                    :value.sync="promotionCopy.recurrent"/>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="col-md-12">
                <div v-if="selectedDiscountType !== 3 && selectedDiscountType !== 4 && promotionCopy.promotionType !== 'BUNDLE'">
                  <label class="control-label">{{ $t('labels.applyToWholeOrder') }}</label>
                  <toggle-switch
                    :on-text="$t('labels.yes')"
                    :off-text="$t('labels.no')"
                    :value.sync="wholeOrder"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-buttons-w text-right mt-3">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{ $t('buttons.backToList') }}
        </button>
        <button type="button" @click="resetPromo" class="btn btn-primary ml-3">{{ $t('buttons.cancel') }}</button>
        <button class="btn btn-primary ml-3" @click.prevent="save()">{{ $t('buttons.save') }}</button>
      </div>

    </form>
  </div>
</template>
<script lang="ts" src="./generalTab.component.ts"></script>

<style scoped>
.disc-details {
  margin-top: 2em;
  padding: 2em;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  background-color: #f2f4f8;
}
</style>
