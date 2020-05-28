<template>
    <div class="row">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <div class="form-desc">{{$t('productDiscountsSettings')}}</div>
                <form>
                    <div class="form-group">
                        <label class="control-label">{{$t('chooseDiscounts')}}</label>
                        <multi-select :options="allDiscounts" :config="multiSelectConfig" :value="selectedDiscounts" @onRemove="removeDiscount" @onAdd="addDiscount"></multi-select>
                    </div>
                </form>
                <div class="row">
                    <div class="col-md-12 text-right">
                        <div class="form-buttons-w">
                            <button class="btn btn-outline-primary" @click.prevent="cancel">{{$t('cancel')}}</button>
                            <button class="btn btn-primary" @click.prevent="save">{{$t('save')}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="element-wrapper col-md-3">
            <div class="element-box">
                <div class="form-desc" style="color:#808080;">
                    {{$t('dontForgetToClickSave')}}
                </div>
                <router-link to="/entity/promotion/new">{{$t('newPromotionWizard')}}</router-link>
                <hr/>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./discountsTab.component.ts"></script>
