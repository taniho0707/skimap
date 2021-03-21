<template>
  <div class="test">
    <h1>Test Page</h1>
    <v-btn large color="primary">テスト</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Test extends Vue {}
</script>
