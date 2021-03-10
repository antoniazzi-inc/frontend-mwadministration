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
  <div class="pl-0 pr-0 text-left">
    <div class="col-md-12 pl-0 pr-0 form-group">
      <trumbowyg v-model="selectedContent" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
    </div>
    <div class="col-md-12 pl-0 pr-0 mlbtns" style="margin-top:5px">
      <div class="btn-group" v-if="availableLangs">
                <span :key="index" to="" v-for="(lang, index) in allAvailableLanguages" @click="changeLang(lang)"
                      :class="{btn: true, 'btn-outline-primary ml-0 btn-small btn-rounded': true,
                      'active': selectedLang.langKey === lang.langKey}">
                    <span style="font-size:0.8em">
                 <img class="img-fluid" :src="`./assets/images/flags/${lang.langKey}.png`"/>
                      <i class="ml-1 fa fa-check" v-if="checkIfHasValue(lang.langKey)"></i>
              </span>
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
<style scoped>
  .mlbtns .btn-group > .btn-outline-primary {
    border: solid 1px #d0d0d0;
    background-color: #f2f4f8;
    border-left: 0px;
  }
  .mlbtns .btn-group > .btn-outline-primary.active {
    background-color: #007bff;
  }
</style>
