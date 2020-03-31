<template>
  <div class="pl-0 pr-0 text-left">
    <div class="col-md-12 pl-0 pr-0">
      <div class="form-group">
        <trumbowyg v-model="selectedContent" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
      </div>
    </div>
    <div class="col-md-12 pl-0 pr-0" style="margin-top:5px">
      <div class="btn-group">
                <span :key="index" to="" v-for="(lang, index) in allAvailableLanguages" @click="changeLang(lang)"
                      :class="{btn: true, 'btn-outline-primary': true, 'ml-0': true, 'btn-small btn-rounded': true,
                      'active': selectedLang.langKey === lang.langKey}">
              <span style="font-size:0.8em">
                <img :src="`./assets/images/flags/${lang.langKey}.png`"/>
              </span>
                    <i class="fa fa-check" v-if="checkIfHasValue(lang)"></i>
                </span>
      </div>
      <div class="float-right">
        <button v-if="allAvailableLanguages.length > 1" class="btn btn-danger btn-sm" @click.prevent="removeLang"
                type="button"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./multiLanguageHtmlEditor.component.ts"></script>
