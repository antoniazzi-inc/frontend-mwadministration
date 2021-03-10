<!--
  - /*
  -  * Copyright 2018-2021 Antoniazzi Holding BV
  -  *
  -  * This program is free software: you can redistribute it and/or modify it
  -  * under the terms of the GNU General Public License as published by
  -  * the Free Software Foundation, either version 3 of the License,
  -  * or (at your option) any later version.
  -  *
  -  * This program is distributed in the hope that it will be useful,
  -  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  -  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  -  * GNU General Public License for more details.
  -  *
  -  * You should have received a copy of the GNU General Public License
  -  * along with this program. If not, see <https://www.gnu.org/licenses/>.
  -  */
  -->

<template>
  <form v-if="config">
    <div class="form-row mt-3">
      <div class="col">
        <button class="btn btn-outline-info" @click.prevent.stop="copyConfig">{{$t('buttons.copy')}}</button>
        <button class="btn ml-3 btn-outline-success" @click.prevent.stop="pasteConfig">{{$t('buttons.paste')}}</button>
      </div>
    </div>
    <h5 class="mt-5">{{$t('labels.text')}}</h5>
    <hr/>
    <div class="form-row align-items-left mt-3">
      <div class="form-group col-auto">
        <label>{{$t('labels.font')}}</label>
        <searchable-select-component :config="searchableConfigFonts"
                                     :options="allFonts"
                                     :value="config.font"
                                     @onChange="fontChanged"
                                     @onSelected="fontChanged"
                                     @onDelete="fontRemoved"
        ></searchable-select-component>
      </div>
      <div class="form-group col-auto">
        <label class="form-control-label">{{$t('labels.backgroundColor')}}</label><br/>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true" class="color-button mt-1"
                   :style="{'background-color': config.backgroundColor, width: '100%'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateBackgroundColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.fontSize')}}</label>
        <input type="number" min="0" v-validate="'min_value:0'" name="textFont"
               :class="{'form-control': true, invalid: errors.has('textFont'), 'mt-1': true}"
               v-model="config.text.fontSize"/>
        <span class="text-danger small">{{errors.first('textFont')}}</span>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.fontColor')}}</label>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true" class="color-button mt-1"
                   :style="{'background-color': config.text.color, width: '100px'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateTextFontColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.alignment')}}</label>
        <select class="form-control mt-1" v-model="config.text.textAlign">
          <option value="left">{{$t('labels.left')}}</option>
          <option value="center">{{$t('labels.center')}}</option>
          <option value="right">{{$t('labels.right')}}</option>
          <option value="justify">{{$t('labels.justify')}}</option>
        </select>
      </div>
    </div>
    <h5 class="mt-4">{{$t('labels.header')}}</h5>
    <hr/>
    <div class="form-row align-items-left mt-3">
      <div class="form-group col-auto">
        <label>{{$t('labels.fontSize')}}</label>
        <input type="number" min="0" v-validate="'min_value:0'" name="headerFont"
               :class="{'form-control': true, invalid: errors.has('headerFont')}"
               v-model="config.header.fontSize"/>
        <span class="text-danger small">{{errors.first('headerFont')}}</span>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.fontColor')}}</label>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true" class="color-button"
                   :style="{'background-color': config.header.color, width: '100px'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateHeaderFontColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.alignment')}}</label>
        <select class="form-control" v-model="config.header.textAlign">
          <option value="left">{{$t('labels.left')}}</option>
          <option value="center">{{$t('labels.center')}}</option>
          <option value="right">{{$t('labels.right')}}</option>
          <option value="justify">{{$t('labels.justify')}}</option>
        </select>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.fontWeight')}}</label>
        <select class="form-control" v-model="config.header.fontWeight">
          <option value="normal">{{$t('labels.normal')}}</option>
          <option value="bold">{{$t('labels.bold')}}</option>
          <option value="bolder">{{$t('labels.bolder')}}</option>
          <option value="lighter">{{$t('labels.lighter')}}</option>
        </select>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.fontStyle')}}</label>
        <select class="form-control" v-model="config.header.fontStyle">
          <option value="normal">{{$t('labels.normal')}}</option>
          <option value="italic">{{$t('labels.italic')}}</option>
          <option value="oblique">{{$t('labels.oblique')}}</option>
        </select>
      </div>
    </div>
    <h5 class="mt-4">{{$t('labels.footer')}}</h5>
    <hr/>
    <div class="form-row align-items-left mt-3">
      <div class="form-group col-auto">
        <label>{{$t('labels.fontSize')}}</label>
        <input type="number" min="0" v-validate="'min_value:0'" name="footerFont"
               :class="{'form-control': true, invalid: errors.has('footerFont')}"
               v-model="config.footer.fontSize"/>
        <span class="text-danger small">{{errors.first('footerFont')}}</span>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.fontColor')}}</label>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true" class="color-button"
                   :style="{'background-color': config.footer.color, width: '100%'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateFooterFontColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.alignment')}}</label>
        <select class="form-control" v-model="config.footer.textAlign">
          <option value="left">{{$t('labels.left')}}</option>
          <option value="center">{{$t('labels.center')}}</option>
          <option value="right">{{$t('labels.right')}}</option>
          <option value="justify">{{$t('labels.justify')}}</option>
        </select>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.backgroundColor')}}</label>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true" class="color-button"
                   :style="{'background-color': config.footer.backgroundColor, width: '100%'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateFooterBackgroundColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
    </div>
    <h5 class="mt-4">{{$t('labels.buttons')}}</h5>
    <hr/>
    <div class="form-row align-items-left mt-3">
      <div class="form-group col-auto">
        <label>{{$t('labels.borderRadius')}}</label>
        <input type="number" min="0" v-validate="'min_value:0'" name="borderRadius"
               :class="{'form-control': true, invalid: errors.has('borderRadius')}"
               v-model="config.buttons.borderRadius"/>
        <span class="text-danger small">{{errors.first('borderRadius')}}</span>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.fontWeight')}}</label>
        <select class="form-control" v-model="config.buttons.fontWeight">
          <option value="normal">{{$t('labels.normal')}}</option>
          <option value="bold">{{$t('labels.bold')}}</option>
          <option value="bolder">{{$t('labels.bolder')}}</option>
          <option value="lighter">{{$t('labels.lighter')}}</option>
        </select>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.buttonSize')}}</label>
        <select class="form-control" v-model="config.buttons.buttonSize">
          <option value="small">{{$t('labels.small')}}</option>
          <option value="medium">{{$t('labels.medium')}}</option>
          <option value="large">{{$t('labels.large')}}</option>
          <option value="extralarge">{{$t('labels.extralarge')}}</option>
        </select>
      </div>
      <div class="form-group col-auto">
        <label>{{$t('labels.backgroundColor')}}</label>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true" class="color-button"
                   :style="{'background-color': config.buttons.backgroundColor, width: '100%'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateButtonsBackgroundColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
      <div class="form-group col-auto">
        <label class="form-control-label">{{$t('labels.ButtonForegroundColor')}}</label><br/>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true" class="color-button"
                   :style="{'background-color': config.buttonForegroundColor, width: '100%'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateBorderColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script type="ts" src="./defaultTextSettings.component.ts"></script>

<style scoped>
  input[type=number] {
    max-width:100px;
  }
  .form-row {
    margin-top:1.3em;
    margin-bottom:1.3em;
  }
</style>
