<template>
  <div>
    <div class="row mt-3">
      <div class="col-md-12">
        <label class="control-label">{{$t('labels.couponCode')}}</label>
        <div class="input-group">
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
        <div class="form-group">
          <label class="control-label">{{$t('labels.maxUsage')}}</label>
          <input type="number" min="0" class="form-control" v-model="maxUsageCoupon"/>
        </div>
      </div>
    </div>
    <div class="form-buttons-w text-right">
      <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
        <span v-text="$t('buttons.cancel')">Cancel</span>
      </button>

      <button class="ml-2 btn btn-primary" @click.prevent="saveCouponBased">{{$t('buttons.save')}}</button>
    </div>
  </div>
</template>
<script lang="ts" src="./couponBasedTab.component.ts"></script>
