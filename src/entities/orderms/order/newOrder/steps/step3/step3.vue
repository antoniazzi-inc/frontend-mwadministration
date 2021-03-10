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
