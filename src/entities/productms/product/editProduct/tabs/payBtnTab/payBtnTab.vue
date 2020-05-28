<template>
    <div class="row">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <div class="form-desc">{{$t('productPayButtonSettings')}}</div>
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('emptyCart')}}</label>
                            <toggle-switch
                                :on-text="$t('global.yes')"
                                :off-text="$t('global.no')"
                                :value.sync="payBtn.emptyCart"></toggle-switch>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('buttonName')}}</label>
                            <input type="text" v-model="payBtn.buttonName" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('shoppingCartLang')}}</label>
                            <select v-model="payBtn.shoppingCartLanguage" class="form-control">
                                <option v-for="(item, index) in allLangs" :key="index" :value="item.langKey">
                                    {{item.name}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('font')}}</label>
                            <select v-model="selectedFont" class="form-control" @change="changeFont">
                                <option v-for="(item, index) in allFonts" :key="index" :value="item.fontName">
                                    {{item.fontName}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('fontColor')}}</label>
                            <br/>
                            <b-dropdown id="ddown1" :style="{background: payBtn.fontColor, width: '30%'}" variant="link" text="" class="m-md-2 m-4 border" no-caret right>
                                <b-form-group @click.native.stop="" label="" label-for="dropdown-form-email">
                                    <chrome-picker :value="colors" @input="updateFontColor"></chrome-picker>
                                </b-form-group>
                            </b-dropdown>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('fontSize')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.fontSize"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('italic')}}</label>
                            <input type="checkbox" v-model="payBtn.italic"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('bold')}}</label>
                            <input type="checkbox" v-model="payBtn.bold"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <div class="row">
                                <div class="col-md-6">
                                    <label class="control-label">{{$t('backgroundColor')}}</label>
                                    <br/>
                                    <b-dropdown id="ddown1" :style="{background: payBtn.backgroundColor, width: '100%'}" variant="link" text="" class="m-md-2 m-4 border" no-caret right>
                                        <b-form-group @click.native.stop="" label="" label-for="dropdown-form-email">
                                            <chrome-picker :value="colors" @input="updateBackgroundColor"></chrome-picker>
                                        </b-form-group>
                                    </b-dropdown>
                                </div>
                                <div class="col-md-6">
                                    <label class="control-label">{{$t('shadowColor')}}</label>
                                    <br/>
                                    <b-dropdown id="ddown1" :style="{background: payBtn.shadowColor, width: '100%'}" variant="link" text="" class="m-md-2 m-4 border" no-caret right>
                                        <b-form-group @click.native.stop="" label="" label-for="dropdown-form-email">
                                            <chrome-picker :value="colors" @input="updateBackgroundColor"></chrome-picker>
                                        </b-form-group>
                                    </b-dropdown>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('borderThickness')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.borderThickness"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('borderStyle')}}</label>
                            <select class="form-control" v-model="payBtn.borderStyle">
                                <option value="none">none</option>
                                <option value="hidden">hidden</option>
                                <option value="dotted">dotted</option>
                                <option value="dashed">dashed</option>
                                <option value="solid">solid</option>
                                <option value="double">double</option>
                                <option value="groove">groove</option>
                                <option value="ridge">ridge</option>
                                <option value="inset">inset</option>
                                <option value="outset">outset</option>
                                <option value="initial">initial</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('borderColor')}}</label>
                            <br/>
                            <b-dropdown id="ddown1" :style="{background: payBtn.borderColor, width: '100%'}" variant="link" text="" class="m-md-2 m-4 border" no-caret right>
                                <b-form-group @click.native.stop="" label="" label-for="dropdown-form-email">
                                    <chrome-picker :value="colors" @input="updateBorderColor"></chrome-picker>
                                </b-form-group>
                            </b-dropdown>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('width')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.width"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('height')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.height"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('roundingCorners')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.roundCorners"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('dropShadow')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.shadowSize"/>
                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" @click.prevent="save">{{$t('save')}}</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="element-wrapper col-md-3">
            <div class="element-box h-100">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-desc">{{$t('buttonPreview')}}</div>
                            <div class="mt-4 text-center">
                                <button :style="btnStyle">{{payBtn.buttonName}}</button>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5 h-50">
                        <div class="col-md-12">
                            <div class="form-desc">{{$t('HTML code')}}</div>
                            <div class="htmlPreview h-100">
                                <div id="payBtnHtml" class="form-control divtext" contenteditable>
                                    {{htmlContent}}
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <router-link to="" class="text-primary bold-label" @click.native="copyHTML()">{{$t('copyToClipboard')}}</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="row mt-5" v-if="payBtn.fontUrl !== ''">
                    <div class="col-md-12">
                        <div class="form-desc">{{$t('copyPasteCodeToYourCss')}}</div>
                        <div id="cssRule">
                            <code>@font-face {
                                    font-family: '{{payBtn.fontName}}';
                                    src: url('{{payBtn.fontUrl}}') format('woff');
                                }</code>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <router-link to="" class="text-primary bold-label" @click.native="copyCSS()">{{$t('copyToClipboard')}}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./payBtnTab.component.ts"></script>
<style scoped>
    .htmlPreview textarea{
        height: inherit!important;
        overflow: hidden;
    }
    .htmlPreview i{
        position: absolute;
        top: 0;
        right: 0;
    }
    .divtext {
        border: ridge 2px;
        padding: 5px;
        min-height: 17em;
        overflow: auto;
    }
</style>
