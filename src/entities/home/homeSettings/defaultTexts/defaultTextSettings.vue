<template>
  <form v-if="config">
    <div class="form-row mt-3">
      <div class="col">
        <label>{{$t('labels.font')}}</label>
        <searchable-select-component :config="searchableConfigFonts"
                                     :options="allFonts"
                                     :value="config.font"
                                     @onChange="fontChanged"
                                     @onSelected="fontChanged"
                                     @onDelete="fontRemoved"
        ></searchable-select-component>
      </div>
    </div>
    <div class="form-row mt-3">
      <div class="col">
        <label class="form-control-label">{{$t('labels.backgroundColor')}}</label><br/>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true"
                   :style="{'background-color': config.backgroundColor, width: '100%', height: '20px'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateBackgroundColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
      <div class="col">
        <label class="form-control-label">{{$t('labels.borderColor')}}</label><br/>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true"
                   :style="{'background-color': config.borderColor, width: '100%', height: '20px'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateBorderColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
    </div>
    <h5 class="mt-4">{{$t('labels.header')}}</h5>
    <hr/>
    <div class="form-row mt-3">
      <div class="col">
        <label>{{$t('labels.fontSize')}}</label>
        <input type="number" min="0" v-validate="'min_value:0'" name="headerFont"
               :class="{'form-control': true, invalid: errors.has('headerFont')}"
               v-model="config.header.fontSize"/>
        <span class="text-danger small">{{errors.first('headerFont')}}</span>
      </div>
      <div class="col">
        <label>{{$t('labels.fontColor')}}</label>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true"
                   :style="{'background-color': config.header.color, width: '100%', height: '20px'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateHeaderFontColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="form-row mt-3">
      <div class="col">
        <label>{{$t('labels.alignment')}}</label>
        <select class="form-control" v-model="config.header.textAlign">
          <option value="left">{{$t('labels.left')}}</option>
          <option value="center">{{$t('labels.center')}}</option>
          <option value="right">{{$t('labels.right')}}</option>
          <option value="justify">{{$t('labels.justify')}}</option>
        </select>
      </div>
      <div class="col">
        <label>{{$t('labels.fontWeight')}}</label>
        <select class="form-control" v-model="config.header.fontWeight">
          <option value="normal">{{$t('labels.normal')}}</option>
          <option value="bold">{{$t('labels.bold')}}</option>
          <option value="bolder">{{$t('labels.bolder')}}</option>
          <option value="lighter">{{$t('labels.lighter')}}</option>
        </select>
      </div>
      <div class="col">
        <label>{{$t('labels.fontStyle')}}</label>
        <select class="form-control" v-model="config.header.fontStyle">
          <option value="normal">{{$t('labels.normal')}}</option>
          <option value="italic">{{$t('labels.italic')}}</option>
          <option value="oblique">{{$t('labels.oblique')}}</option>
        </select>
      </div>
    </div>
    <h5 class="mt-4">{{$t('labels.text')}}</h5>
    <hr/>
    <div class="form-row">
      <div class="col">
        <label>{{$t('labels.fontSize')}}</label>
        <input type="number" min="0" v-validate="'min_value:0'" name="textFont"
               :class="{'form-control': true, invalid: errors.has('textFont')}"
               v-model="config.text.fontSize"/>
        <span class="text-danger small">{{errors.first('textFont')}}</span>
      </div>
      <div class="col">
        <label>{{$t('labels.fontColor')}}</label>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true"
                   :style="{'background-color': config.text.color, width: '100%', height: '20px'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateTextFontColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
      <div class="col">
        <label>{{$t('labels.alignment')}}</label>
        <select class="form-control" v-model="config.text.textAlign">
          <option value="left">{{$t('labels.left')}}</option>
          <option value="center">{{$t('labels.center')}}</option>
          <option value="right">{{$t('labels.right')}}</option>
          <option value="justify">{{$t('labels.justify')}}</option>
        </select>
      </div>
    </div>
    <h5 class="mt-4">{{$t('labels.footer')}}</h5>
    <hr/>
    <div class="form-row">
      <div class="col">
        <label>{{$t('labels.fontSize')}}</label>
        <input type="number" min="0" v-validate="'min_value:0'" name="footerFont"
               :class="{'form-control': true, invalid: errors.has('footerFont')}"
               v-model="config.footer.fontSize"/>
        <span class="text-danger small">{{errors.first('footerFont')}}</span>
      </div>
      <div class="col">
        <label>{{$t('labels.fontColor')}}</label>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true"
                   :style="{'background-color': config.footer.color, width: '100%', height: '20px'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateFooterFontColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <label>{{$t('labels.alignment')}}</label>
        <select class="form-control" v-model="config.footer.textAlign">
          <option value="left">{{$t('labels.left')}}</option>
          <option value="center">{{$t('labels.center')}}</option>
          <option value="right">{{$t('labels.right')}}</option>
          <option value="justify">{{$t('labels.justify')}}</option>
        </select>
      </div>
      <div class="col">
        <label>{{$t('labels.backgroundColor')}}</label>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true"
                   :style="{'background-color': config.footer.backgroundColor, width: '100%', height: '20px'}" aria-expanded="false"> &nbsp;
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
    <div class="form-row">
      <div class="col">
        <label>{{$t('labels.borderRadius')}}</label>
        <input type="number" min="0" v-validate="'min_value:0'" name="borderRadius"
               :class="{'form-control': true, invalid: errors.has('borderRadius')}"
               v-model="config.buttons.borderRadius"/>
        <span class="text-danger small">{{errors.first('borderRadius')}}</span>
      </div>
      <div class="col">
        <label>{{$t('labels.fontWeight')}}</label>
        <select class="form-control" v-model="config.buttons.fontWeight">
          <option value="normal">{{$t('labels.normal')}}</option>
          <option value="bold">{{$t('labels.bold')}}</option>
          <option value="bolder">{{$t('labels.bolder')}}</option>
          <option value="lighter">{{$t('labels.lighter')}}</option>
        </select>
      </div>
      <div class="col">
        <label>{{$t('labels.buttonSize')}}</label>
        <select class="form-control" v-model="config.buttons.buttonSize">
          <option value="small">{{$t('labels.small')}}</option>
          <option value="medium">{{$t('labels.medium')}}</option>
          <option value="large">{{$t('labels.large')}}</option>
        </select>
      </div>
      <div class="col">
        <label>{{$t('labels.backgroundColor')}}</label>
        <div class="dropdown col-md-12">
          <button  type="button" data-toggle="dropdown" aria-haspopup="true"
                   :style="{'background-color': config.buttons.backgroundColor, width: '100%', height: '20px'}" aria-expanded="false"> &nbsp;
          </button>
          <div class="dropdown-menu" aria-labelledby="dLabel">
            <form>
              <chrome-picker :value="colors" @input="updateButtonsBackgroundColor"></chrome-picker>
            </form>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script type="ts" src="./defaultTextSettings.component.ts"></script>
