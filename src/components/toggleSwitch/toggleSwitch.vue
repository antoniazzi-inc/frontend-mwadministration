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
    <div class="anil_nepal">
        <label class="switch switch-left-right">
            <input :disabled="$props.disabled" ref="switchBtn" class="switch-input form-control" @click="emitClick($event)" @change="changeToggle($event)" type="checkbox">
            <span class="switch-label" :data-on="onText" :data-off="offText"></span> <span class="switch-handle"></span>
        </label>
    </div>
</template>
<script lang="ts" src="./toggleSwitch.component.ts"></script>
<style>
    .anil_nepal{ width:100%; display:block;}
    .switch {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 100px;
        height: 30px;
        padding: 3px;
        margin: 0 10px 10px 0;
        background: linear-gradient(to bottom, #eeeeee, #FFFFFF 25px);
        background-image: -webkit-linear-gradient(top, #eeeeee, #FFFFFF 25px);
        border-radius: 18px;
        box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        box-sizing: content-box;
    }
    label {
        font-weight: inherit;
    }
    input[type=checkbox], input[type=radio] {
        margin: 4px 0 0;

        line-height: normal;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0;
    }

    .switch-input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        box-sizing: content-box;
    }
    .switch-left-right .switch-input:checked ~ .switch-label {
        background: inherit;
    }
    .switch-input:checked ~ .switch-label {
        background: #E1B42B;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 3px rgba(0, 0, 0, 0.2);
    }
    .switch-left-right .switch-label {
        overflow: hidden;
    }
    .switch-label, .switch-handle {
        transition: All 0.3s ease;
        -webkit-transition: All 0.3s ease;
        -moz-transition: All 0.3s ease;
        -o-transition: All 0.3s ease;
    }
    .switch-label {
        position: relative;
        display: block;
        height: inherit;
        font-size: 10px;
        text-transform: uppercase;
        background: #eceeef;
        border-radius: inherit;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);
        box-sizing: content-box;
    }
    .switch-left-right .switch-input:checked ~ .switch-label:before {
        opacity: 1;
        left: 100px;
    }
    .switch-input:checked ~ .switch-label:before {
        opacity: 0;
    }
    .switch-left-right .switch-label:before {
        background: #eceeef;
        text-align: left;
        padding-left: 80px!important;
    }
    .switch-left-right .switch-label:before, .switch-left-right .switch-label:after {
        width: 20px;
        height: 20px;
        top: 4px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 11px 0 0 0;
        text-indent: -12px;
        border-radius: 20px;
        box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2), inset 0 0 3px rgba(0, 0, 0, 0.1);
    }
    .switch-label:before {
        content: attr(data-off);
        right: 11px;
        color: #aaaaaa;
        text-shadow: 0 1px rgba(255, 255, 255, 0.5);
    }

    span.switch-label:after {
        content: attr(data-on);
        left: 11px;
        color: #FFFFFF;
        text-shadow: 0 1px rgba(0, 0, 0, 0.2);
        position: absolute;

    }

    .switch-label:before, .switch-label:after {
        position: absolute;
        top: 50%;
        margin-top: -5px;
        line-height: 1;
        -webkit-transition: inherit;
        -moz-transition: inherit;
        -o-transition: inherit;
        transition: inherit;
        box-sizing: content-box;
    }

    .switch-left-right .switch-input:checked ~ .switch-label:after {
        left: 0!important;
        opacity: 1;
        padding-left: 20px;
        text-indent: 0px;
    }

    .switch-input:checked ~ .switch-label:after {
        opacity: 1;
    }

    .switch-left-right .switch-label:after {
        text-align: left;
        text-indent: 9px;
        background: #047bf8!important;
        left: -100px!important;
        opacity: 1;
        width: 100%!important;

    }
    .switch-left-right .switch-label:before, .switch-left-right .switch-label:after {
        width: 20px;
        height: 20px;
        top: 4px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 11px 0 0 0;
        text-indent: -30px;
        border-radius: 20px;
        box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2), inset 0 0 3px rgba(0, 0, 0, 0.1);
    }
    .switch-input:checked ~ .switch-handle {
        left: 74px;
        box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2);
    }
    .switch-label, .switch-handle {
        transition: All 0.3s ease;
        -webkit-transition: All 0.3s ease;
        -moz-transition: All 0.3s ease;
        -o-transition: All 0.3s ease;
    }

    .switch-handle {
        position: absolute;
        top: 4px;
        left: 4px;
        width: 28px;
        height: 28px;
        background: linear-gradient(to bottom, #FFFFFF 40%, #f0f0f0);
        background-image: -webkit-linear-gradient(top, #FFFFFF 40%, #f0f0f0);
        border-radius: 100%;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    }

    .switch-handle:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -6px 0 0 -6px;
        width: 12px;
        height: 12px;
        background: linear-gradient(to bottom, #eeeeee, #FFFFFF);
        background-image: -webkit-linear-gradient(top, #eeeeee, #FFFFFF);
        border-radius: 6px;
        box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);
    }

</style>
