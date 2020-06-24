<template>
    <div class="row text-left">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <div class="form-desc">{{$t('labels.productPaymentSettings')}}</div>
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('labels.forceDirectPayment')}}</label>
                            <toggle-switch
                                :on-text="$t('labels.yes')"
                                :off-text="$t('labels.no')"
                                :value.sync="productCopy.forceDirectPayment"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('labels.availablePaymentMethods')}}</label>
                          <small class="cursor-pointer pl-4 text-primary" @click="includeAllPaymentMethods">{{$t('labels.addAllPaymentMethods')}}</small>
                          <searchable-select-component :config="multiSelectConfigPayment"
                                                       :options="$store.state.lookups.paymentMethods"
                                                       :value="selectedPaymentMethods"
                                                       @onSelected="paymentMethodChanged"
                                                       @onDelete="removePaymentMethod"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.isSubscription')}}</label>
                            <toggle-switch id="repeatSubscription"
                                           :on-text="$t('labels.yes')"
                                           :off-text="$t('labels.no')"
                                           :value.sync="isSubscription"/>
                        </div>
                        <div class="form-group col-md-6" v-if="isSubscription || (productCopy.paymentSchedules && productCopy.paymentSchedules.length)">
                            <label class="control-label">{{$t('labels.sentAnnouncementMail')}}</label>
                            <toggle-switch id="sentAnnouncementMail"
                                           :on-text="$t('labels.yes')"
                                           :off-text="$t('labels.no')"
                                           :value.sync="sentAnnouncement"/>
                        </div>
                    </div>
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
                    <div class="row" v-else>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('labels.paymentSchedules')}}</label>
                            <button type="button" class="btn btn-outline-primary ml-2" @click.prevent="addNewPaymentSchedule">
                              <i class="fas fa-plus"></i> {{$t('buttons.createNew')}}</button>
                        </div>
                        <div class="form-group col-md-12">
                            <payment-schedule ref="paymentSchedule" :product="productCopy" :addNewPayment="addNewPayment" @onCancel="cancelPaymentSchedule" @productUpdated="updateProduct"/>
                        </div>
                    </div>
                    <div v-if="sentAnnouncement">
                        <div class="form-group">
                            <label class="form-control-label">{{$t('labels.announcementMailSubject')}}</label>
                            <input class="form-control" type="text" v-model="announcementJson.subject"/>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">{{$t('labels.replayToName')}}</label>
                            <input class="form-control" type="text" v-model="announcementJson.replyToName"/>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">{{$t('labels.replayToEmail')}}</label>
                            <input class="form-control" type="text" v-model="announcementJson.replyToAddress"/>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">{{$t('labels.announcementMailContent')}}</label>
                            <trumbowyg v-model="announcementJson.content" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./paymentTab.component.ts"></script>
