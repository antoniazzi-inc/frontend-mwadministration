<template>
  <div class="container-fluid">
    <div class="row text-left">
      <div class="col-md-3">
        <div id="accordion">
          <template v-for="(item, ind) in defaultTexts">
            <div class="card" :key="`${ind}_card`">
              <button class="btn btn-link" @click="clickedTab = clickedTab === item.categoryId ?
              clickedTab = '' : clickedTab=item.categoryId" data-toggle="collapse" :data-target="`#collapse_${ind}`"
                      aria-expanded="true" :aria-controls="`#collapse_${ind}`">
                <div class="card-header" :id="`#collapse_${ind}_heading`">
                  <h5 class="mb-0">
                    {{$t(item.categoryName)}}
                  </h5>
                </div>
              </button>
            </div>
            <div :id="`#collapse_${ind}`" :class="{collapse: true, show: clickedTab === item.categoryId}"
                 :aria-labelledby="`#collapse_${ind}_heading`"
                 :key="`${ind}_collapse`" data-parent="#accordion">
              <div class="card-body">
                <template v-for="(text, index) in item.texts">
                  <button type="button" class="btn btn-link" @click="chooseText(text)" :key="index">{{$t(text.name)}}
                  </button>
                  <hr :key="`${index}_hor`"/>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="col-md-9" v-if="selectedText && selectedText.type">
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
                    <MultiLanguageHtmlEditorComponent v-if="item.component === 'htmlEditor'"
                                               :content.sync="htmlPage.value[item.id]"
                                                      :availableLangs="availableLangs"
                                               @contentChanged="htmlPageTextTemplateChanged(item.id, ...arguments)"></MultiLanguageHtmlEditorComponent>
                  </div>
                </div>
              </div>
              <default-texts-social-component v-if="selectedEmailTemplate && selectedEmailTemplate.id === 'mjml-fa' ||
              selectedEmailTemplate && selectedEmailTemplate.id === 'mjml-fm'" @onUpdate="updateSocialMedia" :value="emailText"/>
            </div>
            <div :class="{'tab-pane': true, active: currentTab === 'settings'}" id="settings" role="tabpanel"
                 aria-labelledby="settings-tab">
              <default-text-settings-component v-if="selectedText.type==='email'" type="'email'"
                                               :active="currentTab === 'settings'" :configuration="emailText.config"
                                               @onUpdate="updateEmailTextConfig"/>
              <default-text-settings-component v-if="selectedText.type==='htmlPage'" type="'htmlPage'"
                                               :active="currentTab === 'settings'" :configuration="htmlPage.config"
                                               @onUpdate="updateHtmlPageTextConfig"/>
            </div>
            <div :class="{'tab-pane': true, active: currentTab === 'preview'}" id="preview" role="tabpanel"
                 aria-labelledby="preview-tab">
              <mjml-simple-message-component :active="currentTab === 'preview'" :value="emailText" v-if="selectedEmailTemplate && selectedEmailTemplate.id=== 'mjml-sm'"/>
              <mjml-full-message-component :active="currentTab === 'preview'" :value="emailText" v-if="selectedEmailTemplate && selectedEmailTemplate.id=== 'mjml-fm'"/>
              <mjml-action-message-component :active="currentTab === 'preview'" :value="emailText" v-if="selectedEmailTemplate && selectedEmailTemplate.id=== 'mjml-am'"/>
              <mjml-full-action-component :active="currentTab === 'preview'" :value="emailText" v-if="selectedEmailTemplate && selectedEmailTemplate.id=== 'mjml-fa'"/>
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
