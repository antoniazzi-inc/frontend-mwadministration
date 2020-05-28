<template>
    <div class="row">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <div class="form-desc">{{$t('productPaymentSettings')}}</div>
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('forceDirectPayment')}}</label>
                            <toggle-switch
                                :on-text="$t('global.yes')"
                                :off-text="$t('global.no')"
                                :value.sync="forceDirectPayment"></toggle-switch>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('availablePaymentMethods')}}</label><small class="cursor-pointer pl-4 text-primary" @click="includeAllPaymentMethods">{{$t('vueadminApp.productmsProduct.addAllPaymentMethods')}}</small>
                            <multi-select :config="multiSelectConfigPayment" :options="allPaymentMethods" :value="selectedPaymentMethods"
                                          @onAdd="paymentMethodChanged"
                                          @onRemove="removePaymentMethod"></multi-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('isSubscription')}}</label>
                            <toggle-switch id="repeatSubscription"
                                           :on-text="$t('global.yes')"
                                           :off-text="$t('global.no')"
                                           :value.sync="isSubscription"></toggle-switch>
                        </div>
                        <div class="form-group col-md-6" v-if="isSubscription || (productCopy.paymentSchedules && productCopy.paymentSchedules.length)">
                            <label class="control-label">{{$t('sentAnnouncementMail')}}</label>
                            <toggle-switch id="sentAnnouncementMail"
                                           :on-text="$t('global.yes')"
                                           :off-text="$t('global.no')"
                                           :value.sync="sentAnnouncement"></toggle-switch>
                        </div>
                    </div>
                    <div v-if="isSubscription">
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label class="form-control-label">{{$t('subscriptionTerm')}}</label>
                                <select class="form-control" v-model="productCopy.productSubscription.period">
                                    <option value="weekly">{{$t('weekly')}}</option>
                                    <option value="bi-weekly">{{$t('bi-weekly')}}</option>
                                    <option value="month">{{$t('month')}}</option>
                                    <option value="quarter">{{$t('quarter')}}</option>
                                    <option value="half-Year">{{$t('halfYear')}}</option>
                                    <option value="year">{{$t('year')}}</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label class="form-control-label">{{$t('subscriptionMaxTerms')}}</label>
                                <input class="form-control" type="number" min="0" v-model="productCopy.productSubscription.maxTimes"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label class="form-control-label">{{$t('startDate')}}</label>
                                <select class="form-control" v-model="productCopy.productSubscription.startDate">
                                    <option value="firstOfCurrentMonth">{{$t('startAtBeginningOfCurrentMonth')}}</option>
                                    <option value="firstOfNextMonth">{{$t('beginningOfNextMonth')}}</option>
                                    <option value="now">{{$t('atThisMomemnt')}}</option>
                                    <option value="paymentDone">{{$t('startAfterPaymentIsDone')}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('paymentSchedules')}}</label>
                            <button type="button" class="btn btn-outline-primary" @click.prevent="addNewPaymentSchedule"><i class="dashicons dashicons-plus"></i> {{$t('createNew')}}</button>
                        </div>
                        <div class="form-group col-md-12">
                            <payment-schedule ref="paymentSchedule" :product="productCopy" :addNewPayment="addNewPayment" @onCancel="cancelPaymentSchedule" @productUpdated="updateProduct"></payment-schedule>
                        </div>
                    </div>
                    <div v-if="sentAnnouncement">
                        <div class="form-group">
                            <label class="form-control-label">{{$t('announcementMailSubject')}}</label>
                            <input class="form-control" type="text" v-model="announcementJson.subject"/>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">{{$t('replayToName')}}</label>
                            <input class="form-control" type="text" v-model="announcementJson.replyToName"/>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">{{$t('replayToEmail')}}</label>
                            <input class="form-control" type="text" v-model="announcementJson.replyToAddress"/>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">{{$t('announcementMailContent')}}</label>
                            <trumbowyg v-model="announcementJson.content" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" @click.prevent="save">{{$t('save')}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./paymentTab.component.ts"></script>
