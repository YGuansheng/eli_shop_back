<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button-group>
          <el-button size="mini" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        </el-button-group>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>

      </div>
    </d2-crud-x>

  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formSelect',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      api: {
        index: 'GOODS_ALL',
        detail: 'GOODS_DETAIL',
        create: 'GOODS_CREATE',
        update: 'GOODS_UPDATE'
      }
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      const method = this.$api[this.api.index]
      if (!this._.isFunction(method)) {
        this.$message.error('未找到 API')
        return Promise.reject(new Error('未找到 API'))
      }
      return method(query)
    },
    addRequest (row) {
      console.log(row)
      const method = this.$api[this.api.create]
      if (!this._.isFunction(method)) {
        this.$message.error('未找到 API')
        return Promise.reject(new Error('未找到 API'))
      }
      return method(row)
    }
  }
}
</script>
