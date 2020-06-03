<template>
    <div class="row">
        <div class="element-wrapper col-md-9 text-left" style="padding-top:1em">
                <form>
                    <div class="form-group">
                      <multi-language-component
                        :config="multiLangConfig"
                        :value="productCopy.productLanguages"
                        @onAdd="addNewLang"
                        @onChange="updateLang"
                        @onRemove="removeLang"/>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">{{$t('labels.exclusivePrice')}}</label>
                                <div class="input-group mb-3">
                                    <money v-model="productCopy.price" :class="{'form-control': true}" name="priceAmount"  v-bind="money"></money>
                                    <div class="input-group-append">
                                        <span class="input-group-text cursor-pointer" @click.prevent="isInclusive = !isInclusive" id="basic-addon2">
                                            <span v-if="!isInclusive">{{$t('labels.useInclPrice')}}</span>
                                            <span v-if="isInclusive">{{$t('labels.useExclPrice')}}</span>
                                        </span>
                                    </div>
                                </div>
                                <p v-show="inclusive() > 0"><small>{{$t('labels.inclusivePriceIs')}}: {{inclusive()}}€</small></p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" v-show="isInclusive">
                                <label class="control-label">{{$t('labels.inclusivePrice')}}</label>
                                <money v-model="inclusivePrice" :class="{'form-control': true}" name="priceAmount"  v-bind="money"></money>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.tax')}}</label>
                            <select class="form-control" v-model="productCopy.tax">
                                <option v-for="(item, index) in allTaxRates" :key="index" :value="item.rate">{{item.rate}}%</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <div v-if="product.productType === 'SERVICE'">
                                <label class="control-label">{{$t('labels.priceType')}}</label>
                                <select class="form-control" v-model="productCopy.typeService.priceType">
                                    <option value="fixed">{{$t('labels.typefixed')}}</option>
                                    <option value="hourly">{{$t('labels.typehourly')}}</option>
                                    <option value="15minutes">{{$t('labels.type15minutes')}}</option>
                                    <option value="daily">{{$t('labels.typedaily')}}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label class="control-label">{{$t('labels.ledgerAccountName')}}</label>
                            <input type="text" class="form-control" v-model="productCopy.ledgerAccountName"/>
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">{{$t('labels.categorizeUnder')}}</label>
                          <searchable-select-component :config="multiSelectConfig"
                                                       :options="allProductsCategories"
                                                       :value="selectedCategories"
                                                       @onAdd="addNewCategory"
                                                       @onRemove="removeCategory"/>
                        </div>
                    </div>
                  <div class="form-group row mt-3">
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
                      <span class="small text-danger" v-if="availableTo !== null">{{$t('labels.validToMustBeAfterValidFrom')}}</span>
                    </div>
                  </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label class="control-label">{{$t('labels.sku')}}</label>
                            <input type="text" class="form-control" v-model="productCopy.sku" name="sku"/>
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">{{$t('labels.maxitems')}}</label>
                            <input type="number" class="form-control" v-model="productCopy.stock" name="maxItemsToSell"/>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="form-group col-md-6">
                            <div class="row">
                                <div class="col-md-4">
                                    <label class="control-label">{{$t('labels.archived')}}</label>
                                    <toggle-switch id="productArchived"
                                                   :on-text="$t('labels.yes')"
                                                   :off-text="$t('labels.no')"
                                                   :value.sync="productCopy.archived"/>
                                </div>
                                <div class="col-md-8">
                                    <label class="control-label">{{$t('labels.euTax')}}</label>
                                    <toggle-switch id="euTax"
                                                   :on-text="$t('labels.yes')"
                                                   :off-text="$t('labels.no')"
                                                   :value.sync="productCopy.euTax"/>
                                    <p><small>{{$t('labels.taxRatesFromCustomersCountry')}}<router-link to=""> {{$t('global.moreInfo')}}</router-link></small></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row p-0 m-0">
                                <div class="col-md-6 p-0 m-0">
                                    <label class="control-label">{{$t('labels.roundedTotal')}}</label>
                                    <toggle-switch id="repeatSubscription1"
                                                   :on-text="$t('labels.yes')"
                                                   :off-text="$t('labels.no')"
                                                   :value.sync="productCopy.priceRounding"/>
                                    <p><small>{{$t('labels.finalCalculatedTotalMustBeRoundedTo5Cents')}}</small></p>
                                </div>
                                <div class="col-md-6 p-0 m-0">
                                        <label class="control-label">{{$t('labels.userDefinedPrice')}}</label>
                                        <toggle-switch id="repeatSubscription"
                                                       :on-text="$t('labels.yes')"
                                                       :off-text="$t('labels.no')"
                                                       :value.sync="productCopy.userDefinedPrice"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="form-group col-sm-6">
                          <multi-language-component
                            :config="multiLangMaxExceedConfig"
                            :value="product.productLanguages"
                            :langs="maxExceededMessage"
                            :availableLangs="AvailableProductLanguages"
                            @onChange="updateMaxExceedLang"/>
                        </div>
                        <div class="form-group col-sm-6">
                          <multi-language-component
                            :config="multiLangNotAvailableConfig"
                            :value="product.productLanguages"
                            :langs="maxExceededMessage"
                            :availableLangs="AvailableProductLanguages"
                            @onChange="updateNotAvailableLang"/>
                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" :disabled="isSaveDisabled" @click.prevent="save">{{$t('buttons.save')}}</button>
                    </div>
                </form>

        </div>
        <!--<div class="element-wrapper col-md-3">
            <b-modal ref="createNewProduct" id="createNewProduct" >
                <span slot="modal-title"><span>{{$t('global.messages.saveChangesFirst')}}</span></span>
                <div class="mt-4 text-center">
                    <p>{{$t('global.messages.unsavedChangesWillBeDiscarded')}}?</p>
                    <p>{{$t('global.messages.pleaseSave')}}?</p>
                </div>
                <div slot="modal-footer">
                    <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                    <button type="button" class="btn btn-primary" id="jhi-confirm-delete-product" v-on:click="goToNewProduct()">{{$t('global.messages.continueAnyway')}}</button>
                </div>
            </b-modal>
        </div>-->
    </div>
</template>
<script lang="ts" src="./generalTab.component.ts"></script>
