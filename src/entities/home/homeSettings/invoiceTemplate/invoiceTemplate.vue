<template>
  <div class="wrap">
    <div class="container-fluid not-for-print">
      <h2 id="page-heading" class="text-left mt-3">
        <span v-text="$t('labels.invoiceTemplates')" id="invoice-template-heading"></span>
        <button type="button" @click="createNewInvoiceTemplate"
                class="btn btn-primary float-right jh-create-entity create-invoice-template">
          <span v-text="$t('buttons.newInvoiceTemplate')"></span>
        </button>
      </h2>
      <simple-search @onSearch="search"></simple-search>
      <div class="col-md-12">
        <div class="row p-0 m-0">
          <div class="col-md-12 p-0 m-0">
            <PaginationTableComponent
              :ref="'paginationTable'"
              :active="active"
              :table="'invoiceTemplate'"
              :noDataLabel="'labels.noTemplates'"
              @onEdit="editInvoice"
              @onDelete="removeInvoiceTemplate"
              :service="invoiceTemplateService"/>
          </div>
        </div>
      </div>
      <div class="modal" data-backdrop="static" data-keyboard="false" id="editInvoiceModal" tabindex="-1" role="dialog"
           ref="editInvoiceModal">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 v-if="invoiceToEdit && invoiceToEdit.id">{{ $t('labels.editInvoice') }}</h5>
              <h5 v-else>{{ $t('labels.createInvoice') }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" v-if="invoiceToEdit">
              <div class="mt-4 text-left">
                <ul class="nav nav-tabs mt-5" id="myTab" role="tablist">
                  <li class="nav-item" @click="invoiceTemplateTabIndex = 0">
                    <a :class="{'nav-link': true, 'active': currentTab === 'companyData'}" id="companyData-tab"
                       data-toggle="tab"
                       href="#companyData" role="tab" aria-controls="companyData"
                       aria-selected="true">{{ $t('labels.companyData') }}</a>
                  </li>
                  <li class="nav-item" @click="invoiceTemplateTabIndex = 1">
                    <a :class="{'nav-link': true, 'active': currentTab === 'contactInfo'}" id="contactInfo-tab"
                       data-toggle="tab"
                       href="#contactInfo" role="tab" aria-controls="contactInfo"
                       aria-selected="true">{{ $t('labels.contactInfo') }}</a>
                  </li>
                  <li class="nav-item" @click="invoiceTemplateTabIndex = 2">
                    <a :class="{'nav-link': true, 'active': currentTab === 'paymentInfo'}" id="paymentInfo-tab"
                       data-toggle="tab"
                       href="#paymentInfo" role="tab" aria-controls="paymentInfo"
                       aria-selected="true">{{ $t('labels.paymentInfo') }}</a>
                  </li>
                  <li class="nav-item" @click="invoiceTemplateTabIndex = 3">
                    <a :class="{'nav-link': true, 'active': currentTab === 'layout'}" id="layout-tab" data-toggle="tab"
                       href="#layout" role="tab" aria-controls="layout" aria-selected="true">{{
                        $t('labels.layout')
                      }}</a>
                  </li>
                  <li class="nav-item" @click="invoiceTemplateTabIndex = 4">
                    <a :class="{'nav-link': true, 'active': currentTab === 'emailContent'}" id="emailContent-tab"
                       data-toggle="tab"
                       href="#emailContent" role="tab" aria-controls="emailContent"
                       aria-selected="true">{{ $t('labels.emailContent') }}</a>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div :class="{'tab-pane': true, active: currentTab === 'companyData'}" id="companyData"
                       role="tabpanel"
                       aria-labelledby="companyData-tab">
                    <span class="small text-danger">{{ $t(errorInvoiceTemplate) }}</span>
                    <div class="form-group mt-3">
                      <div class="col-md-12 pl-0 ml-0">
                        <label>{{ $t('labels.name') }}</label>
                        <input v-model="invoiceTemplateData.invoiceName" type="text"
                               :class="{'form-control': true, invalid: invoiceTemplateData.invoiceName === '' ? true : false}"/>
                      </div>
                    </div>
                    <div class="form-group mt-3">
                      <div class="col-md-12 pl-0 ml-0">
                        <label>{{ $t('labels.description') }}</label>
                        <textarea class="form-control" v-model="invoiceTemplateData.invoiceDescription" type="text"/>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group mt-3">
                          <vueDropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                                       :duplicateCheck="true"
                                       @vdropzone-file-added="uploadLogo"
                                       @vdropzone-removed-file="onLogoRemove">
                          </vueDropzone>
                        </div>
                      </div>
                      <div class="col-md-8 p-0 m-0">
                        <div class="row p-0 m-0">
                          <div class="col-md-12 pl-0 ml-0 mt-3">
                            <label>{{ $t('labels.companyName') }}</label>
                            <input v-model="invoiceTemplateData.companyName" type="text"
                                   :class="{'form-control': true, invalid: invoiceTemplateData.companyName === '' ? true : false}"/>
                          </div>
                        </div>
                        <div class="row p-0 m-0 mt-3">
                          <div class="col-md-12 pl-0 ml-0">
                            <label>{{ $t('labels.logoPosition') }}</label>
                            <select class="form-control" v-model="invoiceTemplateData.logoPosition">
                              <option value="LEFT_ALIGNED">{{ $t('labels.left') }}</option>
                              <option value="CENTERED">{{ $t('labels.center') }}</option>
                              <option value="RIGHT_ALIGNED">{{ $t('labels.right') }}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row p-0 m-0">
                      <div class="col-md-6 pl-0 ml-0 mt-3">
                        <label>{{ $t('labels.addressLine1') }}</label>
                        <input v-model="invoiceTemplateData.addressLine1" type="text" class="form-control"/>
                      </div>
                      <div class="col-md-6 p-0 m-0 mt-3">
                        <label>{{ $t('labels.addressLine2') }}</label>
                        <input v-model="invoiceTemplateData.addressLine2" type="text" class="form-control"/>
                      </div>
                    </div>
                    <div class="row p-0 m-0">
                      <div class="col-md-5 pl-0 ml-0 mt-3">
                        <label>{{ $t('labels.city') }}</label>
                        <input v-model="invoiceTemplateData.city" type="text" class="form-control"/>
                      </div>
                      <div class="col-md-3 pl-0 ml-0 mt-3">
                        <label>{{ $t('labels.postalCode') }}</label>
                        <input v-model="invoiceTemplateData.postalCode" type="text" class="form-control"/>
                      </div>
                      <div class="col-md-4 p-0 m-0 mt-3">
                        <label>{{ $t('labels.country') }}</label>
                        <searchable-select-component :config="countriesConfig"
                                                     :options="$store.state.allCountries"
                                                     :value="invoiceTemplateData.selectedCountry"
                                                     @onChange="countryChanged"
                                                     @onDelete="removeCountry"/>
                      </div>
                    </div>
                  </div>
                  <div :class="{'tab-pane': true, active: currentTab === 'contactInfo'}" id="contactInfo"
                       role="tabpanel"
                       aria-labelledby="contactInfo-tab">
                    <span class="small text-danger">{{ $t(errorInvoiceTemplate) }}</span>
                    <div class="col-md-12 p-0 m-0 mt-3">
                      <label>{{ $t('labels.phoneNumber') }}</label>
                      <input v-model="invoiceTemplateData.phoneNumber" type="number" class="form-control"/>
                    </div>
                    <div class="col-md-12 p-0 m-0 mt-3">
                      <label>{{ $t('labels.email') }}</label>
                      <input v-model="invoiceTemplateData.email" type="email" class="form-control"/>
                    </div>
                    <div class="col-md-12 p-0 m-0 mt-3">
                      <label>{{ $t('labels.contactName') }}</label>
                      <input v-model="invoiceTemplateData.contactName" type="text" class="form-control"/>
                    </div>
                    <div class="col-md-12 p-0 m-0 mt-3">
                      <label>{{ $t('labels.vat') }}</label>
                      <input v-model="invoiceTemplateData.vat" type="text" class="form-control"/>
                    </div>
                    <div class="col-md-12 p-0 m-0 mt-3">
                      <label>{{ $t('labels.chamber') }}</label>
                      <input v-model="invoiceTemplateData.chamber" type="text" class="form-control"/>
                    </div>
                  </div>
                  <div :class="{'tab-pane': true, active: currentTab === 'paymentInfo'}" id="paymentInfo"
                       role="tabpanel"
                       aria-labelledby="paymentInfo-tab">
                    <span class="small text-danger">{{ $t(errorInvoiceTemplate) }}</span>
                    <div class="col-md-12 p-0 m-0">
                      <div class="form-group mt-3">
                        <multi-language-component
                          :config="multiLangConfigPaymentInfo"
                          :value="invoiceTemplateData.paymentInfoUnpaid"
                          @onAdd="addNewUnpaidInfo"
                          @onChange="updateUnpaidInfo"
                          @onRemove="removeUnpaidInfo"/>
                      </div>
                    </div>
                    <div class="col-md-12 p-0 m-0">
                      <label class="mt-2">{{ $t('') }}</label>
                      <div class="form-group mt-3">
                        <multi-language-component
                          :config="multiLangConfigPaymentInfoPaid"
                          :value="invoiceTemplateData.paymentInfoPaid"
                          @onAdd="addNewPaidInfo"
                          @onChange="updatePaidInfo"
                          @onRemove="removePaidInfo"/>
                      </div>
                    </div>
                    <div class="col-md-12 p-0 m-0">
                      <div class="form-group mt-3">
                        <multi-language-component
                          :config="multiLangConfigPaymentInfoFooter"
                          :value="invoiceTemplateData.paymentInfoSmallFooter"
                          @onAdd="addNewSmallFooter"
                          @onChange="updateSmallFooter"
                          @onRemove="removeSmallFooter"/>
                      </div>
                    </div>
                    <div class="col-md-12 p-0 m-0">
                      <div class="form-group mt-3">
                        <multi-language-component
                          :config="multiLangConfigPaymentInfoHeader"
                          :value="invoiceTemplateData.paymentInfoSmallHeader"
                          @onAdd="addNewSmallHeader"
                          @onChange="updateSmallHeader"
                          @onRemove="removeSmallHeader"/>
                      </div>
                    </div>
                  </div>
                  <div :class="{'tab-pane': true, active: currentTab === 'layout'}" id="layout" role="tabpanel"
                       aria-labelledby="layout-tab">
                    <div class="form-group col-md-6 mt-3">
                      <label class="control-label">{{ $t('labels.font') }}</label>
                      <select v-model="invoiceTemplateData.selectedFont" class="form-control" @change="changeFont">
                        <option v-for="(item, index) in allFonts" :key="index" :value="item.fontName">
                          {{ item.fontName }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div :class="{'tab-pane': true, active: currentTab === 'emailContent'}" id="emailContent"
                       role="tabpanel"
                       aria-labelledby="emailContent-tab">
                    <div class="form-group  mt-3">
                      <label class="form-control-label">{{ $t('labels.invoiceEmailContent') }}</label>
                      <MultiLangHtmlEditorComponent :availableLangs="[]"
                                                    :content.sync="invoiceTemplateData.invoiceEmailContent"
                                                    @contentChanged="updateInvoiceEmailContent"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('buttons.cancel') }}</button>
                <button type="button" class="btn btn-outline-primary" @click="invoicePreview">
                  {{ $t('buttons.previewInvoice') }}
                </button>
                <button type="button" class="btn btn-primary" @click="saveInvoiceTemplate()">{{
                    $t('buttons.save')
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div id="invoicePreview">
        <div class="header align-self">
          <div class="row">
            <div
              :class="{'col-md-12': true, 'text-left': invoiceTemplateData.logoPosition === 'LEFT_ALIGNED', 'text-center': invoiceTemplateData.logoPosition === 'CENTERED', 'text-right': invoiceTemplateData.logoPosition === 'RIGHT_ALIGNED'}">
              <img :class="{logoPreview: true}" :src="selectedLogo"/>
            </div>
          </div>
        </div>
        <div class="invoiceBody">
          <div class="row invoiceAddressInfo">
            <div class="col-md-9 text-left">
              <span class="customerName">{{ $t('labels.customerFullName') }}<br/></span>
              <span class="customerAddress">{{ $t('labels.customerAddress') }}<br/></span>
              <span class="customerPostal">{{ $t('labels.customerCityPostal') }}<br/></span>
              <span class="customerCountry">{{ $t('labels.country') }}<br/></span>
            </div>
            <div class="col-md-3 text-left">
              <span class="companyName invoiceCompanyName">{{ invoiceTemplateData.companyName }}<br/></span>
              <span class="companyAddress">{{ invoiceTemplateData.addressLine1 }}<br/></span>
              <span class="companyAddress">{{ invoiceTemplateData.addressLine2 }}<br/></span>
              <span class="companyPostal">{{ invoiceTemplateData.postalCode }}<br/></span>
              <span
                class="companyCountry">{{ invoiceTemplateData.selectedCountry ? invoiceTemplateData.selectedCountry.enName : '' }}<br/></span>
              <p></p>
              <p>
                {{ invoiceTemplateData.phoneNumber }}
                <br/>
                {{ invoiceTemplateData.email }}
              </p>
              <p></p>
              <p>
                <span>{{ $t('labels.KVK') }} {{ invoiceTemplateData.chamber }}</span><br/>
                <span>{{ $t('labels.BTW') }} {{ invoiceTemplateData.vat }}</span>
              </p>
            </div>
          </div>
          <div class="invoiceInfo row mt-5">
            <div class="col-md-8">
              <p>{{ $t('labels.invoiceNumber') }} 0000001</p>
              <p>{{ $t('labels.clientNumber') }} 420</p>
            </div>
            <div class="col-md-4">
              <p>{{ $t('labels.paymentDueBy') }} {{ new Date() | formatOnlyDate }}</p>
              <p>{{ $t('labels.invoiceDate') }} {{ new Date() | formatOnlyDate }}</p>
            </div>
          </div>
          <div class="invoiceData row mt-5">
            <div class="col-md-12">
              <h3>{{ $t('labels.invoice') }}</h3>
              <div class="col-md-12">
                <div class="table table-bordered">
                  <div class="row">
                    <div class="col-md-1 text-center" style="border-right: 1px solid #ccc;">
                      1
                    </div>
                    <div class="col-md-8">
                      {{ $t('labels.productName') }} <br/>
                      {{ $t('labels.productDescription') }}
                    </div>
                    <div class="col-md-3 text-center" style="border-left: 1px solid #ccc;">
                      50,00
                    </div>
                  </div>
                  <div class="row" :style="{border: 'none'}" v-for="item in 23" :key="item">
                    <div class="col-md-1 text-center" style="border-right: 1px solid #ccc;">
                      <br/>
                    </div>
                    <div class="col-md-8" style="'border-top': 'none'; 'border-bottom': 'none';">
                      <br/>
                    </div>
                    <div class="col-md-3 text-center" style="border-left: 1px solid #ccc;">
                      <br/>
                    </div>
                  </div>

                  <div class="row" :style="{border: 'none'}">
                    <div class="col-md-1 text-center" style="border-right: 1px solid #ccc;">
                      <br/>
                    </div>
                    <div class="col-md-8" style="'border-top': 'none'; 'border-bottom': 'none';">
                      <h5 class="font-weight-bold">{{ $t('labels.totalExclusive') }}</h5>
                    </div>
                    <div class="col-md-3 text-center" style="border-left: 1px solid #ccc;">
                      <h5 class="font-weight-bold">50.00</h5>
                    </div>
                  </div>
                  <div class="row" :style="{border: 'none'}">
                    <div class="col-md-1 text-center" style="border-right: 1px solid #ccc;">
                      <br/>
                    </div>
                    <div class="col-md-8" style="'border-top': 'none'; 'border-bottom': 'none';">
                      <h5 class="font-weight-bold">{{ $t('labels.btw21') }}</h5>
                    </div>
                    <div class="col-md-3 text-center" style="border-left: 1px solid #ccc;">
                      <h5 class="font-weight-bold">9.50
                        <hr/>
                      </h5>
                    </div>
                  </div>
                  <div class="row" :style="{border: 'none'}">
                    <div class="col-md-1" style="border-right: 1px solid #ccc;">
                      <br/>
                    </div>
                    <div class="col-md-8" style="'border-top': 'none'; 'border-bottom': 'none';">
                      <h5 class="font-weight-bold">{{ $t('labels.totalIncl') }}</h5>
                    </div>
                    <div class="col-md-3 text-center" style="border-left: 1px solid #ccc;">
                      <h5 class="font-weight-bold">59.50</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <p>{{ $t('labels.paymentDueBy') }} {{ new Date() | formatOnlyDate }}</p>
              <p>{{ getMultiLangName(invoiceTemplateData.paymentInfoSmallFooter).name }}</p>
            </div>
          </div>
        </div>
        <div class="invoiceFooter mt-2">{{ invoiceTemplateData.companyName }} | {{ invoiceTemplateData.phoneNumber }} |
          {{ invoiceTemplateData.email }} | {{ invoiceTemplateData.chamber }} | {{ invoiceTemplateData.vat }}
        </div>
      </div>
    </div>
</template>

<script lang="ts" src="./invoiceTemplate.component.ts">
</script>
<style>
#invoicePreview {
  display: none;
}

@media print {
  @page {
    margin: 0;
  }

  body {
    margin: 1cm;
  }

  .not-for-print {
    display: none;
  }

  #app-header {
    display: none;
    height: 60px;
  }

  .invoiceCompanyName {
    margin-top: 1.3cm;
  }

  .header {
    position: relative;
    max-height: 150px;
    height: 150px;
  }

  .footer {
    position: relative;
    bottom: 0;
  }

  #invoicePreview {
    position: relative;
    display: block;
    width: 100%;
  }

  .logoPreview {
    height: 150px;
  }

  .invoiceFooter {
    color: #ccc;
  }
}

.invoiceLogo {
  max-height: 150px;
  width: auto;
}
</style>
