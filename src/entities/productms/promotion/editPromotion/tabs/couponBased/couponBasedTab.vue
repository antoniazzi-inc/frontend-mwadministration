<template>
  <div class="tab-form-panel">
    <div class="row mt-3">
      <div class="col-md-12">
        <label class="control-label">{{$t('labels.couponCode')}}</label>
        <div class="input-group" style="max-width:400px">
          <div class="input-group-prepend">
            <div class="input-group-text btn generateCode" @click="generateCouponCode">
              {{$t('labels.generateCode')}}
            </div>
          </div>
          <input class="form-control" placeholder="" type="text" v-model="couponCode" name="couponCode">
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="form-group" style="max-width:200px">
          <label class="control-label">{{$t('labels.maxUsage')}}</label>
          <input type="number" min="0" class="form-control" v-model="maxUsageCoupon"/>
        </div>
      </div>
    </div>
    <div class="form-buttons-w text-right">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
        <button type="button" @click="previousState" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
        <button class="btn btn-primary ml-3" @click.prevent="saveCouponBased">{{$t('buttons.save')}}</button>
    </div>
  </div>
</template>
<script lang="ts" src="./couponBasedTab.component.ts"></script>
