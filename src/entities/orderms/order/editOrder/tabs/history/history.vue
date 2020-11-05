<template>
    <div class="tab-form-panel">
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
    </div>
</template>
<script lang="ts" src="./history.component.ts">
</script>
<style scoped>

</style>
