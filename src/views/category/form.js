import form from '@/mixins/crud-form'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'CATEGORY_DETAIL',
        create: 'CATEGORY_CREATE',
        update: 'CATEGORY_UPDATE'
      }
    }
  },
  computed: {
    setting () {
      const categoryName = {
        prop: 'category_title',
        default: '',
        label: '分类名称',
        rule: { required: true, message: '必填', trigger: 'change' },
        render: () => <el-input vModel={ this.form.model.category_title } clearable/>
      }
      const parentId = {
        prop: 'parent_id',
        default: 0,
        label: '上级分类',
        render: () => <d2-tree-popover vModel={ this.form.model.parent_id } source="CATEGORY_ALL" key-label="category_title"/>
      }
      const titlePhonetic = {
        prop: 'title_phonetic',
        default: '',
        label: '名称首拼',
        rule: { required: true, message: '必填', trigger: 'change' },
        render: () => <el-input vModel={ this.form.model.title_phonetic } clearable/>
      }
      const categoryIcon = {
        prop: 'category_icon',
        default: '',
        label: '图标',
        render: () => <d2-icon-select vModel={ this.form.model.category_icon }/>
      }
      const categoryPic = {
        prop: 'category_pic',
        default: '',
        label: '分类图片',
        col: { span: 24 },
        render: () => <d2-single-uploader vModel={ this.form.model.category_pic }/>
      }
      const sortNum = {
        prop: 'sort',
        default: this.$env.VUE_APP_FORM_SORT_MIN,
        label: '排序',
        render: () => <el-input-number min={ this.$env.VUE_APP_FORM_SORT_MIN } vModel={ this.form.model.sort }/>
      }
      const visibility = {
        prop: 'visibility',
        default: 1,
        label: '可见性',
        render: () => <d2-dict-radio name="visible" vModel={ this.form.model.visibility } button/>
      }
      return [
        parentId,
        categoryName,
        titlePhonetic,
        categoryIcon,
        categoryPic,
        sortNum,
        visibility
      ]
    }
  },
  methods: {
  }
}
