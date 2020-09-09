import Vue from 'vue'

import d2CrudX from 'd2-crud-x'
import { d2CrudPlus } from 'd2-crud-plus'
import { D2pAreaSelector, D2pFileUploader, D2pIconSelector, D2pTreeSelector, D2pFullEditor, D2pUploader, D2pDemoExtend } from 'd2p-extends' // 源码方式引入，上传组件支持懒加载
// http请求
import utils from '@/utils'
import store from '@/store'
import api from '@/api'

// 按如下重命名引入可与官方版共存，index.vue中标签用<d2-crud-x />使用加强版
// 不传name，则d2CrudX的标签仍为<d2-crud>,不可与官方版共存
Vue.use(d2CrudX, { name: 'd2-crud-x' })

// 引入d2CrudPlus
Vue.use(d2CrudPlus, {
  getRemoteDictFunc (url, dict) {
    // 此处配置你的字典http请求方法
    return api.DICTDATA_ALL({
      pageSize: 9999,
      dict_type: dict.name
    }).then(ret => {
      return ret.list
    })
  },
  commonOption () { // 公共配置
    return {
      format: {
        page: { // page接口返回的数据结构配置，
          request: {
            current: 'page',
            size: 'pageSize'
          },
          response: {
            current: (data) => { return data.page.current_page }, // 当前页码 ret.data.current
            size: (data) => { return data.page.per_page }, // 当前页码 ret.data.current
            // size: (data) => { return data.size }, // 每页条数，ret.data.size, 你也可以配置一个方法，自定义返回
            total: (data) => { return data.page.total }, // 总记录数 ret.data.total
            records: (data) => { return data.list } // 列表数组 ret.data.records
          }
        }
      },
      pageOptions: {
        compact: true
      },
      searchOptions: {
        size: 'mini'
      },
      options: {
        stripe: true,
        border: false,
        highlightCurrentRow: false, // 是否高亮选中行
        size: 'mini'
      },
      formOptions: {
        nullToBlankStr: true, // 提交修改表单时，将undefinded的数据修改为空字符串''，可以解决无法清空字段的问题
        defaultSpan: 24, // 默认的表单 span
        labelWidth: '100px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20,
        // eslint-disable-next-line no-dupe-keys
        defaultSpan: 24, // 默认表单字段所占宽度
        draggable: true, // 是否支持表单对话框拖拽
        updateTableDataAfterEdit: false // 添加和删除提交后，是否直接更新本地table的数据
      },
      viewOptions: {
        disabled: false,
        componentType: 'form' // 【form,row】 表单组件 或 行组件展示
      },
      rowHandle: {
        width: 260,
        edit: {
          type: 'primary',
          size: 'mini'
        }
      }
    }
  }
})

// 安装扩展插件
Vue.use(D2pTreeSelector)
Vue.use(D2pAreaSelector)
Vue.use(D2pIconSelector)
Vue.use(D2pFullEditor, {
  ueditor: {
    serverUrl: '/api/ueditor/'
  }
})
Vue.use(D2pDemoExtend)
Vue.use(D2pFileUploader)

Vue.use(D2pUploader, {
  defaultType: 'form',
  alioss: {
    getAuthorization  (custom, context) { // 不传accessKeySecret代表使用临时签名模式,此时此参数必传（安全，生产环境推荐）
      const path = this.$api.UPLOAD_IMAGE(context)
      this.currentValue = path.file
    }
  },
  form: {
    action: store.state.d2admin.api.base + '/api/v1/admin/image',
    name: 'file',
    headers: {
      'Authorization': 'Bearer ' + utils.cookies.get('token')
    },
    successHandle (res) { // 上传成功后，后台返回结果处理
      return { url: res.body.file } // data是该文件的url
    }
  }
})

// 修改官方字段类型
const selectType = d2CrudPlus.util.columnResolve.getType('select')
selectType.component.props.color = 'auto' // 修改官方的字段类型，设置为支持自动染色
