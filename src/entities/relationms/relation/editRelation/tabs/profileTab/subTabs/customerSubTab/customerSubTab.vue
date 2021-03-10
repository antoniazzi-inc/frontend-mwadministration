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
  <div class="p-3">
    <h3 class="text-center" v-if="$props.rel.customer===null">{{$t('labels.relationIsNotCustomer')}}</h3>
    <form @submit.prevent.stop="save" v-else>
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
