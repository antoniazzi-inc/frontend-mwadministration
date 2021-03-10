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
   <div class="row">
     <div class="col-6 text-left">
       <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
         <h2 v-if="!helpContent.id" v-text="$t('labels.newHelpMaterial')" >Create or edit a HelpContent</h2>
         <h2 v-else v-text="$t('labels.editHelpMaterial')" >Create or edit a HelpContent</h2>
         <div>
           <div class="form-group">
             <label class="form-control-label" v-text="$t('labels.fieldCode')">Field Code</label>
             <input type="text" class="form-control" name="fieldCode" v-model="helpContent.fieldCode" />
           </div>
           <div class="form-group">
             <label class="form-control-label" v-text="$t('labels.screenCode')" for="help-content-screenCode"></label>
             <input type="text" class="form-control" name="screenCode" id="help-content-screenCode"
                    v-model="helpContent.screenCode"/>
           </div>
           <div class="form-group">
             <label class="form-control-label" v-text="$t('labels.tabCode')" for="help-content-tabCode"></label>
             <input type="text" class="form-control" name="tabCode" id="help-content-tabCode" v-model="helpContent.tabCode" />
           </div>
           <div class="form-group">
             <label class="form-control-label" v-text="$t('labels.popupCode')" for="help-content-popupCode"></label>
             <input type="text" class="form-control" name="popupCode" id="help-content-popupCode"
                    v-model="helpContent.popupCode" />
           </div>
           <div class="form-group">
             <label class="form-control-label" v-text="$t('labels.helpType')" for="help-content-helpType"></label>
             <select :class="{'form-control': true, invalid: errors.has('helpType')}" name="helpType"
                     v-validate="'required'" v-model="helpContent.helpType" id="help-content-helpType">
               <option value="SCREEN" v-bind:label="$t('enums.SCREEN')">SCREEN</option>
               <option value="FIELD" v-bind:label="$t('enums.FIELD')">FIELD</option>
               <option value="POPUP" v-bind:label="$t('enums.POPUP')">POPUP</option>
               <option value="TUTORIAL" v-bind:label="$t('enums.TUTORIAL')">TUTORIAL</option>
               <option value="WIZARD" v-bind:label="$t('enums.WIZARD')">WIZARD</option>
               <option value="ONBOARDING" v-bind:label="$t('enums.ONBOARDING')">ONBOARDING</option>
               <option value="BACKGROUND" v-bind:label="$t('enums.BACKGROUND')">BACKGROUND</option>
               <option value="OTHER" v-bind:label="$t('enums.OTHER')">OTHER</option>
             </select>
             <span class="text-danger small">{{errors.first('helpType')}}</span>
           </div>

           <div class="form-group">
             <label v-text="$t('labels.category')"></label>
              <searchable-select-component :config="searchableConfig"
                                           :options="helpCategories"
                                           :value="selectedHelpCategory"
                                           @onCreate="addHelpCategory"
                                           @onChange="addHelpCategory"
                                           @onDelete="removeHelpCategory"></searchable-select-component>
           </div>
           <div class="form-group">
             <label v-text="$t('labels.tag')">Tag</label>
             <searchable-select-component :config="searchableConfigTags"
                                          :options="helpTags"
                                          :value="selectedHelpTag"
                                          @onCreate="addHelpTag"
                                          @onChange="addHelpTag"
                                          @onDelete="removeHelpTag"></searchable-select-component>
           </div>

         </div>
         <div class="text-right">
           <button type="button" id="cancel-save" class="btn btn-secondary mr-2" v-on:click="cancel()">
             <span v-text="$t('buttons.cancel')">Cancel</span>
           </button>
           <button type="submit" id="save-entity" class="btn btn-primary">
             <span v-text="$t('buttons.save')">Save</span>
           </button>
         </div>
       </form>
     </div>
     <div class="col-md-6 text-left">
       <div class="form-group">
         <multi-language-component
           :config="multiLangConfig"
           :value="helpContent.helpContentLanguages"
           @onAdd="addNewHelpMaterialLanguage"
           @onChange="changeNewHelpMaterialLanguage"
           @onRemove="removeHelpMaterialLanguage"></multi-language-component>
       </div>
       <div class="form-group">
         <label class="form-control-label">{{$t('labels.content')}}</label>
         <MultiLanguageHtmlEditorComponent
           :availableLangs="availableLangs"
           :content.sync="helpContentText"
           @contentChanged="updateHelpContent"></MultiLanguageHtmlEditorComponent>
       </div>
     </div>
   </div>
  </div>
</template>
<script type="ts" src="./newHelpMaterial.component.ts"></script>
