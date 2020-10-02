<template>
  <div class="tab-form-panel">
    <form>
      <div class="form-row align-items-left price-row mt-3" style="margin-bottom: 2em">
        <div class="form-group col-auto" style="margin-right:5em;">
          <label class="form-control-label">{{$t('labels.forceDirectPayment')}}</label>
          <toggle-switch
            :on-text="$t('labels.yes')"
            :off-text="$t('labels.no')"
            :value.sync="productCopy.forceDirectPayment"/>
        </div>
        <div class="form-group col-auto" style="width:80%">
          <label class="form-control-label">{{$t('labels.availablePaymentMethods')}}</label>
          <small class="cursor-pointer pl-4 text-primary" @click="includeAllPaymentMethods">{{$t('labels.addAllPaymentMethods')}}</small>
          <searchable-select-component :config="multiSelectConfigPayment" style="min-width:500px"
            :options="$store.state.lookups.paymentMethods"
            :value="selectedPaymentMethods"
            @onSelected="paymentMethodChanged"
            @onDelete="removePaymentMethod"/>
        </div>
      </div>

      <!-- Pieter, oct 2nd, 2020: TODO I changed the UI but the logic (v-model + error checks) etc is not implemented yet  -->

      <div class="form-row price-row" style="margin-bottom: 2em">
        <div class="form-group col-auto">
          <label class="control-label">{{$t('labels.isSubscription')}}</label>
          <toggle-switch id="repeatSubscription"
             :on-text="$t('labels.yes')"
             :off-text="$t('labels.no')"
             :value.sync="isSubscription"/>
        </div>
        <div class="form-group col-auto" v-if="isSubscription">
          <label class="control-label">{{$t('labels.subscriptionMaxTerms')}}</label>
          <input :class="{'form-control':true, invalid: errors.has('period')}" v-validate="'required|min_value:0'"
                 type="number" name="Subscription Max Terms" style="max-width:100px" />
          <span class="small text-danger">{{errors.first('Subscription Max Terms')}}</span>
        </div>
        <div class="form-group col-auto" v-if="isSubscription">
          <label class="control-label">{{$t('labels.startDate')}}</label>
          <select :class="{'form-control':true, invalid: errors.has('Start Date')}" v-validate="'required'" name="Start Date">
            <option value="firstOfCurrentMonth">{{$t('labels.startAtBeginningOfCurrentMonth')}}</option>
            <option value="firstOfNextMonth">{{$t('labels.beginningOfNextMonth')}}</option>
            <option value="now">{{$t('labels.atThisMoment')}}</option>
            <option value="paymentDone">{{$t('labels.startAfterPaymentIsDone')}}</option>
          </select>
          <span class="small text-danger">{{errors.first('Start Date')}}</span>
        </div>
        <div class="form-group col-auto" v-if="isSubscription">
          <label class="control-label">{{$t('labels.period')}}</label>
          <select :class="{'form-control':true, invalid: errors.has('period')}" v-validate="'required'" name="period">
            <option value="weekly">{{$t('labels.weekly')}}</option>
            <option value="bi-weekly">{{$t('labels.bi-weekly')}}</option>
            <option value="month">{{$t('labels.month')}}</option>
            <option value="quarter">{{$t('labels.quarter')}}</option>
            <option value="half-Year">{{$t('labels.halfYear')}}</option>
            <option value="year">{{$t('labels.year')}}</option>
          </select>
          <span class="small text-danger">{{errors.first('period')}}</span>
        </div>
        <div class="form-group col-auto" v-if="isSubscription && productCopy.paymentSchedules && productCopy.paymentSchedules.length">
          <label class="control-label">{{$t('labels.sentAnnouncementMail')}}</label>
          <toggle-switch id="sentAnnouncementMail"
             :on-text="$t('labels.yes')"
             :off-text="$t('labels.no')"
             :value.sync="sentAnnouncement"/>
        </div>
        <div class="form-group col-auto" style="padding-top:1.9em; margin-left:-100px;" v-if="isSubscription && sentAnnouncement">
          <button tag="button" data-toggle="modal" data-target="#announcementModal" class="btn btn-link">
            <small style="text-decoration: none">{{$t('labels.editor')}}</small>
          </button>
        </div>
      </div>


      <!--
      <div v-if="isSubscription">
          <div class="row">
              <div class="form-group col-md-6" v-if="productCopy.productSubscription">
                  <label class="form-control-label">{{$t('labels.subscriptionTerm')}}</label>
                  <select class="form-control" v-model="productCopy.productSubscription.period">
                      <option value="weekly">{{$t('labels.weekly')}}</option>
                      <option value="bi-weekly">{{$t('labels.bi-weekly')}}</option>
                      <option value="month">{{$t('labels.month')}}</option>
                      <option value="quarter">{{$t('labels.quarter')}}</option>
                      <option value="half-Year">{{$t('labels.halfYear')}}</option>
                      <option value="year">{{$t('labels.year')}}</option>
                  </select>
              </div>
              <div class="form-group col-md-6"  v-if="productCopy.productSubscription">
                  <label class="form-control-label">{{$t('labels.subscriptionMaxTerms')}}</label>
                  <input class="form-control" type="number" min="0" v-model="productCopy.productSubscription.maxTimes"/>
              </div>
          </div>
          <div class="row">
              <div class="form-group col-md-6" v-if="productCopy.productSubscription">
                  <label class="form-control-label">{{$t('labels.startDate')}}</label>
                  <select class="form-control" v-model="productCopy.productSubscription.startDate">
                      <option value="firstOfCurrentMonth">{{$t('labels.startAtBeginningOfCurrentMonth')}}</option>
                      <option value="firstOfNextMonth">{{$t('labels.beginningOfNextMonth')}}</option>
                      <option value="now">{{$t('labels.atThisMoment')}}</option>
                      <option value="paymentDone">{{$t('labels.startAfterPaymentIsDone')}}</option>
                  </select>
              </div>
          </div>
      </div>

      <div class="form-row" v-if="sentAnnouncement">
        <div class="col-auto form-group">
            <label class="form-control-label">{{$t('labels.announcementMailSubject')}}</label>
            <input class="form-control" type="text" v-model="announcementJson.subject"/>
        </div>
        <div class="col-auto form-group">
            <label class="form-control-label">{{$t('labels.replayToName')}}</label>
            <input class="form-control" type="text" v-model="announcementJson.replyToName"/>
        </div>
        <div class="col-auto form-group">
            <label class="form-control-label">{{$t('labels.replayToEmail')}}</label>
            <input class="form-control" type="text" v-model="announcementJson.replyToAddress"/>
        </div>
        <div class="col-auto form-group">
            <label class="form-control-label">{{$t('labels.announcementMailContent')}}</label>
            <trumbowyg v-model="announcementJson.content" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
        </div>
      </div>
      -->

      <div class="form-row" v-if="!isSubscription">
        <div class="form-group col-auto">
          <label class="form-control-label">{{$t('labels.paymentSchedules')}}</label>
          <toggle-switch id="repeatSubscription"
             :on-text="$t('labels.yes')"
             :off-text="$t('labels.no')"
             :value.sync="isUsePaymentSchedules"/>
        </div>
        <div class="form-group col-auto" v-if="productCopy.paymentSchedules && productCopy.paymentSchedules.length">
          <label class="control-label">{{$t('labels.sentAnnouncementMail')}}</label>
          <toggle-switch id="sentAnnouncementMail"
             :on-text="$t('labels.yes')"
             :off-text="$t('labels.no')"
             :value.sync="sentAnnouncement"/>
        </div>
        <div class="form-group col-auto" style="padding-top:1.9em; margin-left:-70px;" v-if="productCopy.paymentSchedules && productCopy.paymentSchedules.length && sentAnnouncement">
          <button tag="button" data-toggle="modal" data-target="#announcementModal" class="btn btn-link">
            <small style="text-decoration: none">{{$t('labels.editor')}}</small>
          </button>
        </div>
      </div>
      <div class="form-row" v-if="!isSubscription && isUsePaymentSchedules">
        <div class="form-group col-md-9">
          <payment-schedule ref="paymentSchedule" :product="productCopy" :addNewPayment="addNewPayment" @onCancel="cancelPaymentSchedule" @productUpdated="updateProduct"/>
        </div>
        <div class="form-group col-md-3">
          <button type="button" class="btn btn-primary" @click.prevent="addNewPaymentSchedule">
            <i class="fas fa-plus"></i> {{$t('buttons.createNew')}}
          </button>
        </div>
      </div>

      <div class="form-buttons-w text-right mt-3">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
        <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
      </div>

    </form>

    <div class="modal" data-backdrop="static" data-keyboard="false" id="announcementModal" tabindex="-1" role="dialog" ref="announcementModal">
      <div class="modal-dialog" style="max-width:750px" role="document">
        <div class="modal-content">
          <form name="editForm" role="form" novalidate @submit.prevent.stop="updateAnnouncement()">
            <div class="modal-header">
              <h5>{{$t('labels.announcementMailContent')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left mt-5">
              <div class="col-auto form-group">
                <label class="form-control-label">{{$t('labels.announcementMailSubject')}}</label>
                <input class="form-control" type="text" v-model="announcementJson.subject"/>
              </div>
              <div class="col-auto form-group">
                <label class="form-control-label">{{$t('labels.replayToName')}}</label>
                <input class="form-control" type="text" v-model="announcementJson.replyToName"/>
              </div>
              <div class="col-auto form-group">
                <label class="form-control-label">{{$t('labels.replayToEmail')}}</label>
                <input class="form-control" type="text" v-model="announcementJson.replyToAddress"/>
              </div>
              <div class="col-auto form-group">
                <label class="form-control-label">{{$t('labels.announcementMailContent')}}</label>
                <trumbowyg v-model="announcementJson.content" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  @click="closeModal">{{$t('buttons.close')}}</button>
              <button type="submit" class="btn btn-primary">{{$t('buttons.save')}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>
<script lang="ts" src="./paymentTab.component.ts"></script>

<style scoped>
  .price-row {
    margin-top: 2em!important;
    margin-bottom: 3em!important;
  }
  .price-row .col-auto {
    margin-right: 30px!important;
  }
</style>
