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
            <div class="support-index show-ticket-content">
              <div class="support-tickets">
                <template v-for="(item, index) in allCustomFields">
                  <div v-if="item.useInInvoice" :key="index">
                    <div class="support-ticket mt-3">
                      <div class="st-body">
                        <div class="avatar"><i style="font-size: 3rem;" class="dashicons dashicons-text"></i></div>
                        <div class="st-meta m-2">
                          <i class="fas fa-edit text-warning" @click="editCustomField(item)"></i>
                          <div class="fas ml-2 fa-trash-alt text-danger" @click="deleteCustomField(item)"></div>
                        </div>
                        <div class="ticket-content">
                          <h6 class="ticket-title">
                            {{item.name}} : {{item.result }}
                          </h6>
                          <div class="ticket-description">
                            <span class="label">{{$t('labels.fieldType')}}: </span> <i
                            :class="getClassName(item.value.value.customFieldType)"></i> &nbsp; &nbsp;
                            <span
                              class="label">{{$t('labels.createdOn')}} {{item.value.value.createdOn | formatDate}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
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
