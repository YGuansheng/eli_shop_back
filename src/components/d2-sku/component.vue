<template>
  <div class="vue-sku">
    <!-- 规格设置 -->
      <section>
        <div v-for="(item, index) in specification" :key="index" class="spec-line">
          <div>
            <span v-if="!cacheSpecification[index].status">{{ item.item_name }}</span>
            <el-input size="small" style="width:200px;" v-if="cacheSpecification[index].status" v-model="cacheSpecification[index].name" placeholder="输入产品规格" @keyup.native.enter="saveSpec(index)">
              <el-button slot="append" icon="el-icon-check" type="primary" @click="saveSpec(index)"></el-button>
            </el-input>
            <i class="icon el-icon-edit" v-if="!cacheSpecification[index].status" @click="updateSpec(index)"></i>
          </div>
          <div>
            <el-tag type='info' size="medium" v-for="(tag, j) in item.item_value" :key="j" closable @close="delSpecTag(index, j)">{{ tag.title }}</el-tag>
            <el-input size="small" style="width:200px;" v-model="addValues[index]" placeholder="多个产品属性以空格隔开" @keyup.native.enter="addSpecTag(index)">
              <el-button slot="append" icon="el-icon-check" type="primary" @click="addSpecTag(index)"></el-button>
            </el-input>
          </div>
          <i class="icon el-icon-circle-close spec-deleted" @click="delSpec(index)"></i>
          <el-divider></el-divider>
        </div>
        <div class="add-spec">
          <el-button size="small" type="primary" :disabled="specification.length >= 5" @click="addSpec">添加规格项目</el-button>
        </div>
      </section>
    <!-- 规格展示 -->
    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>规格展示</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="specificationStatus = !specificationStatus">{{ !specificationStatus ? '显示' : '隐藏' }}</el-button>
      </div>
      <section v-if="specificationStatus">
        <el-row>
          <el-col :span="2" v-for="(item, index) in specification" :key="index" class="text item bold">{{ item.name }}</el-col>
        </el-row>
        <el-row v-for="(item, index) in countSum(0)" :key="index">
          <el-col :span="2" class="text item" v-for="(n, specIndex) in specification.length" :key="n">{{getSpecAttr(specIndex, index)}}</el-col>
        </el-row>
      </section>
    </el-card> -->

    <!-- 实战DEMO -->
    <!-- <div slot="header" class="clearfix">
    <span>规格表格</span>
    </div> -->
    <table class="el-table" cellspacing="0" cellpadding="0" style="width: 100%;font-size: 10px">
    <thead>
    <tr>
        <th
        v-for="(item, index) in specification"
        :key="index">
        {{item.item_name}}
        </th>
        <!-- <th style="width: 160px;">编码</th> -->
        <th style="width: 100px;">原价（元）</th>
        <th style="width: 100px;">售价</th>
        <th style="width: 100px;">成本</th>
        <th style="width: 100px;">库存</th>
        <th style="width: 100px;">重量</th>
        <th style="width: 100px;">体积</th>
        <!-- <th style="width: 100px;">是否启用</th> -->
    </tr>
    </thead>
    <tbody v-if="specification[0] && specification[0].item_value.length">
    <tr>
        <td colspan="10" class="wh-foot">
        <span class="label">批量设置：</span>
        <template v-if="isSetListShow">
            <el-button @click="openBatch('market_price')" size="mini">原价</el-button>
            <el-button @click="openBatch('shop_price')" size="mini">售价</el-button>
            <el-button @click="openBatch('cost_price')" size="mini">成本价</el-button>
            <el-button @click="openBatch('quantity')" size="mini">库存</el-button>
            <el-button @click="openBatch('weight')" size="mini">重量</el-button>
            <el-button @click="openBatch('volume')" size="mini">体积</el-button>
        </template>
        <template v-else>
            <el-input size="mini" style="width:200px;" v-model.number="batchValue" placeholder="输入要设置的数量"></el-input>
            <el-button type="primary" size="mini" @click="setBatch"><i class="set-btn blue el-icon-check"></i></el-button>
            <el-button type="danger" size="mini" @click="cancelBatch"><i class="set-btn blue el-icon-close"></i></el-button>
        </template>
        </td>
    </tr>
    <tr
        :key="index"
        v-for="(item, index) in countSum(0)">
        <template v-for="(n, specIndex) in specification.length">
        <td
            v-if="showTd(specIndex, index)"
            :key="n"
            :rowspan="countSum(n)">
            {{getSpecAttr(specIndex, index)}}
        </td>
        </template>
        <!-- <td>
        <el-input
            size="mini"
            type="text"
            :disabled="!childProductArray[index].isUse"
            v-model="childProductArray[index].childProductNo"
            @blur="handleNo(index)"
            placeholder="输入规格编号">
        </el-input>
        </td> -->
        <td>
        <el-input
            size="mini"
            type="text"
            v-model.number="childProductArray[index].market_price"
            placeholder="输入原价">
        </el-input>
        </td>
        <td>
        <el-input
            size="mini"
            type="text"
            v-model.number="childProductArray[index].shop_price"
            placeholder="输入售价">
        </el-input>
        </td>
        <td>
        <el-input
            size="mini"
            type="text"
            v-model.number="childProductArray[index].cost_price"
            placeholder="输入成本价">
        </el-input>
        </td>
        <td>
        <el-input
            size="mini"
            type="text"
            v-model.number="childProductArray[index].quantity"
            placeholder="输入库存">
        </el-input>
        </td>
        <td>
        <el-input
            size="mini"
            type="text"
            v-model.number="childProductArray[index].weight"
            placeholder="输入重量">
        </el-input>
        </td>
        <td>
        <el-input
            size="mini"
            type="text"
            v-model.number="childProductArray[index].volume"
            placeholder="输入体积">
        </el-input>
        </td>
        <!-- <td>
        <el-switch v-model="childProductArray[index].isUse" @change="(val) => {handleUserChange(index, val)}"></el-switch>
        </td> -->
    </tr>
    </tbody>

    </table>
    <!-- 数据格式 -->
    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据格式</span>
      </div>
      <section>
        <div v-for="(item, index) in childProductArray" :key="index">
          {{ item }}
          <el-divider></el-divider>
        </div>
      </section>
    </el-card> -->
  </div>
</template>

<script>

  // 为Object添加一个原型方法，判断两个对象是否相等
  function objEquals (object1, object2) {
      console.log('object1',object1,'object2',object2)
    // For the first loop, we only check for types
    for (let propName in object1) {
      // Check for inherited methods and properties - like .equals itself
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
      // Return false if the return value is different
      if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
        return false
        // Check instance type
      } else if (typeof object1[propName] !== typeof object2[propName]) {
        // Different types => not equal
        return false
      }
    }
    // Now a deeper check using other objects property names
    for (let propName in object2) {
      // We must check instances anyway, there may be a property that only exists in object2
      // I wonder, if remembering the checked values from the first loop would be faster or not
      if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
        return false
      } else if (typeof object1[propName] !== typeof object2[propName]) {
        return false
      }
      // If the property is inherited, do not check any more (it must be equa if both objects inherit it)
      if (!object1.hasOwnProperty(propName)) {
        continue
      }
      // Now the detail check and recursion
      // This returns the script back to the array comparing
      /** REQUIRES Array.equals**/
      if (object1[propName] instanceof Array && object2[propName] instanceof Array) {
        // recurse into the nested arrays
        if (objEquals(!object1[propName], object2[propName])) {
          return false
        }
      } else if (object1[propName] instanceof Object && object2[propName] instanceof Object) {
        // recurse into another objects
        // console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
        if (objEquals(!object1[propName], object2[propName])) {
          return false
        }
        // Normal value comparison for strings and numbers
      } else if (object1[propName] !== object2[propName]) {
        return false
      }
    }
    // If everything passed, let's say YES
    return true
  }

  export default {
    name: 'd2-sku',
    props: {
        // 值
        value: {
            type: Array,
            required: false
        }
    },
    data () {
      return {
        specificationStatus: false, // 显示规格列表
        // 规格
        specification: [],
        // 子规格
        childProductArray: [],
        // 用来存储要添加的规格属性
        addValues: [],
        // 默认商品编号
        defaultProductNo: 'PRODUCTNO_',
        // 批量设置相关
        isSetListShow: true,
        batchValue: '', // 批量设置所绑定的值
        currentType: '', // 要批量设置的类型
        cacheSpecification: [], // 缓存规格名称
      }
    },
    computed: {
      // 所有sku的id
      stockSpecArr () {
        return this.childProductArray.map(item => item.childProductSpec)
      }
    },
    watch: {
      value (value) {
        // 父组件收到input事件后会通过v-model改变value参数的值
        // 然后此处会watch到value的改变，发出change事件
        // change事件放在此处发射的好处是，当外部修改value值时，也能够触发form-data-change事件
        this.$emit('change', value)
        if (this.currentValue === value) {
            return
        }
      // 如果值是被外部改变的，则修改本组件的currentValue
      this.setValue(value)
    }
  },
    created() {
      if(this.value){
        this.createData(this.value)
      }
      this.setValue(this.value)
    },
    methods: {
      // 创建模拟数据
      createData(data) {
        const attr_item = data.attr_item
        const spec_item = data.spec_item
        for (let i = 0; i < attr_item.length; i++) {
          // 添加数据
          this.cacheSpecification.push({
            status: true,
            name: ''
          })
          // 缓存按钮键值
          this.cacheSpecification[i].status = true
          this.cacheSpecification[i].name = attr_item[i].item_name
        }
        this.specification = attr_item
        this.childProductArray = spec_item
        console.log('spec_item',spec_item)
      },
      // 添加规格项目
      addSpec () {
        if (this.specification.length < 5) {
          this.cacheSpecification.push({
            status: true,
            name: ''
          })
          this.specification.push({
            item_name: '',
            item_value: []
          })
        }
      },
      // 修改状态
      updateSpec(index) {
        this.cacheSpecification[index].status = true
        this.cacheSpecification[index].name = this.specification[index].item_name
      },
      // 保存规格名
      saveSpec(index) {
        if (!this.cacheSpecification[index].name.trim()) {
          this.$message.error('名称不能为空，请注意修改')
          return
        }
        // 保存需要验证名称是否重复
        if (this.specification[index].item_name === this.cacheSpecification[index].name) {
          this.cacheSpecification[index].status = false
        } else {
          if (this.verifyRepeat(index)) {
            // 如果有重复的，禁止修改
            this.$message.error('名称重复，请注意修改')
          } else {
            this.specification[index].item_name = this.cacheSpecification[index].name
            this.cacheSpecification[index].status = false
          }
        }
      },
      // 删除规格项目
      delSpec (index) {
        this.specification.splice(index, 1)

        this.handleSpecChange('del')
      },
      verifyRepeat(index) {
        let flag = false
        this.specification.forEach((value, j) => {
          // 检查除了当前选项以外的值是否和新的值想等，如果相等，则禁止修改
          if (index !== j) {
            if (this.specification[j].item_name === this.cacheSpecification[index].name) {
              flag = true
            }
          }
        })
        return flag
      },
      // 添加规格属性
      addSpecTag (index) {
        let str = this.addValues[index] || ''
        if (!str.trim() || !this.cacheSpecification[index].name.trim()) {
          this.$message.error('名称不能为空，请注意修改')
          return
        } // 判空
        str = str.trim()
        let arr = str.split(/\s+/) // 使用空格分割成数组
        let spec = []
        for (let i = 0; i < arr.length; i++) {
            spec.push({
                id: this.createUniqueId(6),
                title: arr[i] 
            })
        }

        let newArr = this.specification[index].item_value.concat(spec)
        // newArr = Array.from(new Set(newArr)) // 去重
        this.$set(this.specification[index], 'item_value', newArr)
        this.clearAddValues(index)
        this.handleSpecChange('add')
        this.specification[index].item_name = this.cacheSpecification[index].name
        this.cacheSpecification[index].status = false

        this.$emit('input', {attr_item:this.specification,spec_item:this.childProductArray})
      },
      // 删除规格属性
      delSpecTag (index, num) {
        this.specification[index].item_value.splice(num, 1)

        this.handleSpecChange('del')
      },

      // 清空 addValues
      clearAddValues (index) {
        this.$set(this.addValues, index, '')
      },
      /*
        根据传入的属性值，拿到相应规格的属性
        @params
          specIndex 规格项目在 advancedSpecification 中的序号
          index 所有属性在遍历时的序号
      */
      getSpecAttr (specIndex, index) {
        // 获取当前规格项目下的属性值
        const currentValues = this.specification[specIndex].item_value
        let indexCopy

        // 判断是否是最后一个规格项目
        if (this.specification[specIndex + 1] && this.specification[specIndex + 1].item_value.length) {
          indexCopy = index / this.countSum(specIndex + 1)
        } else {
          indexCopy = index
        }

        const i = Math.floor(indexCopy % currentValues.length)

        if (i.toString() !== 'NaN') {
          return currentValues[i].title
        } else {
          return ''
        }
      },
      /*
        根据传入的属性值，拿到相应规格的属性ID
        @params
          specIndex 规格项目在 advancedSpecification 中的序号
          index 所有属性在遍历时的序号
      */
      getSpecAttrId (specIndex, index) {
        // 获取当前规格项目下的属性值
        const currentValues = this.specification[specIndex].item_value
        let indexCopy

        // 判断是否是最后一个规格项目
        if (this.specification[specIndex + 1] && this.specification[specIndex + 1].item_value.length) {
          indexCopy = index / this.countSum(specIndex + 1)
        } else {
          indexCopy = index
        }

        const i = Math.floor(indexCopy % currentValues.length)

        if (i.toString() !== 'NaN') {
          return currentValues[i].id
        } else {
          return ''
        }
      },
      /*
        计算属性的乘积
        @params
          specIndex 规格项目在 advancedSpecification 中的序号
      */
      countSum (specIndex) {
        let num = 1
        this.specification.forEach((item, index) => {
          if (index >= specIndex && item.item_value.length) {
            num *= item.item_value.length
          }
        })
        return num
      },

      // 根据传入的条件，来判断是否显示该td
      showTd (specIndex, index) {
        // 如果当前项目下没有属性，则不显示
        if (!this.specification[specIndex]) {
          return false

          // 自己悟一下吧
        } else if (index % this.countSum(specIndex + 1) === 0) {
          return true
        } else {
          return false
        }
      },

      /**
       * [handleSpecChange 监听标签的变化,当添加标签时；求出每一行的hash id，再动态变更库存信息；当删除标签时，先清空已有库存信息，然后将原有库存信息暂存到stockCopy中，方便后面调用]
       * @param  {[string]} option ['add'|'del' 操作类型，添加或删除]
       * @return {[type]}        [description]
       */
      handleSpecChange (option) {
        const stockCopy = JSON.parse(JSON.stringify(this.childProductArray))
        if (option === 'del') {
          this.childProductArray = []
        }

        for (let i = 0; i < this.countSum(0); i++) {
          this.changeStock(option, i, stockCopy)
        }
      },

      /**
       * [根据规格，动态改变库存相关信息]
       * @param  {[string]} option    ['add'|'del' 操作类型，添加或删除]
       * @param  {[array]} stockCopy [库存信息的拷贝]
       * @return {[type]}           [description]
       */
      changeStock (option, index, stockCopy) {
        let childProduct = {
          childProductId: 0,
          childProductSpec: this.getChildProductSpec(index),
          childProductNo: this.defaultProductNo + index,
          variant_title: this.getChildProductVariantTitle(index),
          attr_key_name: this.getChildProductVariantIds(index),
          market_price: 0,
          shop_price: 0,
          cost_price: 0,
          quantity: 0,
          weight: 0,
          volume: 0,
          id: 0
        }

        const spec = childProduct.childProductSpec
        if (option === 'add') {
            // this.$set(this.childProductArray, index, childProduct)
          // 如果此id不存在，说明为新增属性，则向 childProductArray 中添加一条数据
          if (this.stockSpecArr.findIndex((item) => objEquals(spec, item)) === -1) {
            this.$set(this.childProductArray, index, childProduct)
          }
          debugger
          console.log(this.childProductArray)
        } else if (option === 'del') {
          // 因为是删除操作，理论上所有数据都能从stockCopy中获取到
          let origin = ''
          stockCopy.forEach(item => {
            if (objEquals(spec, item.childProductSpec)) {
              origin = item
              return false
            }
          })
          this.childProductArray.push(origin || childProduct)
        }
      },

      // 获取childProductArray的childProductSpec属性
      getChildProductSpec (index) {
        let obj = {}
        this.specification.forEach((item, specIndex) => {
          obj[item.item_name] = this.getSpecAttr(specIndex, index)
        })
        return obj
      },
      getChildProductVariantTitle (index) {
        let VariantTitle = ''
        this.specification.forEach((item, specIndex) => {
            if(specIndex > 0){
                VariantTitle += " "
            }
            VariantTitle += item.item_name + ":" + this.getSpecAttr(specIndex, index)
        })
        console.log('VariantTitle',VariantTitle)
        return VariantTitle
      },
      getChildProductVariantIds (index) {
        let VariantIds = []
        this.specification.forEach((item, specIndex) => {
            VariantIds.push(this.getSpecAttrId(specIndex, index))
        })
        return VariantIds
      },
      // 监听规格启用操作
      handleUserChange (index, value) {
        // 启用规格时，生成不重复的商品编号；关闭规格时，清空商品编号
        if (value) {
          let No = this.makeProductNoNotRepet(index)
          this.$set(this.childProductArray[index], 'childProductNo', No)
        } else {
          this.$set(this.childProductArray[index], 'childProductNo', '')
        }
      },

      // 监听商品编号的blur事件
      handleNo (index) {
        // 1.当用户输入完商品编号时，判断是否重复，如有重复，则提示客户并自动修改为不重复的商品编号
        const value = this.childProductArray[index].childProductNo
        let isRepet

        this.childProductArray.forEach((item, i) => {
          if (item.childProductNo === value && i !== index) {
            isRepet = true
          }
        })

        if (isRepet) {
          this.$message({
            type: 'warning',
            message: '不允许输入重复的商品编号'
          })
          this.$set(this.childProductArray[index], 'childProductNo', this.makeProductNoNotRepet(index))
        }
      },

      // 生成不重复的商品编号
      makeProductNoNotRepet (index) {
        let No
        let i = index
        let isRepet = true
        while (isRepet) {
          No = this.defaultProductNo + i
          isRepet = this.isProductNoRepet(No)
          i++
        }
        return No
      },
      createUniqueId (len, date = false) {
        let random
        random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
        return date ? random + Date.now() : random
      },
      // 商品编号判重
      isProductNoRepet (No) {
        const result = this.childProductArray.findIndex((item) => {
          return item.childProductNo === No
        })
        return result > -1
      },

      // 打开设置框
      openBatch (type) {
        this.currentType = type
        this.isSetListShow = false
      },

      // 批量设置
      setBatch () {
        if (typeof this.batchValue === 'string') {
          this.$message({
            type: 'warning',
            message: '请输入正确的值'
          })
          return
        }
        this.childProductArray.forEach(item => {
            item[this.currentType] = this.batchValue
        })

        this.cancelBatch()
      },

      // 取消批量设置
      cancelBatch () {
        this.batchValue = ''
        this.currentType = ''
        this.isSetListShow = true
      },
      setValue (value) {
        console.log("setvalue:", value)
        // 在这里对 传入的value值做处理
        this.currentValue = value
      },
      setAttrItem (){
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vue-sku{
    .spec-line{position:relative;
      .spec-deleted{position:absolute;right:0;top:0;display: none;cursor: pointer;}
      &:hover{
        .spec-deleted{display: inline;}
      }
    }
  }
  .el-tag{
    margin-right: 10px;
  }
  td .el-input{
    margin-right: 10px;
  }
</style>
