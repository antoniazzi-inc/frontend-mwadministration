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
