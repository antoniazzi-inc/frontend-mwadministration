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
  <div class="loginBg">
    <div class="row p-0 m-0 justify-content-center">
      <div class="col-md-4">
        <div>
          <div class="col-sm-12 text-center">
            <img src="@/assets/images/logo-login.png" alt="Autorespond logo"/>
          </div>
          <div class="loginHolder text-left">
            <h3 style="width:100%; padding-bottom:1em;" class="text-center">{{$t('labels.loginToYourAccount')}}</h3>
            <form @submit.prevent.stop="doLogin()">
              <div class="form-group">
                <label for="accessCode">{{$t('labels.accessCode')}}</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <i class="input-group-text">
                      <i class="fa fa-key"></i>
                    </i>
                  </div>
                  <input type="text" id="accessCode" v-model="accessCode" class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label for="username">{{$t('labels.username')}}</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <i class="input-group-text">
                      <i class="fas fa-user-tie"></i>
                    </i>
                  </div>
                  <input type="text" autocomplete="current-username" v-model="username" id="username" class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label for="password">{{$t('labels.password')}}</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <i class="input-group-text">
                      <i class="fa fa-fingerprint"></i>
                    </i>
                  </div>
                  <input id="password" autocomplete="current-password" type="password" v-model="password" class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label for="tfa">{{$t('labels.tfa')}}</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <i class="input-group-text">
                      <i class="fa fa-unlock"></i>
                    </i>
                  </div>
                  <input type="text" v-model="tfaCode" id="tfa" class="form-control">
                </div>
              </div>
              <button type="submit" class="btn btn-primary float-right">{{$t('labels.login')}}</button>
                <div class="form-check col-md-4">
                  <label for="rememberMe">
                    <input type="checkbox" v-model="rememberMe" style="margin-left: -20px;" id="rememberMe" class="form-check-input">{{$t('labels.rememberMe')}}
                  </label>
                </div>
            </form>
            <div class="dropdown-divider mt-4"></div>
            <div class="row">
              <h4 class="ml-3 pl-3 mt-3" style="color: rgb(255, 255, 255);">{{$t('labels.forgotPassword')}}</h4>
              <br/>
              <router-link to="" class="text-white ml-3 pl-3" @click.native="resetPassword()">{{$t('labels.clickHereToReset')}}</router-link>
            </div>
            <div class="row pl-3 mt-3" v-if="showReset">
              <div class="col-md-12">
              <form>
                <div class="form-group">
                  <input type="email" id="resetEmail" v-model="resetEmail" :placeholder="$t('labels.resetEmail')" class="form-control">
                  <label class="small">{{$t('labels.resetLinkInfo')}}</label>
                </div>
                <router-link to="" class="text-white" @click.native="resetPassword()">{{$t('buttons.cancel')}}</router-link>
                <button class="btn btn-primary float-right" :disabled="!resetEmail" style="cursor: pointer">{{$t('buttons.resetPassword')}}</button>
              </form>
              </div>
            </div>
            <div style="padding-bottom:1em; padding-top:1em;" class="">
              <template v-for="(item, ind) in $store.state.languages">
                    <div class="ml-2 float-right" :key="ind">
                      <router-link :key="ind" to="" @click.native="changeLanguage(ind)">
                        <img class="img-fluid" :src="`./assets/images/flags/${ind}.png`"/>
                      </router-link>
                    </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./login.component.ts" lang="ts"></script>
<style scoped>
  .loginBg {
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/images/login_bg.jpg");
    background-size: cover;
  }
  .loginHolder{
    background: rgba(128, 128, 128, 0.2);
    padding: 4%;
  }
  .bringToFront{
    z-index: 99;
    position: relative;
  }
  input {
    font-weight:600;
    font-size:1.1em;
  }
  h3, label {
    color:white;
  }
</style>
