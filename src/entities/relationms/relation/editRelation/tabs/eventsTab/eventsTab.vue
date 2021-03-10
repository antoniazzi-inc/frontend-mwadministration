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
  <div class="mt-3">
    <div id="tab1" class="tab-pane active show">
      <form class="form-inline justify-content-sm-start">
        <select class="form-control form-control-sm">
          <option value="Pending">All Time</option>
          <option value="Pending">Only Today</option>
          <option value="Pending">Last 7 days</option>
          <option value="Pending">Last 30 days</option>
          <option value="Pending">This Year</option>
          <option value="Pending">2017</option>
        </select>
        <select class="form-control form-control-sm">
          <option value="Pending">All Events</option>
          <option value="Pending">Listmanager subscriptions</option>
          <option value="Pending">Workflows</option>
          <option value="Pending">Clicks</option>
          <option value="Pending">Opens</option>
          <option value="Pending">Purchases</option>
        </select>
        <input type="search" class="form-control form-control-sm" placeholder="search...">
      </form>

      <div class="timed-activities padded" style="padding-left:0;">
        <div class="timed-activity" style="font-size:0.9em;">
          <div class="ta-date">
            <span>21st Jan, 2017</span>
          </div>
          <div class="ta-record-w">
            <div class="ta-record">
              <div class="ta-timestamp">
                <strong>11:55</strong> am
              </div>
              <div class="ta-activity">
                Created a post called <a href="#">Register new symbol</a> in Rogue
              </div>
            </div>
            <div class="ta-record">
              <div class="ta-timestamp">
                <strong>2:34</strong> pm
              </div>
              <div class="ta-activity">
                Commented on story <a href="#">How to be a leader</a> in <a href="#">Financial</a> category
              </div>
            </div>
            <div class="ta-record">
              <div class="ta-timestamp">
                <strong>7:12</strong> pm
              </div>
              <div class="ta-activity">
                Added <a href="#">John Silver</a> as a friend
              </div>
            </div>
            <div class="ta-record">
              <div class="ta-timestamp">
                <strong>9:39</strong> pm
              </div>
              <div class="ta-activity">
                Started following user <a href="#">Ben Mosley</a>
              </div>
            </div>
          </div>
        </div>
        <div class="timed-activity" style="font-size:0.9em;">
          <div class="ta-date">
            <span>3rd Feb, 2017</span>
          </div>
          <div class="ta-record-w">
            <div class="ta-record">
              <div class="ta-timestamp">
                <strong>9:32</strong> pm
              </div>
              <div class="ta-activity">
                Added <a href="#">John Silver</a> as a friend
              </div>
            </div>
            <div class="ta-record">
              <div class="ta-timestamp">
                <strong>5:14</strong> pm
              </div>
              <div class="ta-activity">
                Commented on story <a href="#">How to be a leader</a> in <a href="#">Financial</a> category
              </div>
            </div>
          </div>
        </div>
        <div class="timed-activity" style="font-size:0.9em;">
          <div class="ta-date">
            <span>21st Jan, 2017</span>
          </div>
          <div class="ta-record-w">
            <div class="ta-record">
              <div class="ta-timestamp">
                <strong>11:55</strong> am
              </div>
              <div class="ta-activity">
                Created a post called <a href="#">Register new symbol</a> in Rogue
              </div>
            </div>
            <div class="ta-record">
              <div class="ta-timestamp">
                <strong>14:34</strong> pm
              </div>
              <div class="ta-activity">
                Commented on story <a href="#">How to be a leader</a> in <a href="#">Financial</a> category
              </div>
            </div>
            <div class="ta-record">
              <div class="ta-timestamp">
                <strong>19:39</strong> pm
              </div>
              <div class="ta-activity">
                Started following user <a href="#">Ben Mosley</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./eventsTab.component.ts"></script>
<style>
  .padded{
    padding: 1rem 2rem;
  }
  .timed-activities {
    margin-bottom: 1rem;
  }
  .timed-activity {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 2rem;
    font-size: 1.08rem;
  }
  .timed-activity .ta-date {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 130px;
    flex: 0 0 130px;
    color: rgba(0, 0, 0, 0.4);
    position: relative;
    text-align: center;
  }
  .timed-activity .ta-date:before {
    content: '';
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: -20px;
    width: 1px;
    top: 70px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .timed-activity .ta-date {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 130px;
    flex: 0 0 130px;
    color: rgba(0, 0, 0, 0.4);
    position: relative;
    text-align: center;
  }
  .timed-activity .ta-date span {
    position: relative;
    display: inline-block;
  }
  .timed-activity .ta-date span:after {
    content: '';
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: -30px;
    width: 16px;
    height: 16px;
    border: 3px solid #c76dc8;
    border-radius: 8px;
    background-color: #fff;
  }
  .timed-activity .ta-record-w {
    padding-left: 40px;
  }
  .timed-activity .ta-record {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 10px;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .timed-activity .ta-timestamp {
    position: relative;
    padding-right: 40px;
    color: rgba(0, 0, 0, 0.4);
    width: 110px;
    white-space: nowrap;
  }
  .timed-activity .ta-timestamp:after {
    content: '\E910';
    font-family: 'osfont' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: rgba(0, 0, 0, 0.3);
    font-size: 10px;
    position: absolute;
    top: 50%;
    right: 15px;
    -webkit-transform: translateY(-40%);
    transform: translateY(-40%);
    display: block;
  }
  .timed-activity .ta-activity a {
    display: inline-block;
    padding-bottom: 1px;
    border-bottom: 1px solid #047bf8;
  }
</style>
