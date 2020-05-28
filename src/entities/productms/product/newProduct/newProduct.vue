<template>
  <div class="container-fluid text-left">
    <form-wizard @on-complete="onComplete"
                 :title="$t('labels.newProduct')"
                 :subtitle="''"
                 @on-change="tabChanged"
                 shape="tab"
                 color="#1c4cc3"
                 error-color="#ff4949">
      <tab-content :title="product.productType.toLowerCase() + ' ' + $t('labels.product')" :before-change="validateStep" icon="fas fa-user-tie">
        <div class="row justify-content-center">
          <div class="profile-tile profile-tile-inlined col-md-2 col-xs-4">
            <router-link @click.native.prevent="changeProductType('DIGITAL')" to="" :class="{'profile-tile-box': true, active: product.productType === 'DIGITAL'}">
              <div>
                <i class="productIcon dashicons dashicons-download"></i>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.digital')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-2 col-xs-4">
            <router-link @click.native.prevent="changeProductType('COURSE')" to="" :class="{'profile-tile-box': true, active: product.productType === 'COURSE'}">
              <div>
                <i class="productIcon dashicons dashicons-book-alt"></i>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.course')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-2 col-xs-4">
            <router-link @click.native.prevent="changeProductType('PHYSICAL')" to="" :class="{'profile-tile-box': true, active: product.productType === 'PHYSICAL'}">
              <div>
                <i class="productIcon fa fa-truck"></i>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.physical')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-2 col-xs-4">
            <router-link @click.native.prevent="changeProductType('SERVICE')" to="" :class="{'profile-tile-box': true, active: product.productType === 'SERVICE'}">
              <div>
                <i class="productIcon fa fa-cogs"/>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.service')}}
              </div>
            </router-link>
          </div>
          <div class="profile-tile profile-tile-inlined col-md-2 col-xs-4">
            <router-link @click.native.prevent="changeProductType('VOUCHER')" to="" :class="{'profile-tile-box': true, active: selectedProductType === 'VOUCHER'}">
              <div>
                <i class="productIcon fa fa-ticket-alt"/>
              </div>
              <div class="pt-user-name" style="font-size: .8em">
                {{$t('labels.voucher')}}
              </div>
            </router-link>
          </div>
        </div>
      </tab-content>
      <tab-content :title="$t('labels.productDetails')" icon="fas fa-tags" :before-change="validateStep">
        <form>
          <div class="form-group">
            <multi-language-component
              :config="multiLangConfig"
              :value="product.productLanguages"
              :isValidating="isValidatingStep2"
              @onAdd="addProductLang"
              @onChange="changeProductLang"
              @onRemove="removeProductLang"/>
          </div>
          <div class="form-group row">
              <div class="col-md-6 pl-0 ml-0">
                <label>{{$t('labels.validFrom')}}</label>
                <flat-pickr :config="validFromConfig" class="single-daterange form-control"
                            id="validFromDate" v-model="availableFrom"/>
              </div>
              <div class="col-md-6 pr-0 mr-0">
                <label>{{$t('labels.validTo')}}</label>
                <flat-pickr :config="validToConfig" class="single-daterange form-control"
                            id="validToDate" v-model="availableTo"/>
                <span class="small text-danger" v-if="isValidatingStep2 && availableTo !== null && validateAvailableTo">{{$t('labels.validToMustBeAfterValidFrom')}}</span>
              </div>
          </div>
          <div class="form-group row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="control-label">{{$t('labels.exclusivePrice')}}</label>
                <div class="input-group mb-3">
                  <money @blur.native="calculateInclusive(true)"  v-model="product.price"
                         :class="{'form-control': true, 'invalid': product.price <= 0.1}" v-bind="moneyConfig"/>
                  <div class="input-group-append">
                    <span class="input-group-text cursor-pointer" @click.prevent="changeIsInclusive" id="basic-addon2">
                      <span v-if="!isInclusive">{{$t('labels.useInclPrice')}}</span>
                      <span v-if="isInclusive">{{$t('labels.useExclPrice')}}</span>
                    </span>
                  </div>
                </div>
                <span v-if="product.price <= 0.1 && isValidatingStep2" class="text-danger small">{{$t('labels.priceIsRequired')}}</span>
                <p v-show="inclusive() > 0"><small>{{$t('labels.inclusivePriceIs')}}: {{inclusive()}}€</small></p>
              </div>
            </div>
            <div class="col-md-6 pt-2">
              <div class="form-group" v-show="isInclusive">
                <label class="control-label">{{$t('labels.inclusivePrice')}}</label>
                <money @blur.native="calculateExclusive" v-model="inclusivePrice" :class="{'form-control': true}" name="priceAmount"  v-bind="moneyConfig"></money>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="product.productType === 'SERVICE'">
            <label class="control-label">{{$t('labels.priceType')}}</label>
            <select :class="{'form-control': true}" v-model="product.typeService.priceType">
              <option value="fixed">{{$t('labels.fixed')}}</option>
              <option value="hourly">{{$t('labels.hourly')}}</option>
              <option value="15minutes">{{$t('labels.15minutes')}}</option>
              <option value="daily">{{$t('labels.daily')}}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="control-label">{{$t('labels.taxRate')}}</label>
            <select :class="{'form-control': true}" v-model="product.tax" @change="calculateTax()">
              <option v-for="(item, index) in allTaxRates" :key="index" :value="item.rate">{{item.rate}}%</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <div class="row">
              <div class="col-md-6">
                <label class="control-label">{{$t('labels.isSubscription')}}</label>
                <toggle-switch id="repeatSubscription"
                               :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="isSubscription"/>
              </div>
              <div class="col-md-6">
                <label class="control-label">{{$t('labels.roundedTotal')}}</label>
                <toggle-switch
                               :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="product.priceRounding"/>
                <p><small>{{$t('labels.finalCalculatedTotalMustBeRoundedTo5Cents')}}</small></p>
              </div>
            </div>
          </div>
          <div class="row" v-if="isSubscription && product.productSubscription">
            <div class="form-group col-md-4">
              <label class="control-label">{{$t('labels.startDate')}}</label>
              <select :class="{'form-control':true, invalid: errors.has('Start Date')}" v-validate="'required'"
                      v-model="product.productSubscription.startDate" name="Start Date">
                <option value="firstOfCurrentMonth">{{$t('labels.startAtBeginningOfCurrentMonth')}}</option>
                <option value="firstOfNextMonth">{{$t('labels.beginningOfNextMonth')}}</option>
                <option value="now">{{$t('labels.atThisMoment')}}</option>
                <option value="paymentDone">{{$t('labels.startAfterPaymentIsDone')}}</option>
              </select>
              <span class="small text-danger">{{errors.first('Start Date')}}</span>
            </div>
            <div class="form-group col-md-4">
              <label class="control-label">{{$t('labels.period')}}</label>
              <select :class="{'form-control':true, invalid: errors.has('period')}" v-validate="'required'"
                      v-model="product.productSubscription.period" name="period">
                <option value="weekly">{{$t('labels.weekly')}}</option>
                <option value="bi-weekly">{{$t('labels.bi-weekly')}}</option>
                <option value="month">{{$t('labels.month')}}</option>
                <option value="quarter">{{$t('labels.quarter')}}</option>
                <option value="half-Year">{{$t('labels.halfYear')}}</option>
                <option value="year">{{$t('labels.year')}}</option>
              </select>
              <span class="small text-danger">{{errors.first('period')}}</span>
            </div>
            <div class="form-group col-md-4">
              <label class="form-control-label">{{$t('labels.subscriptionMaxTerms')}}</label>
              <input :class="{'form-control':true, invalid: errors.has('period')}" v-validate="'required|min_value:0'"
                     type="number" name="Subscription Max Terms" v-model="product.productSubscription.maxTimes"/>
              <span class="small text-danger">{{errors.first('Subscription Max Terms')}}</span>
            </div>
          </div>
        </form>
      </tab-content>
      <tab-content :title="$t('labels.thumbnail')" icon="fas fa-receipt" :before-change="validateStep" >
        <upload-widget/>
      </tab-content>
      <tab-content :title="$t('labels.finalStep')" icon="fas fa-receipt" :before-change="validateStep" >
        <h5 class="text-danger" v-if="product.productType === 'DIGITAL'">{{$t('labels.pleaseUploadAfileOrProvideALink')}}</h5>
        <form>
          <div class="form-group" v-if="product.productType === 'DIGITAL'">
            <label class="control-label">{{$t('labels.uploadFile')}}</label>
            <toggle-switch
                           :on-text="$t('labels.yes')"
                           :off-text="$t('labels.no')"
                           :value.sync="notUrl"></toggle-switch>
          </div>
          <div class="form-group" v-if="product.productType === 'DIGITAL' && !notUrl">
            <label class="control-label">{{$t('labels.provideLink')}}</label>
            <input type="url" @blur="checkForHttp" v-model="product.typeDigital.url" :class="{'form-control': true, invalid: errors.has('url')}"
                   name="url" v-validate="'required|url'"/>
            <span class="small text-danger">{{errors.first('url')}}</span>
          </div>
          <div class="form-group" v-if="product.productType === 'DIGITAL' && notUrl">
            <label class="control-label">{{$t('labels.orUploadFile')}}</label>
            <upload-widget/>
          </div>
          <div class="form-group" v-if="product.productType === 'COURSE'">
            <label class="col-md-6 control-label">{{$t('labels.selectCourse')}}</label>
            <searchable-select-component :config="searchableConfig"
                                         :options="typeCourses"
                                         :value="selectedCourse"
                                         @onCreate="addNewCourse"
                                         @onSelected="updateCourse"
                                         @onDelete="removeCourse"
            ></searchable-select-component>
          </div>
          <div class="form-group text-center" v-if="product.productType === 'PHYSICAL' || product.productType=== 'SERVICE'">
            <h3>{{$t('labels.clickSaveToProceed')}}</h3>
          </div>
        </form>
      </tab-content>
    </form-wizard>
  </div>
</template>
<script type="ts" src="./newProduct.component.ts"></script>

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
</style>
