<template>
  <details>
    <summary>{{ summary || "详情" }}</summary>
    <pre class="en-text"> {{ content }} </pre>
  </details>
</template>

<script>
export default {
  name: "Translate",
  props: {
    summary: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scope>
details {
  border-radius: 4px;
  padding: 0.5em 0.5em 0;
}

summary {
  font-weight: 500;
  margin: -0.5em -0.5em 0;
  padding: 0.5em;
}

details[open] {
  padding: 0.5em;
}

details[open] > summary {
  margin-bottom: 0.5em;
}

details > .en-text {
  color: #999;
  line-height: 1.5;
  background-color: transparent;
  padding: 0;
  margin: 0;
  overflow: hidden;
  white-space: pre-wrap;
  font-family: "微软雅黑";
}
</style>
