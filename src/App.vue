<template>
  <div>
    <toast-container :toastConfig="customConfig"></toast-container>
    <div id="app">
      <div>
        <HomeComponent v-if="$store.state.authenticated"></HomeComponent>
        <LoginComponent v-else></LoginComponent>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./app.component.ts"></script>
<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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

