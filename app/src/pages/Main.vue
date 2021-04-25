<template>
  <div class="main">
    <div class="div-head">Logo</div>
    <div class="div-body">
      <div class="div-left-search">
        <div class="div-left-date">
          Date:
          <v-calendar trim-weeks />
        </div>
        <div class="div-left-skier">
          Skier:
          <v-select />
        </div>
        <div class="div-left-resort">
          Resort:
          <v-select />
        </div>
        <div class="div-left-list">
          List:
          <gpslog-list />
        </div>
      </div>
      <div class="div-right-data">
        <div class="div-right-head">Info</div>
        <div class="div-right-upper">
          <div class="div-right-map">
            <div class="div-right-leaflet">
              <gps-map />
            </div>
            <div class="div-right-slidebar">
              <vue-slide-bar />
            </div>
          </div>
          <div class="div-right-status">
            <table>
              <tr>
                <td>Height (sliding)</td>
              </tr>
              <tr>
                <td>Height (Max)</td>
              </tr>
              <tr>
                <td>Height (Min)</td>
              </tr>
              <tr>
                <td>Ride lift</td>
              </tr>
              <tr>
                <td>Distance</td>
              </tr>
              <tr>
                <td>Max speed</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="div-right-lower">
          <div class="div-right-height"></div>
          <div class="div-right-speed"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import GpslogList from "./GpslogList.vue";
import GpsMap from "./GpsMap.vue";

@Component({
  components: {
    GpslogList,
    GpsMap,
  },
})
export default class Main extends Vue {}
</script>

<style>
.div-head {
  height: 4em;
}
.div-body:after {
  content: "";
  display: block;
  clear: both;
}
.div-left-search {
  float: left;
  width: 25em;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
  padding-right: 1em;
}
.div-left-date {
  float: left;
  padding-left: 1em;
  padding-top: 1em;
  width: 100%;
  height: 15em;
  text-align: left;
}
.div-left-skier {
  float: left;
  padding-left: 1em;
  padding-top: 1em;
  width: 100%;
  height: 6em;
  text-align: left;
}
.div-left-resort {
  float: left;
  padding-left: 1em;
  padding-top: 1em;
  width: 100%;
  height: 6em;
  text-align: left;
}
.div-left-list {
  float: left;
  padding-left: 1em;
  padding-top: 1em;
  width: 100%;
  text-align: left;
  display: flex;
}

.div-right-data {
  float: left;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
  padding-right: 1em;
  width: calc(100% - 25em);
}

.div-right-head {
  float: left;
  height: 3em;
  width: 100%;
  padding-left: 1em;
  padding-top: 1em;
  text-align: left;
}
.div-right-head:after {
  content: "";
  display: block;
  clear: both;
}

.div-right-upper {
  float: left;
  text-align: left;
  width: 100%;
  display: flex;
}
.div-right-map {
  float: left;
  text-align: left;
  height: 100%;
  width: 100%;
}
.div-right-leaflet {
  float: left;
  text-align: left;
  display: flex;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
  padding-right: 1em;
}
.div-right-slidebar {
  float: left;
  text-align: left;
  height: 4em;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
  padding-right: 1em;
}
.div-right-status {
  float: right;
  text-align: left;
  width: 50em;
  height: 100%;
}
.div-right-lower {
  float: left;
  text-align: left;
  height: 25em;
  width: 100%;
}
.div-right-height {
  float: left;
  text-align: left;
  height: 100%;
  width: 50%;
}
.div-right-speed {
  float: left;
  text-align: left;
  height: 100%;
  width: 50%;
}
</style>
