<template>
  <div>
    <v-data-table :headers="headers" :items="gpslogs" @click:row="clickRow" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { GpsloglistType, gpsloglistModule } from "../store/modules/gpsloglist";

@Component
export default class GpslogList extends Vue {
  gpslogs: GpsloglistType[] = [];

  name: string = "gpslog-list";

  headers = [
    { text: "Date", align: "left", value: "date" },
    { text: "Resort", align: "left", value: "resort" },
    { text: "Skier", align: "left", value: "skier" },
  ];

  clickRow(row: any) {
    console.log(row.id);
    this.$store.dispatch("Gpsloglist/getGpslogById", row.id);
  }

  async created() {
    await gpsloglistModule.getGpsloglistAll();
    this.gpslogs = gpsloglistModule.apiGpsloglist;
  }
}
</script>
