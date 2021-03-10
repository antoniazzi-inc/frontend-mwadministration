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
    <div class="container-fluid group-operator" :class="{ 'vue-query-builder-styled': true}">
        <group-component name="groupComp"
            :index="-1"
            :query="query"
            :rules="mergedRules"
            :maxDepth="maxDepth"
            :depth="depth"
            :styled="true"
            :onlyActiveEntities="onlyActiveEntities"
            type="group"
        ></group-component>
    </div>
</template>
<script lang="ts" src="./queryBuilder.component.ts">
</script>
<style>
    .vue-query-builder-styled .vqb-rule {
        margin-top: 15px;
        background-color: #f5f5f5;
        background-color: #5C9BD1;
        color: white;
        border-color: #ddd;
        padding: 15px;
    }

    .vue-query-builder-styled .vqb-rule label {
        margin-right: 10px;
    }

    .vue-query-builder-styled .vqb-group.depth-1 .vqb-rule,
    .vue-query-builder-styled .vqb-group.depth-2 {
        border-left: 2px solid #8bc34a;
    }

    .vue-query-builder-styled .vqb-group.depth-2 .vqb-rule,
    .vue-query-builder-styled .vqb-group.depth-3 {
        border-left: 2px solid #00bcd4;
    }

    .vue-query-builder-styled .vqb-group.depth-3 .vqb-rule,
    .vue-query-builder-styled .vqb-group.depth-4 {
        border-left: 2px solid #ff5722;
    }

    .vue-query-builder-styled .close {
        opacity: 1;
        color: rgb(150,150,150);
    }

    @media (min-width: 768px) {
        .vue-query-builder-styled .vqb-rule.form-inline .form-group {
            display: block;
        }
    }
</style>
