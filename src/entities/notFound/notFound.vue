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
  <div class="container-fluid">
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <div></div>
          <h1>404</h1>
        </div>
        <h2>{{$t('labels.pageNotFound')}}</h2>
        <p>{{$t('labels.notFoundText')}}</p>
        <router-link to="/">{{$t('labels.home')}}</router-link>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./notFound.component.ts"></script>
<style scoped>

  #notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .notfound {
    max-width: 460px;
    width: 100%;
    text-align: center;
    line-height: 1.4;
  }

  .notfound .notfound-404 {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0px auto 50px;
  }

  .notfound .notfound-404>div:first-child {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #ffa200;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    border: 5px dashed #000;
    border-radius: 5px;
  }

  .notfound .notfound-404>div:first-child:before {
    content: '';
    position: absolute;
    left: -5px;
    right: -5px;
    bottom: -5px;
    top: -5px;
    -webkit-box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.1) inset;
    border-radius: 5px;
  }

  .notfound .notfound-404 h1 {
    font-family: 'Cabin', sans-serif;
    color: #000;
    font-weight: 700;
    margin: 0;
    font-size: 90px;
    position: absolute;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    left: 50%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .notfound h2 {
    font-family: 'Cabin', sans-serif;
    font-size: 33px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 7px;
  }

  .notfound p {
    font-family: 'Cabin', sans-serif;
    font-size: 16px;
    color: #000;
    font-weight: 400;
  }

  .notfound a {
    font-family: 'Cabin', sans-serif;
    display: inline-block;
    padding: 10px 25px;
    background-color: #8f8f8f;
    border: none;
    border-radius: 40px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    -webkit-transition: 0.2s all;
    transition: 0.2s all;
  }

  .notfound a:hover {
    background-color: #2c2c2c;
  }
</style>
