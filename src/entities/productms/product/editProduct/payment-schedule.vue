<template>
    <div class="content-w text-left">
        <div class="content-i">
            <div class="content-box">
                <!--<b-modal ref="removeEntityPaymentSchedule" id="removeEntityPaymentSchedule" >
                    <span slot="modal-title"><span id="vueadminApp.productmsPaymentSchedule.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
                    <div class="mt-4">
                        <p id="jhi-delete-schedule-heading" v-bind:title="$t('vueadminApp.productmsPaymentSchedule.delete.question')">Are you sure you want to delete this Schedule?</p>
                    </div>
                    <div slot="modal-footer">
                        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                        <button type="button" class="btn btn-primary" id="jhi-confirm-delete-schedule" v-text="$t('entity.action.delete')" v-on:click.prevent="removePaymentSchedule()">Delete</button>
                    </div>
                </b-modal>

                <b-modal ref="removeEntityPaymentScheduleOption" id="removeEntityPaymentScheduleOption" >
                    <span slot="modal-title"><span id="vueadminApp.productmsPaymentScheduleOption.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
                    <div class="mt-4">
                        <p id="jhi-delete-schedule-option-heading" v-bind:title="$t('vueadminApp.productmsPaymentScheduleOption.delete.question')">Are you sure you want to delete this Schedule Option?</p>
                    </div>
                    <div slot="modal-footer">
                        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                        <button type="button" class="btn btn-primary" id="jhi-confirm-delete-schedule-option" v-text="$t('entity.action.delete')" v-on:click="RemoveScheduleOption()">Delete</button>
                    </div>
                </b-modal>-->

                <div v-if="!editMode">
                    <div role="tablist" v-if="paymentSchedules.length">
                        <!--<b-card no-body class="mb-1" @click.prevent="selectedPaymentSchedule = item" v-for="(item, index) in paymentSchedules" :key="index">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-button class="col-md-11" href="#" v-b-toggle="'accordion' + index" variant="info">{{item.name}}</b-button>
                                <b-button-close class="m-2" v-b-modal.removeEntityPaymentSchedule @click.prevent="prepareRemoveSchedule(item)"></b-button-close>
                                <b-button-close class="m-2" @click.prevent="editPaymentSchedule(item)"><i class="dashicons dashicons-edit"></i> </b-button-close>
                            </b-card-header>
                            <b-collapse :id="'accordion'+index" :visible="index === 0" :accordion="'my-accordion'+index" role="tabpanel">
                                <b-card-body>
                                    <table class="table table-striped">
                                        <thead>
                                            <th>{{$t('name')}}</th>
                                            <th>{{$t('amount')}}</th>
                                            <th>{{$t('action')}}</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(option, key) in item.paymentScheduleOptions" :key="key">
                                                <td>{{option.name}}</td>
                                                <td>{{option.price}}</td>
                                                <td>
                                                    <div class="text-danger ml-3 cursor-pointer" v-b-modal.removeEntityPaymentScheduleOption @click.prevent="prepareRemoveScheduleOption(option)">
                                                        <i class="os-icon os-icon-ui-15"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </b-card-body>
                            </b-collapse>
                        </b-card>-->
                    </div>
                    <div class="justify-content-center text-center">
                        <p>{{$t('labels.noData')}}</p>
                    </div>
                </div>
                <div v-if="editMode || $props.addNewPayment">
                    <div class="row">
                        <div class="col-md-6">
                            <form>
                                <h3 class="title">{{$t('labels.addEditPaymentSchedule')}}</h3>
                                <hr/>
                                <div class="form-group">
                                    <label class="form-control-label">{{$t('labels.name')}}</label>
                                    <input class="form-control" type="text" v-model="selectedPaymentSchedule.name"/>
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">{{$t('labels.period')}}</label>
                                    <select class="form-control" v-model="selectedPaymentSchedule.period">
                                        <option value="day">{{$t('labels.day')}}</option>
                                        <option value="week">{{$t('labels.week')}}</option>
                                        <option value="month">{{$t('labels.month')}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">{{$t('labels.availableForCustomers')}}</label>
                                    <toggle-switch id="availableForCustomers"
                                                   :on-text="$t('labels.yes')"
                                                   :off-text="$t('labels.no')"
                                                   :value.sync="selectedPaymentSchedule.availableForCustomers"/>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-6 scrollable-medium">
                            <form>
                                <button type="button" class="btn btn-outline-primary" @click.prevent="addNewPaymentScheduleOption">
                                  <i class="fas fa-plus"></i> {{$t('labels.newPaymentScheduleOption')}}</button>
                                <hr/>
                                <div v-for="(option, key) in selectedPaymentSchedule.paymentScheduleOptions" :key="key">
                                    <div class="row" >
                                        <div class="form-group col-md-6">
                                            <label class="form-control-label">{{$t('labels.name')}}</label>
                                            <input type="text" class="form-control" v-model="option.name"/>
                                        </div>
                                        <div class="form-group col-md-5">
                                            <label class="form-control-label">{{$t('labels.priceAmount')}}</label>
                                            <money v-model="option.price" class="form-control" name="priceAmount"  v-bind="money"/>
                                        </div>
                                        <div class="form-group col-md-1 align-content-center">
                                            <i class="fa fa-trash-alt ml-2 cursor-pointer"  data-toggle="modal" data-target="#removeEntityPaymentScheduleOption" @click.prevent="prepareRemoveScheduleOption(option)"></i>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-outline-primary" @click.prevent="cancel">{{$t('buttons.cancel')}}</button>
                        <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.addPaymentSchedule')}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./payment-schedule.component.ts"></script>
