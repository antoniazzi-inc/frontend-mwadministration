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
            <span class="text-right text-danger">{{stepValidationError}}</span>
          </div>
        </div>
      </tab-content>
      <tab-content @click="step = 1" :title="$t('labels.products')" :before-change="validateStep" icon="dashicons dashicons-info">
        <step2 ref="step2" :customerRelation="customerRelation" @onUpdate="updateStep" :beneficiaryList="beneficiaries" :cartOrder="cartOrder" :active="step === 1"/>
        <div class="row">
          <div class="col-md-12 text-right">
            <span class="text-right text-danger">{{stepValidationError}}</span>
          </div>
        </div>
      </tab-content>
      <tab-content @click="step = 2" :title="$t('labels.payment')" :before-change="validateStep" icon="dashicons dashicons-format-image">
        <step3 ref="step3" @onUpdate="updateStep" :cartOrder="cartOrder" :active="step === 2"/>
        <div class="row">
          <div class="col-md-12 text-right">
            <span class="text-right text-danger">{{stepValidationError}}</span>
          </div>
        </div>
      </tab-content>
      <tab-content @click="step = 3" :title="$t('labels.invoice')" :before-change="validateStep" icon="dashicons dashicons-saved">
        <step4 ref="step4" @onUpdate="updateStep" :cartOrder="cartOrder" :active="step === 3"/>
      </tab-content>
      <template slot="footer" scope="props">
        <div class=wizard-footer-left>
          <wizard-button @click.native="props.prevTab()" v-if="props.activeTabIndex > 0 && !props.isLastStep" :style="props.fillButtonStyle">{{$t('buttons.back')}}</wizard-button>
        </div>
        <div class="wizard-footer-right">
          <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">{{$t('buttons.next')}}</wizard-button>
          <wizard-button v-else @click.native="props.nextTab()" class="wizard-footer-right finish-button ml-3 mr-3" :style="props.fillButtonStyle">{{props.isLastStep ? $t('buttons.save') : $t('labels.save')}}</wizard-button>
          <wizard-button data-toggle="modal" data-target="#confirmCancel" data class="wizard-footer-right finish-button ml-3 mr-3" :style="props.fillButtonStyle">{{$t('buttons.cancel')}}</wizard-button>
        </div>

      </template>
    </form-wizard>
      <div class="modal" data-backdrop="static" data-keyboard="false" id="confirmCancel" tabindex="-1"
           role="dialog" ref="confirmCancel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5>{{$t('labels.confirmCancel')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mt-4">
                <h5>{{$t('labels.areYouSureToCancelThisOrder')}}</h5>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="cancelConfirmed">
                {{$t('buttons.confirm')}}
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>
<script src="./newOrder.component.ts" lang="ts"></script>
