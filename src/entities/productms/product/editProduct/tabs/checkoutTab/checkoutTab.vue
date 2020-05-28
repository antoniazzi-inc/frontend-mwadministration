<template>
    <div class="element-box">
        <div class="form-desc">{{$t('productCheckoutSettings')}}</div>
        <b-tabs v-model="tabIndex">
            <b-tab ref="relFields"  :title="$t('relFields')" active title-link-class="mb-3">
                <div class="row mt-4">
                    <div class="col-md-6">
                        <h4>{{$t('billingAddress')}}</h4>
                        <table class="table table-striped">
                            <thead>
                            <th>{{$t('name')}}</th>
                            <th>{{$t('visible')}}</th>
                            <th>{{$t('required')}}</th>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in registrationSettingsJson.billingAddress" :key="index">
                                <td>{{$t(item.name)}}</td>
                                <td>
                                    <toggle-switch
                                        :on-text="$t('global.yes')"
                                        :off-text="$t('global.no')"
                                        :value.sync="item.visible"></toggle-switch>
                                </td>
                                <td>
                                    <toggle-switch
                                        :on-text="$t('global.yes')"
                                        :off-text="$t('global.no')"
                                        :value.sync="item.required"></toggle-switch>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <h4>{{$t('deliveryAddress')}}</h4>
                        <table class="table table-striped">
                            <thead>
                            <th>{{$t('name')}}</th>
                            <th>{{$t('visible')}}</th>
                            <th>{{$t('required')}}</th>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in registrationSettingsJson.deliveryAddress" :key="index">
                                <td>{{$t(item.name)}}</td>
                                <td>
                                    <toggle-switch
                                        :on-text="$t('global.yes')"
                                        :off-text="$t('global.no')"
                                        :value.sync="item.visible"></toggle-switch>
                                </td>
                                <td>
                                    <toggle-switch
                                        :on-text="$t('global.yes')"
                                        :off-text="$t('global.no')"
                                        :value.sync="item.required"></toggle-switch>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr/>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <h4>{{$t('relationFields')}}</h4>
                        <table class="table table-striped">
                            <thead>
                            <th>{{$t('name')}}</th>
                            <th>{{$t('visible')}}</th>
                            <th>{{$t('required')}}</th>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in registrationSettingsJson.relationFields" :key="index">
                                <td>{{$t(item.name)}}</td>
                                <td>
                                    <toggle-switch
                                        :on-text="$t('global.yes')"
                                        :off-text="$t('global.no')"
                                        :value.sync="item.visible"></toggle-switch>
                                </td>
                                <td>
                                    <toggle-switch
                                        :on-text="$t('global.yes')"
                                        :off-text="$t('global.no')"
                                        :value.sync="item.required"></toggle-switch>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="form-buttons-w text-right">
                    <button class="btn btn-primary" @click.prevent="save">{{$t('save')}}</button>
                </div>
            </b-tab>
            <b-tab ref="freeFields"  :title="$t('freeFields')" title-link-class="mb-3">
                <table class="table table-striped">
                    <thead>
                        <th>{{$t('name')}}</th>
                        <th>{{$t('visible')}}</th>
                        <th>{{$t('required')}}</th>
                        <th>{{$t('usseInInvoice')}}</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in registrationSettingsJson.freeFields" :key="index">
                            <td>{{getName(item.field.customFieldLanguages)}}</td>
                            <td>
                                <toggle-switch
                                    :on-text="$t('global.yes')"
                                    :off-text="$t('global.no')"
                                    :value.sync="item.visible"></toggle-switch>
                            </td>
                            <td>
                                <toggle-switch
                                    :on-text="$t('global.yes')"
                                    :off-text="$t('global.no')"
                                    :value.sync="item.required"></toggle-switch>
                            </td>
                            <td>
                                <toggle-switch
                                    :on-text="$t('global.yes')"
                                    :off-text="$t('global.no')"
                                    :value.sync="item.useInInvoice"></toggle-switch>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="registrationSettingsJson.freeFields && registrationSettingsJson.freeFields.length" class="row align-items-center h-100 mt-3 mb-3">
                    <div class="col-md-7">
                        <div class="form-inline pull-right">
                            <label class="form-control-label items-per-page"> {{ $t('global.items-page') }}</label>
                            <select class="form-control input-sm -page-size-select ml-2" v-model="itemsPerPage"
                                    @change="page = 1">
                                <option :value=10>10</option>
                                <option :value=20>20</option>
                                <option :value=50>50</option>
                                <option :value=100>100</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-buttons-w text-right">
                    <button class="btn btn-primary" @click.prevent="save">{{$t('save')}}</button>
                </div>
            </b-tab>
            <b-tab ref="companyAndTaxes"  :title="$t('companyAndTaxes')" title-link-class="mb-3">
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('orderAsCompany')}}</label>
                            <toggle-switch
                                :on-text="$t('global.yes')"
                                :off-text="$t('global.no')"
                                :value.sync="registrationSettingsJson.companyAndTaxes.orderAsCompany"></toggle-switch>
                        </div>
                    </div>
                    <div class="row" v-show="registrationSettingsJson.companyAndTaxes.orderAsCompany">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('companyName')}}</label>
                            <input type="text" class="form-control" v-model="registrationSettingsJson.companyAndTaxes.companyName"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('vatNumber')}}</label>
                            <input type="text" class="form-control" v-model="registrationSettingsJson.companyAndTaxes.vatNumber"/>
                        </div>
                    </div>
                    <div class="row" v-show="registrationSettingsJson.companyAndTaxes.orderAsCompany">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('vatCalculation')}}</label>
                            <input type="text" class="form-control" v-model="registrationSettingsJson.companyAndTaxes.vatCalculation"/>
                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" @click.prevent="save">{{$t('save')}}</button>
                    </div>
                </form>
            </b-tab>
            <b-tab ref="termsAndConditions"  :title="$t('termsAndConditions')" title-link-class="mb-3">
                <form>
                    <div class="row mt-4">
                        <div class="form-group col-md-6">
                        <label class="form-control-label">{{$t('agreeConditions')}}</label>
                        <toggle-switch
                            :on-text="$t('global.yes')"
                            :off-text="$t('global.no')"
                            :value.sync="termsAndConditions.agreeConditions"></toggle-switch>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('agreePrivacyStatement')}}</label>
                            <toggle-switch
                                :on-text="$t('global.yes')"
                                :off-text="$t('global.no')"
                                :value.sync="termsAndConditions.agreePrivacyStatement"></toggle-switch>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('linkToConditions')}}</label>
                            <input type="text" class="form-control" v-model="termsAndConditions.linkToConditions"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('privacyStatement')}}</label>
                            <textarea cols="2" class="form-control" v-model="termsAndConditions.privacyStatement"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('linkText')}}</label>
                            <input type="text" class="form-control" v-model="termsAndConditions.linkText"/>
                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" @click.prevent="saveTermsAndConditions">{{$t('save')}}</button>
                    </div>
                </form>
            </b-tab>
        </b-tabs>
    </div>
</template>
<script lang="ts" src="./checkoutTab.component.ts"></script>
<style>
    .switch{
        margin: 0!important;
    }
</style>
