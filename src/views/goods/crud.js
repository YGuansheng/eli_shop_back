export const crudOptions = () => {
  return {
    pageOptions: {
      compact: true
    },
    options: {
      height: '100%'
    },
    viewOptions: {
      componentType: 'row'
    },
    formOptions: {
    },
    formGroup: { // 表单分组
      type: 'collapse', // tab暂未实现
      accordion: false,
      groups: { // 分组
        base: { // 分组key
          title: '商品基础信息', // 分组标题
          disabled: false, // 禁止展开或收起
          show: true, // 是否显示
          icon: 'el-icon-goods', // 分组标题前的图标
          columns: [
            'product_title', 'short_title', 'main_image', 'images', 'product_video', 'product_des', 'product_unit',
            'product_code', 'product_spu', 'product_sku', 'bar_code', 'product_stock', 'product_sales',
            'market_price', 'shop_price', 'cost_price', 'weight', 'volume', 'sort', 'limit', 'on_sale',
            'is_postage', 'shipment_id'
          ] // 该组内包含的字段列表
        },
        content: { // 分组key
          title: '商品详情', // 分组标题
          disabled: false, // 禁止展开或收起
          show: true, // 是否显示
          icon: 'el-icon-goods', // 分组标题前的图标
          columns: ['content'] // 该组内包含的字段列表
        }
      }
    },
    rowHandle: {
      fixed: 'right',
      view: {
        thin: true,
        text: null
      },
      edit: {
        thin: true,
        type: 'primary',
        circle: true,
        text: null
      },
      remove: {
        thin: true,
        text: null
      },
      width: 140
    },
    columns: [
      {
        title: '商品标题',
        key: 'product_title',
        width: 90,
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '请输入商品标题' }
          ]
        },
        component: {
        }
      },
      {
        title: '商品短名称',
        key: 'short_title',
        width: 90,
        search: {
          disabled: false
        },
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '商品短名称' }
          ]
        },
        component: {
        }
      },
      {
        title: '商品主图',
        key: 'main_image',
        width: 90,
        type: 'avatar-uploader'
      },
      {
        title: '商品相册',
        key: 'images',
        type: 'image-uploader',
        width: 150,
        align: 'left',
        form: {
          component: {
            props: {
              uploader: {
                type: 'form'
              },
              elProps: { // 与el-uploader 配置一致
                multiple: true,
                limit: 5 // 限制5个文件
              },
              sizeLimit: 50 * 1024 // 不能超过限制
            },
            span: 24
          },
          helper: '限制文件大小不能超过50k'
        }
      },
      {
        title: '商品简介',
        key: 'product_des',
        width: 90,
        type: 'text-area',
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '商品简介' }
          ]
        },
        component: {
        }
      },
      {
        title: '商品单位',
        key: 'product_unit',
        width: 90,
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '商品单位' }
          ],
          component: {
            span: 12
          }
        }
      },
      {
        title: '商品货号',
        key: 'product_code',
        width: 90,
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '商品货号' }
          ],
          component: {
            span: 12
          }
        },
        component: {
        }
      },
      {
        title: '商品SPU',
        key: 'product_spu',
        width: 90,
        form: {
          rules: [ // 表单校验规则
            { required: false, message: '商品SPU' }
          ],
          component: {
            span: 12
          }
        },
        component: {
        }
      },
      {
        title: '商品SKU',
        key: 'product_sku',
        width: 90,
        form: {
          rules: [ // 表单校验规则
            { required: false, message: '商品SKU' }
          ],
          component: {
            span: 12
          }
        },
        component: {
        }
      },
      {
        title: '商品条码',
        key: 'bar_code',
        width: 90,
        form: {
          rules: [ // 表单校验规则
            { required: false, message: '商品条码' }
          ],
          component: {
            span: 12
          }
        },
        component: {
        }
      },
      {
        title: '商品库存',
        key: 'product_stock',
        width: 90,
        type: 'number',
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '商品库存' }
          ],
          component: {
            span: 12
          },
          value: 0
        },
        component: {
        }
      },
      {
        title: '商品销量',
        key: 'product_sales',
        width: 90,
        type: 'number',
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '商品销量' }
          ],
          component: {
            span: 12
          },
          value: 0
        },
        component: {
        }
      },
      {
        title: '市场售价',
        key: 'market_price',
        width: 90,
        type: 'number',
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '市场售价' }
          ],
          component: {
            span: 12,
            step: 0.01
          },
          value: 0.0
        },
        component: {
        }
      },
      {
        title: '本店售价',
        key: 'shop_price',
        width: 90,
        type: 'number',
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '本店售价' }
          ],
          component: {
            span: 12,
            step: 0.01
          },
          value: 0.0
        },
        component: {
        }
      },
      {
        title: '成本售价',
        key: 'cost_price',
        width: 90,
        type: 'number',
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '成本售价' }
          ],
          component: {
            span: 12,
            step: 0.01
          },
          value: 0.0
        },
        component: {
        }
      },
      {
        title: '重量',
        key: 'weight',
        width: 90,
        type: 'number',
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '重量' }
          ],
          component: {
            span: 12,
            step: 0.1
          },
          value: 0.0
        },
        component: {
        }
      },
      {
        title: '体积',
        key: 'volume',
        width: 90,
        type: 'number',
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '体积' }
          ],
          component: {
            span: 12,
            step: 0.1
          },
          value: 0.0
        },
        component: {
        }
      },
      {
        title: '上架状态',
        key: 'on_sale',
        width: 90,
        type: 'radio',
        search: {
          disabled: false
        },
        dict: { // 数据字典配置， 供select等组件通过value匹配label
          name: 'on_sale',
          url: 'on_sale',
          value: 'dict_value', // 数据字典中value字段的属性名
          label: 'dict_label', // 数据字典中label字段的属性名
          onReady: (data, dict, context) => {
            // 远程数据字典加载完成事件，每个引用该字典的组件都会触发一次
          }
        },
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '上架状态' }
          ],
          value: '1'
        },
        component: {
        }
      },
      {
        title: '商品排序',
        key: 'sort',
        width: 90,
        type: 'number',
        form: {
          rules: [ // 表单校验规则
            { required: false, message: '商品排序' }
          ],
          component: {
            span: 12
          },
          value: 0
        },
        component: {
        }
      },
      {
        title: '是否包邮',
        key: 'is_postage',
        width: 90,
        type: 'radio',
        dict: { // 数据字典配置， 供select等组件通过value匹配label
          name: 'is',
          url: 'is',
          value: 'dict_value', // 数据字典中value字段的属性名
          label: 'dict_label', // 数据字典中label字段的属性名
          onReady: (data, dict, context) => {
            // 远程数据字典加载完成事件，每个引用该字典的组件都会触发一次
          }
        },
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '是否包邮' }
          ],
          value: '1'
        },
        component: {
        }
      },
      {
        title: '运费模板',
        key: 'shipment_id',
        width: 90,
        type: 'select',
        form: {
          rules: [ // 表单校验规则
            { required: false, message: '运费模板' }
          ]
        },
        component: {
        }
      },
      {
        title: '限制数量',
        key: 'limit',
        width: 90,
        type: 'number',
        form: {
          rules: [ // 表单校验规则
            { required: true, message: '限制购买次数' }
          ],
          component: {
            span: 12
          },
          value: 0
        },
        component: {
        }
      }
    ]
  }
}
