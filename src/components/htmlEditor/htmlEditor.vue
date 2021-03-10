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
  <div class="pl-0 pr-0 text-left fullHeight">
    <div class="col-md-12 pl-0 pr-0 form-group fullHeight">
      <trumbowyg v-model="selectedContent" :config="editorConfig" class="form-control fullHeight" name="contactInfo"></trumbowyg>
    </div>
  </div>
</template>
<script type="ts" src="./htmlEditor.component.ts"></script>
<style scoped>
  .mlbtns .btn-group > .btn-outline-primary {
    border: solid 1px #d0d0d0;
    background-color: #f2f4f8;
    border-left: 0px;
  }
  .mlbtns .btn-group > .btn-outline-primary.active {
    background-color: #007bff;
  }
  .fullHeight{
    height: 60vh;
  }
</style>
