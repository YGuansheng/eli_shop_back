import form from '@/mixins/crud-form'
import utils from '@/utils/index'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'USER_DETAIL',
        create: 'USER_CREATE',
        update: 'USER_UPDATE'
      },
      dialog: {
        width: '900px'
      }
    }
  },
  computed: {
    setting () {
      return [

        {
          prop: 'username',
          default: '',
          label: '登录用户名',
          rule: [
            { required: true, message: '必填', trigger: 'change' },
            { validator: utils.helper.isLegalUsernameValidator, trigger: 'change' }
          ],
          col: { span: 8 },
          render: () => <el-input vModel={ this.form.model.username } clearable/>
        },
        {
          prop: 'nickname',
          default: '',
          label: '昵称',
          rule: { required: true, message: '必填', trigger: 'change' },
          col: { span: 8 },
          render: () => <el-input vModel={ this.form.model.nickname } clearable/>
        },
        ...this.mode === 'create' ? [
          {
            prop: 'password',
            default: '',
            label: '密码',
            rule: { required: true, message: '必填', trigger: 'change' },
            col: { span: 8 },
            render: () => <el-input vModel={ this.form.model.password } type="password" clearable/>
          }
        ] : [],
        {
          prop: 'user_role',
          default: '',
          label: '角色',
          col: { span: 8 },
          render: () => <d2-dict-select name="user_role" vModel={ this.form.model.user_role } style="width: 100%;" custom multiple stringify/>
        },
        {
          prop: 'remark',
          default: '',
          label: '备注',
          col: { span: 24 },
          render: () => <el-input vModel={ this.form.model.remark } clearable/>
        }
      ]
    }
  },
  methods: {
    /**
     * @description 加载需要的字典数据
     */
    loadDict () {
      // 角色
      this.loadDictOne({
        name: 'user_role',
        method: this.$api.ROLE_ALL,
        fields: 'id,roles_name',
        path: 'list',
        label: 'roles_name'
      })
    },
    /**
     * @description 在提交表单之前可选进行数据处理
     * @param {Object} data 默认的表单数据
     */
    transformSubmitData (data) {
      if (this.mode === 'edit') {
        // 编辑模式下删除密码字段
        return this._.omit(data, [ 'password' ])
      } else {
        // 新建模式下全部发送
        return data
      }
    }
  }
}
