<template>
  <div class="tab-form-panel">
    <form>
      <div class="form-group">
        <label class="form-control-label">
          {{$t('labels.threshold')}}
        </label>
        <money class="form-control" style="max-width:200px" v-model="priceBasedAmount" name="discountAmount" v-bind="moneyFixed"></money>
      </div>
      <div class="form-buttons-w text-right">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
        <button type="button" @click="previousState" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
        <button class="btn btn-primary ml-3" @click.prevent="savePriceBased">{{$t('buttons.save')}}</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" src="./priceBasedTab.component.ts"></script>
