<template>
  <div class="container-fluid">
    <div class="row text-left">

      <div class="col-md-4" style="padding-right:2em;">
        <p style="margin-top:1em; margin-bottom:0.4em;" class="text-center">Select a text (category) below</p>
        <div class="panel-group search-banner" id="accordion">
          <template v-for="(item, ind) in defaultTexts">
            <div class="panel panel-default text-accordean" :key="`${ind}_card`">
              <div class="panel-heading" @click="clickedTab === item.categoryId ? clickedTab = '' : clickedTab=item.categoryId">
                <h5 class="panel-title" data-toggle="collapse" :data-target="`#collapse_${ind}`">
                  {{$t(item.categoryName)}}
                </h5>
              </div>
              <div :id="`#collapse_${ind}_heading`" :class="{'panel-collapse': true, 'collapse': clickedTab === item.categoryId ? false : true}">
                <div class="panel-body">
                  <ul class="sub-menu">
                    <template v-for="(text, index) in item.texts">
                      <li :key="index">
                        <a class="text-entry-link" :class="{'item-selected': selectedText && selectedText.settingsKey === text.settingsKey}" @click="chooseText(text)" :key="index"><span>{{$t(text.name)}}</span></a>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="col-md-8 search-banner" v-if="selectedText && selectedText.type" style="margin-top:46px; padding:1em;">
        <div v-if="selectedText.type === 'email' || selectedText.type === 'htmlPage'">
          <h4>{{$t(selectedText.name)}}</h4>
          <ul class="nav nav-tabs mt-2" id="myTab" role="tablist">
            <li class="nav-item" @click="currentTab = 'values'">
              <a :class="{'nav-link': true, 'active': currentTab === 'values'}" id="values-tab" data-toggle="tab"
                 href="#values" role="tab" aria-controls="values" aria-selected="true">{{$t('labels.values')}}</a>
            </li>
            <li class="nav-item" @click="currentTab = 'settings'">
              <a :class="{'nav-link': true, 'active': currentTab === 'settings'}" id="settings-tab" data-toggle="tab"
                 href="#settings" role="tab" aria-controls="settings"
                 aria-selected="false">{{$t('labels.settings')}}</a>
            </li>
            <li class="nav-item" @click="currentTab = 'preview'">
              <a :class="{'nav-link': true, 'active': currentTab === 'preview'}" id="preview-tab" data-toggle="tab"
                 href="#preview" role="tab" aria-controls="preview" aria-selected="false">{{$t('labels.preview')}}</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div :class="{'tab-pane': true, active: currentTab === 'values'}" id="values" role="tabpanel"
                 aria-labelledby="values-tab">
              <div class="form-group text-left mt-3"  v-if="selectedText.type === 'email'">
                <label v-text="$t('labels.emailTemplate')"></label>
                <searchable-select-component :config="searchableConfig"
                                             :options="emailTemplates"
                                             :value="selectedEmailTemplate"
                                             @onChange="emailTemplateChanged"
                                             @onSelected="emailTemplateChanged"
                                             @onDelete="emailTemplateRemoved"
                ></searchable-select-component>
              </div>
              <div class="form-group text-left mt-3"  v-if="selectedText.type === 'htmlPage'">
                <label v-text="$t('labels.htmlPageTemplate')"></label>
                <searchable-select-component :config="searchableConfigHtml"
                                             :options="htmlPageTemplates"
                                             :value="selectedHtmlPageTemplate"
                                             @onChange="htmlPageTemplateChanged"
                                             @onSelected="htmlPageTemplateChanged"
                                             @onDelete="htmlPageTemplateRemoved"
                ></searchable-select-component>
              </div>
              <div v-if="selectedText.type === 'email'">
                <multi-language-component
                  :config="multiLangConfig"
                  :value="emailText.subject"
                  @onAdd="addNewEmailSubject"
                  @onChange="changeNewEmailSubject"
                  @onRemove="removeNewEmailSubject"></multi-language-component>
                <div v-if="selectedEmailTemplate && selectedEmailTemplate.items">
                  <div class="form-group" v-for="(item, ind) in selectedEmailTemplate.items" :key="ind">
                    <label>{{$t(item.name)}}</label>
                    <input type="text" v-model="emailText.value[item.id]" class="form-control"
                           v-if="item.component === 'textInput'"/>
                    <multi-language-component
                      v-if="item.component === 'multiLang'"
                      :config="multiLangConfigText"
                      :value="emailText.value[item.id]"
                      @onAdd="addNewButtonOrHeaderText($event, 'emailText', item.id)"
                      @onChange="changeNewButtonOrHeaderText($event, 'emailText', item.id)"
                      @onRemove="removeNewButtonOrHeaderText($event, 'emailText', item.id)"/>
                    <MultiLanguageHtmlEditorComponent v-if="item.component === 'htmlEditor'"
                                                      :availableLangs="availableLangs"
                                               :content.sync="emailText.value[item.id]"
                                               @contentChanged="emailTextTemplateChanged(item.id, ...arguments)"></MultiLanguageHtmlEditorComponent>
                  </div>
                </div>
              </div>
              <div v-if="selectedText.type === 'htmlPage'">
                <multi-language-component
                  :config="multiLangConfig"
                  :value="htmlPage.subject"
                  @onAdd="addNewHtmlPageSubject"
                  @onChange="changeNewHtmlPageSubject"
                  @onRemove="removeNewHtmlPageSubject"></multi-language-component>
                <div v-if="selectedHtmlPageTemplate && selectedHtmlPageTemplate.items">
                  <div class="form-group" v-for="(item, ind) in selectedHtmlPageTemplate.items" :key="ind">
                    <label>{{$t(item.name)}}</label>
                    <input type="text" v-model="htmlPage.value[item.id]" class="form-control"
                           v-if="item.component === 'textInput'"/>
                    <multi-language-component
                      v-if="item.component === 'multiLang'"
                      :config="multiLangConfigText"
                      :value="emailText.value[item.id]"
                      @onAdd="addNewButtonOrHeaderText($event, 'htmlPage', item.id)"
                      @onChange="changeNewButtonOrHeaderText($event, 'htmlPage', item.id)"
                      @onRemove="removeNewButtonOrHeaderText($event, 'htmlPage', item.id)"/>
                    <MultiLanguageHtmlEditorComponent v-if="item.component === 'htmlEditor'"
                                               :content.sync="htmlPage.value[item.id]"
                                                      :availableLangs="availableLangs"
                                               @contentChanged="htmlPageTextTemplateChanged(item.id, ...arguments)"></MultiLanguageHtmlEditorComponent>
                  </div>
                </div>
              </div>
              <default-texts-social-component v-if="selectedEmailTemplate && selectedEmailTemplate.id === 'mjml-fa' ||
              selectedEmailTemplate && selectedEmailTemplate.id === 'mjml-fm'" @onUpdate="updateSocialMedia" :value="emailText"/>
              <default-texts-social-component v-if="selectedHtmlPageTemplate
              && selectedHtmlPageTemplate.id === 'mjml-page-f' && !(selectedEmailTemplate && selectedEmailTemplate.id === 'mjml-fa' ||
              selectedEmailTemplate && selectedEmailTemplate.id === 'mjml-fm')" @onUpdate="updateHtmlSocialMedia" :value="htmlPage"/>
            </div>
            <div :class="{'tab-pane': true, active: currentTab === 'settings'}" id="settings" role="tabpanel"
                 aria-labelledby="settings-tab">
              <default-text-settings-component v-if="selectedText.type==='email'" type="'email'"
                                               :active="currentTab === 'settings'" :configuration="emailText.config"
                                               :copied-config="copiedConfiguration"
                                               @onUpdate="updateEmailTextConfig"
                                               @onCopy="updateCopiedConfiguration"/>
              <default-text-settings-component v-if="selectedText.type==='htmlPage'" type="'htmlPage'"
                                               :copied-config="copiedConfiguration"
                                               :active="currentTab === 'settings'" :configuration="htmlPage.config"
                                               @onUpdate="updateHtmlPageTextConfig"
                                               @onCopy="updateCopiedConfiguration"/>
            </div>
            <div :class="{'tab-pane': true, active: currentTab === 'preview'}" id="preview" role="tabpanel"
                 aria-labelledby="preview-tab">
              <mjml-simple-message-component :active="currentTab === 'preview'" :value="emailText" v-if="selectedEmailTemplate && selectedEmailTemplate.id=== 'mjml-sm'"/>
              <mjml-full-message-component :active="currentTab === 'preview'" :value="emailText" v-if="selectedEmailTemplate && selectedEmailTemplate.id=== 'mjml-fm'"/>
              <mjml-action-message-component :active="currentTab === 'preview'" :value="emailText" v-if="selectedEmailTemplate && selectedEmailTemplate.id=== 'mjml-am'"/>
              <mjml-full-action-component :active="currentTab === 'preview'" :value="emailText" v-if="selectedEmailTemplate && selectedEmailTemplate.id=== 'mjml-fa'"/>
              <mjml-full-page-component :active="currentTab === 'preview'" :value="htmlPage" v-if="selectedHtmlPageTemplate && selectedHtmlPageTemplate.id=== 'mjml-page-f'"/>
              <mjml-simple-page-component :active="currentTab === 'preview'" :value="htmlPage" v-if="selectedHtmlPageTemplate && selectedHtmlPageTemplate.id=== 'mjml-page-s'"/>
            </div>
          </div>
        </div>
        <div v-else-if="selectedText && selectedText.type === 'htmlFragment'">
          <h4>{{$t(selectedText.name)}}</h4>
          <div class="form-group">
            <MultiLanguageHtmlEditorComponent
              :availableLangs="availableLangs"
              :content.sync="htmlFragmentText"
              @contentChanged="htmlFragmentTextChanged"></MultiLanguageHtmlEditorComponent>
          </div>
        </div>
        <div class="form-buttons-w text-right mt-3">
          <button type="button" @click="resetText" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
          <button type="submit" @click="saveText" class="btn btn-primary ml-3">{{$t('buttons.save')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./defaultTexts.component.ts"></script>

<style scoped>
.panel-heading {
  cursor: pointer;
}
.item-selected {
  font-size:1.3em;
  font-variant-caps: all-small-caps;
  font-weight: 800;
}
.panel-title {
  position: relative;
}
#accordion {
  padding:1em;
}
.text-accordean {
  border-bottom: solid 1px #e0e0e7;
  margin-bottom: 1em;
  padding-top: 0.2em;
}
.panel-title::after {
  content: "\f107";
  color: #333;
  top: -2px;
  right: 0px;
  position: absolute;
  font-family: "FontAwesome"
}
.panel-title[aria-expanded="true"]::after {
  content: "\f106";
}
.text-entry-link span {
  cursor: pointer;
  color: #0d509a;
}
.text-entry-link span:hover {
  color:#047bf8;
}
ul.sub-menu li {
  padding-top:0.2em;
  padding-bottom:0.3em;
}
</style>
