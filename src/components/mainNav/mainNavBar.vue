<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
        <router-link class="nav-link" id="home" to="/" role="button"
                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

          <div style="width: 60px">
            <img class="img-fluid" src="@/assets/images/logo.png"/>
          </div>
        </router-link>
        <div class="dropdown-menu" aria-labelledby="home">
          <h3 class="menu-title">{{$t('labels.home')}}</h3>
          <router-link to="/home/dashboard" class="dropdown-item child-link">
            <div class="ml-2"> {{$t('labels.dashboard')}}</div>
          </router-link>
          <hr/>
          <router-link to="/account/settings" class="dropdown-item child-link">
            <div class="ml-2"> {{$t('labels.accountAndSettings')}}</div>
          </router-link>
          <hr/>
          <router-link to="/home/settings" class="dropdown-item child-link">
            <div class="ml-2"> {{$t('labels.settings')}}</div>
          </router-link>
        </div>
      </li>
    </ul>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <template v-for="(item, index) in mainMenu">
          <li class="nav-item" v-if="item.children.length === 0 && hasAuthority(item.authorities)" :key="index">
            <router-link class="nav-link" :to="item.path" role="button" data-toggle="dropdown"
                         aria-haspopup="true" aria-expanded="false">
              <div class="main-menu-icon">
                <i :class="item.icon"></i>
              </div>
            </router-link>
          </li>
          <li class="nav-item dropdown" :key="index" v-if="item.children.length > 0 && hasAuthority(item.authorities)">
            <router-link class="nav-link" :id="item.name" to="" role="button"
                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i :class="item.icon"></i>
            </router-link>
            <div class="dropdown-menu" :aria-labelledby="item.name" v-if="hasAuthority(item.authorities)">
              <h3 class="menu-title">{{$t(item.name)}}</h3>
              <template v-for="(child, childInd) in item.children">
                <router-link :key="childInd" :to="child.path" class="dropdown-item child-link"
                             v-if="hasAuthority(child.authorities)">
                  <div class="dropdown-icon">
                    <i :class="child.icon"></i>
                  </div>
                  <div class="pl-2">
                    {{$t(child.name)}}
                  </div>
                </router-link>
                <hr :key="childInd + 'hr'" v-if="childInd < item.children.length-1 && hasAuthority(child.authorities)"/>
              </template>
            </div>
          </li>
        </template>
      </ul>
      <form class="form-inline my-2 my-lg-0" @submit.prevent="doSearch()" v-if="showSearch">
        <div class="input-group">
          <div class="input-group-btn">
            <div class="input-group-prepend">
              <span class="input-group-text search-icon" id="basic-addon1">
                 <i class="fas fa-search" @click.prevent="doSearch"></i>
              </span>
              <input v-model="searchString" type="text" class="search" placeholder="Search">
              <button type="submit" hidden></button>
            </div>
          </div>
        </div>
      </form>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <router-link class="nav-link" id="notifications" to="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="new-messages-count">6</div>
            <i class="main-menu-icon os-icon os-icon-zap"></i>
          </router-link>
          <div class="dropdown-menu" style="left:-8em;" aria-labelledby="notifications">
            <h3 class="menu-title">{{$t('labels.notifications')}}</h3>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <router-link class="nav-link" id="recentedits" to="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="main-menu-icon os-icon os-icon-mail-14"></i>
          </router-link>
          <div class="dropdown-menu" style="left:-18em;" aria-labelledby="recentedits">
            <h3 class="menu-title">{{$t('labels.recentItems')}}</h3>
            <template v-for="(item, ind) in $store.state.recentItems">
              <router-link :key="ind" :to="recentItemPath(item)" class="child-link recentlink">
                <i class="os-icon os-icon-ui-54" v-if="item.type === 'tag' || item.type === 'category'"/>
                <i class="os-icon os-icon-coins-4" v-if="item.type === 'product'"/>
                <i class="os-icon os-icon-crown" v-if="item.type === 'promotion'"/>
                <i class="os-icon os-icon-text-input" v-if="item.type === 'customfield'"/>
                <i class="os-icon os-icon-hierarchy-structure-2" v-if="item.type === 'relationgroup'"/>
                <i class="os-icon os-icon-user-male-circle2" v-if="item.type === 'relation'"/>
                <i class="os-icon os-icon-delivery-box-2" v-if="item.type === 'order'"/>
                <span style="padding-left:1em;">{{item.label}}</span>
              </router-link>
            </template>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <router-link class="nav-link" id="languages" to="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img width="25" class="main-menu-icon mx-auto d-block" :src="`./assets/images/flags/${$store.state.currentLanguage}.png`"/>
          </router-link>
          <div class="dropdown-menu" style="left:-9em;" aria-labelledby="languages">
            <h3 class="menu-title">{{$t('labels.languages')}}</h3>
            <template v-for="(item, ind) in $store.state.languages">
              <router-link :key="ind" to="" class="dropdown-item child-link" @click.native="changeLanguage(item, ind)">
                <div class="row">
                  <div class="col-md-2 ml-3">
                      <img class="img-fluid" :src="`./assets/images/flags/${ind}.png`" />
                  </div>
                  <div class="col-md-8">
                    {{item.name}}
                  </div>
                </div>
              <hr :key="ind + 'hr'"/>
              </router-link>
            </template>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <router-link class="nav-link" id="user" to="" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="main-menu-icon fas fa-user-circle"></i>
            <!--
            <v-gravatar class="avatar-sm" :email="$store.state.userIdentity && $store.state.userIdentity.email ?
            $store.state.userIdentity.email : ''" :size="100"></v-gravatar>
            -->
          </router-link>
          <div class="dropdown-menu" style="left:-20em; min-width:27em;" aria-labelledby="user">
            <h3 class="menu-title">{{getUserName()}}</h3>
            <router-link to=""  @click.native="loadUser" data-toggle="modal" data-target="#userProfileModal" class="dropdown-item child-link">
              <div class="ml-2"> {{$t('labels.userProfile')}}</div>
            </router-link>
            <hr/>
            <router-link to="/account/notifications" class="dropdown-item child-link">
              <div class="ml-2"> {{$t('labels.notifications')}}</div>
            </router-link>
            <hr/>
            <router-link to="/account/tasks" class="dropdown-item child-link">
              <div class="ml-2"> {{$t('labels.myTasks')}}</div>
            </router-link>
            <hr/>
            <router-link to="" @click.native="logout()" class="dropdown-item child-link">
              <div class="ml-2"> {{$t('labels.logout')}}</div>
            </router-link>
          </div>
        </li>
      </ul>
      <!--
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
            <i class="main-menu-icon fas fa-question"></i>
        </li>
      </ul>
      -->
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" id="userProfileModal" tabindex="-1" role="dialog" ref="userProfileModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{$t('labels.editUserProfile')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <div>
              <form @submit.prevent="saveUserProfile()">
                <div class="form-body" v-if="user.relationProfile">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-2">
                        <label for="firstName" v-html="$t('labels.title')"></label>
                        <input type="text" class="form-control" id="title" v-model="user.relationProfile.title" />
                      </div>
                      <div class="col-md-3">
                        <label for="firstName" v-html="$t('labels.firstName')"></label>
                        <input type="text" class="form-control" id="firstName" v-model="user.relationProfile.firstName" />
                      </div>
                      <div class="col-md-3">
                        <label for="firstName" v-html="$t('labels.middleName')"></label>
                        <input type="text" class="form-control" id="middleName" v-model="user.relationProfile.middleName" />
                      </div>
                      <div class="col-md-4">
                        <label for="firstName" v-html="$t('labels.lastName')"></label>
                        <input type="text" class="form-control" id="lastName" v-model="user.relationProfile.lastName" />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="birthdate" v-html="$t('labels.birthDate')"></label>
                    <div class="date-input">
                      <flat-pickr :config="dateConfig" class="single-daterange form-control" id="birthdate" v-model="birthDate"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="website" v-html="$t('labels.website')"></label>
                    <input type="text" id="website" class="form-control" v-model="user.relationProfile.website" />
                  </div>
                  <div class="form-group">
                    <label v-html="$t('labels.timezone')"/>
                    <span class="ml-1 input-group-addon">
                        <i class="fa fa-globe"/>
                    </span>
                    <div class="input-group in-tab-pane" v-if="$store.state.lookups.timeZones
                    && $store.state.lookups.timeZones.length>0">
                      <searchable-select-component :config="searchableConfig"
                                                   :options="$store.state.lookups.timeZones"
                                                   :value="selectedTimeZone"
                                                   @onChange="changeTimeZone"
                                                   @onSelected="changeTimeZone"
                                                   @onDelete="removeTimeZone"
                      ></searchable-select-component>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="mr-3" v-html="$t('labels.chooseLanguage')"></label><br/>
                    <div class="mt-radio-list d-inline">
                      <label class="mt-radio mr-2" v-for="(lang, ind) in $store.state.languages" :key="ind">
                        <input type="radio" :value="ind" v-model="user.languageKey"> {{ lang.name }}
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label"> </label>
                    <div>
                      <label class="mt-checkbox">
                        <input type="checkbox" class="mr-1" v-model="changePasswordChecked" @click="onChangePassword">
                        {{ $t("labels.changePassword") }}
                      </label>
                    </div>
                  </div>
                  <div v-if="changePasswordChecked">
                    <div class="form-group">
                      <label for="password" v-html="$t('labels.password')"></label>
                      <input type="password" value="" id="password" class="form-control"
                             v-model="user.password" />
                    </div>
                    <div class="row p-0 m-0">
                      <div class="col-md-6 p-0 m-0">
                        <div class="form-group">
                          <label for="newpassword" v-html="$t('labels.newPassword')"></label>
                          <input type="password" value="" id="newpassword" class="form-control" v-model="changePassword.newPassword" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="repeatpassword" v-html="$t('labels.repeatPassword')"></label>
                          <input type="password" id="repeatpassword" class="form-control" value="" v-model="changePassword.repeatPassword" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" @click="saveUserProfile" class="btn btn-primary">{{$t('buttons.save')}}</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.close')}}</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" src="./mainNavBar.ts"></script>
<style scoped>
  .navbar {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#1c4cc3), to(#1c4cc3));
    background-image: linear-gradient(to bottom, #1c4cc3 0%, #1c4cc3 100%);
    background-repeat: repeat-x;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  @media (min-width: 900px) {
    .dropdown:hover .dropdown-menu {
      display: block;
    }
  }
  .main-menu-icon {
    font-size: 1.6em;
    color:  #95acff;
    margin-left: 10px;
    margin-right: 10px;
  }
  .main-menu-icon:hover{
    color: #ffffff;
  }
  .dropdown-icon {
    margin-right: 10px;
  }
  .menu-title {
    font-size: 2.4rem;
    color: rgba(255, 255, 255, 0.2);
    padding: 5px 45px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 15px;
    letter-spacing: -0.5px;
    white-space: nowrap;
    overflow: hidden;
    font-family: 'Avenir Next W01', 'Proxima Nova W01', 'Rubik', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 600;
  }
  .menu-title-dropdown .small{
    font-size: 0.9em;
  }
  .dropdown-menu{
    z-index: 9999;
    -webkit-transform: translateY(-20px) scale(0.95);
    transform: translateY(-20px) scale(0.95);
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    background-color: #1b55e2;
    color: #fff;
    overflow: hidden;
    text-align: left;
    color: white;
    -webkit-box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.2);
  }
  .child-link {
    color: #fff;
    display: block;
    padding: 2px 50px;
    font-size: 0.99rem;
    position: relative;
    white-space: nowrap;
  }
  .dropdown-item{
    color: white;
    font-weight: 500;
    font-size: 1.3em;
    padding:0;
    margin:0;
    padding-left:30px;
  }
  hr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .dropdown-item:focus, .dropdown-item:hover {
    color: #ffffff;
    text-decoration: none;
    background-color: transparent;
  }
  .dropdown-item:hover:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 10px;
    background-color: #fbb463;
    border-color: #fbb463;
    margin-top: 13px;
    margin-right: 5px;
    position: absolute;
    display: block;
    -webkit-transform: translate(-10px, -50%);
    transform: translate(-10px, -50%);
    opacity: 1;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  .search:focus{
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    outline: none;
  }
  .search{
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    border: 1px solid transparent;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    left: -3px;
  }
  .search-icon{
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    border: 1px solid transparent;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
  }
  .nav-link {
    color: white!important;
  }

  .new-messages-count {
    background-color: #e65252;
    color: #fff;
    min-width: 20px;
    text-align: center;
    border-radius: 6px;
    font-weight: 800;
    position: absolute;
    top: -2px;
    right: 5px;
    padding: 4px 4px;
    vertical-align: middle;
    font-size: 0.72rem;
    line-height: 1;
  }
.recentlink, .recentlink:hover {
  text-decoration: none;
}
.recentlink i {
  margin-left: 0px;
}

</style>
