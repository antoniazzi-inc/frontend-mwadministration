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
  <div class="row">
    <div class="col-md-6">
      <form>
        <div class="form-group">
          <h3 class="form-control-label">{{ $t('labels.invoiceSettings') }}</h3>
          <label class="form-control-label">{{$t('labels.selectInvoiceTemplate')}}</label>
          <searchable-select-component :config="singleSelectConfigInvoiceTemplate"
             :options="$store.state.lookups.invoiceTemplates"
             :value="selectedInvoiceTemplate"
             @onChange="changeInvoiceTemplate"
             @onDelete="removeInvoiceTemplate"/>
        </div>
        <div class="form-group">
          <label class="form-control-label">{{$t('labels.additionalDetailsJson')}}</label>
          <textarea cols="3" class="form-control" v-model="invoiceAdditionalDetails"></textarea>
        </div>

        <div class="form-row">
          <div class="col-md-4">
            <label class="control-label">{{$t('labels.sendInvoice')}}?</label>
            <div class="date-input">
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="sendInvoice"/>
            </div>
          </div>
        </div>
        <div class="form-row mt-3">
          <div class="col-md-4" v-if="sendInvoice">
            <label class="control-label">{{$t('labels.scheduledOnDate')}}</label>
            <div class="date-input">
              <flat-pickr :config="dateConfig" v-model="invoiceScheduledOn" class="single-daterange form-control"></flat-pickr>
            </div>
          </div>
          <div class="col-md-4">
            <label class="form-control-label">{{$t('labels.deliveryDate')}}</label>
            <div class="date-input">
              <flat-pickr :config="dateConfig" v-model="invoiceDeliveryDate" class="single-daterange form-control"></flat-pickr>
            </div>
          </div>
          <div class="col-md-4">
            <label class="form-control-label">{{$t('labels.invoiceLanguage')}}</label>
            <select class="form-control" v-model="invoiceLanguage" @change="changeLangauge">
              <option v-for="(item, index) in $store.state.languages" :key="index" :value="index">{{item['name']}}</option>
            </select>
          </div>
        </div>

        <div class="form-row mt-5">
          <div class="col-md-12">
            <multi-language-component
              :config="multiLangConfig"
              :value="invoiceEmailSubject"
              @onAdd="addNewEmailSubject"
              @onChange="updateEmailSubject"
              @onRemove="removeEmailSubject"/>
          </div>
          <div class="form-group col-md-12">
            <MultiLanguageHtmlEditorComponent
              :available-langs="[]"
              :content.sync="invoiceEmailContent"
              @contentChanged="updateInvoiceEmailContent"/>
          </div>
        </div>
      </form>
    </div>

    <div class="col-md-6">
      <h3 class="form-control-label">{{ $t('labels.invoiceOverview') }}</h3>
      <invoice-preview-component :cart-order="cartOrderCopy" :active="$props.active"/>
    </div>

  </div>
</template>
<script src="./step4.component.ts" lang="ts"></script>
