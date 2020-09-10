<template>

  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span>Home Dashboard</span>
    </h2>


    <div class="content-w">
      <div class="content-i">
    <div class="content-box">
    <div class="row">
      <div class="col-sm-12">
        <div class="element-wrapper">
          <h6 class="element-header" style="font-weight:800">
            Welcome to the Dashboard
          </h6>
          <div class="element-box">
            info box 1
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>


    <!-- TO DO create help component -->
    <div class="floated-chat-btn" @click="showHelp=true">
    <i class="os-icon os-icon-mail-07"></i><span>Help</span>
  </div>
    <div class="floated-chat-w active" v-if="showHelp">
    <div class="floated-chat-i">
      <div class="chat-close" @click="showHelp=false">
        <i class="os-icon os-icon-close"></i>
      </div>
      <div class="chat-head">
        <div class="user-w with-status status-green">
          <div class="user-avatar-w">
            <div class="user-avatar">
              <img alt="" src="img/avatar1.jpg">
            </div>
          </div>
          <div class="user-name">
            <h6 class="user-title">
              Kristijan
            </h6>
            <div class="user-role">
              Support Desk
            </div>
          </div>
        </div>
      </div>
      <div class="chat-messages ps ps--theme_default ps--active-y" data-ps-id="38b730d3-85fa-30de-0f7a-6b8cac03211f">
        <div class="message">
          <div class="message-content">
            Hi, how can I help you?
          </div>
        </div>
        <div class="date-break">
          Mon 10:20am
        </div>
        <div class="message">
          <div class="message-content">
            Hi, my name is Mike, I will be happy to assist you
          </div>
        </div>
        <div class="message self">
          <div class="message-content">
            Hi, I tried ordering this product and it keeps showing me error code.
          </div>
        </div>
        <div class="ps__scrollbar-x-rail" style="left: 0px; bottom: 0px;"><div class="ps__scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps__scrollbar-y-rail" style="top: 0px; height: 300px; right: 0px;"><div class="ps__scrollbar-y" tabindex="0" style="top: 0px; height: 266px;"></div></div></div>
      <div class="chat-controls">
        <input class="message-input" placeholder="Type your message here..." type="text">
        <div class="chat-extra">
          <a href="#"><span class="extra-tooltip">Attach Document</span><i class="os-icon os-icon-documents-07"></i></a><a href="#"><span class="extra-tooltip">Insert Photo</span><i class="os-icon os-icon-others-29"></i></a><a href="#"><span class="extra-tooltip">Upload Video</span><i class="os-icon os-icon-ui-51"></i></a>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>
<script src="./homeDashboard.component.ts" lang="ts"></script>
