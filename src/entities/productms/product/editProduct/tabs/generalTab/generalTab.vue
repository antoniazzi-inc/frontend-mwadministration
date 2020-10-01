<template>
  <div class="tab-form-panel">
    <form>
      <div class="form-row mt-3">
        <div class="form-group col-md-11">
          <multi-language-component
            :config="multiLangConfig"
            :value="productCopy.productLanguages"
            @onAdd="addNewLang"
            @onChange="updateLang"
            @onRemove="removeLang"/>
        </div>
        <div class="col-md-1"></div>
      </div>

      <div class="form-row align-items-left price-row" style="margin-bottom:0">
        <div class="col-auto">
          <div class="form-group">
            <label class="control-label">{{$t('labels.exclusivePrice')}}</label>
            <div class="input-group mb-3" style="padding-bottom:0; margin-bottom:0">
              <money v-model="productCopy.price" :class="{'form-control': true}" name="priceAmount"  v-bind="money"></money>
              <div class="input-group-append">
                <span class="btn btn-rounded btn-success input-group-text cursor-pointer" @click.prevent="isInclusive = !isInclusive" id="basic-addon2">
                    <span v-if="!isInclusive">{{$t('labels.useInclPrice')}}</span>
                    <span v-if="isInclusive">{{$t('labels.useExclPrice')}}</span>
                </span>
              </div>
            </div>
            <p v-show="inclusive() > 0" style="padding-top:0;">{{$t('labels.inclusivePriceIs')}}: {{$store.state.currency}} {{inclusive()}}</p>
          </div>
        </div>
        <div class="col-auto">
          <div class="form-group" v-show="isInclusive">
            <label class="control-label">{{$t('labels.inclusivePrice')}}</label>
            <div class="input-group mb-3">
              <money @blur.native="calculateExclusive" style="max-width:150px; height:40px;" v-model="inclusivePrice" :class="{'form-control': true}" name="priceAmount"></money>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="form-group">
            <label class="control-label">{{$t('labels.taxRate')}}</label>
            <select :class="{'form-control': true, invalid: errors.has('tax')}" style="min-width:100px; height:40px;" v-model="productCopy.tax" @change="calculateTax()" v-validate="'required'" name="tax">
              <option v-for="(item, index) in allTaxRates" :key="index" :value="item.rate">{{item.rate}}%</option>
            </select>
            <span class="small text-danger">{{errors.first('tax')}}</span>
          </div>
        </div>
        <div class="col-auto">
          <label class="control-label">{{$t('labels.roundedTotal')}}</label>
          <toggle-switch
            :on-text="$t('labels.yes')"
            :off-text="$t('labels.no')"
            :value.sync="product.priceRounding"/>
          <p><small>{{$t('labels.finalCalculatedTotalMustBeRoundedTo5Cents')}}</small></p>
        </div>
      </div>

      <div class="form-row align-items-left">
        <div class="col-auto" style="margin-right:20px;">
          <label>{{$t('labels.validFrom')}}</label>
          <div class="dateHolder date-input">
            <flat-pickr :config="validFromConfig" class="single-daterange form-control" id="validFromDate" v-model="availableFrom"/>
          </div>
        </div>
        <div class="col-auto" style="margin-right:20px;">
          <label>{{$t('labels.validTo')}}</label>
          <div class="dateHolder date-input">
            <flat-pickr :config="validToConfig" v-model="availableTo" class="single-daterange form-control"/>
            <i class="fa fa-times clearDate cursor-pointer" @click="availableTo=null">
              <span aria-hidden="true" class="sr-only">X</span>
            </i>
          </div>
        </div>
        <div class="col-auto" v-if="product.productType === 'SERVICE'">
          <label class="control-label">{{$t('labels.priceType')}}</label>
          <select :class="{'form-control': true}" v-model="productCopy.typeService.priceType">
            <option value="fixed">{{$t('labels.fixed')}}</option>
            <option value="hourly">{{$t('labels.hourly')}}</option>
            <option value="15minutes">{{$t('labels.15minutes')}}</option>
            <option value="daily">{{$t('labels.daily')}}</option>
          </select>
        </div>
      </div>

      <div class="form-row align-items-left price-row">
        <div class="col-auto" style="margin-right:60px;">
          <label class="control-label">{{$t('labels.archived')}}</label>
          <toggle-switch id="productArchived"
                         :on-text="$t('labels.yes')"
                         :off-text="$t('labels.no')"
                         :value.sync="productCopy.archived"/>
        </div>
        <div class="col-auto" style="margin-right:60px;">
          <label class="control-label">{{$t('labels.userDefinedPrice')}}</label>
          <toggle-switch id="repeatSubscription"
                         :on-text="$t('labels.yes')"
                         :off-text="$t('labels.no')"
                         :value.sync="productCopy.userDefinedPrice"/>
        </div>
        <div class="col-auto">
          <label class="control-label">{{$t('labels.euTax')}}</label>
          <toggle-switch id="euTax"
                         :on-text="$t('labels.yes')"
                         :off-text="$t('labels.no')"
                         :value.sync="productCopy.euTax"/>
          <p><small>{{$t('labels.taxRatesFromCustomersCountry')}}
            <router-link to=""> {{$t('labels.moreInfo')}}</router-link></small>
          </p>
        </div>
      </div>

      <div class="form-row">
          <div class="col-md-2">
              <label class="control-label">{{$t('labels.ledgerAccountName')}}</label>
              <input type="text" class="form-control" v-model="productCopy.ledgerAccountName"/>
          </div>
        <div class="col-md-2">
          <label class="control-label">{{$t('labels.sku')}}</label>
          <input type="text" class="form-control" v-model="productCopy.sku" name="sku"/>
        </div>
        <div class="col-md-1">
          <label class="control-label">{{$t('labels.maxItems')}}</label>
          <input type="number" class="form-control" v-model="productCopy.stock" name="maxItemsToSell"/>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-5">
          <label class="control-label">{{$t('labels.categorizeUnder')}}</label>
          <searchable-select-component :config="multiSelectConfig"
                                         :options="allProductsCategories"
                                         :value="selectedCategories"
                                         @onSelected="addNewCategory"
                                         @onDelete="removeCategory"/>
        </div>
        <div class="col-md-1"></div>
      </div>

      <div class="form-row mt-3">
        <div class="form-group col-sm-5">
          <multi-language-component
            :config="multiLangMaxExceedConfig"
            :value="maxExceededMessage"
            @onChange="updateMaxExceedLang"/>
        </div>
        <div class="col-md-1"></div>
          <div class="form-group col-sm-5">
            <multi-language-component
              :config="multiLangNotAvailableConfig"
              :value="notAvailableMessage"
              @onChange="updateNotAvailableLang"/>
          </div>
        <div class="col-md-1"></div>
      </div>

      <div class="form-buttons-w text-right mt-3">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
        <!-- <button type="button" @click="resetPromo" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button> -->
        <button class="btn btn-primary" :disabled="isSaveDisabled" @click.prevent="save">{{$t('buttons.save')}}</button>
      </div>

    </form>

       <!--
        <div class="element-wrapper col-md-3">
          <div class="element-box">
            <div class="form-desc" style="color:#808080;">
                {{$t('labels.dontForgetToClickSave')}}
            </div>
            <router-link to="" tag="button" data-toggle="modal" data-target="#createNewProduct" id="jh-create-entity"
                         class="btn btn-primary float-right jh-create-entity create-product">
                <span  v-text="$t('buttons.createNew')"></span>
            </router-link>
          </div>
          <div class="modal" data-backdrop="static" data-keyboard="false" id="createNewProduct" tabindex="-1" role="dialog" ref="createNewProduct">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5>{{$t('labels.saveChangesFirst')}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="mt-4">
                    <p>{{$t('labels.unsavedChangesWillBeDiscarded')}}</p>
                    <p>{{$t('labels.pleaseSave')}}</p>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" @click="goToNewProduct">
                    {{$t('buttons.continueAnyway')}}
                  </button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        -->
  </div>
</template>
<script lang="ts" src="./generalTab.component.ts"></script>

<style scoped>
.price-row {
  margin-top: 2em;
  margin-bottom: 2em;
}
.price-row .col-auto {
  margin-right: 20px;
}
</style>
