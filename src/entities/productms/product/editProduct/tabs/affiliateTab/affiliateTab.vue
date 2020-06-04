<template>
    <div class="content-w text-left">
        <div class="content-i">
            <div class="content-box">
                <div class="element-wrapper">

                        <form>
                                    <div class="form-group">
                                        <label class="control-label">{{$t('labels.available')}}</label>
                                        <toggle-switch id="repeatSubscription1"
                                                       :on-text="$t('labels.yes')"
                                                       :off-text="$t('labels.no')"
                                                       :value.sync="productCopy.availableForAffiliates"/>
                                    </div>
                            <div v-if="productCopy.availableForAffiliates">
                                <div class="form-group">
                                    <label class="control-label">{{$t('labels.fixedReward')}}</label>
                                    <money v-model="fixedReward" class="form-control" name="priceAmount"  v-bind="moneyFixed"/>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">{{$t('labels.percentageReward')}}</label>
                                    <money v-model="percentageReward" class="form-control" name="priceAmountPercentage"  v-bind="moneyPercentage"/>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">{{$t('labels.salesInfo')}}</label>
                                    <toggle-switch id="repeatSubscription"
                                                   :on-text="$t('labels.yes')"
                                                   :off-text="$t('labels.no')"
                                                   :value.sync="isSalesInfo"/>
                                </div>
                                <div class="form-group" v-if="isSalesInfo">
                                    <label class="control-label">{{$t('labels.salesInfoContent')}}</label>
                                    <trumbowyg v-model="productCopy.affiliateSalesInfoJson" :config="editorConfig" class="form-control" name="contactInfo"/>
                                </div>
                            </div>
                            <div class="form-buttons-w text-right">
                                <button class="btn btn-outline-primary" @click.prevent="cancel">{{$t('buttons.cancel')}}</button>
                                <button class="btn btn-primary ml-2" @click.prevent="save">{{$t('buttons.save')}}</button>
                            </div>
                        </form>

                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./affiliateTab.component.ts"></script>
