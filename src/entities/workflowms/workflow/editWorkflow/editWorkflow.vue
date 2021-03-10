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

    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{workflow.name}}</span>

      <button class="btn btn-outline-primary btn-sm ml-3 mb-1">change name</button>

      <span style="color: green; margin-left:100px; font-size:0.6em; padding: 6px;">Workflow is active</span>
      <button class="btn btn-outline-primary btn-sm ml-1">deactivate</button>

      <router-link to="/workflows" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <span>{{$t('buttons.backToList')}}</span>
        </button>
      </router-link>
    </h2>

    <div class="row">
      <div class="col-md-12 m-0">
        <flow-editor></flow-editor>
      </div>
    </div>

  </div>
</template>
<script type="ts" src="./editWorkflow.component.ts"></script>
<style scoped>

</style>
