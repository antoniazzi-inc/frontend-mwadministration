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
      {{$t('labels.created')}} {{ promotion.createdOn | formatDate}}
      {{$t('labels.and')}}
      {{$t('labels.updated')}} {{ promotion.updatedOn | formatDate}}
    </p>
    <PromotionEditTabsComponent :promotion="promotion" @updatePromotion="updatePromotion"/>
  </div>
</template>
<script type="ts" src="./editPromotion.component.ts"></script>
<style scoped>

</style>
