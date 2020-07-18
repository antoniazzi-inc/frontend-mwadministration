<template>
  <div>
    <div :class="{'form-group': true}">
      <label class="control-label">{{$t('labels.allAffiliates')}}</label>
      <toggle-switch id="allAffiliates"
                     :on-text="$t('labels.yes')"
                     :off-text="$t('labels.no')"
                     :value.sync="forAllAffiliates"/>
      <br/>
      <label class="control-label" v-if="!forAllAffiliates">{{$t('labels.selectAffiliates')}}</label>
      <searchable-select-component :config="multiSelectConfig" v-if="!forAllAffiliates"
                                   :options="$store.state.lookups.affiliates"
                                   :value="selectedAffiliates"
                                   @onSelected="addAffiliate"
                                   @onDelete="removeAffiliate"/>
    </div>
    <div class="form-buttons-w text-right">
      <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
        <span v-text="$t('buttons.cancel')">Cancel</span>
      </button>

      <button class="btn btn-primary ml-2" @click.prevent="saveAffiliateBased">{{$t('buttons.save')}}</button>
    </div>
  </div>
</template>
<script lang="ts" src="./affiliateBasedTab.component.ts"></script>
