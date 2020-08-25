<template>
    <div class="content-w">
        <div class="content-i">
            <div class="content-box">
                <h2 id="page-heading">
                    <span v-text="$t('labels.title')" id="invoice-template-heading">Invoice Templates</span>
                    <button type="button" v-b-modal.createEntityInvoiceTemplate @click="createNewInvoiceTemplate" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-invoice-template">
                        <font-awesome-icon icon="plus"></font-awesome-icon>
                        <span v-text="$t('labels.createLabel')">
                    Create new InvoiceTemplate
                </span>
                    </button>
                </h2>
                <div class="row">
                    <div class="col-sm-12">
                        <form name="searchForm" class="form-inline" v-on:submit.prevent="search(currentSearch)">
                            <div class="input-group w-100 mt-3">
                                <input type="text" class="form-control" name="currentSearch" id="currentSearch"
                                       v-bind:placeholder="$t('labels.search')"
                                       v-model="currentSearch"/>
                                <button type="button" id="launch-search" class="btn btn-primary" v-on:click="search(currentSearch)">
                                    <font-awesome-icon icon="search"></font-awesome-icon>
                                </button>
                                <button type="button" id="clear-search" class="btn btn-secondary" v-on:click="clear()"
                                        v-if="currentSearch">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <br/>
                <div class="col-md-12">
                    <div class="row p-0 m-0">
                        <div class="col-md-12 p-0 m-0">
                            <div class="table-responsive" v-if="invoiceTemplates">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span>
                                            <font-awesome-icon icon="sort"></font-awesome-icon>
                                        </th>
                                        <th v-if="hasAnyAuthority('ROLE_SUPER_ADMIN')" v-on:click="changeOrder('administrationId')"><span v-text="$t('labels.administrationId')">Administration Id</span>
                                            <font-awesome-icon icon="sort"></font-awesome-icon>
                                        </th>
                                        <th v-on:click="changeOrder('name')"><span v-text="$t('labels.name')">Name</span>
                                            <font-awesome-icon icon="sort"></font-awesome-icon>
                                        </th>
                                        <th v-on:click="changeOrder('description')"><span v-text="$t('labels.description')">Description</span>
                                            <font-awesome-icon icon="sort"></font-awesome-icon>
                                        </th>
                                        <th v-on:click="changeOrder('createdOn')"><span v-text="$t('labels.createdOn')">Created On</span>
                                            <font-awesome-icon icon="sort"></font-awesome-icon>
                                        </th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(invoiceTemplate, index) of orderBy(invoiceTemplates, propOrder, reverse === true ? 1 : -1)" :key="index">
                                        <td>{{invoiceTemplate.id}}</td>
                                        <td v-if="hasAnyAuthority('ROLE_SUPER_ADMIN')">{{invoiceTemplate.administrationId}}</td>
                                        <td>{{invoiceTemplate.name}}</td>
                                        <td>{{invoiceTemplate.description}}</td>
                                        <td>{{invoiceTemplate.createdOn | formatDate}}</td>
                                        <td class="text-center">
                                            <div class="btn-group flex-btn-group-container">
                                                <div @click.prevent="editInvoice(invoiceTemplate)" class="ml-3 text-primary cursor-pointer">
                                                    <i class="os-icon os-icon-ui-49"></i>
                                                </div>
                                                <div class="text-danger ml-3 cursor-pointer" v-b-modal.removeEntity @click.prevent="prepareRemove(invoiceTemplate)">
                                                    <i class="os-icon os-icon-ui-15"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal ref="removeEntity" id="removeEntity">
                <span slot="modal-title"><span id="labels.question" v-text="$t('labels.title')">Confirm delete operation</span></span>
                <div class="modal-body">
                    <p id="jhi-delete-invoiceTemplate-heading" v-bind:title="$t('labels.question')">Are you sure you want to delete this Invoice Template?</p>
                </div>
                <div slot="modal-footer">
                    <button type="button" class="btn btn-secondary" v-text="$t('labels.cancel')" v-on:click="closeDialog()">Cancel</button>
                    <button type="button" class="btn btn-primary" id="jhi-confirm-delete-invoiceTemplate" v-text="$t('labels.delete')" v-on:click="removeInvoiceTemplate()">Delete</button>
                </div>
            </b-modal>
            <b-modal noCloseOnBackdrop ref="createEntityInvoiceTemplate" id="createEntityInvoiceTemplate" size="xl">
                            <span slot="modal-title">
                                <span v-if="!invoiceToEdit || !invoiceToEdit.id">{{$t('labels.createLabel')}}</span>
                                <span v-else>{{$t('labels.editLabel')}}</span>
                            </span>
                <div class="modal-body">
                    <b-tabs v-model="invoiceTemplateTabIndex">
                        <b-tab :title="$t('labels.companyData')" active>
                            <span class="small text-danger">{{$t(errorInvoiceTemplate)}}</span>
                            <div class="form-group">
                                <div class="col-md-12 pl-0 ml-0">
                                    <label>{{$t('labels.name')}}</label>
                                    <input v-model="invoiceTemplateData.invoiceName" type="text" :class="{'form-control': true, invalid: invoiceTemplateData.invoiceName === '' ? true : false}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12 pl-0 ml-0">
                                    <label>{{$t('labels.description')}}</label>
                                    <textarea class="form-control" v-model="invoiceTemplateData.invoiceDescription" type="text"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group" v-if="!selectedLogo">
                                        <upload-widget :config="uploadLogoConfig" @input="uploadLogo"></upload-widget>
                                    </div>
                                    <div class="form-group" v-else>
                                        <span @click="removeLogo" class="close">X</span>
                                        <img :src="selectedLogo" class="img-thumbnail invoiceLogo"/>
                                    </div>
                                </div>
                                <div class="col-md-9 p-0 m-0">
                                    <div class="row p-0 m-0">
                                        <div class="col-md-12 pl-0 ml-0">
                                            <label>{{$t('labels.companyName')}}</label>
                                            <input v-model="invoiceTemplateData.companyName" type="text" :class="{'form-control': true, invalid: invoiceTemplateData.companyName === '' ? true : false}"/>
                                        </div>
                                    </div>
                                    <div class="row p-0 m-0">
                                        <div class="col-md-12 pl-0 ml-0">
                                            <label>{{$t('labels.position')}}</label>
                                            <select class="form-control" v-model="invoiceTemplateData.logoPosition">
                                                <option value="LEFT_ALIGNED">{{$t('labels.left')}}</option>
                                                <option value="CENTERED">{{$t('labels.center')}}</option>
                                                <option value="RIGHT_ALIGNED">{{$t('labels.right')}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row p-0 m-0">
                                <div class="col-md-6 pl-0 ml-0">
                                    <label>{{$t('labels.addressLine1')}}</label>
                                    <input v-model="invoiceTemplateData.addressLine1" type="text" class="form-control"/>
                                </div>
                                <div class="col-md-6 p-0 m-0">
                                    <label>{{$t('labels.addressLine2')}}</label>
                                    <input v-model="invoiceTemplateData.addressLine2" type="text" class="form-control"/>
                                </div>
                            </div>
                            <div class="row p-0 m-0">
                                <div class="col-md-5 pl-0 ml-0">
                                    <label>{{$t('labels.city')}}</label>
                                    <input v-model="invoiceTemplateData.city" type="text" class="form-control"/>
                                </div>
                                <div class="col-md-3 pl-0 ml-0">
                                    <label>{{$t('labels.postalCode')}}</label>
                                    <input v-model="invoiceTemplateData.postalCode" type="text" class="form-control"/>
                                </div>
                                <div class="col-md-4 p-0 m-0">
                                    <label>{{$t('labels.country')}}</label>
                                    <single-select id="country" name="country"
                                                   :options="$store.state.allCountries"
                                                   :config="countriesConfig"
                                                   v-model="invoiceTemplateData.selectedCountry"
                                                   @onChange="countryChanged"
                                                   @onRemove="removeCountry"></single-select>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab :title="$t('labels.contactInfo')">
                            <span class="small text-danger">{{$t(errorInvoiceTemplate)}}</span>
                            <div class="col-md-12 p-0 m-0">
                                <label>{{$t('labels.phoneNumber')}}</label>
                                <input v-model="invoiceTemplateData.phoneNumber" type="number" class="form-control"/>
                            </div>
                            <div class="col-md-12 p-0 m-0">
                                <label>{{$t('labels.email')}}</label>
                                <input v-model="invoiceTemplateData.email" type="email" class="form-control"/>
                            </div>
                            <div class="col-md-12 p-0 m-0">
                                <label>{{$t('labels.contactName')}}</label>
                                <input v-model="invoiceTemplateData.contactName" type="text" class="form-control"/>
                            </div>
                            <div class="col-md-12 p-0 m-0">
                                <label>{{$t('labels.vat')}}</label>
                                <input v-model="invoiceTemplateData.vat" type="text" class="form-control"/>
                            </div>
                            <div class="col-md-12 p-0 m-0">
                                <label>{{$t('labels.chamber')}}</label>
                                <input v-model="invoiceTemplateData.chamber" type="text" class="form-control"/>
                            </div>
                        </b-tab>

                        <b-tab :title="$t('labels.paymentInfo')">

                            <span class="small text-danger">{{$t(errorInvoiceTemplate)}}</span>
                            <div class="col-md-12 p-0 m-0">
                                <div class="form-group">
                                    <jhi-multi-language name="unpaidBottom" ref="unpaidBottom" key="unpaidBottom"
                                                        :config="multiLangConfigPaymentInfo"
                                                        :langs="invoiceTemplateData.paymentInfoUnpaid"
                                                        @updateLang="updateUnpaidInfo"
                                                        @addNewLang="addNewUnpaidInfo"
                                                        @deleteLang="removeUnpaidInfo">
                                    </jhi-multi-language>
                                </div>
                            </div>
                            <div class="col-md-12 p-0 m-0">
                                <label class="mt-2">{{$t('')}}</label>
                                <div class="form-group">
                                    <jhi-multi-language name="paidBottom" ref="paidBottom"
                                                        :config="multiLangConfigPaymentInfoPaid"
                                                        :langs="invoiceTemplateData.paymentInfoPaid"
                                                        @updateLang="updatePaidInfo"
                                                        @addNewLang="addNewPaidInfo"
                                                        @deleteLang="removePaidInfo">
                                    </jhi-multi-language>
                                </div>
                            </div>
                            <div class="col-md-12 p-0 m-0">
                                <div class="form-group">
                                    <jhi-multi-language name="smallFooter" ref="smallFooter"
                                                        :config="multiLangConfigPaymentInfoFooter"
                                                        :langs="invoiceTemplateData.paymentInfoSmallFooter"
                                                        @updateLang="updateSmallFooter"
                                                        @addNewLang="addNewSmallFooter"
                                                        @deleteLang="removeSmallFooter">
                                    </jhi-multi-language>
                                </div>
                            </div>
                            <div class="col-md-12 p-0 m-0">
                                <div class="form-group">
                                    <jhi-multi-language name="smallFooter" ref="smallFooter"
                                                        :config="multiLangConfigPaymentInfoHeader"
                                                        :langs="invoiceTemplateData.paymentInfoSmallHeader"
                                                        @updateLang="updateSmallHeader"
                                                        @addNewLang="addNewSmallHeader"
                                                        @deleteLang="removeSmallHeader">
                                    </jhi-multi-language>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab :title="$t('labels.layout')">
                            <div class="form-group col-md-6">
                                <label class="control-label">{{$t('font')}}</label>
                                <select v-model="invoiceTemplateData.selectedFont" class="form-control" @change="changeFont">
                                    <option v-for="(item, index) in allFonts" :key="index" :value="item.fontName">
                                        {{item.fontName}}
                                    </option>
                                </select>
                            </div>
                        </b-tab>
                        <b-tab :title="$t('labels.emailContent')">
                            <div class="form-group">
                                <label class="form-control-label">{{$t('labels.invoiceEmailContent')}}</label>
                                <MultiLangHtmlEditorComponent :content.sync="invoiceTemplateData.invoiceEmailContent" @contentChanged="updateInvoiceEmailContent"></MultiLangHtmlEditorComponent>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
                <div slot="modal-footer">
                    <button type="button" class="btn btn-secondary" v-text="$t('labels.previewInvoice')" v-on:click="invoicePreview()">Cancel</button>
                    <button type="button" class="btn btn-secondary" v-text="$t('labels.cancel')" v-on:click="closeInvoiceDialog()">Cancel</button>
                    <button type="button" class="btn btn-primary" v-text="$t('labels.save')" v-on:click="saveInvoiceTemplate()">Delete</button>
                </div>
            </b-modal>
            <div v-if="invoiceTemplates && invoiceTemplates.length">
                <div class="row justify-content-center">
                    <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
                </div>
                <div class="row justify-content-center">
                    <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" src="./invoiceTemplate.component.ts">
</script>
<style>
    .invoiceLogo{
        max-height: 150px;
        width: auto;
    }
</style>
