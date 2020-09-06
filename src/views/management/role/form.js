import form from '@/mixins/crud-form'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'ROLE_DETAIL',
        create: 'ROLE_CREATE',
        update: 'ROLE_UPDATE'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'name',
          default: '',
          label: '角色标识',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.name } clearable/>
        },
        {
          prop: 'roles_name',
          default: '',
          label: '角色名称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.roles_name } clearable/>
        },
        {
          prop: 'roles_description',
          default: '',
          label: '角色描述',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.roles_description } clearable/>
        },
        {
          prop: 'role_menu',
          default: '',
          label: '菜单权限',
          render: () => <d2-tree vModel={ this.form.model.role_menu } source="MENU_ALL" key-label="menu_name" multiple half-mix stringify/>
        }
      ]
    }
  }
}
