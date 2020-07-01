<template>
  <div class="input-caption">
    <template v-if="h1"><h1>{{h1}}</h1><hr></template>
    <template v-if="h2"><h2>{{h2}}</h2><hr></template>
    <template v-if="h3"><h3>{{h3}}</h3><hr></template>
    <template v-if="h4"><h4>{{h4}}</h4><hr></template>
    <template v-if="h5"><h5>{{h5}}</h5><hr></template>
    <template v-if="text"><span>{{text}}</span><hr></template>
  </div>
</template>

<script>
  export default {
    name: "input-caption",
    props: {
      descriptor:{
        type: Object,
        required: true
      },
      h1: {required: false},
      h2: {required: false},
      h3: {required: false},
      h4: {required: false},
      h5: {required: false},
      text: {required: false},
    },
    created() {
      // 实现默认值功能
      if (!this.descriptor.props) {
        this.$set(this.descriptor, 'props', {});
      }
      this.$set(this.descriptor.props, 'formItem', false);    // 控制不作为formItem显示
    }
  }
</script>

<style lang="css" scoped>
  .input-caption{
    margin-left: 30px;
  }
</style>
