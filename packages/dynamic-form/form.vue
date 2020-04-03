<template>
  <div class="dynamic-form" :style="style">
    <el-form
      v-if="_value"
      ref="dynamic-form"
      :model="_value"
      :disabled="false"
      v-bind="$attrs"
    >
      <dynamic-form-item
        v-for="(descriptor, index) in descriptors"
        v-model="_value[descriptor.prop]"
        :key="index"
        :formAttr="$attrs"
        :lang="lang"
        :label="descriptor.label || descriptor.prop"
        :prop="descriptor.prop"
        :label-width="labelWidth"
        :descriptor="descriptor"
        :language="language"
        :size="size"
        :background-color="backgroundColor"
        :bg-color-offset="bgColorOffset"
        :show-outer-error="showOuterError">
      </dynamic-form-item>
      <el-form-item v-if="$slots.operations" class="operations" :label-width="labelWidth">
        <slot name="operations"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DynamicFormItem from '../dynamic-form-item/form-item'
import { findTypeDescriptor, getLabelWidth, isComplexType } from '../utils'
import i18n from '../i18n'
import { throttle } from 'throttle-debounce'

export default {
  name: 'dynamic-form',
  props: {
    value: {
      type: Object,
      required: true
    },
    lang: {
      type: String,
      default: 'zh_CN'
    },
    /**
     * custom languages, format refer to packages/i18n.js
     */
    languages: Object,
    /**
     * descriptor of value, extend from https://github.com/yiminghe/async-validator
     */
    descriptors: {
      type: Array,
      required: true
    },
    /**
     * size of the input component
     */
    size: {
      type: String,
      default: 'small'
    },
    /**
     * background-color of form
     */
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    /**
     * font-size of form
     */
    fontSize: {
      type: Number,
      default: 14
    },
    /**
     * whether show parent component's error, default true
     */
    showOuterError: {
      type: Boolean,
      default: true
    },
    /**
     * darken sub-form's background-color with offset while get positive integer
     */
    bgColorOffset: {
      type: Number,
      default: 8
    }
  },
  components: {
    DynamicFormItem
  },
  computed: {
    _value: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    labelWidth () {
      return getLabelWidth(this.descriptors, this.fontSize)
    },
    style () {
      const style = {
        fontSize: `${this.fontSize}px`,
        backgroundColor: this.backgroundColor
      }
      return style
    },
    language () {
      return (this.languages || i18n)[this.lang]
    }
  },
  data () {
    return {
      i18n
    }
  },
  created () {
    this.init()
  },
  watch: {
    value: {
      handler (formData) {
        if (formData) {
          // 联动属性检测
          this.checkLinkage()
        }
      },
      deep: true
    }
  },
  methods: {
    findTypeDescriptor,
    init () {
      this.initValue()
    },
    initValue () {
      for (const i in this.descriptors) {
        this.setValueKey(this, this._value, this.descriptors[i].prop, this.descriptors[i])
      }
    },
    // 初始化value，方便不预输入
    setValueKey (target, value, key, descriptor) {
      if (isComplexType(descriptor.component)) {
        // object
        if (descriptor.component === 'input-object') {
          // normal object
          if (value[key] === undefined) {
            target.$set(value, key, {})
          }
          for (const _index in descriptor.fields) {
            target.setValueKey(target, value[key], descriptor.fields[_index].prop, descriptor.fields[_index])
          }
        } else if (descriptor.component === 'input-map') {
          // hashmap
          if (value[key] === undefined) {
            target.$set(value, key, {})
          }
        } else if(descriptor.component === 'input-array'){
          // array
          if (value[key] === undefined) {
            target.$set(value, key, [])
          }
        } else if(descriptor.component === 'GroupingSelect'){
          target.$set(value, key, {})
        }
      } else {
        if (value[key] === undefined) {
          target.$set(value, key, null)
        }
      }
    },
    validate (func) {
      if (typeof func === 'function') {
        this.$refs['dynamic-form'].validate(valid => {
          func(valid)
        })
      } else {
        return new Promise((resolve, reject) => {
          this.$refs['dynamic-form'].validate(valid => {
            resolve(valid)
          })
        })
      }
    },
    resetFields () {
      this.$refs['dynamic-form'].resetFields()
    },
    clearValidate () {
      this.$refs['dynamic-form'].clearValidate()
    },
    // 检测联动
    checkLinkage () {
      this.checkLinkageFn = throttle(300, () => {
        const formDesc = this.descriptors
        const formData = this.value
        Object.keys(formDesc).forEach(field => {
          const formItem = formDesc[field]

          // 触发 onChangeShow 显示 / 隐藏
          if (typeof formItem.onChangeShow === 'function') {
            let show = formItem.onChangeShow(formData)
            this.$set(formItem, 'show', show)
            if (!show) {
              // 如果隐藏, 则删除值
              this.value[field] = null
            }
          }

          // 触发 onChangeDisabled 禁用 / 启用
          if (typeof formItem.onChangeDisabled === 'function') {
            let disabled = formItem.onChangeDisabled(formData)
            this.$set(formItem, 'disabled', disabled)
          }
        })
      })
      this.checkLinkageFn()
    },
    // 定义联动属性的descriptor
    defineLinkageProperty (value) {
      return {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
      }
    },
  }
}
</script>

<style lang="scss">
// cover element's css avoid the nested error style
.dynamic-form {
  .el-form-item.is-success, .add-key-input-group {
    .el-input__inner,
    .el-input__inner:focus,
    .el-textarea__inner,
    .el-textarea__inner:focus {
      border-color: #DCDFE6;
    }
  }
}
</style>
