<template>
  <div class="tab-form-panel">
    <div class="row justify-content-center text-left pl-3 pr-3 mt-4">
      <div class="col-12">
        <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
          <div>
            <div class="row">
              <div class="col-md-6 form-group">
                <label class="form-control-label">{{ $t('labels.language') }}</label>
                <select class="form-control" v-model="orderCopy.languageCode" @change="changeLangauge">
                  <option v-for="(item, index) in $store.state.languages" :value="index" :key="index">
                    {{ item['name'] }}
                  </option>
                </select>

              </div>
              <div class="col-md-6 form-group" v-if="orderCopy.orderCustomer && orderCopy.orderCustomer.fullName">
                  <label class="form-control-label">{{ $t('labels.name') }}</label>
                  <input type="text" class="form-control" v-model="orderCopy.orderCustomer.fullName"/>
              </div>
            </div>
            <div class="row" v-if="orderCopy.orderCustomer && orderCopy.orderCustomer.email">
              <div class="col-md-6 form-group">
                <label class="form-control-label">{{ $t('labels.billingEmail') }}</label>
                <input type="email" class="form-control" v-model="orderCopy.orderCustomer.email"/>
              </div>
              <div class="col-md-6 form-group mt-2">
                <br/>
                <button type="button" data-toggle="modal" data-target="#sendMail" class="btn btn-primary">
                  {{ $t('labels.sendEmail') }}
                </button>
              </div>
            </div>
            <div class="row" v-if="orderCopy.customerBillingAddress && orderCopy.customerBillingAddress.id">
              <div class="col-md-12 mt-3"><label class="form-control-label">{{ $t('labels.BillingAddress') }}</label></div>
              <div class="col-md-3 mt-1 form-group">
                <label class="form-control-label">{{ $t('labels.street') }}</label>
                <input type="text" class="form-control" :placeholder="$t('labels.street')"
                       v-model="orderCopy.customerBillingAddress.street"/>
              </div>
              <div class="col-md-3 mt-1 form-group">
                <label class="form-control-label">{{ $t('labels.houseNumber') }}</label>
                <input type="text" class="form-control" :placeholder="$t('labels.houseNumber')"
                       v-model="orderCopy.customerBillingAddress.houseNumber"/>
              </div>
              <div class="col-md-3 mt-1 form-group">
                <label class="form-control-label">{{ $t('labels.city') }}</label>
                <input type="text" class="form-control" :placeholder="$t('labels.city')"
                       v-model="orderCopy.customerBillingAddress.city"/>
              </div>
              <div class="col-md-3 mt-1 form-group">
                <label class="form-control-label">{{ $t('labels.postalCode') }}</label>
                <input type="text" class="form-control" :placeholder="$t('labels.postalCode')"
                       v-model="orderCopy.customerBillingAddress.postalCode"/>
              </div>
              <div class="col-md-3 mt-1 form-group">
                <label class="control-label">{{ $t('labels.countryId') }}</label>
                <searchable-select-component :config="multiSelectConfigCountry"
                                             :options="$store.state.allCountries"
                                             :value="selectedCountry"
                                             @onChange="countryChanged"
                                             @onDelete="countryRemoved"
                />
              </div>
              <div class="col-md-6 mt-2">
                <label class="form-control-label">{{ $t('labels.affiliateCode') }}</label>
                <input type="email" class="form-control" v-model="affiliateCode"/>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <label class="form-control-label">{{ $t('labels.company') }}</label>
                <searchable-select-component :config="multiSelectConfigCompany"
                                             :options="allCompanies"
                                             :value="selectedCompany"
                                             @onChange="addCompany"
                                             @onDelete="removeCompany"
                />
              </div>
              <div class="col-md-6 mt-3">
                <label class="form-control-label">{{ $t('labels.vatNumber') }}</label>
                <input type="email" class="form-control" v-model="vatNumber"/>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <label class="form-control-label">{{ $t('labels.vatSettings') }}</label>
                <select class="form-control" v-model="vatSettings" @change="changeVat">
                  <option value="reverse">{{ $t('labels.reverseCharged') }}</option>
                  <option value="notApplicable">{{ $t('labels.notApplicable') }}</option>
                  <option value="noVat">{{ $t('labels.noVat') }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <hr/>
            <div class=" col-md-12 text-right">
              <button type="submit" @click.prevent="save" class="btn btn-primary">{{ $t('buttons.save') }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" id="sendMail" tabindex="-1" role="dialog"
         ref="sendMail">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{ $t('labels.sendMail') }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <div class="mt-4">
              <div class="form-group">
                <label class="form-control-label">{{ $t('labels.invoiceEmailSubject') }}</label>
                <input type="text" class="form-control" v-model="invoiceEmailSubject"/>
              </div>
              <div class="form-group">
                <label class="form-control-label">{{ $t('labels.invoiceEmailContent') }}</label>
                <MultiLangHtmlEditorComponent :content.sync="invoiceEmailContent"
                                              @contentChanged="updateInvoiceEmailContent"/>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('buttons.close') }}</button>
            <button type="button" class="btn btn-primary" @click="sendMail" data-dismiss="modal">
              {{ $t('buttons.save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./customer.component.ts">
</script>
<style scoped>

</style>
