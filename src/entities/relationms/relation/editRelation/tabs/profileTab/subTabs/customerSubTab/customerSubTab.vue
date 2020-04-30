<template>
  <div class="p-3">
    <form @submit.prevent.stop="save">
      <div class="form-row mt-3">
        <label>{{$t('labels.customerNumber')}}</label>
        <input type="text" disabled v-model="customer.customerNumber" class="form-control">
      </div>
      <div class="form-row mt-3">
        <label>{{$t('labels.customerVat')}}</label>
        <input type="text" v-model="customer.vatNumber" class="form-control">
      </div>
      <div class="form-row mt-3">
        <label>{{$t('labels.reverseCharge')}}</label>
        <toggle-switch :on-text="$t('labels.yes')"
                       :off-text="$t('labels.no')"
                       :value.sync="customer.vatDisabled"></toggle-switch>
      </div>
      <div class="form-row mt-3">
        <label>{{$t('labels.defaultPaymentMethod')}}</label>
        <searchable-select-component :config="searchableConfigFrom"
                                     :options="$store.state.lookups.paymentMethods"
                                     :value="selectedPaymentMethod"
                                     @onChange="paymentMethodChanged"
                                     @onDelete="removePaymentMethod"
        ></searchable-select-component>
      </div>
      <div class="form-buttons-w text-right mt-3">
        <button type="button" @click="cancel" class="btn btn-outline-primary ml-3">{{$t('buttons.cancel')}}</button>
        <button type="submit" class="btn btn-primary ml-3">{{$t('buttons.save')}}</button>
      </div>
    </form>
  </div>
</template>
<script type="ts" src="./customerSubTab.component.ts"></script>
