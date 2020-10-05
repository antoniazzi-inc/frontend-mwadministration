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
            <label class="form-control-label">{{$t('labels.invoiceEmailSubject')}}</label>
            <input type="text" class="form-control" v-model="invoiceEmailSubject"/>
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
      <invoice-preview-component :cart-order="cartOrderCopy"/>
    </div>

  </div>
</template>
<script src="./step4.component.ts" lang="ts"></script>
