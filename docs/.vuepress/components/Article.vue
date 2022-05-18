<template>
  <div class="article">
    <audio :src="'/tape' + path" preload="metadata" controls>
      Your browser does not support the <code>audio</code> element.
    </audio>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log(this);
  },
  methods: {},
};
</script>

<style></style>
