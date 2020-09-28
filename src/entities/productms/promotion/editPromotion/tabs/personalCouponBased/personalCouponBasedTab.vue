<template>
  <div class="tab-form-panel">
    <form>
      <div class="form-group mt-3 row">
        <div class="form-group col-6">

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
              <select v-model="validDays" class="form-control">
                <option :value="true">{{$t('labels.days')}}</option>
                <option :value="false">{{$t('labels.hours')}}</option>
              </select>
              <input type="number" name="temporaryValid" class="form-control mt-2" v-model="temporaryValid"/>
            </div>
          </div>
          <div class="row mt-3" v-if="promotionCopy.promotionType !== 'TEMPORARY_COUPON'">
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
            <vueDropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                         :duplicateCheck="true"
                         @vdropzone-file-added="handleFile"
                         @vdropzone-removed-file="handleRemove">
            </vueDropzone>
            <p v-if="typePersonalCouponBased.coupons && typePersonalCouponBased.coupons.length">{{$t('labels.totalCodesFound')}} : {{typePersonalCouponBased.coupons.length}}</p>
          </div>

      </div>
        <div class="form-group col-6">
        </div>
    </div>
    <div class="form-buttons-w text-right mt-3">
      <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
      <button type="button" @click="previousState" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
      <button class="btn btn-primary ml-3" @click.prevent="save">{{$t('buttons.save')}}</button>
    </div>

    </form>
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
