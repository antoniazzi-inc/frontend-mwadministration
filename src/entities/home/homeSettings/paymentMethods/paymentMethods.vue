<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.paymentMethods')}}</span>
      <button tag="button" data-toggle="modal" data-target="#PaymentMethodModal" class="btn btn-primary float-right"
              @click="resetPaymentMethod">
        <i class="fas fa-plus"/> <span>{{$t('labels.newPaymentMethod')}}</span>
      </button>
    </h2>
    <simple-search @onSearch="searchPaymentMethod"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="$props.active"
      :table="'paymentMethod'"
      @onEdit="editPaymentMethod"
      @onDelete="removePaymentMethod"
      :service="deliveryMethodService"/>
    <div class="modal" id="PaymentMethodModal" tabindex="-1" role="dialog" ref="PaymentMethodModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <form name="editForm" role="form" novalidate @submit.prevent.stop="save()">
            <div class="modal-header">
              <h5 v-if="paymentMethod && paymentMethod.id === undefined">{{$t('labels.newPaymentMethod')}}</h5>
              <h5 v-if="paymentMethod && paymentMethod.id > 0">{{$t('labels.editPaymentMethod')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
              <div class="mt-4">
                <div class="form-group">
                  <multi-language-component
                    :config="multiLangConfig"
                    :value="paymentMethod.paymentMethodLanguages"
                    @onAdd="addNewpaymentMethodLanguages"
                    @onChange="changeNewpaymentMethodLanguages"
                    @onRemove="removepaymentMethodLanguages"></multi-language-component>
                </div>
                <div class="row m-0 p-0">
                  <div class="col-md-6 m-0 p-0">
                    <div class="form-group">
                      <label>{{$t('labels.accessCode')}}</label>
                      <input type="text" v-model="paymentMethod.accessCode" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>{{$t('labels.internalName')}}</label>
                      <input type="text" v-model="paymentMethod.internalName" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row m-0 p-0">
                  <div class="col-md-6 p-0 m-0">
                    <div class="form-group">
                      <label>{{$t('labels.administrativeCosts')}}</label>
                      <money v-model="paymentMethod.administrativeCostsFixed" v-bind="moneyConfig"
                             class="form-control"></money>
                    </div>
                  </div>
                  <div class="col-md-6 p-0 m-0 text-center">
                    <div class="form-group">
                      <label>{{$t('labels.selectable')}}</label>
                      <toggle-switch :on-text="$t('labels.yes')"
                                     :off-text="$t('labels.no')"
                                     :value.sync="paymentMethod.selectable"></toggle-switch>
                    </div>
                  </div>
                  <div class="col-md-12 m-0 p-0">
                    <div class="form-group">
                      <label>{{$t('labels.availability')}}</label>
                      <select :class="{'form-control':true, invalid: errors.has('availability')}" name="availability"
                              v-model="paymentMethod.availability" v-validate="'required'">
                        <option v-for="(item, inde) in PaymentMethodAvailability" :key="inde" :value="item.value">
                          {{item.label}}
                        </option>
                      </select>
                      <span class="text-danger small">{{ errors.first('availability') }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>{{$t('labels.deliveryMethodType')}}</label>
                <select :class="{'form-control':true, invalid: errors.has('paymentMethodType')}" name="paymentMethodType"
                        v-model="paymentMethod.paymentMethodType" v-validate="'required'">
                  <option v-for="(item, inde) in PaymentMethodOptions" :key="inde" :value="item.value">
                    {{item.label}}
                  </option>
                </select>
                <span class="text-danger small">{{ errors.first('paymentMethodType') }}</span>
              </div>
              <div class="form-group" v-if="checkProvider(paymentMethod.paymentMethodType) === 'mollie'">
                <label>{{$t('labels.liveKey')}}</label>
                <input type="text" name="liveKey" v-validate="'required'" v-model="paymentConfigJson.liveKey"
                       :class="{'form-control':true, invalid: errors.has('liveKey')}">
                <span class="text-danger small">{{ errors.first('liveKey') }}</span>
            </div>
              <div class="form-group" v-if="checkProvider(paymentMethod.paymentMethodType) === 'internal'">
                <label>{{$t('labels.username')}}</label>
                <input type="text" name="username" v-validate="'required'" v-model="paymentConfigJson.user"
                       :class="{'form-control':true, invalid: errors.has('username')}">
                <span class="text-danger small">{{ errors.first('username') }}</span>
            </div>
              <div class="form-group" v-if="checkProvider(paymentMethod.paymentMethodType) === 'internal'">
                <label>{{$t('labels.signature')}}</label>
                <input type="text" name="signature" v-validate="'required'" v-model="paymentConfigJson.signature"
                       :class="{'form-control':true, invalid: errors.has('signature')}">
                <span class="text-danger small">{{ errors.first('signature') }}</span>
            </div>
              <div class="form-group" v-if="checkProvider(paymentMethod.paymentMethodType) === 'internal'">
                <label>{{$t('labels.password')}}</label>
                <input type="text" name="password" v-validate="'required'" v-model="paymentConfigJson.password"
                       :class="{'form-control':true, invalid: errors.has('password')}">
                <span class="text-danger small">{{ errors.first('password') }}</span>
            </div>
              <div class="form-group" v-if="checkProvider(paymentMethod.paymentMethodType) === 'sisow'">
                <label>{{$t('labels.merchantID')}}</label>
                <input type="text" name="merchantID" v-validate="'required'" v-model="paymentConfigJson.merchantID"
                       :class="{'form-control':true, invalid: errors.has('merchantID')}">
                <span class="text-danger small">{{ errors.first('merchantID') }}</span>
            </div>
              <div class="form-group" v-if="checkProvider(paymentMethod.paymentMethodType) === 'sisow'">
                <label>{{$t('labels.merchantKey')}}</label>
                <input type="text" name="merchantKey" v-validate="'required'" v-model="paymentConfigJson.merchantKey"
                       :class="{'form-control':true, invalid: errors.has('merchantKey')}">
                <span class="text-danger small">{{ errors.first('merchantKey') }}</span>
            </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">{{$t('buttons.save')}}</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">{{$t('buttons.close')}}</button>
        </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>
<script type="ts" src="./paymentMethods.component.ts"></script>
