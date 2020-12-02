<template>
  <div class="form-row align-items-left price-row">
    <div class="col-auto">
      <div class="form-group">
        <label class="control-label" v-if="isInclusiveActive">{{ $t('labels.inclusivePrice') }}</label>
        <label class="control-label" v-else>{{ $t('labels.exclusivePrice') }}</label>
        <div class="input-group mb-3" style="padding-bottom:0; margin-bottom:0">
          <money style="max-width:150px; height:40px;" v-model="priceTemp"
                 @blur.native="checkIfShouldBeRounded"
                 :class="{'form-control': true, 'invalid': priceTemp <= 0.1}" v-bind="moneyConfig"/>
          <div class="input-group-append">
                    <span class="btn btn-rounded btn-success input-group-text cursor-pointer" id="basic-addon2"
                          @click="isInclusiveActive = !isInclusiveActive">
                      <span v-if="!isInclusiveActive">{{ $t('labels.useInclPrice') }}</span>
                      <span v-if="isInclusiveActive">{{ $t('labels.useExclPrice') }}</span>
                    </span>
          </div>
        </div>
        <span v-if="priceTemp <= 0.1" class="text-danger small">{{ $t('labels.priceIsRequired') }}</span>
        <div v-if="isInclusiveActive">
          <p style="padding-top:2px;">{{ $t('labels.exclusivePrice') }}:
            {{ $store.state.currency }} {{ calculateExclusive() }}</p>
        </div>
        <div v-else>
          <p style="padding-top:2px;">{{ $t('labels.inclusivePriceIs') }}:
            {{ $store.state.currency }} {{ calculateInclusive() }}</p>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <div class="form-group">
        <label class="control-label">{{ $t('labels.taxRate') }}</label>
        <select :class="{'form-control': true, invalid: errors.has('tax')}" style="min-width:100px; height:40px;"
                v-model="tax" v-validate="'required'" name="tax" @change="taxChanged">
          <option v-for="(item, index) in allTaxRates" :key="index" :value="item.rate">{{ item.rate }}%</option>
        </select>
        <span class="small text-danger">{{ errors.first('tax') }}</span>
      </div>
    </div>
    <div class="col-auto">
      <label class="control-label">{{ $t('labels.roundedTotal') }}</label>
      <toggle-switch
        :on-text="$t('labels.yes')"
        :off-text="$t('labels.no')"
        :value.sync="priceRounding"/>
      <p><small>{{ $t('labels.finalCalculatedTotalMustBeRoundedTo5Cents') }}</small></p>
    </div>
  </div>
</template>
<script src="./productPrice.component.ts" lang="ts"></script>
<style scoped>

</style>
