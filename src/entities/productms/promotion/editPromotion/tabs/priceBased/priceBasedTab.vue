<template>
  <div>
    <form>
      <div class="form-group">
        <label class="form-control-label">
          {{$t('labels.threshold')}}
        </label>
        <money class="form-control" v-model="priceBasedAmount" name="discountAmount" v-bind="moneyFixed"></money>
      </div>
      <div class="form-buttons-w text-right">
        <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
          <span v-text="$t('buttons.cancel')">Cancel</span>
        </button>

        <button class="btn btn-primary ml-2" @click.prevent="savePriceBased">{{$t('buttons.save')}}</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" src="./priceBasedTab.component.ts"></script>
