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
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      {{getPromotionName()}} <span style="color:#75797d">({{promotion.promotionType}})</span>
      <router-link to="/promotions" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <span>{{$t('buttons.backToList')}}</span>
        </button>
      </router-link>
    </h2>
    <p style="">
      {{$t('labels.created') | lower}} {{ promotion.createdOn | formatDate}}
      {{$t('labels.and') | lower}} {{$t('labels.updated') | lower}} {{ promotion.updatedOn | formatDate}}
    </p>
    <PromotionEditTabsComponent :promotion="promotion" @updatePromotion="updatePromotion"/>
  </div>
</template>
<script type="ts" src="./editPromotion.component.ts"></script>
<style scoped>

</style>
