<template>
  <div style="height: 500px; width: 500px">
    <span v-if="loading"> Loading... </span>
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />

      <l-geo-json :geojson="geojson" :options="options" />
    </l-map>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapGetters } from "vuex";
// import { GpsMapType, gpsMapModule } from "../store/modules/gpsmap";

@Component({
  computed: {
    ...mapGetters("Gpsloglist", {
      apiGpslogData: "apiGpslogData",
    }),
  },
})
export default class GpsMap extends Vue {
  name: string = "gps-map";

  loading: boolean = true;

  protected get geojson() {
    return JSON.parse(
      this.$store.getters["Gpsloglist/getApiGpslogData"].geojson
    );
  }
  // geojson: any = this.$store.state.Gpsloglist.apiGpslogData.geojson;

  zoom = 4.5;
  center = latLng(37.290443, 136.954193);
  url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  attribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  currentZoom = 4.5;
  currentCenter = latLng(37.290443, 136.954193);
  showParagraph = false;
  mapOptions = {
    zoomSnap: 0.5,
  };
  showMap = true;

  zoomUpdate(zoom: any) {
    this.currentZoom = zoom;
  }
  centerUpdate(center: any) {
    this.currentCenter = center;
  }
  showLongText() {
    this.showParagraph = !this.showParagraph;
  }
  innerClick() {
    alert("Click!");
  }

  // For geojson
  enableTooltip: boolean = false;
  options: any = {};

  async created() {
    // await gpsNapModule.getGpsloglistAll();
    // this.gpsmaps = gpsloglistModule.apiGpsloglist;
    this.loading = false;
  }
}
</script>
