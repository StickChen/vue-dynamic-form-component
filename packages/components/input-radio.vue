<template>
  <el-radio-group v-model="_value">
    <el-radio-button :key="index" v-for="(item, index) in descriptor.options" :label="item['value']">{{item['label']}}</el-radio-button>
  </el-radio-group>
</template>

<script>
  export default {
    name: "input-radio",
    props: {
      value: {
        required: true
      },
      descriptor: {
        type: Object,
        required: true
      },
    },
    data() {
      return {};
    },
    computed: {
      _value: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      },
    },
  }
</script>

<style scoped>

</style>
