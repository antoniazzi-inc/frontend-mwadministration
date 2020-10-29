<template>
  <div class="tab-form-panel">
    <form>
      <div class="form-row mt-3">
        <div class="form-group col-md-11">
          <label class="control-label">{{$t('labels.chooseDiscounts')}}</label>
          <searchable-select-component :config="multiSelectConfig"
             :options="$store.state.lookups.promotions"
             :value="selectedDiscounts"
             @onChange="addDiscount"
             @onDelete="removeDiscount"/>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-11">
          <h3 style="margin-top:1em">{{$t('labels.selectedPromotions')}}</h3>
          <p v-for="(promo, index) in selectedDiscounts" :key="promo.value.id">
            {{promo.label}}, available from {{promo.value.availableFrom | formatOnlyDate}} (promotion-type, discount type, amount/perc)
          </p>
        </div>
      </div>

    </form>

    <div class="form-buttons-w text-right mt-3">
      <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
      <!--<button type="button" @click.prevent="cancel" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>-->
      <button class="btn btn-primary"  @click.prevent="save">{{$t('buttons.save')}}</button>
    </div>
    <!--
    <div class="element-wrapper col-md-3">
        <div class="element-box">
            <div class="form-desc" style="color:#808080;">
                {{$t('labels.dontForgetToClickSave')}}
            </div>
            <router-link to="/promotions/new">{{$t('labels.newPromotionWizard')}}</router-link>
            <hr/>
        </div>
    </div>
    -->
  </div>
</template>
<script lang="ts" src="./discountsTab.component.ts"></script>
