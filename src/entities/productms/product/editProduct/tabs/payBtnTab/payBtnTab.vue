<template>

  <div class="row text-left">
    <div class="col-md-8">
      <div class="tab-form-panel">
        <form>
          <div class="form-row align-items-left mt-3">
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.buttonName')}}</label>
              <input type="text" v-model="payBtn.buttonName" class="form-control">
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.emptyCart')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="payBtn.emptyCart"></toggle-switch>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.shoppingCartLang')}}</label>
              <select v-model="payBtn.shoppingCartLanguage" class="form-control">
                <option v-for="(item, index) in allLangs" :key="index" :value="item.langKey">
                  {{item.name}}
                </option>
              </select>
            </div>
          </div>
          <div class="form-row align-items-left">
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.roundingCorners')}}</label>
              <input type="number" class="form-control" v-model="payBtn.roundCorners"/>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.borderStyle')}}</label>
              <select class="form-control" v-model="payBtn.borderStyle">
                <option value="none">none</option>
                <!--
                <option value="hidden">hidden</option>
                <option value="double">double</option>
                <option value="groove">groove</option>
                <option value="ridge">ridge</option>
                <option value="inset">inset</option>
                <option value="outset">outset</option>
                <option value="initial">initial</option>
                -->
                <option value="dotted">dotted</option>
                <option value="dashed">dashed</option>
                <option value="solid">solid</option>
              </select>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.borderThickness')}}</label>
              <input type="number" class="form-control" v-model="payBtn.borderThickness"/>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.borderColor')}}</label>
              <div class="dropdown">
                <button type="button" class="color-button" data-toggle="dropdown" aria-haspopup="true" :style="{'background-color': payBtn.borderColor, width: '100%'}" aria-expanded="false"/>
                <div class="dropdown-menu" aria-labelledby="dLabel">
                  <form>
                    <chrome-picker :value="colors" @input="updateBorderColor"></chrome-picker>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row align-items-left">
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.font')}}</label>
              <select v-model="selectedFont" class="form-control" @change="changeFont">
                <option v-for="(item, index) in allFonts" :key="index" :value="item.fontName">
                  {{item.fontName}}
                </option>
              </select>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.italic')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="payBtn.italic"></toggle-switch>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.bold')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="payBtn.bold"></toggle-switch>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.fontSize')}}</label>
              <input type="number" class="form-control" v-model="payBtn.fontSize"/>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.fontColor')}}</label>
              <div class="dropdown">
                <button type="button" id="fcBtn" class="color-button" data-toggle="dropdown" aria-haspopup="true" :style="{'background-color': payBtn.fontColor, width: '100%'}" aria-expanded="false"/>
                <div class="dropdown-menu" aria-labelledby="fcBtn">
                  <form>
                    <chrome-picker :value="colors" @input="updateFontColor"></chrome-picker>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row align-items-left">
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.backgroundColor')}}</label>
              <div class="dropdown">
                <button type="button" class="color-button" data-toggle="dropdown" aria-haspopup="true" :style="{'background-color': payBtn.backgroundColor, width: '100%'}" aria-expanded="false"/>
                <div class="dropdown-menu" aria-labelledby="dLabel">
                  <form>
                    <chrome-picker :value="colors" @input="updateBackgroundColor"></chrome-picker>
                  </form>
                </div>
              </div>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.dropShadow')}}</label>

              <select class="form-control" v-model="payBtn.shadowSize">
                <option value="0">none</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
              </select>

<!--
                <input type="number" class="form-control" v-model="payBtn.shadowSize"/>
                -->
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.shadowColor')}}</label>
              <div class="dropdown">
                <button type="button" data-toggle="dropdown" aria-haspopup="true" class="color-button" :style="{'background-color': payBtn.shadowColor, width: '100%'}" aria-expanded="false"/>
                <div class="dropdown-menu" aria-labelledby="dLabel">
                  <form>
                    <chrome-picker :value="colors" @input="updateShadowColor"></chrome-picker>
                  </form>
                </div>
              </div>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.width')}}</label>
              <input type="number" class="form-control" v-model="payBtn.width"/>
            </div>
            <div class="form-group col-auto">
              <label class="control-label">{{$t('labels.height')}}</label>
              <input type="number" class="form-control" v-model="payBtn.height"/>
            </div>
          </div>
          <div class="form-buttons-w text-right">
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
    </div>

    <div class="col-md-4">

      <div class="row">
        <div class="col-md-12">
          <div class="mt-4 text-center">
            <button :style="btnStyle">{{payBtn.buttonName}}</button>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12">
          <p style="margin-bottom:0; padding-bottom:0;">{{$t('labels.embedCode')}}:</p>
          <div class="htmlPreview">
            <div id="embedCode" class="form-control divtext" contenteditable style="min-height: 6em;">
              {{embedCode}}
            </div>
            <div class="row">
              <div class="col-md-12">
                <router-link to="" class="text-primary bold-label" @click.native="copyEmbed()">{{$t('labels.copyToClipboard')}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-12">
          <p style="margin-bottom:0; padding-bottom:0;">{{$t('labels.HTMLcode')}}:</p>
          <div class="htmlPreview">
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

      <div class="row mt-4" v-if="payBtn.fontUrl !== ''">
        <div class="col-md-12">
          <p style="margin-bottom:0; padding-bottom:0;">{{$t('labels.copyPasteCodeToYourCss')}}:</p>
          <div class="htmlPreview">
            <div id="cssRule" class="form-control divtext" contenteditable style="min-height: 6em;">
              <code>@font-face {
                font-family: '{{payBtn.fontName}}';
                src: url('{{payBtn.fontUrl}}') format('woff');
                }</code>
            </div>
            <div class="row">
              <div class="col-md-12">
                <router-link to="" class="text-primary bold-label" @click.native="copyCSS()">{{$t('labels.copyToClipboard')}}</router-link>
              </div>
            </div>
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
      min-height: 10em;
      overflow: auto;
  }
  input[type=number] {
    max-width:100px;
  }
  .form-row {
    margin-top:1.3em;
    margin-bottom:1.3em;
  }
</style>
