<template>
  <div class="prefecture">
    <v-data-table :headers="headers" :items="prefectures"> </v-data-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { PrefectureType, prefectureModule } from '../store/modules/prefecture';

@Component
export default class Prefecture extends Vue {
  prefectures: PrefectureType[] = [];

  headers = [
    { text: 'id', align: 'right', value: 'id' },
    { text: 'name', align: 'left', value: 'name' },
  ];

  async created() {
    await prefectureModule.getPrefectures();
    this.prefectures = prefectureModule.apiPrefectures;
  }
}
</script>
