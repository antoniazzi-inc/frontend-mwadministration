<template>
  <div>
    <div class="row" v-if="companies.length && !editMode && !addNewCompany">
      <div class="col-md-6">
        <div class="row" v-for="(item, index) in companies" :key="index">
          <div class="col-md-12">
            <div class="support-index support-tickets">
              <div class="support-ticket">
                <div class="st-body">
                  <div class="avatar"><i style="font-size: 2rem;" class="dashicons dashicons-building"></i></div>
                  <div class="st-meta">
                    <i class="os-icon os-icon-edit" @click="editCompany(item, index)"></i>
                    <div class="os-icon os-icon-trash" @click="deleteCompany(item)"></div>
                  </div>
                  <div class="ticket-content">
                    <h6 class="ticket-title">
                      {{item.name}}
                    </h6>
                    <div class="ticket-description">
                      <span class="label">{{item.description}}</span>
                    </div>
                  </div>
                </div>
                <div class="st-foot">
                  <span class="value">{{getCompanyAddress(item).label}}</span>
                  <br/>
                  <span class="value">{{getCompanyPhone(item)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="!addNewCompany">
      <div class="col-md-6">
        <button class="btn btn-outline-primary" @click="createNewCompany">{{$t('buttons.createNewCompany')}}</button>
      </div>
    </div>
    <div class="row" v-if="addNewCompany && !editMode">
      <div class="col-md-12">
        <label>{{$t('labels.company')}}</label>
        <searchable-select-component :config="searchableConfigCompany"
                                     :options="$store.state.lookups.companies"
                                     :value="companyToEdit"
                                     @onChange="companyChanged"
                                     @onSelected="companyChanged"
                                     @onDelete="companyRemoved"
                                     @onCreate="onAddCompany"
        ></searchable-select-component>
      </div>
    </div>
    <div class="row m-3" v-if="addNewCompany && editMode">
      <div class="col">
        <form @submit.prevent.stop="saveCompany">
          <div class="form-row">
            <label>{{$t('labels.companyName')}}</label>
            <input type="text" class="form-control" v-model="companyToEdit.name"/>
          </div>
        </form>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>
<script type="ts" src="./companySubTab.component.ts"></script>
