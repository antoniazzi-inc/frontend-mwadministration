<template>
  <div class="tab-form-panel">
    <form>
      <div class="form-group mt-3 row">
        <div class="form-group col-12">
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
        </div>
      </div>
      <div class="form-buttons-w text-right">
        <div class="form-buttons-w text-right mt-3">
          <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
          <button type="button" @click="previousState" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
          <button class="btn btn-primary ml-3" @click.prevent="saveAffiliateBased">{{$t('buttons.save')}}</button>
        </div>
      </div>
    </form>

  </div>
</template>
<script lang="ts" src="./affiliateBasedTab.component.ts"></script>
