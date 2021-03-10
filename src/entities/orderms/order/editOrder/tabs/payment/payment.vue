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
  <div class="tab-form-panel">
    <div class="row p-3 text-left">

      <div class="col-md-6">
        <table class="table table-striped" v-if="$props.order.invoice">
            <thead>
            <tr>
                <th><span v-text="$t('labels.sendDate')"></span></th>
                <th><span v-text="$t('labels.invoiceNumber')"></span></th>
                <th><span v-text="$t('labels.totalAmount')"></span></th>
                <th><span v-text="$t('labels.paid')"></span></th>
            </tr>
            </thead>
            <tbody>
            <tr :class="{selectedEvent: true,  'cursor-pointer':true}" v-if="orderCopy.invoice" @click="showPaymentHistory(orderCopy.invoice)">
               <td>{{orderCopy.invoice.sentOn | formatOnlyDate }}</td>
               <td>{{orderCopy.invoice.invoiceNumber}}</td>
               <td>{{orderCopy.invoice.totalAmount | formatAmount}}</td>
              <td v-html="this.$options.filters.formatBooleanAsIcon(orderCopy.invoice.paid)"></td>
            </tr>
            </tbody>
        </table>
    </div>

      <div class="col-md-6" v-if="showHistory">
        <div id="tab1" class="tab-pane active show">
          <form class="form-inline mt-4">
            <div class="btn-group mr-1 mb-1 mt-2">
              <button aria-expanded="false" aria-haspopup="true" class="btn btn-primary btn dropdown-toggle" style="font-weight:560" data-toggle="dropdown" id="dropdownMenuButton1" type="button">
                with invoice {{orderCopy.invoice.invoiceNumber}}
              </button>
              <div aria-labelledby="dropdownMenuButton1" class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 30px, 0px); top: 0px; left: 0px; will-change: transform;">
                <a class="dropdown-item cursor-pointer" @click="execInvoiceAction(orderCopy.invoice, 'download')"> Download</a>
                <a class="dropdown-item cursor-pointer" @click="execInvoiceAction(orderCopy.invoice, 'regenerate')"> Regenerate</a>
                <a class="dropdown-item cursor-pointer" @click="execInvoiceAction(orderCopy.invoice, 'setpaid')"> Is Paid</a>
                <a class="dropdown-item cursor-pointer" @click="execInvoiceAction(orderCopy.invoice, 'setpaid')"> Not Paid Anymore</a>
                <a class="dropdown-item cursor-pointer" @click="execInvoiceAction(orderCopy.invoice, 'setpaid')"> Must Be Paid</a>
                <a class="dropdown-item cursor-pointer" @click="execInvoiceAction(orderCopy.invoice, 'setpaid')"> Mail with Pay-link</a>
                <a class="dropdown-item cursor-pointer" @click="execInvoiceAction(orderCopy.invoice, 'setpaid')"> Handle Incasso</a>
              </div>
            </div>
          </form>




          <div class="table-responsive ff-table">
            <table class="table table-lightborder">
              <thead>
                <tr>
                  <th> {{$t('labels.datetime')}} </th>
                  <th> {{$t('labels.method')}} </th>
                  <th class="text-center"> {{$t('labels.status')}} </th>
                  <th> {{$t('labels.info')}} </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in exampleInvoiceStatuses">
                  <tr :key="index">
                  <td>
                    {{item.time | formatDate}}
                  </td>
                  <td>
                    {{item.method}}
                  </td>
                  <td class="text-center">
                    <i :class="getClassForStatus(item.status)"></i>
                  </td>
                  <td>
                    {{item.info}}
                  </td>
                </tr>
                </template>
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts" src="./payment.component.ts">
</script>
<style scoped>

</style>
