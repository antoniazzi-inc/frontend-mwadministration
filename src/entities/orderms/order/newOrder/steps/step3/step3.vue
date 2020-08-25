<template>
    <div class="row">
      <div class="col-md-6">
        <form>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.paymentMethod')}}</label>
            <searchable-select-component :config="singleSelectConfigDeliveryMethod"
                                         :options="$store.state.lookups.paymentMethods"
                                         :value="selectedPaymentMethod"
                                         @onChange="changePaymentMethod"
                                         @onDelete="removePaymentMethod"/>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <invoice-preview-component :cart-order="cartOrderCopy"/>
      </div>
    </div>
</template>
<script src="./step3.component.ts" lang="ts"></script>
