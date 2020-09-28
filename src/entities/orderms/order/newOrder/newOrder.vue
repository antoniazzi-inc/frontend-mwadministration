<template>
  <div class="container-fluid text-left">
    <form-wizard @on-complete="onComplete"
                 :title="$t('labels.newOrder')"
                 :subtitle="''"
                 shape="tab"
                 @on-change="changeTab"
                 :start-index="step"
                 color="#1c4cc3"
                 error-color="#ff4949">
      <tab-content @click="step = 0" :title="$t('labels.customer')" :before-change="validateStep" icon="dashicons dashicons-clipboard">
        <step1 ref="step1" @onUpdate="updateStep" :cartOrder="cartOrder"/>
        <div class="row">
          <div class="col-md-12 text-right">
            <span class="text-right text-danger small">{{stepValidationError}}</span>
          </div>
        </div>
      </tab-content>
      <tab-content @click="step = 1" :title="$t('labels.products')" :before-change="validateStep" icon="dashicons dashicons-info">
        <step2 ref="step2" :customerRelation="customerRelation" @onUpdate="updateStep" :beneficiaryList="beneficiaries" :cartOrder="cartOrder"/>
        <div class="row">
          <div class="col-md-12 text-right">
            <span class="text-right text-danger small">{{stepValidationError}}</span>
          </div>
        </div>
      </tab-content>
      <tab-content @click="step = 2" :title="$t('labels.payment')" :before-change="validateStep" icon="dashicons dashicons-format-image">
        <step3 ref="step3" @onUpdate="updateStep" :cartOrder="cartOrder"/>
        <div class="row">
          <div class="col-md-12 text-right">
            <span class="text-right text-danger small">{{stepValidationError}}</span>
          </div>
        </div>
      </tab-content>
      <tab-content @click="step = 3" :title="$t('labels.invoice')" :before-change="validateStep" icon="dashicons dashicons-saved">
        <step4 ref="step4" @onUpdate="updateStep" :cartOrder="cartOrder"/>
      </tab-content>
    </form-wizard>
  </div>
</template>
<script src="./newOrder.component.ts" lang="ts"></script>
