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
    <div class="col-md-7">
      <PaginationTableComponent
        :ref="'paginationTable'"
        :active="$props.active"
        :table="'relationOrders'"
        :noDataLabel="'labels.noOrders'"
        @onEdit="editOrder"
        :service="cartOrderService"
        :searchQuery="query"/>
    </div>
    <div class="col-md-5">
      <div v-if="$props.relation.customer">
        <form>
          <div class="form-group">
            <label>{{$t('labels.customerNumber')}}</label>
            <input type="text" disabled="disabled" class="form-control" v-model="relationCopy.customer.customerNumber"/>
          </div>
          <div class="form-group">
            <label>{{$t('labels.vatNumber')}}</label>
            <input type="text" class="form-control" v-model="relationCopy.customer.vatNumber"/>
          </div>
          <div class="form-group">
            <label>{{$t('labels.reversCharge')}}</label>
            <toggle-switch :on-text="$t('labels.yes')"
                           :off-text="$t('labels.no')"
                           :value.sync="relationCopy.customer.taxReverseCharge"/>
          </div>
          <div class="form-group">
            <label>{{$t('labels.defaultPaymentMethod')}}</label>
            <searchable-select-component :config="searchableConfig"
                                         :options="$store.state.lookups.paymentMethods"
                                         :value="selectedPaymentMethod"
                                         @onChange="paymentMethodRemoved"
                                         @onSelected="paymentMethodChanged"
            />
          </div>
          <button class="btn btn-primary ml-2" @click.prevent="save"><span>{{$t('buttons.save')}}</span>
          </button>
        </form>
      </div>
      <div v-else class="text-center mt-4">
       <h5> {{$t('labels.relationIsNotCustomer')}}</h5>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./ordersTab.component.ts"></script>
