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
  <div>
    <toast-container :toastConfig="customConfig"></toast-container>
    <div id="app">
      <div v-if="isReady">
        <HomeComponent v-if="$store.state.authenticated"></HomeComponent>
        <LoginComponent v-else></LoginComponent>
      </div>
      <div v-else class="loader">
        <div class="row align-items-center justify-content-center fullHeight">
          <div class="col-md-12">
            <div class="spinner-grow text-primary" style="margin-left:49%; margin-bottom:2em;" role="status">
            </div>
            <div class="row">
              <div class=" col-md-12 text-center blink" style="font-size:2em; color:#909090">
                {{$t('labels.loading')}}<span class="animate-flicker">...</span>
              </div>
            </div>
            <div class="row">
              <div class="text-danger col-md-12 text-center fade-enter">
                {{errorMessage}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./app.component.ts"></script>
<style lang="scss">
  @keyframes flickerAnimation {
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-o-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-moz-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-webkit-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  .animate-flicker {
    -webkit-animation: flickerAnimation 1s infinite;
    -moz-animation: flickerAnimation 1s infinite;
    -o-animation: flickerAnimation 1s infinite;
    animation: flickerAnimation 1s infinite;
  }
  #app {
    font-family: "Nunito", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; why?? */
    color: #2c3e50;
  }
  .fullHeight{
    height: 100vh;
  }
  .loader{
    position: relative;
    width: 100%;
    height: 100%;
  }
  #nav {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#1c4cc3), to(#1c4cc3));
    background-image: linear-gradient(to bottom, #1c4cc3 0%, #1c4cc3 100%);
    background-repeat: repeat-x;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .toast{
    opacity: 1;
  }
</style>

