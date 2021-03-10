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
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button type="button" @click="previousState" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
            <button class="btn btn-primary ml-3" @click.prevent="saveLoyaltyBased">{{$t('buttons.save')}}</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts" src="./loyaltyTab.component.ts"></script>
