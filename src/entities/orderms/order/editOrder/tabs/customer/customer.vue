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
    <div class="row justify-content-center text-left pl-3 pr-3 mt-4">
      <div class="col-12">
        <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
          <div class="row">
            <div class="col-md-8 form-group" v-if="orderCopy.orderCustomer && orderCopy.orderCustomer.fullName !== undefined">
                <label class="form-control-label">{{ $t('labels.name') }}</label>
                <input type="text" class="form-control" v-model="orderCopy.orderCustomer.fullName"/>
            </div>
            <div class="col-md-4 form-group">
              <label class="form-control-label">{{ $t('labels.language') }}</label>
              <select class="form-control" v-model="orderCopy.languageCode" @change="changeLanguage">
                <option v-for="(item, index) in $store.state.languages" :value="index" :key="index">
                  {{ item['name'] }}
                </option>
              </select>
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
            <div class="col-md-12 mt-3"><h6 class="form-control-label">{{ $t('labels.BillingAddress') }}</h6></div>

            <div class="col-md-4 form-group">
              <label class="form-control-label">{{ $t('labels.street') }}</label>
              <input type="text" class="form-control" :placeholder="$t('labels.street')"
                     v-model="orderCopy.customerBillingAddress.street"/>
            </div>
            <div class="col-md-2 form-group">
              <label class="form-control-label">{{ $t('labels.houseNumber') }}</label>
              <input type="text" class="form-control" :placeholder="$t('labels.houseNumber')"
                     v-model="orderCopy.customerBillingAddress.houseNumber"/>
            </div>
            <div class="col-md-2 form-group">
              <label class="form-control-label">{{ $t('labels.postalCode') }}</label>
              <input type="text" class="form-control" :placeholder="$t('labels.postalCode')"
                     v-model="orderCopy.customerBillingAddress.postalCode"/>
            </div>
            <div class="col-md-4 form-group">
              <label class="form-control-label">{{ $t('labels.city') }}</label>
              <input type="text" class="form-control" :placeholder="$t('labels.city')"
                     v-model="orderCopy.customerBillingAddress.city"/>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-6 form-group">
              <searchable-select-component :config="singleSelectConfigCountry"
                 :options="$store.state.allCountries"
                 :value="selectedCountry"
                 @onChange="countryChanged"
                 @onDelete="countryRemoved"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-5 mt-3">
              <label class="form-control-label">{{ $t('labels.company') }}</label>
              <input type="email" class="form-control" v-model="orderCopy.orderCustomer.companyName"/>
            </div>
            <div class="col-md-4 mt-3">
              <label class="form-control-label">{{ $t('labels.vatNumber') }}</label>
              <input type="email" class="form-control" v-model="orderCopy.orderCustomer.vatNumber"/>
            </div>
            <div class="col-md-3 mt-3">
              <label class="form-control-label">{{ $t('labels.vatSettings') }}</label>
              <select class="form-control" v-model="taxRulesJson" @change="changeVat">
                <option value="vat">{{ $t('labels.vat') }}</option>
                <option value="reverse">{{ $t('labels.reverseCharged') }}</option>
                <option value="notApplicable">{{ $t('labels.notApplicable') }}</option>
                <option value="noVat">{{ $t('labels.noVat') }}</option>
                <option value="euvat">{{ $t('labels.euvat') }}</option>
              </select>
            </div>
          </div>

        <div class="form-group">
          <hr/>
          <div class=" col-md-12 text-right">
            <button type="submit" @click.prevent="cancel" class="btn btn-outline-danger">{{ $t('buttons.cancel') }}</button>
            <button type="submit" @click.prevent="save" class="btn ml-2 btn-primary">{{ $t('buttons.save') }}</button>
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
