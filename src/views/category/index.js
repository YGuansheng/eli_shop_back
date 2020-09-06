import utils from '@/utils'
import table from '@/mixins/crud-table.js'

export default {
  mixins: [ table ],
  components: {
    componentForm: () => import('./form')
  },
  render () {
    const page =
      <d2-container spacious>
        <d2-search-panel slot="header" vModel={ this.search.panel.active }>
          <d2-bar slot="title">
            <d2-bar-space/>
            { this.p('query') ? null : <d2-bar-cell>{ this.vNodeSearchPanelAlertNoPermissionQuery }</d2-bar-cell> }
            <d2-bar-space/>
            <d2-bar-cell>
              <el-button-group>
                { this.p('query') ? this.vNodeButtonSearch : null }
                { this.vNodeButtonTableColumnsFilterTrigger }
              </el-button-group>
            </d2-bar-cell>
            { this.p('add') ? <d2-bar-cell>{ this.vNodeButtonCreateWithParentId0 }</d2-bar-cell> : null }
          </d2-bar>
          { this.p('query') ? this.vNodeSearchForm : null }
        </d2-search-panel>
        { this.vNodeTable }
        <component-form ref="form" on-success={ this.onFormSuccess }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: 'CATEGORY_ALL',
        delete: 'CATEGORY_DELETE'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'category_title', label: '分类名称', minWidth: '200px', fixed: 'left' },
        { prop: 'title_phonetic', label: '首拼', minWidth: '100px' },
        { prop: 'category_icon', label: '分类图标', render: ({ row }) => row.icon ? <d2-icon name={ row.icon }></d2-icon> : <span class="d2-opacity-3">无</span>, width: '200px' },
        {
          prop: 'category_pic',
          label: '分类图片',
          minWidth: '80px',
          render: ({ row }) =>
            <el-image src={ row.category_pic } fit="cover" preview-src-list={ [ row.category_pic ] } style="height: 28px; width: 28px; border-radius: 2px;" lazy>
              <div slot="error" style="height: 100%; width: 100%;" flex="main:center cross:center">
                <i class="el-icon-picture-outline"/>
              </div>
            </el-image>
        },
        { prop: 'visibility', label: '可见性', render: ({ row }) => <d2-dict name="visible" value={ row.visibility }/>, width: '200px' },
        { prop: 'sort', label: '排序', minWidth: '160px' },
        { prop: 'id', label: 'ID', width: '100px', show: false },
        { prop: 'created_at', label: '创建时间', formatter: row => utils.time.format(row.created_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false },
        { prop: 'updated_at', label: '更新时间', formatter: row => utils.time.format(row.updated_at, 'YYYY/M/D HH:mm:ss'), width: '140px', show: false }
      ]
    },
    // 配置项
    // 表格操作列配置
    settingActionsConfig () {
      return ({ row }) => [
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('add', [{ icon: 'el-icon-plus', type: 'primary', action: () => this.create({ parent_id: row.id }) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm: `确定删除 [ ${row.category_title} ] 吗`, action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'category_title',
          label: '名称',
          default: '',
          render: () => <el-input vModel={ this.search.form.model.category_title } style="width:100px;" clearable/>
        },
        {
          prop: 'visibility',
          label: '可见性',
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={ this.search.form.model.visibility } name="visible" button all/>
        }
      ]
    }
  },
  methods: {
    onFormSuccess () {
      this.$store.dispatch('d2admin/permission/load', { focus: true })
      this.research()
    }
  }
}
