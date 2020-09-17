<template>
  <div class="row p-3 text-left">
    <div class="col-md-6">
      <div class="row">
        <!--<div class="col-md-12">
            <div class="form-group">
                <label class="form-control-label">{{$t('labels.invoiceNumber')}}</label>
                <input type="text" class="form-control" v-model="invoiceNumber"/>
            </div>
        </div>
        <div class="col-md-12">
            <div class="form-group">
                <label class="form-control-label">{{$t('labels.sendDate')}}</label>
                <flat-pickr @on-close="changeSendDate" :config="configuration" v-model="sendDate" class="single-daterange form-control picker"></flat-pickr>
            </div>
        </div>
        <div class="col-md-12">
            <div class="form-group">
                <label class="form-control-label">{{$t('labels.scheduledDate')}}</label>
                <flat-pickr  @on-close="changeScheduledDate" :config="configuration" v-model="scheduledDate" class="single-daterange form-control picker"></flat-pickr>
            </div>
        </div>
        <div class="col-md-12">
            <div class="form-group">
                <label class="form-control-label">{{$t('labels.customerFullName')}}</label>
                <input type="text" class="form-control" v-model="customerName"/>
            </div>
        </div>-->
        <div class="col-md-12">
          <div class="form-group">
            <label class="form-control-label">{{ $t('labels.selectInvoiceTemplate') }}</label>
            <searchable-select-component ref="invoiceSelect" :config="singleSelectConfig"
                                         :options="invoiceTemplates"
                                         :value="selectedInvoiceTemplate"
                                         @onChange="addInvoiceTemplate"
                                         @onDelete="removeInvoiceTemplate"/>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label class="form-control-label">{{ $t('labels.invoiceFields') }}</label>
            <br/>
            <span class="text-danger"> Needs design and explanation here ask P</span>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class=" col-md-12 text-right">
          <hr/>
          <button type="submit" @click.prevent="save" class="btn btn-primary">{{ $t('buttons.save') }}</button>
        </div>
      </div>
    </div>
  </div>

</template>
<script lang="ts" src="./invoice.component.ts">
</script>
<style scoped>

</style>
