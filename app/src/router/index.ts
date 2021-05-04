import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Prefecture from '../pages/Prefecture.vue';
import Main from '../pages/Main.vue';

const VCalendar = require('v-calendar');
const vSelect = require('vue-select');

import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LGeoJson } from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
const VueSlideBar = require('vue-slide-bar');

Vue.use(VueRouter);

Vue.use(VCalendar, {});
Vue.component(vSelect);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-geo-json', LGeoJson);
Vue.component('l-marker', LMarker);
Vue.component('l-tooltip', LTooltip);
Vue.component('l-popup', LPopup);

Vue.component('vue-slide-bar', VueSlideBar);

const routes: Array<RouteConfig> = [{
  path: '/',
  name: 'Main',
  component: Main
}, {
  path: '/prefecture',
  name: 'Prefecture',
  component: Prefecture
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
