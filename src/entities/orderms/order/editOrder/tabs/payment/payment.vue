<template>
<div class="row tab-form-panel">
    <div class="col-md-6">
        <table class="table table-striped" v-if="$props.order.invoice">
            <thead>
            <tr>
                <th><span v-text="$t('labels.sendDate')"></span></th>
                <th><span v-text="$t('labels.invoiceNumber')"></span></th>
                <th><span v-text="$t('labels.totalAmount')"></span></th>
                <th><span v-text="$t('labels.status')"></span></th>
            </tr>
            </thead>
            <tbody>
            <tr :class="{selectedEvent: true,  'cursor-pointer':true}" v-if="orderCopy.invoice" @click="showPaymentHistory(orderCopy.invoice)">
               <td>{{orderCopy.invoice.sentOn | formatOnlyDate }}</td>
               <td>{{orderCopy.invoice.invoiceNumber}}</td>
               <td>{{orderCopy.invoice.totalAmount}}</td>
               <td>{{orderCopy.invoice.paymentEvents}}</td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="col-md-6" v-if="showHistory">
        <div id="tab1" class="tab-pane active show">
            <form class="form-inline mt-5">
                <select class="form-control form-control">
                    <option value="download">Download Invoice</option>
                    <option value="regenerate">Regenerate Invoice</option>
                    <option value="status-Paid">Set Status to Paid</option>
                    <option value="status-NoMorePayments">Set status to 'will not be paid anymore'</option>
                    <option value="status-NoMorePayments">Set status to 'will not be paid anymore'</option>
                    <option value="status-remove-NoMorePayments">Remove status 'will not be paid anymore'</option>
                    <option value="mail">mail invoice with payment link</option>
                    <option value="execute">execute incasso</option>
                </select>
                <button type="button" class="btn btn-primary">GO</button>
            </form>

            <div class="timed-activities padded" style="padding-left:0;">
                <div class="timed-activity" style="font-size:0.9em;">
                    <div class="ta-date">
                        <span>28-01-2020 </span>
                    </div>
                    <div class="ta-record-w">
                        <div class="ta-record">
                            <div class="ta-timestamp">
                                <strong>23:05:23</strong>
                            </div>
                            <div class="ta-activity">
                                incasso  ERROR [no permission granted]
                            </div>
                        </div>
                    </div>
                </div>
                <div class="timed-activity" style="font-size:0.9em;">
                    <div class="ta-date">
                        <span>29-01-2020</span>
                    </div>
                    <div class="ta-record-w">
                        <div class="ta-record">
                            <div class="ta-timestamp">
                                <strong>08:53:01</strong>
                            </div>
                            <div class="ta-activity">
                                incasso  SUCCESS  [ts_ny7yierfhf756]
                            </div>
                        </div>
                    </div>
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
