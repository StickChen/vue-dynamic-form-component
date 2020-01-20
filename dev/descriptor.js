export default {
  string: {
    key: "string",
    component: 'input-string',
    required: true,
    placeholder: 'textarea placeholder',
    col: {
      span: 8
    },
    props: {autocomplete: 'on', type: 'textarea', rows: 4},
    rules: {},
  },
  url: {key:'url',rules: {type: 'url', message: 'The url must be an url'}},
  object: {
    component: 'input-object',
    label: 'object label',
    fields: {
      boolean: {component: 'input-switch', required: true},
      string: {component: 'input-string', required: true, hidden: false},
      date: {component: 'input-date', required: true},
      url: {
        component: 'input-string',
        message: 'The url must be an url',
        props: {placeholder: 'please input the url'},
        rules: {type: 'url', message: 'The url must be an url'}
      }
    }
  },
  hashmap: {
    component: 'input-map',
    label: 'hashmap label',
    defaultField: {
      component: 'input-string',
      required: true,
      rules: {type: 'url', message: 'The url must be an url'},
    }
  },
  array: {
    component: 'input-array',
    label: 'array label',
    defaultField: {
      component: 'input-object',
      fields: {
        string: {component: 'input-string', required: true},
        url: {component: 'input-string', rules: {type: 'url', message: 'The url must be an url'}, props: {placeholder: 'please input the url'}}
      }
    }
  },
  multiSelect: {
    component: 'input-array',
    label: 'array label',
    defaultField: {
      component: 'input-select',
      multiple: true,
      enum: [0, 1, 2, 3],
      options: [
        {label: 'option-0', value: 0, disabled: true},
        {label: 'option-1', value: 1},
        {label: 'option-2', value: 2},
        {label: 'option-3', value: 3}
      ]
    }
  },
  select:{
    component: 'input-radio',
    multiple: false,
    label: "操作",
    enum: [0, 1, 2],
    options: [
      {label: '同意', value: 0},
      {label: '驳回', value: 1},
      {label: '待定', value: 2},
    ]
  },
  optDesc:{
    label:"联动意见",
    onChangeShow: function (data) {
      return data.select === 1 || data.select === 2;
    },
    onChangeDisabled: function (data) {
      return data.select === 2;
    },
  }
}
