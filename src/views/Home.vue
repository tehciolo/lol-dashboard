<template>
  <div>
    {{ matches.length }}
    <ul>
      <li v-for="match in matches" :key="match.id">{{ match.id }}</li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import useApi from "../composables/useApi.js";

export default defineComponent({
  setup() {
    const { matches, getMatchHistory } = useApi();

    return {
      matches,
    };
  },
});
</script>
