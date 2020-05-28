<template>
    <div class="row">
        <div class="element-wrapper col-md-9" style="padding-top:1em">

                <form>
                    <div class="form-group">
                        <jhi-multi-language
                            :config="multiLangConfig"
                            :langs="productCopy.productLanguages"
                            @updateLang="updateLang"
                            @addNewLang="addNewLang">
                        </jhi-multi-language>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">{{$t('vueadminApp.productmsProduct.exclusivePrice')}}</label>
                                <div class="input-group mb-3">
                                    <money v-model="productCopy.price" :class="{'form-control': true, 'invalid': $v.productCopy.price.$invalid,  'valid': !$v.productCopy.price.$invalid}" name="priceAmount"  v-bind="money"></money>
                                    <div class="input-group-append">
                                        <span class="input-group-text cursor-pointer" @click.prevent="isInclusive = !isInclusive" id="basic-addon2">
                                            <span v-if="!isInclusive">{{$t('vueadminApp.productmsProduct.useInclPrice')}}</span>
                                            <span v-if="isInclusive">{{$t('vueadminApp.productmsProduct.useExclPrice')}}</span>
                                        </span>
                                    </div>
                                </div>
                                <p v-show="inclusive() > 0"><small>{{$t('vueadminApp.productmsProduct.inclusivePriceIs')}}: {{inclusive()}}€</small></p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" v-show="isInclusive">
                                <label class="control-label">{{$t('vueadminApp.productmsProduct.inclusivePrice')}}</label>
                                <money v-model="inclusivePrice" :class="{'form-control': true, 'invalid': $v.productCopy.price.$invalid,  'valid': !$v.productCopy.price.$invalid}" name="priceAmount"  v-bind="money"></money>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('vueadminApp.productmsProduct.tax')}}</label>
                            <select class="form-control" v-model="productCopy.tax">
                                <option v-for="(item, index) in allTaxRates" :key="index" :value="item.rate">{{item.rate}}%</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <div v-if="product.productType === 'SERVICE'">
                                <label class="control-label">{{$t('vueadminApp.productmsProduct.priceType')}}</label>
                                <select class="form-control" v-model="productCopy.typeService.priceType">
                                    <option value="fixed">{{$t('vueadminApp.productmsProduct.typefixed')}}</option>
                                    <option value="hourly">{{$t('vueadminApp.productmsProduct.typehourly')}}</option>
                                    <option value="15minutes">{{$t('vueadminApp.productmsProduct.type15minutes')}}</option>
                                    <option value="daily">{{$t('vueadminApp.productmsProduct.typedaily')}}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label class="control-label">{{$t('vueadminApp.productmsProduct.ledgerAccountName')}}</label>
                            <input type="text" class="form-control" v-model="productCopy.ledgerAccountName"/>
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">{{$t('vueadminApp.productmsProduct.categorizeUnder')}}</label>
                            <multi-select :options="allProductsCategories"
                                          :value="selectedCategories"
                                          :config="multiSelectConfig"
                                          @onAdd="addNewCategory"
                                          @onRemove="removeCategory"></multi-select>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="form-group col-md-6">
                            <div :class="{' pl-0': true}">
                                <date-picker-component class="col-md-12" :dateVal="availableFrom" :config="availableFromConfig" @dateChanged="changeAvailableFromDate"></date-picker-component>
                                <span class="small text-danger" v-if="availableFromError">{{$t('vueadminApp.productmsProduct.availableToError')}}</span>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <div  :class="{' pl-0': true}">
                                <date-picker-component class="col-md-12" :dateVal="availableTo" :config="availableToConfig" @dateChanged="changeAvailableToDate"></date-picker-component>
                                <span class="small text-danger" v-if="availableToError">{{$t('vueadminApp.productmsProduct.availableToError')}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label class="control-label">{{$t('vueadminApp.productmsProduct.sku')}}</label>
                            <input type="text" class="form-control" v-model="productCopy.sku" name="sku"/>
                        </div>
                        <div class="col-md-6">
                            <label class="control-label">{{$t('vueadminApp.productmsProduct.maxitems')}}</label>
                            <input type="number" class="form-control" v-model="productCopy.stock" name="maxItemsToSell"/>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="form-group col-md-6">
                            <div class="row">
                                <div class="col-md-4">
                                    <label class="control-label">{{$t('vueadminApp.productmsProduct.archived')}}</label>
                                    <toggle-switch id="productArchived"
                                                   :on-text="$t('global.yes')"
                                                   :off-text="$t('global.no')"
                                                   :value.sync="productCopy.archived"></toggle-switch>
                                </div>
                                <div class="col-md-8">
                                    <label class="control-label">{{$t('vueadminApp.productmsProduct.euTax')}}</label>
                                    <toggle-switch id="euTax"
                                                   :on-text="$t('global.yes')"
                                                   :off-text="$t('global.no')"
                                                   :value.sync="productCopy.euTax"></toggle-switch>
                                    <p><small>{{$t('vueadminApp.productmsProduct.taxRatesFromCustomersCountry')}}<router-link to=""> {{$t('global.moreInfo')}}</router-link></small></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row p-0 m-0">
                                <div class="col-md-6 p-0 m-0">
                                    <label class="control-label">{{$t('vueadminApp.productmsProduct.roundedTotal')}}</label>
                                    <toggle-switch id="repeatSubscription"
                                                   :on-text="$t('global.yes')"
                                                   :off-text="$t('global.no')"
                                                   :value.sync="productCopy.priceRounding"></toggle-switch>
                                    <p><small>{{$t('vueadminApp.productmsProduct.finalCalculatedTotalMustBeRoundedTo5Cents')}}</small></p>
                                </div>
                                <div class="col-md-6 p-0 m-0">
                                        <label class="control-label">{{$t('vueadminApp.productmsProduct.userDefinedPrice')}}</label>
                                        <toggle-switch id="repeatSubscription"
                                                       :on-text="$t('global.yes')"
                                                       :off-text="$t('global.no')"
                                                       :value.sync="productCopy.userDefinedPrice"></toggle-switch>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="form-group col-sm-6">
                            <jhi-multi-language
                                :config="multiLangMaxExceedConfig"
                                :langs="maxExceededMessage"
                                @updateLang="updateMaxExceedLang"
                                :availableLangs="AvailableProductLanguages">
                            </jhi-multi-language>
                        </div>
                        <div class="form-group col-sm-6">
                            <jhi-multi-language
                                :config="multiLangNotAvailableConfig"
                                :langs="notAvailableMessage"
                                @updateLang="updateNotAvailableLang"
                                :availableLangs="AvailableProductLanguages">
                            </jhi-multi-language>
                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" :disabled="isSaveDisabled" @click.prevent="save">{{$t('entity.action.savechanges')}}</button>
                    </div>
                </form>

        </div>
        <div class="element-wrapper col-md-3">
            <div class="element-box">
                <!--
                <div class="form-desc" style="color:#808080;">
                    {{$t('global.messages.dontForgetToClickSave')}}
                </div>
                <router-link to="/entity/product/new" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-product">
                    <span  v-text="$t('vueadminApp.productmsProduct.home.createLabel')"></span>
                </router-link>
                -->
            </div>
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
        </div>
    </div>
</template>
<script lang="ts" src="./generalTab.component.ts"></script>
