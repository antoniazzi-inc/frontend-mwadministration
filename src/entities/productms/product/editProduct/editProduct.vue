<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <product-edit-tabs-component :product="product" ref="editTabs"
                                      @updateProduct="updateProduct"></product-edit-tabs-component>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./editProduct.component.ts"></script>
<style scoped>
  .user-profile {
    border-radius: 6px;
    background-color: #fff;
    -webkit-animation-name: fadeUp;
    animation-name: fadeUp;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
  }
  .up-head-w:before {
    z-index: 1;
    content: '';
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-image: -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(rgba(0, 0, 0, 0.2)), color-stop(70%), to(rgba(0, 0, 0, 0.5)));
    background-image: linear-gradient(20deg, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.5) 70%);
  }

  .user-profile .up-head-w:before {
    z-index: 1;
    content: '';
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2), 70%, rgba(0, 0, 0, 0.5));
  }

  .up-head-w {
    background-color: #1c4cc3;
    ackground-size: cover;
    background-position: center center;
    position: relative;
    color: #fff;
    border-radius: 6px 6px 0px 0px;
  }

  .up-main-info {
    padding: 15% 5% 5% 5%;
    position: relative;
    z-index: 4;
  }

  .rounded {
    border-radius: 100px !important;
    border: 3px solid white;
  }

  .edit-btn {
    position: absolute;
    z-index: 99999;
    left: 2%;
    top: 2%;
  }

  .up-controls {
    margin-top: 10px;
  }

  .up-header {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    display: inline-block;
    margin-bottom: 10px;
    font-size: 1.5rem;
    margin-bottom: 10px;
    margin-top: 20px;
    padding-bottom: 5px;
  }

  .user-profile .up-head-w .decor .decor-path {
    fill: #fff;
  }

  .user-profile .up-head-w .decor {
    position: absolute;
    bottom: -1px;
    right: 0px;
    max-width: 100%;
    z-index: 3;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  svg {
    vertical-align: middle;
  }

  .up-sub-header {
    font-size: 0.81rem;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
    color: rgba(255, 255, 255, 0.8);
  }

  .status-pill {
    width: 12px;
    height: 12px;
    border-radius: 30px;
    background-color: #eee;
    display: inline-block;
    vertical-align: middle;
  }

  .status-pill.green {
    background-color: #71c21a;
  }

  .status-pill.red {
    background-color: #c21a1a;
  }

  .groups-holder {
    max-height: 400px;
    overflow-y: auto;
  }
</style>
