<template>
  <div class="container-fluid text-left">

    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.new')}} {{promotion.promotionType.toLowerCase().replace('_',' ')}} {{$t('labels.promotion')}}</span>
      <router-link to="/promotions" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-secondary float-right create-tag">
          <span>{{$t('labels.backToPromotions')}}</span>
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
      <tab-content @click="step = 0" :title="promotion.promotionType.toLowerCase() + ' ' + $t('labels.promotion')" icon="fas fa-user-tie">
        <div class="row justify-content-center">
          <div class="profile-tile profile-tile-inlined col-md-3 col-xs-4">
            <router-link @click.native.prevent="changeProductType('AFFILIATE')" to="" :class="{'profile-tile-box': true, active: promotion.promotionType === 'AFFILIATE'}">
              <div>
                <i class="productIcon dashicons dashicons-networking"></i>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.affiliate')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-3 col-xs-4">
            <router-link @click.native.prevent="changeProductType('BUNDLE')" to="" :class="{'profile-tile-box': true, active: promotion.promotionType === 'BUNDLE'}">
              <div>
                <i class="productIcon fas fa-box-open"></i>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.bundle')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-3 col-xs-4">
            <router-link @click.native.prevent="changeProductType('COUPON')" to="" :class="{'profile-tile-box': true, active: promotion.promotionType === 'COUPON'}">
              <div>
                <i class="productIcon dashicons dashicons-tag"></i>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.coupon')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-3 col-xs-4">
            <router-link @click.native.prevent="changeProductType('LOYALTY')" to="" :class="{'profile-tile-box': true, active: promotion.promotionType === 'LOYALTY'}">
              <div>
                <i class="productIcon dashicons dashicons-awards"/>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.loyalty')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-3 col-xs-4">
            <router-link @click.native.prevent="changeProductType('PERSONAL_COUPON')" to="" :class="{'profile-tile-box': true, active: promotion.promotionType === 'PERSONAL_COUPON'}">
              <div>
                <i class="productIcon dashicons dashicons-universal-access-alt"/>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.personalCoupon')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-3 col-xs-4">
            <router-link @click.native.prevent="changeProductType('PRICE')" to="" :class="{'profile-tile-box': true, active: promotion.promotionType === 'PRICE'}">
              <div>
                <i class="productIcon fas fa-money"/>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.price')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-3 col-xs-4">
            <router-link @click.native.prevent="changeProductType('QUANTITY')" to="" :class="{'profile-tile-box': true, active: promotion.promotionType === 'QUANTITY'}">
              <div>
                <i class="productIcon dashicons dashicons-admin-settings"/>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.quantity')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-3 col-xs-4">
            <router-link @click.native.prevent="changeProductType('TEMPORARY_COUPON')" to="" :class="{'profile-tile-box': true, active: promotion.promotionType === 'TEMPORARY_COUPON'}">
              <div>
                <i class="productIcon fas fa-calendar"/>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.temporaryCoupon')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-3 col-xs-4">
            <router-link @click.native.prevent="changeProductType('TIME')" to="" :class="{'profile-tile-box': true, active: promotion.promotionType === 'TIME'}">
              <div>
                <i class="productIcon dashicons dashicons-clock"/>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.time')}}
              </div>
            </router-link>
          </div>
        </div>
      </tab-content>
      <tab-content  @click="step = 1" :title="$t('labels.promotionDetails')" :before-change="stepForward" icon="fas fa-tags">
        <form>
          <div class="form-group mt-3">
            <multi-language-component
              :config="multiLangConfig"
              :value="promotion.promotionLanguages"
              :isValidating="isValidatingStep2"
              @onAdd="addPromotionLang"
              @onChange="changePromotionLang"
              @onRemove="removePromotionLang"/>
          </div>
          <div class="form-group mt-3 row">
              <div class="col-md-6">
                <label>{{$t('labels.validFrom')}}</label>
                <div class="dateHolder date-input">
                <flat-pickr :config="validFromConfig" class="single-daterange form-control"
                            id="validFromDate" v-model="availableFrom"/>
                </div>
              </div>
              <div class="col-md-6">
                <label>{{$t('labels.validTo')}}</label>
                <div class="dateHolder date-input">
                  <flat-pickr :config="validToConfig" v-model="availableTo" class="single-daterange form-control"/>
                  <i class="fa fa-times clearDate cursor-pointer" @click="availableTo=null">
                    <span aria-hidden="true" class="sr-only">X</span>
                  </i>
                </div>
                <span class="small text-danger" v-if="isValidatingStep2 && availableTo !== null && validateAvailableTo">{{$t('labels.validToMustBeAfterValidFrom')}}</span>
              </div>
          </div>
        </form>
      </tab-content>
      <tab-content  @click="step = 2" :title="$t('labels.discount')" :before-change="stepForward" icon="fas fa-receipt" >
        <div class="form-group mt-3 maxwidth">
          <label class="control-label">{{$t('labels.discountType')}}</label>
          <select class="form-control" v-model="discountTypeId">
            <option v-for="(promotion, k) in discountTypes" :key="k" :value="promotion.id">{{$t(promotion.label)}}</option>
          </select>
        </div>
        <div :class="{'form-group mt-3 maxwidth': true}" v-if="discountTypeId===1 || discountTypeId===2">
          <label class="control-label" v-if="discountTypeId===1">{{$t('labels.percentageAmount')}}</label>
          <label class="control-label" v-if="discountTypeId===2">{{$t('labels.fixedAmount')}}</label>
          <money v-if="discountTypeId===1" v-model="discountPriceAmount" :class="{'form-control': true, invalid: errors.has('discountAmount')}" name="discountAmount"  v-bind="moneyPercentage"></money>
          <money v-if="discountTypeId===2" v-model="discountPriceAmount" :class="{'form-control': true, invalid: errors.has('discountAmount')}" name="discountAmount"  v-bind="moneyConfig"></money>
          <span class="small danger">{{errors.first('discountAmount')}}</span>
        </div>
        <div :class="{'form-group mt-3': true}" style="max-width:600px;" v-if="discountTypeId===4">
          <label class="control-label">{{$t('labels.FreeItem')}}</label>
          <searchable-select-component
            ref="productSelect"
            :config="singleSelectConfig"
            :options="$store.state.lookups.products"
            name="freeItem"
            :value.sync="selectedProduct"
            @onDelete="removeProduct"
            @onSelected="addProduct"/>
        </div>
        <div :class="{'form-group mt-3 maxwidth': true}" v-if="discountTypeId===4">
          <label class="control-label">{{$t('labels.quantityAmount')}}</label>
          <input v-validate="'min_value:1'" :class="{'form-control': true, invalid: errors.has('discountAmount')}" type="number" class="form-control" name="discountAmount" v-model="discountQuantityAmount"/>
          <span class="text-danger small">{{errors.first('discountAmount')}}</span>
        </div>
        <div class="form-group mt-3">
          <label class="control-label">{{$t('labels.repeatInCaseOfSubscription')}}</label>
          <toggle-switch
            id="repeat"
            :disabled="discountTypeId === 4"
            :on-text="$t('labels.yes')"
            :off-text="$t('labels.no')"
            :value.sync="promotion.recurrent"/>
        </div>
      </tab-content>
      <tab-content  @click="step = 3" :before-change="stepForward" :title="$t('labels.finalStep')" icon="fas fa-receipt">
        <div class="form-group mt-3" v-if="promotion.promotionType === 'TIME'">
          <h4>{{$t('labels.pleaseClickFinish')}}</h4>
        </div>
        <div class="form-group mt-3 maxwidth" v-if="promotion.promotionType === 'QUANTITY'">
          <label class="control-label">{{$t('labels.threshold')}}</label>
          <input :class="{'form-control': true, invalid: errors.has('quantity')}" type="number" v-validate="'numeric|min_value:1'" v-model="quantityType" name="quantity" class="form-control"/>
          <span class="text-danger small">{{errors.first('quantity')}}</span>
        </div>
        <div class="form-group mt-3 maxwidth" v-if="promotion.promotionType === 'PRICE'">
          <label class="control-label">{{$t('labels.orderTotalThreshold')}}</label>
          <money v-model="totalThreshhold" :class="{'form-control': true, invalid: errors.has('totalThreshhold')}" v-validate="'required|min_value:1'" name="totalThreshhold"  v-bind="moneyConfig"></money>
          <span class="small text-danger">{{step4Error}}</span>
        </div>
        <div class="form-group mt-3 maxwidth" v-if="promotion.promotionType === 'COUPON'">
          <label class="control-label">{{$t('labels.couponCode')}}</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text btn generateCode" @click="generateCouponCode">
                {{$t('labels.generateCode')}}
              </div>
            </div>
            <input v-validate="'required'" :class="{'form-control': true, invalid: errors.has('couponCode')}" style="height:38px;" placeholder="" type="text" v-model="couponCode" name="couponCode">
          </div>
          <span class="text-danger small">{{errors.first('couponCode')}}</span>
        </div>
        <div class="form-group mt-3 maxwidth" v-if="promotion.promotionType === 'COUPON' || promotion.promotionType === 'PERSONAL_COUPON' || promotion.promotionType === 'TEMPORARY_COUPON'">
          <label class="control-label">{{$t('labels.maxTimesUsed')}}</label>
          <toggle-switch
                         :on-text="$t('labels.infinite')"
                         :off-text="$t('labels.limited')"
                         :value.sync="couponMaxTimesUsed"></toggle-switch>
          <input  v-validate="'numeric|min_value:0'" :class="{'form-control mt-3': true, invalid: errors.has('couponMaxTimesUsed')}" type="number" name="couponMaxTimesUsed" v-show="!couponMaxTimesUsed" v-model="maxTimesUsed"/>
          <span v-if="isStep4Validation" class="text-danger small">{{errors.first('couponMaxTimesUsed')}}</span>
        </div>
        <div class="form-group mt-3" v-if="promotion.promotionType === 'TEMPORARY_COUPON'">
          <label class="control-label">{{$t('labels.valid')}}</label>
          <select class="form-control" v-model="validDays">
            <option value="false">{{$t('labels.days')}}</option>
            <option value="true">{{$t('labels.hours')}}</option>
          </select>
          <input v-validate="'numeric|min_value:1'" :class="{'form-control mt-3': true, invalid: errors.has('temporaryValid')}" type="number" name="temporaryValid"  v-model="temporaryValid"/>
          <span class="text-danger small">{{errors.first('temporaryValid')}}</span>
        </div>
        <div class="form-group mt-3" v-if="promotion.promotionType === 'BUNDLE'">
          <div :class="{'form-group mt-3': true}">
            <label class="control-label">{{$t('labels.selectProduct')}}</label>
            <searchable-select-component ref="bundleProduct"
                           :config="singleSelectConfig"
                           :options="$store.state.lookups.products"
                           name="bundleProduct"
                           :value.sync="selectedBundleProduct"
                                         @onSelected="addBundleProduct"
                                         @onDelete="removeBundleProduct"/>
            <span class="small text-danger">{{step4Error}}</span>
          </div>
          <div :class="{'form-group mt-3': true}">
            <label class="control-label">{{$t('labels.bundleQuantity')}}</label>
            <input v-validate="'numeric|min_value:1'" :class="{'form-control': true, invalid: errors.has('bundleQuantity')}" type="number"  name="bundleQuantity" v-model="bundleQuantity"/>
            <span class="text-danger small">{{errors.first('bundleQuantity')}}</span>
          </div>
        </div>
        <div class="form-group mt-3" v-if="promotion.promotionType === 'AFFILIATE'">
          <div :class="{'form-group mt-3': true}">
            <label class="control-label">{{$t('labels.allAffiliates')}}</label>
            <toggle-switch id="allAffiliates"
                           :on-text="$t('labels.yes')"
                           :off-text="$t('labels.no')"
                           :value.sync="forAllAffiliates"></toggle-switch>
            <label class="control-label mt-3" v-if="!forAllAffiliates">{{$t('labels.selectAffiliates')}}</label>
            <searchable-select-component :config="singleSelectConfigAffiliate" v-if="!forAllAffiliates"
                                         :options="allAffiliates"
                                         :value.sync="selectedAffiliates"
                                         @onSelected="updateAffiliates"
                                         @onDelete="removeAffiliates"/>
            <span class="small text-danger">{{step4Error}}</span>
          </div>
        </div>
        <template v-if="promotion.promotionType === 'LOYALTY'">
        <div :class="{'form-group mt-3':true}">
          <label class="control-label">{{$t('labels.earnedPointsToReceiveThisPromotion')}}</label>
          <input  v-validate ="{ rules: { required: validateLoyalty} }" :class="{'form-control': true, invalid: errors.has('points')}" type="number"  name="points" v-model="earnedPoints"/>
          <span class="text-danger small">{{errors.first('points')}}</span>
        </div>
        <div class="form-group mt-3">
          <label class="control-label">{{$t('labels.totalPurchaseAmount')}}</label>
          <money v-validate ="{ rules: { required: validateLoyalty} }" v-model="totalPurchaseAmount" :class="{'form-control': true, invalid: errors.has('totalPurchaseAmount')}" name="totalPurchaseAmount"  v-bind="moneyConfig"></money>
          <span class="text-danger small">{{step4Error}}</span>
        </div>
        <div class="form-group mt-3">
          <label class="control-label">{{$t('labels.totalPurchaseItems')}}</label>
          <input type="number" v-validate ="{ rules: { required: validateLoyalty} }" :class="{'form-control': true, invalid: errors.has('totalPurchaseItems')}" v-model="totalPurchaseItems" name="totalPurchaseItems"/>
          <span class="text-danger small">{{errors.first('totalPurchaseItems')}}</span>
        </div>
        </template>
      </tab-content>
      <button @click="stepBack" slot="prev" class="btn btn-primary btn-lg" :disabled="isSaving">{{$t('buttons.back')}}</button>
      <button slot="next" class="btn btn-primary btn-lg" :disabled="isSaving">{{$t('buttons.next')}}</button>
      <button slot="finish" class="btn btn-primary btn-lg" :disabled="isSaving">{{$t('buttons.finish')}}</button>
    </form-wizard>
    </div>
  </div>
</template>
<script type="ts" src="./newPromotion.component.ts"></script>

<style scoped>
  .profile-tile .profile-tile-box {
    width: 210px!important;
  }
  .productIcon{
    font-size: 4.5rem;
  }
  .profile-tile-box:hover{
    -webkit-box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
    -moz-box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
    box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
  }
  .profile-tile-box.active{
    -webkit-box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
    -moz-box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
    box-shadow: 6px 4px 13px 5px rgba(28,76,195,0.57);
  }
  .switch-label:before{
    right: 0!important;
  }
  .generateCode{
    padding: 10px;
  }
  .profile-tile{
    border-bottom: none;
  }
  .maxwidth {
     max-width: 300px;
   }
</style>
