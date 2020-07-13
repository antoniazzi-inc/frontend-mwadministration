<template>
        <div>
          <form>
            <div class="form-group mt-3">
              <multi-language-component
                :config="multiLangConfig"
                :value="promotion.promotionLanguages"
                @onAdd="addPromotionLang"
                @onChange="changePromotionLang"
                @onRemove="removePromotionLang"/>
            </div>
            <div class="form-group mt-3 row">
              <div class="col-md-6">
                <label>{{$t('labels.validFrom')}}</label>
                <div class="date-input">
                  <flat-pickr :config="validFromConfig" class="single-daterange form-control"
                              id="validFromDate" v-model="availableFrom"/>
                </div>
              </div>
              <div class="col-md-6">
                <label>{{$t('labels.validTo')}}</label>
                <div class="date-input">
                  <flat-pickr :config="validToConfig" class="single-daterange form-control"
                              id="validToDate" v-model="availableTo"/>
                </div>
                <span class="small text-danger" v-if="showDateError()">{{$t('labels.validToMustBeAfterValidFrom')}}</span>
              </div>
              <div class="col-md-12 mt-3">
                <div class="pl-0 col-md-6 mt-1">
                  <div class="form-group">
                    <label class="control-label">{{$t('labels.discountType')}}</label>
                    <select class="form-control" v-model="selectedDiscountType">
                      <option v-for="(item, index) in allDiscountTypes" :key="index" v-bind:value=item.id>{{item.label}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6 mt-1 pr-0">
                  <div :class="{'form-group': true}" v-if="selectedDiscountType===1 || selectedDiscountType===2">
                    <label class="control-label" v-if="selectedDiscountType===1">{{$t('labels.percentageAmount')}}</label>
                    <label class="control-label" v-if="selectedDiscountType===2">{{$t('labels.fixedAmount')}}</label>
                    <money v-if="selectedDiscountType===2" v-model="discountPriceAmount" class="form-control" name="discountAmount"  v-bind="money"></money>
                    <money v-if="selectedDiscountType===1" v-model="discountPriceAmount" class="form-control" name="discountAmount"  v-bind="moneyPercentage"></money>
                    <div v-if="selectedDiscountType === 2" class="form-group">
                      <label class="control-label">{{$t('labels.useThreeDecimals')}}</label>
                      <toggle-switch id="productArchived"
                                     :on-text="$t('labels.yes')"
                                     :off-text="$t('labels.no')"
                                     :value.sync="useMoreDecimalst"></toggle-switch>
                    </div>
                  </div>
                  <div :class="{'form-group': true}" v-if="selectedDiscountType===4">
                    <label class="control-label">{{$t('labels.FreeItem')}}</label>
                    <searchable-select-component :config="singleSelectConfig"
                                                 :options="$store.state.lookups.products"
                                                 :value="selectedProduct"
                                                 @onChange="addProduct"
                                                 @onDelete="removeProduct"/>
                  </div>
                  <div :class="{'form-group': true}" v-if="selectedDiscountType===4">
                    <label class="control-label">{{$t('labels.quantityAmount')}}</label>
                    <input type="number" class="form-control" name="discountAmount" v-model="discountQuantityAmount"/>
                  </div>
                  <div class="row mt-3">
                    <div class="form-group col-md-6">
                      <div class="row">
                        <div class="col-md-12">
                          <label class="control-label">{{$t('labels.repeatInCaseOfSubscription')}}</label>
                          <toggle-switch
                                         :on-text="$t('labels.yes')"
                                         :off-text="$t('labels.no')"
                                         :value.sync="promotionCopy.recurrent"/>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="col-md-12">
                        <div v-if="selectedDiscountType !== 3 && selectedDiscountType !== 4">
                          <label class="control-label">{{$t('labels.applyToWholeOrder')}}</label>
                          <toggle-switch
                                         :on-text="$t('labels.yes')"
                                         :off-text="$t('labels.no')"
                                         :value.sync="wholeOrder"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-buttons-w text-right">
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="back()">
                      <span v-text="$t('buttons.cancel')">Cancel</span>
                    </button>
                    <button class="btn btn-primary ml-3" @click.prevent="save">{{$t('buttons.save')}}</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
    </div>
</template>
<script lang="ts" src="./generalTab.component.ts"></script>
