<!--
  - /*
  -  * Copyright 2018-2021 Antoniazzi Holding BV
  -  *
  -  * This program is free software: you can redistribute it and/or modify it
  -  * under the terms of the GNU General Public License as published by
  -  * the Free Software Foundation, either version 3 of the License,
  -  * or (at your option) any later version.
  -  *
  -  * This program is distributed in the hope that it will be useful,
  -  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  -  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  -  * GNU General Public License for more details.
  -  *
  -  * You should have received a copy of the GNU General Public License
  -  * along with this program. If not, see <https://www.gnu.org/licenses/>.
  -  */
  -->

<template>
  <div class="tab-form-panel">
    <form>

      <div class="form-row mt-3">
        <div class="form-group col-md-11">
          <label class="control-label">{{$t('labels.available')}}</label>
          <toggle-switch id="repeatSubscription1"
             :on-text="$t('labels.yes')"
             :off-text="$t('labels.no')"
             :value.sync="productCopy.availableForAffiliates"/>
        </div>
      </div>

      <div class="form-row" v-if="productCopy.availableForAffiliates">
        <div class="form-group col-md-2">
          <label class="control-label">{{$t('labels.fixedReward')}}</label>
          <money v-model="productCopy.generalFlatCommission" class="form-control" name="priceAmount" style="max-width:120px" v-bind="moneyFixed"/>
        </div>
        <div class="form-group col-md-2">
          <label class="control-label">{{$t('labels.percentageReward')}}</label>
          <money v-model="productCopy.generalPercentageCommission" class="form-control" name="priceAmountPercentage" style="max-width:100px" v-bind="moneyPercentage"/>
        </div>
        <div class="form-group col-md-8">
          <label class="control-label">{{$t('labels.salesInfo')}}</label>
          <toggle-switch id="repeatSubscription"
             :on-text="$t('labels.yes')"
             :off-text="$t('labels.no')"
             :value.sync="isSalesInfo"/>
        </div>
      </div>

      <div class="form-row" v-if="isSalesInfo & productCopy.availableForAffiliates">
        <div class="form-group col-md-11">
          <label class="control-label">{{$t('labels.salesInfoContent')}}</label>
          <trumbowyg v-model="productCopy.affiliateSalesInfoJson" :config="editorConfig" class="form-control" name="contactInfo" style="max-height:200px"/>
        </div>
      </div>

      <div class="form-buttons-w text-right mt-3">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
        <button type="button" @click.prevent="cancel" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
        <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
      </div>

    </form>
  </div>
</template>
<script lang="ts" src="./affiliateTab.component.ts"></script>
