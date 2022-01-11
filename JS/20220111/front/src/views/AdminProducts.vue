<template lang="pug">
#adminproduct
  b-btn.my-5(block variant='success' v-b-modal.modal-product) 新增
  b-table(:items="products" :fields="fields" ref="table")
    template(#cell(image)="data")
      img(v-if="data.item.image" :src="data.item.image" style="height: 50px;")
    template(#cell(sell)="data")
      | {{ data.item.sell ? 'v' : '' }}
    template(#cell(action)="data")
      b-btn(variant="success" @click="editProduct(data.index)") 編輯
  b-modal#modal-product(
    :title="form._id.length > 0 ? '編輯商品' : '新增商品'"
    centered
    ok-varient="success"
    ok-title="送出"
    cancel-varient="danger"
    cancel-title="取消"
    @ok="submitModal"
    @hidden="resetForm"
    :ok-disabled="modelSubmitting"
    :cancel-disabled="modelSubmitting"
  )
    b-form-group(
      label="商品名稱"
      label-for="input-name"
      description="必填欄位"
      invalid-feedback="商品名稱必填"
    )
      b-form-input#input-price(
        v-model="form.name"
        type="text"
        required
        placeholder="請輸入商品價格"
        :satae="state.name"
      )
    b-form-group(
      label="商品價格"
      label-for="input-price"
      description="商品價格"
      invalid-feedback="價格必須是 0 元以上"
      :state="state.price"
    )
      b-form-input#input-price(
        v-model.number="form.price"
        type="number"
        min="0"
        required
        placeholder="請輸入商品價格"
        :satae="state.price"
      )
    b-form-group(
      label="商品分類"
      label-for="input-category"
      description="商品分類"
      invalid-feedback="分類必填"
      :state="state.category"
    )
      b-form-select#input-category(
        v-model="form.category"
        required
        :options="categories"
        placeholder="請輸入商品價格"
        :satae="state.category"
      )
    b-form-group(
      label="商品說明"
      label-for="input-description"
      description="必填欄位"
      invalid-feedback="說明必填"
    )
      b-form-textarea#input-description(
        v-model="form.description"
        required
        rows="3"
        max-rows="6"
        placeholder="請輸入商品說明"
      )
    b-form-group(label="上架")
      b-form-radio(v-model="form.sell" :value="true") 上架
      b-form-radio(v-model="form.sell" :value="false") 下架
    img-inputer(
      accept="image/*"
      v-model="form.image"
      theme="light"
      size="large"
      bottom-text="點擊或拖曳圖片以修改"
      hover-text="點擊或拖曳圖片以修改"
      placeholder="點選或拖曳選擇圖片"
      :max-size="1024"
    )
</template>

<script>
export default {
  name: 'AdminProducts',
  data () {
    return {
      fields: [
        { key: 'image', label: '圖片' },
        { key: 'name', label: '名稱' },
        { key: 'price', label: '價格' },
        { key: 'category', label: '分類' },
        { key: 'description', label: '說明' },
        { key: 'sell', label: '上架' },
        { key: 'action', label: '操作' }
      ],
      categories: [
        { text: '請選擇分類', value: '' },
        '飾品', '皮件', '鞋子'
      ],
      form: {
        name: '',
        price: null,
        description: '',
        image: null,
        sell: false,
        category: '',
        _id: ''
      },
      modelSubmitting: false,
      products: []
    }
  },
  computed: {
    state () {
      return {
        name: this.form.name.length === 0 ? null : true,
        price: this.form.price === null ? null : this.form.price >= 0,
        category: this.form.category.length === 0 ? null : true
      }
    }
  },
  methods: {
    async submitModal (event) {
      event.preventDefault()
      if (!this.state.name || !this.state.price || !this.state.category) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必要欄位'
        })
        return
      }
      this.modelSubmitting = true

      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          fd.append(key, this.form[key])
        }
      }

      try {
        if (this.form._id.length === 0) {
          const { data } = await this.api.post('/products', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.products.push(data.result)
        } else {
          const { data } = await this.api.patch('/products/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.products[this.form.index] = {
            ...this.form,
            image: data.result.image
          }
          this.$refs.table.refresh()
        }
        this.$bvModal.hide('modal-product')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }

      this.modelSubmitting = false
    },
    resetForm (event) {
      if (this.modelSubmitting) {
        event.preventDefault()
        return
      }
      this.form = {
        name: '',
        price: 0,
        description: '',
        image: null,
        sell: false,
        category: '',
        _id: '',
        index: -1
      }
    },
    editProduct (index) {
      this.form = {
        ...this.products[index],
        image: null,
        index
      }
      this.$bvModal.show('modal-product')
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>
