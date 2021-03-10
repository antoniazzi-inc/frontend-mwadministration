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
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
          <h2 v-text="$t('labels.newHelpTag')"></h2>
          <div>
            <div class="form-group">
              <multi-language-component
                :config="multiLangConfig"
                :value="helpTagLanguages"
                @onAdd="addNewHelpTagLanguage"
                @onChange="changeNewHelpTagLanguage"
                @onRemove="removeHelpTagLanguage"></multi-language-component>
            </div>
            <div class="form-group col-md-4 p-0 m-0 text-left">
              <label class="form-control-label">{{$t('labels.color')}}</label><br/>
              <div class="dropdown">
                <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true"
                        :style="{'background-color': helpTag.color, width: '100%', height: '20px'}" aria-expanded="false"> &nbsp;
                </button>
                <div class="dropdown-menu" aria-labelledby="dLabel">
                  <form>
                    <chrome-picker :value="colors" @input="updateColor"></chrome-picker>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <button type="button" id="cancel-save" class="btn btn-secondary mr-2" v-on:click="cancel()">
                <span v-text="$t('buttons.cancel')">Cancel</span>
              </button>
              <button type="submit" id="save-entity" :disabled="helpTagLanguages.length > 0 && helpTagLanguages[0].name === ''" class="btn btn-primary ml-2">
                <span v-text="$t('buttons.save')">Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./newHelpTag.component.ts"></script>
