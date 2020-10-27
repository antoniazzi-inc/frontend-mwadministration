<template>
    <div class="row">
      <div class="col-md-6">
        <form>
          <div class="form-group">
            <h3 class="form-control-label mb-3">{{ $t('labels.paymentMethod') }}</h3>
            <searchable-select-component :config="singleSelectConfigDeliveryMethod"
               :options="$store.state.lookups.paymentMethods"
               :value="selectedPaymentMethod"
               @onChange="changePaymentMethod"
               @onDelete="removePaymentMethod"
               style="max-width:30em"/>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <h3 class="form-control-label">{{ $t('labels.invoiceOverview') }}</h3>
        <invoice-preview-component :cart-order="cartOrderCopy" :active="$props.active"/>
      </div>
    </div>
</template>
<script src="./step3.component.ts" lang="ts"></script>
