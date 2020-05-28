<template>
    <div class="row">
        <div class="element-wrapper col-md-12">
            <div class="element-box">
                <b-modal ref="removeEntityAttribute" id="removeEntityAttribute" >
                    <span slot="modal-title"><span id="vueadminApp.productmsAttribute.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
                    <div class="mt-4">
                        <p id="jhi-delete-attribute-heading" v-bind:title="$t('vueadminApp.productmsAttribute.delete.question')">Are you sure you want to delete this Attribute?</p>
                    </div>
                    <div slot="modal-footer">
                        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancelz</button>
                        <button type="button" class="btn btn-primary" id="jhi-confirm-delete-attribute" v-text="$t('entity.action.delete')" v-on:click.prevent="removeAttribute">Deletez</button>
                    </div>
                </b-modal>

                <b-modal ref="removeEntityAttributeOption" id="removeEntityAttributeOption" >
                    <span slot="modal-title"><span id="vueadminApp.productmsAttributeOption.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
                    <div class="mt-4">
                        <p id="jhi-delete-attribute-option-heading" v-bind:title="$t('vueadminApp.productmsAttributeOption.delete.question')">Are you sure you want to delete this Attribute Option?</p>
                    </div>
                    <div slot="modal-footer">
                        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                        <button type="button" class="btn btn-primary" id="jhi-confirm-delete-attribute-option" v-text="$t('entity.action.delete')" v-on:click="RemoveAttributeOption">Delete</button>
                    </div>
                </b-modal>
                <div class="form-desc" v-if="!editMode">
                    <div class="row">
                        <div class="col-md-9">
                            <p>{{$t('vueadminApp.productmsAttribute.home.title')}}</p>
                            <div role="tablist" v-if="productCopy.attributes && productCopy.attributes.length">
                                <b-card no-body class="mb-1" @click.prevent="selectedProductFeature = item" v-for="(item, index) in productCopy.attributes" :key="index">
                                    <b-card-header header-tag="header" class="p-1" role="tab">
                                        <b-button class="col-md-11" href="#" v-b-toggle="'accordion' + index" variant="info">{{getAttributeName(item.attributeLanguages ? item.attributeLanguages : undefined)}}</b-button>
                                        <b-button-close class="m-2" v-b-modal.removeEntityAttribute @click.prevent="prepareRemoveAttribute(item)"></b-button-close>
                                        <b-button-close class="m-2" @click.prevent="editAttribute(item)"><i class="dashicons dashicons-edit"></i> </b-button-close>
                                    </b-card-header>
                                    <b-collapse :id="'accordion'+index" :accordion="'my-accordion'+index" role="tabpanel">
                                        <b-card-body>
                                            <table class="table table-striped">
                                                <thead>
                                                <th>{{$t('vueadminApp.productmsAttribute.name')}}</th>
                                                <th>{{$t('vueadminApp.productmsAttribute.fieldIndex')}}</th>
                                                <th>{{$t('vueadminApp.productmsAttribute.additionalCosts')}}</th>
                                                <th>{{$t('vueadminApp.productmsAttribute.stock')}}</th>
                                                <th>&nbsp;</th>
                                                </thead>
                                                <tbody>
                                                <tr v-for="(option, key) in item.attributeValues" :key="key">
                                                    <td>{{getAttributeName(productCopy.attributes[index].attributeValues[key].attributeValueLanguages)}}</td>
                                                    <td>{{option.orderIndex}}</td>
                                                    <td>{{option.price}}</td>
                                                    <td>{{option.stock}}</td>
                                                    <td>
                                                        <div class="text-danger ml-3 cursor-pointer" v-b-modal.removeEntityAttributeOption @click.prevent="prepareRemoveAttributeOption(productCopy.attributes[index].attributeValues[key])">
                                                            <i class="os-icon os-icon-ui-15"></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </b-card-body>
                                    </b-collapse>
                                </b-card>
                            </div>
                            <div v-else class="justify-content-center text-center">
                                <p>{{$t('vueadminApp.productmsAttribute.nodata')}}</p>
                            </div>
                        </div>
                        <div class="col-md-3" style="padding-top:3em;">
                            <button type="button" class="btn btn-outline-primary" @click.prevent="addNewFeature"><i class="dashicons dashicons-plus"></i> {{$t('vueadminApp.productmsAttribute.home.createLabel')}}</button>
                        </div>
                    </div>
                </div>
                <div v-show="editMode && isInit && selectedProductFeature !== null">
                    <div class="row">
                        <div class="col-md-6">
                            <div v-if="selectedProductFeature && selectedProductFeature.id == 0" class="larger">{{$t('vueadminApp.productmsAttribute.home.createLabel')}}</div>
                            <div v-else class="larger">{{$t('vueadminApp.productmsAttribute.home.createOrEditLabel')}} {{getAttributeName(selectedProductFeature && selectedProductFeature.attributeLanguages ? selectedProductFeature.attributeLanguages : undefined)}}</div>
                            <form>
                                <div class="form-group">
                                    <jhi-multi-language ref="featureLang" :config="multiLangConfig" :langs="selectedProductFeature.attributeLanguages" @updateLang="updateFeatureLang" @addNewLang="addNewFeatureLang"></jhi-multi-language>
                                </div>
                                <div class="form-group col-md-6 pt-3 pull-left">
                                    <label class="form-control-label">{{$t('vueadminApp.productmsAttribute.availableForCustomers')}}</label>
                                    <toggle-switch id="repeatSubscription"
                                                   :on-text="$t('global.yes')"
                                                   :off-text="$t('global.no')"
                                                   :value.sync="selectedProductFeature.visibleInFrontEnd"></toggle-switch>
                                </div>
                                <div class="form-group col-md-6 pt-3 pull-left">
                                    <label class="form-control-label">{{$t('vueadminApp.productmsAttribute.multipleValues')}}</label>
                                    <toggle-switch id="repeatSubscription"
                                                   :on-text="$t('global.yes')"
                                                   :off-text="$t('global.no')"
                                                   :value.sync="selectedProductFeature.multipleValues"></toggle-switch>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-6">
                            <div class="larger">{{$t('vueadminApp.productmsAttribute.productFeatureOptions')}}
                                <button type="button" v-if="!editModeAttribute && isInit" @click.prevent="addNewAttributeOption" class="btn btn-outline-primary float-right"><i class="fa fa-plus mr-2"></i>{{$t('vueadminApp.productmsAttribute.newAttributeOption')}}</button>
                            </div>
                            <div class="ae-list-w" style="border:0px;">
                                <div class="scrollable">
                                        <draggable
                                            class="list-group"
                                            tag="ul"
                                            v-model="allOptions"
                                            v-bind="dragOptions"
                                            @start="dragging = true"
                                            @end="changeIndex">
                                            <transition-group type="transition" :name="!dragging ? 'flip-list' : null">
                                                <li v-if="!editModeAttribute" class="cursor-pointer pipeline-item mt-2" v-for="(option, key) in allOptions" :key="key">
                                                    <div class="pi-controls">
                                                        <i class="os-icon os-icon-edit text-warning" @click="editAttributeOption(option, key)"></i>
                                                        <i class="os-icon os-icon-trash text-danger" v-b-modal.removeEntityAttributeOption @click.prevent="prepareRemoveAttributeOption(option)"></i>
                                                    </div>
                                                    <div class="pi-body">
                                                        <div class="avatar"><i style="font-size: 2.5rem" class="fa fa-filter"></i></div>
                                                        <div class="pi-info">
                                                            <div class="h6 pi-name">{{getAttributeName(option.attributeValueLanguages)}}</div>
                                                            <div class="pi-sub">{{$t('entity.detail.value')}}: {{option.value}}</div>
                                                            <div class="pi-sub">
                                                                {{$t('vueadminApp.productmsAttribute.additionalCosts')}}: {{option.price}},
                                                                {{$t('vueadminApp.productmsAttribute.stock')}}: {{option.stock}},
                                                                {{$t('vueadminApp.productmsAttribute.fieldIndex')}}: {{option.orderIndex}}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="pi-foot">
                                                        <div class="extra-info">{{$t('entity.detail.created')}}: {{option.createdOn | formatDate}}</div>
                                                        <div class="extra-info">{{$t('entity.detail.updated')}}: {{option.updatedOn | formatDate}}</div>
                                                    </div>
                                                </li>
                                            </transition-group>
                                    </draggable>
                                </div>
                                <div v-if="editModeAttribute && isInit" class="ml-3 mr-3">
                                    <form class="needs-validation" novalidate>
                                        <div class="form-group">
                                            <jhi-multi-language ref="attrLang" :config="multiLangConfigOption" :langs="selectedOption.attributeValueLanguages"  @deleteLang="removeFeatureOptionLang" @updateLang="updateFeatureOptionLang" @addNewLang="addNewFeatureOptionLang"></jhi-multi-language>
                                        </div>
                                        <div :class="{'form-group': true}">
                                            <label for="value">{{$t('entity.detail.enterValue')}}</label>
                                            <input :class="{'form-control': true, invalid: $v.selectedOption.value.$invalid, valid: !$v.selectedOption.value.$invalid}" name="value" id="value" type="text" v-model="selectedOption.value" required/>
                                        </div>
                                        <div :class="{'form-group': true}">
                                            <label>{{$t('vueadminApp.productmsAttribute.additionalCosts')}}</label>
                                            <money v-model="selectedOption.price" class="form-control" name="priceAmount"  v-bind="money"></money>
                                        </div>
                                        <div :class="{'form-group': true}">
                                            <label>{{$t('vueadminApp.productmsAttribute.stock')}}</label>
                                            <input v-model="selectedOption.stock" class="form-control" type="number"/>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-md-12">
                                                <button type="submit" @click.prevent="saveOptionField($event)" :disabled="$v.selectedOption.value.$invalid || ($refs.attrLang && $refs.attrLang.selectedLang.name === '')" class="btn btn-outline-primary mb-2 pull-right ml-2"><span v-if="selectedOption.id > 0">{{$t('entity.action.save')}}</span><span v-else>{{$t('entity.action.saveOption')}}</span></button>
                                                <button type="submit" @click.prevent="backToViewMode($event)" class="btn btn-outline-warning mb-2 pull-right ml-2">{{$t('entity.action.cancel')}}</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <div class="form-buttons-w">
                                <button class="btn btn-outline-primary" @click.prevent="cancel">{{$t('entity.action.cancel')}}</button>
                                <button class="btn btn-primary" @click.prevent="save" :disabled="($refs.featureLang && $refs.featureLang.selectedLang.name === '') || (selectedProductFeature.attributeValues && selectedProductFeature.attributeValues.length === 0)">{{$t('entity.action.save')}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./featuresTab.component.ts"></script>
<style scoped>
    .hr-text {
        line-height: 1em;
        position: relative;
        outline: 0;
        border: 0;
        color: black;
        text-align: center;
        height: 1.5em;
        opacity: .5;
    }
    .hr-text::before {
        content: '';
        background: linear-gradient(to right, transparent, #818078, transparent);
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 1px;
    }
    .hr-text::after {
        content: attr(data-content);
        position: relative;
        display: inline-block;
        color: black;
        padding: 0 .5em;
        line-height: 1.5em;
        color: #818078;
        background-color: #fcfcfa;
    }
    .larger {
        font-size:1.2em;
        color: #909090;
    }
    .element-box {
        padding:0!important;
        padding-top:1em!important;
    }
    a, a:active {
        color:#909090!important;
        background-color: transparent!important;
        border-color: transparent!important;
    }
</style>
