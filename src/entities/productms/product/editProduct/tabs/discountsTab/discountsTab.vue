<template>
    <div class="row text-left">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <div class="form-desc">{{$t('labels.productDiscountsSettings')}}</div>
                <form>
                    <div class="form-group">
                        <label class="control-label">{{$t('labels.chooseDiscounts')}}</label>
                      <searchable-select-component :config="multiSelectConfig"
                                                   :options="allDiscounts"
                                                   :value="selectedDiscounts"
                                                   @onChange="addDiscount"
                                                   @onDelete="removeDiscount"/>
                    </div>
                </form>
                <div class="row">
                    <div class="col-md-12 text-right">
                        <div class="form-buttons-w">
                            <button class="btn btn-outline-primary" @click.prevent="cancel">{{$t('buttons.cancel')}}</button>
                            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="element-wrapper col-md-3">
            <div class="element-box">
                <div class="form-desc" style="color:#808080;">
                    {{$t('labels.dontForgetToClickSave')}}
                </div>
                <router-link to="/promotions/new">{{$t('labels.newPromotionWizard')}}</router-link>
                <hr/>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./discountsTab.component.ts"></script>
