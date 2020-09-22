<template>
  <div class="container-fluid">

    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading" style="color:#f2f4f8">{{getFullName()}}</span>
      <router-link to="/relations" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <span>{{$t('buttons.backToList')}}</span>
        </button>
      </router-link>
    </h2>

    <div class="row">
      <div class="col-md-3 pr-0 m-0">
        <div class="user-profile compact">
          <div class="up-head-w">
            <div class="up-main-info smaller justify-content-start text-left">
              <!--
              <button type="button" class="edit-btn btn btn-link text-white cursor-pointer"
                      @click="editRelationProfile">
                <i class="os-icon os-icon-pencil-2"></i> {{$t('labels.edit')}}
              </button>
              -->
              <div class="row">
                <div class="col-md-6 text-left">
                  <v-gravatar class="rounded align-self-start" :email="relation.email" :size="90" default-img="mp"></v-gravatar>
                </div>
                <div class="col-md-6 text-right">
                  <span class="badge badge-pill badge-success cat-pill">{{getCategoryName()}}</span>
                </div>
              </div>
              <h2 class="up-header">{{getFullName()}}</h2>
              <h6 class="up-sub-header text-left">{{relation.email}}</h6>
              <svg class="decor" width="842px" height="219px" viewBox="0 0 842 219" preserveAspectRatio="xMaxYMax meet"
                   version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g transform="translate(-381.000000, -362.000000)" fill="#FFFFFF">
                  <path class="decor-path"
                        d="M1223,362 L1223,581 L381,581 C868.912802,575.666667 1149.57947,502.666667 1223,362 Z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="up-controls">
            <div class="row text-left ml-1">
               <div class="profile-tile" style="border: 0; padding:0;">
                <div class="profile-tile-meta" style="padding-left: 0px;">
                  <ul>
                    <li style="font-size:1.2em; font-weight:800">
                      {{$t('labels.createdOn')}}:<strong>{{relation.createdOn | formatDate}}</strong>
                    </li>
                    <li style="font-size:1.2em; font-weight:800">
                      {{$t('labels.updatedOn')}}:<strong>{{relation.updatedOn | formatDate}}</strong>
                    </li>
                    <li style="font-size:1.2em; font-weight:800">
                      {{$t('labels.ID')}}:<strong>{{relation.id}}</strong>
                    </li>
                    <li style="font-size:1.2em; font-weight:800">
                      {{$t('labels.category')}}:<strong>{{getCategoryName()}}</strong>
                    </li>
                  </ul>
                  <div class="pt-btn">
                    <a class="btn btn-danger btn-sm" style="color:white; font-weight: 800">{{$t('labels.pendingTasks')}}...</a>
                  </div>
                </div>
              </div>
            </div>
            <hr/>
            <div class="row text-left ml-1">
              <div class="btn-group">
                <button aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" id="dropdownMenuButton1"
                        type="button" class="btn btn-primary dropdown-toggle btn-lg">{{$t('labels.actions')}}
                </button>
                <div aria-labelledby="dropdownMenuButton1" x-placement="bottom-start" class="dropdown-menu">
                  <a data-target="#onboardingFormModal" data-toggle="modal" class="dropdown-item m-1">{{$t('labels.sendMail')}}</a>
                  <a href="#" class="dropdown-item m-1"> {{$t('labels.startListManager')}}</a>
                  <a href="#" class="dropdown-item m-1"> {{$t('labels.startWorkflow')}}</a>
                  <a href="#" class="dropdown-item m-1"> {{$t('labels.startTask')}}</a>
                  <a href="#" class="dropdown-item m-1"> {{$t('labels.startNewOrder')}}</a>
                  <a href="#" class="dropdown-item m-1"> {{$t('labels.newContact')}}</a>
                  <a href="#" class="dropdown-item m-1"> {{$t('labels.mergeRelation')}}</a>
                </div>
              </div>
            </div>
            <hr/>
            <div class="row text-left ml-1" style="margin-top:2em;">
              <table width="100%">
                <tr style="border-bottom:1px solid #d0d0d0;">
                  <td width="90%"><h4>{{$t('labels.groupsMembership')}}</h4></td>
                  <td align="center">
                    <button type="button" class="btn btn-sm btn-outline-primary" @click="editRelationGroups">
                      {{$t('labels.edit')}}
                    </button>
                  </td>
                </tr>
                <tr v-for="(item, ind) in relation.relationGroups" :key="ind">
                  <td width="90%" class="font-weight-lighter" style="padding-top:0.6em;">{{item.label}}</td>
                  <td align="center" style="padding-top:0.6em;"><span :class="{'status-pill':true, green: item.label !=='Bouncers', red: item.label === 'Bouncers'}" data-toggle="tooltip" data-original-title="" title=""></span></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <relation-edit-tabs-component :relation="relation" ref="editTabs"
                                      @updateRel="updateRelation"></relation-edit-tabs-component>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./editRelation.component.ts"></script>
<style scoped>
  .user-profile {
    border-radius: 6px;
    background-color: #fff;
    -webkit-animation-name: fadeUp;
    animation-name: fadeUp;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
  }
  .smaller {
    padding:1em!important;
  }
  .up-head-w:before {
    z-index: 1;
    content: '';
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-image: -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(rgba(0, 0, 0, 0.2)), color-stop(70%), to(rgba(0, 0, 0, 0.5)));
    background-image: linear-gradient(20deg, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.5) 70%);
  }
  .user-profile .up-head-w:before {
    z-index: 1;
    content: '';
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2), 70%, rgba(0, 0, 0, 0.5));
  }
  .up-head-w {
    background-color: #1c4cc3;
    ackground-size: cover;
    background-position: center center;
    position: relative;
    color: #fff;
    border-radius: 6px 6px 0px 0px;
  }
  .up-main-info {
    padding: 15% 5% 5% 5%;
    position: relative;
    z-index: 4;
  }
  .rounded {
    border-radius: 100px !important;
    border: 3px solid white;
  }
  .edit-btn {
    position: absolute;
    z-index: 99999;
    left: 2%;
    top: 2%;
  }
  .up-controls {
    margin-top: 10px;
  }
  .up-header {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    display: inline-block;
    margin-bottom: 10px;
    font-size: 2rem!important;
    font-weight: 600;
    margin-bottom: 10px;
    margin-top: 20px;
    padding-bottom: 5px;
  }
  .user-profile .up-head-w .decor .decor-path {
    fill: #fff;
  }
  .user-profile .up-head-w .decor {
    position: absolute;
    bottom: -1px;
    right: 0px;
    max-width: 100%;
    z-index: 3;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  svg {
    vertical-align: middle;
  }
  .up-sub-header {
    font-size: 0.81rem;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
    color: rgba(255, 255, 255, 0.8);
  }
  .cat-pill {
    border: 1px solid #fff;
    border-radius: 8px;
    padding:6px;
  }
</style>
