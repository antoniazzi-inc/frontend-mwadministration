<template>
    <div class="row text-left">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <div class="form-desc">{{$t('labels.productPayButtonSettings')}}</div>
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.emptyCart')}}</label>
                            <toggle-switch
                                :on-text="$t('labels.yes')"
                                :off-text="$t('labels.no')"
                                :value.sync="payBtn.emptyCart"></toggle-switch>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.buttonName')}}</label>
                            <input type="text" v-model="payBtn.buttonName" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.shoppingCartLang')}}</label>
                            <select v-model="payBtn.shoppingCartLanguage" class="form-control">
                                <option v-for="(item, index) in allLangs" :key="index" :value="item.langKey">
                                    {{item.name}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.font')}}</label>
                            <select v-model="selectedFont" class="form-control" @change="changeFont">
                                <option v-for="(item, index) in allFonts" :key="index" :value="item.fontName">
                                    {{item.fontName}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                          <div class="dropdown">
                            <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true"
                                    :style="{'background-color': payBtn.fontColor, width: '100%'}" aria-expanded="false">
                              {{$t('labels.fontColor')}}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dLabel">
                              <form>
                                <chrome-picker :value="colors" @input="updateFontColor"></chrome-picker>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.fontSize')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.fontSize"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.italic')}}</label>
                          <toggle-switch
                            :on-text="$t('labels.yes')"
                            :off-text="$t('labels.no')"
                            :value.sync="payBtn.italic"></toggle-switch>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.bold')}}</label>
                          <toggle-switch
                            :on-text="$t('labels.yes')"
                            :off-text="$t('labels.no')"
                            :value.sync="payBtn.bold"></toggle-switch>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <div class="row">
                                <div class="col-md-6">
                                  <div class="dropdown">
                                    <button type="button" data-toggle="dropdown" aria-haspopup="true"
                                            :style="{'background-color': payBtn.backgroundColor, width: '100%'}" aria-expanded="false">
                                      {{$t('labels.backgroundColor')}}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dLabel">
                                      <form>
                                        <chrome-picker :value="colors" @input="updateBackgroundColor"></chrome-picker>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="dropdown">
                                    <button type="button" data-toggle="dropdown" aria-haspopup="true"
                                            :style="{'background-color': payBtn.shadowColor, width: '100%'}" aria-expanded="false">
                                      {{$t('labels.shadowColor')}}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dLabel">
                                      <form>
                                        <chrome-picker :value="colors" @input="updateShadowColor"></chrome-picker>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.borderThickness')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.borderThickness"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.borderStyle')}}</label>
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
                          <div class="dropdown">
                            <button type="button" data-toggle="dropdown" aria-haspopup="true"
                                    :style="{'background-color': payBtn.borderColor, width: '100%'}" aria-expanded="false">
                              {{$t('labels.borderColor')}}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dLabel">
                              <form>
                                <chrome-picker :value="colors" @input="updateBorderColor"></chrome-picker>
                              </form>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.width')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.width"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.height')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.height"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.roundingCorners')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.roundCorners"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="control-label">{{$t('labels.dropShadow')}}</label>
                            <input type="number" class="form-control" v-model="payBtn.shadowSize"/>
                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="element-wrapper col-md-3">
            <div class="element-box h-100">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-desc">{{$t('labels.buttonPreview')}}</div>
                            <div class="mt-4 text-center">
                                <button :style="btnStyle">{{payBtn.buttonName}}</button>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5 h-50">
                        <div class="col-md-12">
                            <div class="form-desc">{{$t('labels.HTMLcode')}}</div>
                            <div class="htmlPreview h-100">
                                <div id="payBtnHtml" class="form-control divtext" contenteditable>
                                    {{htmlContent}}
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <router-link to="" class="text-primary bold-label" @click.native="copyHTML()">{{$t('labels.copyToClipboard')}}</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="row mt-5" v-if="payBtn.fontUrl !== ''">
                    <div class="col-md-12">
                        <div class="form-desc">{{$t('labels.copyPasteCodeToYourCss')}}</div>
                        <div id="cssRule">
                            <code>@font-face {
                                    font-family: '{{payBtn.fontName}}';
                                    src: url('{{payBtn.fontUrl}}') format('woff');
                                }</code>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <router-link to="" class="text-primary bold-label" @click.native="copyCSS()">{{$t('labels.copyToClipboard')}}</router-link>
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
