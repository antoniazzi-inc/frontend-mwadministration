<template>
  <div class="container-fluid">
    <div class="row text-left">
      <div class="col-md-12">
        <h5 class="form-header"><strong>{{getPromotionName()}}</strong></h5>
        <div class="form-desc">
          {{$t('labels.created')}} {{ promotion.createdOn | formatDate}}
          {{$t('labels.and')}}
          {{$t('labels.updated')}} {{ promotion.updatedOn | formatDate}}
          <br/>
          {{$t('labels.promotionType')}} {{ promotion.promotionType}}
        </div>
        <PromotionEditTabsComponent :promotion="promotion"
        @updatePromotion="updatePromotion"/>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./editPromotion.component.ts"></script>
<style scoped>

</style>
