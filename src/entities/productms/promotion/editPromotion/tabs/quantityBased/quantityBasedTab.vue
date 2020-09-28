<template>
  <div class="tab-form-panel">
    <form>
      <div class="form-group mt-3 row">
        <div class="form-group col-12">
          <label class="form-control-label">
            {{$t('labels.threshold')}}
          </label>
          <input type="number" min="0" style="max-width:200px" v-model="priceQuantityAmount" class="form-control" name="discountAmount"/>
        </div>
      </div>
      <div class="form-buttons-w text-right">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
        <button type="button" @click="previousState" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
        <button class="btn btn-primary ml-3" @click.prevent="saveQuantityBased">{{$t('buttons.save')}}</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" src="./quantityBasedTab.component.ts"></script>
