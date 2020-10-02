<template>
  <div class="container-fluid text-left">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.newOrder')}}</span>
      <router-link to="/orders" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-secondary float-right create-tag">
          <span>{{$t('labels.backToOrders')}}</span>
        </button>
      </router-link>
    </h2>
    <div class="wizard-panel">

    <form-wizard @on-complete="onComplete"
                 :title="''"
                 :subtitle="''"
                 shape="circle"
                 @on-change="changeTab"
                 :start-index="step"
                 color="#0a7cf8"
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
  </div>
</template>
<script src="./newOrder.component.ts" lang="ts"></script>
