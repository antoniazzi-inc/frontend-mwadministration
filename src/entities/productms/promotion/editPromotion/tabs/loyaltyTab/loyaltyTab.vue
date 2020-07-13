<template>
  <div>
    <form>
      <div class="form-group">
        <label class="form-control-label">
          {{$t('labels.points')}}
        </label>
        <input type="number" min="0" v-model="loyaltyPoints" class="form-control"/>
      </div>
      <div class="form-group">
        <label class="form-control-label">
          {{$t('labels.totalAmountSpenEarlier')}}
        </label>
        <money v-model="loyaltyAmountEarlier" class="form-control" name="loyaltyAmountEarlier"  v-bind="moneyFixed"></money>
      </div>
      <div class="form-group">
        <label class="form-control-label">
          {{$t('labels.numberOfItemsPurchasedEarlier')}}
        </label>
        <input type="number" min="0" v-model="loyaltyItemsEarlier" class="form-control"/>
      </div>
      <div class="form-buttons-w text-right">
        <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
          <span v-text="$t('buttons.cancel')">Cancel</span>
        </button>
        <button class="ml-2 btn btn-primary" @click.prevent="saveLoyaltyBased">{{$t('buttons.save')}}</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" src="./loyaltyTab.component.ts"></script>
