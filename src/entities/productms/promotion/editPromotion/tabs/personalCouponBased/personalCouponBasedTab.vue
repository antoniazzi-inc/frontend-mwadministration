<template>
  <div class="row">
    <div class="element-wrapper col-md-12">
      <div class="element-box">
        <form>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.macroName')}}</label>
            <input type="text" class="form-control" v-model="typePersonalCouponBased.macroName" disabled="disabled"/>
          </div>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.maxUsage')}}</label>
            <input type="text" class="form-control" v-model="typePersonalCouponBased.maxCouponsUsed"/>
          </div>
          <div class="row mt-3" v-if="promotionCopy.promotionType === 'TEMPORARY_COUPON'">
            <div class="col-md-12">
              <label class="control-label">{{$t('labels.valid')}}</label>
              <toggle-switch id="valid"
                             :on-text="$t('labels.hours')"
                             :off-text="$t('labels.days')"
                             :value.sync="validDays"></toggle-switch>
              <input type="number" name="temporaryValid" class="form-control mt-2" v-model="temporaryValid"/>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-6">
              <div :class="{'form-group': true}">
                <label class="control-label">{{$t('labels.imported')}}</label>
                <toggle-switch id="allAffiliates"
                               :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="imported"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mt-4">
                <button v-if="imported" class="btn btn-outline-primary" data-toggle="modal" data-target="#removeUnusedCoupons" @click.prevent="">{{$t('labels.clearUnusedCoupons')}}</button>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="imported">
            <label class="control-label">{{$t('labels.uploadCouponCodes')}}</label>
            <!--upload coupons-->
            <p v-if="typePersonalCouponBased.coupons && typePersonalCouponBased.coupons.length">{{$t('labels.totalCodesFound')}} : {{typePersonalCouponBased.coupons.length}}</p>
          </div>
          <div class="form-buttons-w text-right">
            <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
              <span v-text="$t('buttons.back')">Back</span>
            </button>
            <button class="btn btn-primary ml-2" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" :id="'removeUnusedCoupons'" tabindex="-1" role="dialog" ref="removeUnusedCoupons">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{$t('labels.confirmAction')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mt-4">
              <h5>{{$t('labels.ClearUnusedCouponsAreYouSure')}}</h5>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="clearUnusedCoupons()">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./personalCouponBasedTab.component.ts"></script>
