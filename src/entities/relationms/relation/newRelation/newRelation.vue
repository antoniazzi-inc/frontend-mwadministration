<template>
  <div class="container-fluid">
    <form-wizard @on-complete="onComplete"
                 :title="$t('labels.newRelations')"
                 :subtitle="''"
                 shape="tab"
                 color="#1c4cc3"
                 error-color="#ff4949">
      <tab-content :title="$t('labels.nameAndEmail')" :before-change="validateStep"
                   icon="fas fa-user-tie">
        <form>
          <template v-for="(item, ind) in relations">
            <div :key="ind" class="row text-left">
              <div class="form-group col-md-3">
                <label v-if="ind === 0" for="firstName">{{$t('labels.firstName')}}</label>
                <input type="text" v-model="item.relationProfile.firstName"
                       class="form-control mb-2 mr-sm-2" id="firstName" placeholder="First Name">
              </div>
              <div class="form-group col-md-3">
                <label v-if="ind === 0" for="firstName">{{$t('labels.middleName')}}</label>
                <input type="text" v-model="item.relationProfile.middleName"
                       class="form-control mb-2 mr-sm-2" id="middleName" placeholder="Middle Name">
              </div>
              <div class="form-group col-md-3">
                <label v-if="ind === 0" for="firstName">{{$t('labels.lastName')}}</label>
                <input type="text" v-model="item.relationProfile.lastName"
                       class="form-control mb-2 mr-sm-2" id="lastName" placeholder="Last Name">
              </div>
              <div class="form-group col-md-3">
                <label v-if="ind === 0" for="firstName">{{$t('labels.email')}}</label>
                <div class="form-inline align-items-baseline row" :style="{width: '100%'}">
                  <input type="text" v-model="item.email" v-validate="'required|email'" :name="'email_' + ind"
                         :class="{'form-control mb-2 mr-sm-2 col-md-9': true, invalid: errors.has('email_' + ind)}" :id="'email_' + ind" placeholder="example@example.com">
                  <button v-if="ind > 0" @click="removeRow(ind)" type="button" class="btn btn-outline-danger col-md-2">-</button>
                </div>
                <span class="text-danger small">{{errors.first('email_' + ind)}}</span>
              </div>
            </div>
          </template>
          <button class="btn btn-outline-primary float-left" @click.prevent.stop="addNewRelation">
            <i class="fas fa-plus"></i> {{$t('labels.addOneMore')}}
          </button>
        </form>
      </tab-content>
      <tab-content :title="$t('labels.groupsTagsCategories')"
                   icon="fas fa-tags">
        <form>
          <div class="row text-left">
            <div class="form-group col-md-4">
              <label>{{$t('labels.groups')}}</label>
              <searchable-select-component :config="searchableConfigGroups"
                                           :options="$store.state.lookups.groups"
                                           :value="relationGroups"
                                           @onChange="groupsChanged"
                                           @onSelected="groupsChanged"
                                           @onDelete="groupsRemoved"
              ></searchable-select-component>
            </div>
            <div class="form-group col-md-4">
              <label for="firstName">{{$t('labels.category')}}</label>
              <searchable-select-component :config="searchableConfigCats"
                                           :options="$store.state.lookups.categories"
                                           :value="relationCategories"
                                           @onChange="categoriesChanged"
                                           @onSelected="categoriesChanged"
                                           @onDelete="categoriesRemoved"
              ></searchable-select-component>

            </div>
            <div class="form-group col-md-4">
              <label for="firstName">{{$t('labels.tags')}}</label>
              <searchable-select-component :config="searchableConfigTags"
                                           :options="$store.state.lookups.tags"
                                           :value="relationTags"
                                           @onChange="tagsChanged"
                                           @onSelected="tagsChanged"
                                           @onDelete="tagsRemoved"
              ></searchable-select-component>

            </div>
          </div>
        </form>
      </tab-content>
      <tab-content :title="$t('labels.summary')"
                   icon="fas fa-receipt">
        <div class="row">
          <div class="col-md-6 pl-4 text-left">
           <div class="mb-3"> {{$t('labels.clickOnSaveToCreateRelations')}}:</div>
            <div class="col-md-12" v-for="(item, ind) in relations" :key="ind">
              <span>{{item.email}}</span>
            </div>
          </div>
          <div class="col-md-6 pl-4 text-left">
            <div class="mb-3">{{$t('labels.followingWillBeDoneForCreatingRelations')}}:</div>
            <div class="row mt-3">
              <div class="col-md-12" v-if="relationCategories && relationCategories.code">
                {{$t('labels.assignedCategory')}}:<br/>
                <span class="text-primary">{{relationCategories ? relationCategories.code : ''}}</span>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12" v-if="relationGroups && relationGroups.length">
                {{$t('labels.relationWillBeAddedToFollowingGroups')}}:<br/>
                <span class="text-primary" v-for="(item, ind) in relationGroups" :key="ind">{{item.label}}</span>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12" v-if="relationTags && relationTags.length">
                {{$t('labels.associatedTags')}}:<br/>
                <span class="text-primary" v-for="(item, ind) in relationTags" :key="ind"> {{item.code}} </span>
              </div>
            </div>
          </div>
        </div>
      </tab-content>
    </form-wizard>
  </div>
</template>
<script type="ts" src="./newRelation.component.ts"></script>
