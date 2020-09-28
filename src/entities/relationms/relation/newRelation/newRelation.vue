<template>
  <div class="container-fluid">

    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.newRelations')}}</span>
      <router-link to="/relations" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-secondary float-right create-tag">
          <span>{{$t('labels.backToRelations')}}</span>
        </button>
      </router-link>
    </h2>

          <div class="wizard-panel">

              <form-wizard @on-complete="onComplete" :title="''"
                           :subtitle="''"
                           shape="circle"
                           color="#0a7cf8"
                           error-color="#ff4949">
                <tab-content :title="$t('labels.nameAndEmail')" :before-change="validateStep"
                             icon="fas fa-user-tie">
                  <form>
                    <template v-for="(item, ind) in relations">
                      <div :key="ind" class="row text-left">
                        <div class="form-group col-md-3">
                          <label v-if="ind === 0" for="firstName">{{$t('labels.firstName')}}</label>
                          <input type="text" v-validate="{regex: validationRegEx}" v-model="item.relationProfile.firstName"
                                 class="form-control mb-2 mr-sm-2" id="firstName" name="First Name" placeholder="First Name">
                          <span class="small text-danger">{{errors.first('First Name')}}</span>
                        </div>
                        <div class="form-group col-md-2">
                          <label v-if="ind === 0" for="middleName">{{$t('labels.middleName')}}</label>
                          <input type="text" v-validate="{regex: validationRegEx}" name="Middle Name" v-model="item.relationProfile.middleName"
                                 class="form-control mb-2 mr-sm-2" id="middleName" placeholder="Middle Name">
                          <span class="small text-danger">{{errors.first('Middle Name')}}</span>
                        </div>
                        <div class="form-group col-md-3">
                          <label v-if="ind === 0" for="lastName">{{$t('labels.lastName')}}</label>
                          <input type="text" v-validate="{regex: validationRegEx}" v-model="item.relationProfile.lastName"
                                 class="form-control mb-2 mr-sm-2" id="lastName" name="Last Name" placeholder="Last Name">
                          <span class="small text-danger">{{errors.first('Last Name')}}</span>
                        </div>
                        <div class="form-group col-md-4">
                          <label v-if="ind === 0">{{$t('labels.email')}}</label>
                          <div class="form-inline align-items-baseline row" :style="{width: '100%'}">
                            <input type="text" v-model="item.email" v-validate="'required|email'" :name="'email_' + ind"
                                   :class="{'form-control mb-2 mr-sm-2 col-md-9': true, invalid: errors.has('email_' + ind)}" :id="'email_' + ind" placeholder="example@example.com">
                            <button v-if="ind > 0" @click="removeRow(ind)" type="button" class="btn btn-outline-info col-md-2">-</button>
                          </div>
                          <span class="text-danger small">{{errors.first('email_' + ind)}}</span>
                        </div>
                      </div>
                    </template>
                    <button class="btn btn-outline-primary float-left" @click.prevent.stop="addNewRelation">
                      <i class="fas fa-plus"></i> {{$t('labels.addOneMore')}}
                    </button>
                    <button class="btn btn-outline-secondary ml-4 float-left" @click.prevent.stop="goBack">
                      {{$t('buttons.cancel')}}
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
                    <div class="col-md-5 pl-4 text-left">
                        <h5 class="form-header">
                          {{$t('labels.clickOnSaveToCreateRelations')}}:
                        </h5>
                        <div class="form-desc">
                          <span v-for="(item, ind) in relations" :key="ind" class="text-primary">
                            {{item.email}}<br/>
                          </span>
                        </div>
                    </div>
                    <div class="col-md-7 pl-4 text-left">
                      <h5 class="form-header">
                        {{$t('labels.followingWillBeDoneForCreatingRelations')}}:
                      </h5>
                      <div class="row mt-3">
                        <div class="col-md-12" v-if="relationCategories && relationCategories.code">
                          {{$t('labels.assignedCategory')}}
                          <span class="text-primary">{{relationCategories ? relationCategories.code : ''}}</span>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-md-12" v-if="relationGroups && relationGroups.length">
                          {{$t('labels.relationWillBeAddedToFollowingGroups')}}
                          <span class="text-primary" v-for="(item, ind) in relationGroups" :key="ind">{{item.label}}<br/></span>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-md-12" v-if="relationTags && relationTags.length">
                          {{$t('labels.associatedTags')}}
                          <span class="text-primary" v-for="(item, ind) in relationTags" :key="ind"> {{item.code}} </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </tab-content>
              </form-wizard>


          </div>

  </div>
</template>
<script type="ts" src="./newRelation.component.ts"></script>
