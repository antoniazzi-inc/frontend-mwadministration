<template>
  <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" @click="currentSubTab = 'general'">
        <a :class="{'nav-link': true, 'active': currentSubTab === 'general'}" id="general-tab" data-toggle="tab"
           href="#general" role="tab" aria-controls="general" aria-selected="true">{{$t('labels.general')}}</a>
      </li>
      <li class="nav-item" @click="currentSubTab = 'company'">
        <a :class="{'nav-link': true, 'active': currentSubTab === 'company'}" id="company-tab" data-toggle="tab"
           href="#company" role="tab" aria-controls="company" aria-selected="false">{{$t('labels.company')}}</a>
      </li>
      <li class="nav-item" @click="currentSubTab = 'tags'">
        <a :class="{'nav-link': true, 'active': currentSubTab === 'tags'}" id="tags-tab" data-toggle="tab"
           href="#tags" role="tab" aria-controls="tags" aria-selected="false">{{$t('labels.tags')}}</a>
      </li>
      <li class="nav-item" @click="currentSubTab = 'contacts'">
        <a :class="{'nav-link': true, 'active': currentSubTab === 'contacts'}" id="contacts-tab"
           data-toggle="tab" href="#contacts" role="tab" aria-controls="contacts" aria-selected="false">
          {{$t('labels.contacts')}}</a>
      </li>
      <li class="nav-item" @click="currentSubTab = 'groups'">
        <a :class="{'nav-link': true, 'active': currentSubTab === 'groups'}" id="groups-tab" data-toggle="tab"
           href="#groups" role="tab" aria-controls="groups" aria-selected="false">{{$t('labels.groups')}}</a>
      </li>
      <li class="nav-item" @click="currentSubTab = 'freeFields'">
        <a :class="{'nav-link': true, 'active': currentSubTab === 'freeFields'}" id="freeFields-tab" data-toggle="tab"
           href="#freeFields" role="tab" aria-controls="freeFields"
           aria-selected="false">{{$t('labels.freeFields')}}</a>
      </li>
      <li class="nav-item" @click="currentSubTab = 'customer'">
        <a :class="{'nav-link': true, 'active': currentSubTab === 'customer'}" id="customer-tab" data-toggle="tab"
           href="#customer" role="tab" aria-controls="customer" aria-selected="false">{{$t('labels.customer')}}</a>
      </li>
      <li class="nav-item" @click="currentSubTab = 'affiliates'">
        <a :class="{'nav-link': true, 'active': currentSubTab === 'affiliates'}" id="affiliates-tab" data-toggle="tab"
           href="#affiliates" role="tab" aria-controls="affiliates"
           aria-selected="false">{{$t('labels.affiliates')}}</a>
      </li>
    </ul>
    <div class="tab-content text-left">
      <div :class="{'tab-pane': true, 'active': currentSubTab === 'general'}" id="general" role="tabpanel"
           aria-labelledby="general-tab">
        <p class="m-3">{{$t('labels.changeBasicRelationFields')}}</p>
        <general-sub-tab-component :rel="$props.relation"
                                   :active="currentSubTab==='general'"></general-sub-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentSubTab === 'company'}" id="company" role="tabpanel"
           aria-labelledby="company-tab">
        <company-sub-tab-component :rel="$props.relation"
                                   :active="currentSubTab==='company'"></company-sub-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentSubTab === 'tags'}" id="tags" role="tabpanel"
           aria-labelledby="tags-tab">
        <tags-sub-tab-component :rel="$props.relation" :active="currentSubTab==='tags'"></tags-sub-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentSubTab === 'contacts'}" id="contacts"
           role="tabpanel" aria-labelledby="contacts-tab">
        <contacts-sub-tab-component :rel="$props.relation"
                                    :active="currentSubTab==='contacts'"></contacts-sub-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentSubTab === 'groups'}" id="groups" role="tabpanel"
           aria-labelledby="groups-tab">
        <groups-sub-tab-component :rel="$props.relation"
                                  :active="currentSubTab==='groups'"></groups-sub-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentSubTab === 'freeFields'}" id="freeFields" role="tabpanel"
           aria-labelledby="freeFields-tab">
        <free-fields-sub-tab-component :rel="$props.relation"
                                       :active="currentSubTab==='freeFields'"></free-fields-sub-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentSubTab === 'customer'}" id="customer" role="tabpanel"
           aria-labelledby="customer-tab">
        <customer-sub-tab-component :rel="$props.relation"
                                    :active="currentSubTab==='customer'"></customer-sub-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentSubTab === 'affiliates'}" id="affiliates" role="tabpanel"
           aria-labelledby="affiliates-tab">
        <affiliates-sub-tab-component :rel="$props.relation"
                                      :active="currentSubTab==='affiliates'"></affiliates-sub-tab-component>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./profileTab.component.ts"></script>
