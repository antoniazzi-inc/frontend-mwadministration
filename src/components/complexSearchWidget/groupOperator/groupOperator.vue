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
  <div class="container-fluid group-operator">
    <div class="row">
      <div class="col-md-12">
        <div class="dropdown" :class="{ show: expanded }">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            :aria-expanded="String(expanded)"
            v-text="groupOperator.currentOperator"
            @click.prevent.stop="toggleExpanded"
          />
          <div
            class="dropdown-menu"
            :class="{ show: expanded }"
            aria-labelledby="dropdownMenuButton"
          >
            <a
              v-for="operator in groupOperator.operators"
              :key="operator.identifier"
              v-text="operator.name"
              @click.prevent.stop="selectOperator(operator.identifier)"
              class="dropdown-item"
              href="#"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./groupOperator.component.ts"/>
<style scoped>
  .group-operator {
    margin-top: 16px;
    margin-bottom: 16px;
  }
</style>
