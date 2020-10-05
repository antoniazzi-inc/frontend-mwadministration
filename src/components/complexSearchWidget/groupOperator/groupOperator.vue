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
