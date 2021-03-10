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
    <div class="row mt-3">
      <div class="col-md-12">
        <label class="control-label">{{$t('labels.couponCode')}}</label>
        <div class="input-group" style="max-width:400px">
          <div class="input-group-prepend">
            <div class="input-group-text btn generateCode" @click="generateCouponCode">
              {{$t('labels.generateCode')}}
            </div>
          </div>
          <input class="form-control" placeholder="" type="text" v-model="couponCode" name="couponCode">
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="form-group" style="max-width:200px">
          <label class="control-label">{{$t('labels.maxUsage')}}</label>
          <input type="number" min="0" class="form-control" v-model="maxUsageCoupon"/>
        </div>
      </div>
    </div>
    <div class="form-buttons-w text-right">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
        <button type="button" @click="previousState" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
        <button class="btn btn-primary ml-3" @click.prevent="saveCouponBased">{{$t('buttons.save')}}</button>
    </div>
  </div>
</template>
<script lang="ts" src="./couponBasedTab.component.ts"></script>
