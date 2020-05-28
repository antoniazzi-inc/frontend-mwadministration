<template>
    <div class="row">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <div class="form-desc">{{$t('productPhysicalTypeSettings')}}</div>
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('fulfilmentParty')}}</label>
                            <multi-select :config="multiSelectConfig" :options="allFulfilments" :value="selectedFulfilments"
                                          @onAdd="fulfilmentChanged"
                                          @onRemove="removeFulfilment"></multi-select>
                        </div>
                        <div class="form-group col-md-6">
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label class="form-control-label">{{$t('weight')}}</label>
                                    <input  type="number" class="form-control" v-model="typePhysical.weight"/>

                                </div>
                                <div class="form-group col-md-6">
                                    <label class="form-control-label">{{$t('height')}}</label>
                                    <input  type="number" class="form-control" v-model="typePhysical.height"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label class="form-control-label">{{$t('length')}}</label>
                                    <input type="number" class="form-control" v-model="typePhysical.length"/>

                                </div>
                                <div class="form-group col-md-6">
                                    <label class="form-control-label">{{$t('depth')}}</label>
                                    <input type="number" class="form-control" v-model="typePhysical.depth"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label class="form-control-label">{{$t('vueadminApp.ordermsOrderPaymentMethod.shippingMethod')}}</label>
                            <button type="button" class="btn btn-primary" v-b-modal.createProductPayment @click="addNewShipping">{{$t('vueadminApp.ordermsOrderLine.add')}}</button>
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>{{$t('vueadminApp.ordermsOrderPaymentMethod.method')}}</th>
                                    <th>{{$t('vueadminApp.ordermsOrderPaymentMethod.region')}}</th>
                                    <th>{{$t('vueadminApp.ordermsOrderPaymentMethod.basePrice')}}</th>
                                    <th>{{$t('vueadminApp.ordermsOrderPaymentMethod.itemPrice')}}</th>
                                    <th>{{$t('vueadminApp.ordermsOrderPaymentMethod.actions')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in selectedShippingMethods" :key="index">
                                        <td>{{getMethodName(item)}}</td>
                                        <td>{{getRegionName(item)}}</td>
                                        <td>{{item.basePrice}}</td>
                                        <td>{{item.itemPrice}}</td>
                                        <td>
                                            <div class="btn-group flex-btn-group-container">
                                                <div @click.prevent="editItem(item)" v-b-modal.createProductPayment class="ml-3 text-primary cursor-pointer">
                                                    <i class="os-icon os-icon-ui-49"></i>
                                                </div>
                                                <div class="text-danger ml-3 cursor-pointer" v-b-modal.removeEntityShipping @click.prevent="prepareRemove(index)">
                                                    <i class="os-icon os-icon-ui-15"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-outline-primary" @click.prevent="cancel">{{$t('cancel')}}</button>
                        <button class="btn btn-primary" @click.prevent="save">{{$t('save')}}</button>
                    </div>
                </form>
                <b-modal ref="removeEntityShipping" id="removeEntityShipping" >
                    <span slot="modal-title"><span v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
                    <div class="modal-body">
                        <p v-bind:title="$t('vueadminApp.administrationmsDeliveryMethod.delete.question')">Are you sure you want to delete this Payment Method?</p>
                    </div>
                    <div slot="modal-footer">
                        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialogRemove()">Cancel</button>
                        <button type="button" class="btn btn-primary" id="jhi-confirm-delete-paymentMethod" v-text="$t('entity.action.delete')" v-on:click="removeShipping()">Delete</button>
                    </div>
                </b-modal>
                <b-modal ref="createProductPayment" id="createProductPayment" size="l" :no-close-on-backdrop="true">
                    <span slot="modal-title">{{$t('vueadminApp.administrationmsDeliveryMethod.home.createLabel')}}</span>
                    <div class="modal-body">
                        <form>
                           <div class="form-group">
                               <label class="form-control-label">{{$t('vueadminApp.ordermsOrderPaymentMethod.home.shippingTitle')}}</label>
                               <single-select :config="multiSelectConfig" :options="allShippingMethods" :value="selectedShippingMethod"
                                              @onChange="shippingMethodChanged"
                                              @onRemove="removeShippingMethod"></single-select>
                           </div>
                           <div class="form-group">
                               <label class="form-control-label">{{$t('vueadminApp.ordermsOrderPaymentMethod.region')}}</label>
                               <single-select :config="multiSelectConfig" :options="allRegions" :value="selectedRegion"
                                              @onChange="regionChanged"
                                              @onRemove="removeRegion"></single-select>
                           </div>
                           <div class="form-group">
                               <label class="form-control-label">{{$t('vueadminApp.ordermsOrderPaymentMethod.basePrice')}}</label>
                               <money v-model="basePrice" class="form-control" name="priceAmount"  v-bind="money"></money>
                           </div>
                           <div class="form-group">
                               <label class="form-control-label">{{$t('vueadminApp.ordermsOrderPaymentMethod.itemPrice')}}</label>
                               <money v-model="itemPrice" class="form-control" name="priceAmount"  v-bind="money"></money>
                           </div>
                        </form>
                    </div>
                    <div slot="modal-footer">
                            <button class="btn btn-outline-primary" @click.prevent="closeDialogShipping">{{$t('cancel')}}</button>
                            <button class="btn btn-primary" @click.prevent="addNewShippingMethod">{{$t('save')}}</button>
                    </div>
                </b-modal>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./physicalTab.component.ts"></script>
