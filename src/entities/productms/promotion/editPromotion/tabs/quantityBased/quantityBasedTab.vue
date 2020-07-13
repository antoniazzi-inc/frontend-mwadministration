<template>
  <div>
    <form>
      <div class="form-group">
        <label class="form-control-label">
          {{$t('labels.threshold')}}
        </label>
        <input type="number" min="0"  v-model="priceQuantityAmount" class="form-control" name="discountAmount"/>
      </div>
      <div class="form-buttons-w text-right">
        <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
          <span v-text="$t('buttons.cancel')">Cancel</span>
        </button>

        <button class=" ml-2 btn btn-primary" @click.prevent="saveQuantityBased">{{$t('buttons.save')}}</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" src="./quantityBasedTab.component.ts"></script>
