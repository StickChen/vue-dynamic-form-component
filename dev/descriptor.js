const array = [
  {
    prop: 'array',
    component: 'input-array',
    label: 'array label',
    defaultField: {
      component: 'input-object',
      fields: [
        { prop: 'string', component: 'input-string', required: true },
        {
          prop: 'url',
          component: 'input-string',
          rules: { type: 'url', message: 'The url must be an url' },
          props: { placeholder: 'please input the url' }
        }
      ]
    }
  },
  {
    prop:'object',
    component: 'input-object',
    label: 'object label',
    fields: [
      { prop: 'boolean', component: 'input-switch', required: true },
      { prop: 'string', component: 'input-string', required: true, hidden: false },
      { prop: 'date', component: 'input-date', required: true },
      {
        prop: 'url',
        component: 'input-string',
        message: 'The url must be an url',
        props: { placeholder: 'please input the url' },
        rules: { type: 'url', message: 'The url must be an url' }
      }
    ]
},
  {
    prop:'hashmap',
    component: 'input-map',
    label: 'hashmap label',
    defaultField: {
      component: 'input-string',
      required: true,
      rules: { type: 'url', message: 'The url must be an url' },
  }
},
  {
    prop: 'select',
    component: 'input-radio',
    multiple: false,
    label: '操作',
    enum: [0, 1, 2],
    options: [
      { label: '同意', value: 0 },
      { label: '驳回', value: 1 },
      { label: '待定', value: 2 },
    ]
  },
  {
    prop: 'optDesc',
    label: '联动意见',
    onChangeShow: function (data) {
      return data.select === 1 || data.select === 2
    },
    onChangeDisabled: function (data) {
      return data.select === 2
    },
  },
  {
    prop:'module',
    label: '模块',
    component: 'GroupingSelect',
    props: {
      selector: {
        component: 'input-select',
        prop:'moduleType',
      },
      subGroups: [    //
        {
          value: 'infoShow1',
          label: '信息展示',
          inputs: [
            {
              prop: 'template',
              component: 'input-string',
              hidden: true,
              defaultValue: 'infoShow',
            },
            {
              prop: 'title',
              label: '主标题',
              component: 'input-string',
            },
            {
              prop: 'subTitle',
              label: '副标题',
              component: 'input-string',
            },
          ],
        },
        {
          value: 'image1',
          label: '导航图',
          inputs: [
            {
              prop: 'template',
              component: 'input-string',
              hidden: true,
              defaultValue: 'image',
            },
            {
              prop: 'title',
              label: '标题',
              component: 'input-string',
            },
            {
              label: '大小',
              prop: 'size',
              component: 'input-select',
              options: [
                {label: '小', value: 'min'},
                {label: '中', value: 'middle'},
                {label: '大', value: 'large'},
              ]
            },
            {
              prop: 'address',
              label: '地址',
              component: 'input-string',
            }
          ],
        }
      ]
    }
  }
]
const complex = [

]

export default [
  {
    prop: 'string',
    component: 'input-string',
    required: true,
    placeholder: 'textarea placeholder',
    col: {
      span: 8
    },
    props: { autocomplete: 'on', },
    rules: {},
  },
  {
    prop: 'textarea',
    component: 'input-string',
    required: true,
    placeholder: 'textarea placeholder',
    col: {
      span: 8
    },
    props: { autocomplete: 'on', type: 'textarea', rows: 4 },
    rules: {},
  },
  { prop: 'url', rules: { type: 'url', message: 'The url must be an url' } },
  ...array
]
