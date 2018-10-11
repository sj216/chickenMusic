<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li class="search-item"
          v-for="(item,index) in searches"
          @click="selectItem(item)"
          :key="index">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search-list',
  props: {
    searches: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    // 点击其中一项
    selectItem(item) {
      this.$emit('select', item)
    },
    // 删除其中一项
    deleteOne(item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'
  .search-list
    .search-item
      display: flex
      align-items: center
      height: 40px
      .text
        flex: 1
        color: $color-text-l
      .icon
        extend-click()
        .icon-delete
          font-size: $font-size-small
          color: $color-text-d
</style>
