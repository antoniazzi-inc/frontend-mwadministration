<template>
  <div class="row" style="margin-top: 2em;">
    <div class="col-md-6">
      <form>
        <div class="form-group">
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
        <div class="form-group">
          <label class="control-label">{{$t('labels.scheduledOnDate')}}</label>
          <div class="date-input">
            <flat-pickr :config="dateConfig" v-model="invoiceScheduledOn" class="single-daterange form-control"></flat-pickr>
          </div>
        </div>
        <div class="form-group">
          <label class="form-control-label">{{$t('labels.deliveryDate')}}</label>
          <div class="date-input">
            <flat-pickr :config="dateConfig" v-model="invoiceDeliveryDate" class="single-daterange form-control"></flat-pickr>
          </div>
        </div>
        <div class="form-group">
          <label class="form-control-label">{{$t('labels.invoiceLanguage')}}</label>
          <select class="form-control" v-model="invoiceLanguage" @change="changeLangauge">
            <option v-for="(item, index) in $store.state.languages" :key="index" :value="index">{{item['name']}}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-control-label">{{$t('labels.invoiceEmailSubject')}}</label>
          <input type="text" class="form-control" v-model="invoiceEmailSubject"/>
        </div>
        <div class="form-group">
          <label class="form-control-label">{{$t('labels.invoiceEmailContent')}}</label>
          <MultiLanguageHtmlEditorComponent
            :available-langs="[]"
            :content.sync="invoiceEmailContent"
            @contentChanged="updateInvoiceEmailContent"/>
        </div>
      </form>
    </div>
    <div class="col-md-6">
      <invoice-preview-component :cart-order="cartOrderCopy"/>
    </div>
  </div>
</template>
<script src="./step4.component.ts" lang="ts"></script>
