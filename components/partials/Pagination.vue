<!-- eslint-disable-next-line -->
<!-- eslint-disable -->
<template>
  <div class="bottom-toolbar">
    <div class="toolbar-section">
      <div class="field limiter">
        <div class="space-box">
          <a href="javascript:void(0)" v-if="showPreviousButton" @click="updatePaginations(currentPage-1)">
            <i class="fal fa-chevron-left"></i><span class="hide-element">chevron-icon</span>
          </a>
          <a
            href="javascript:void(0)"
            v-for="(pagination, index) in paginations"
            :key="index"
            :class="pagination.class"
            @click="updatePaginations(pagination.value)"
          >
            <span>{{ pagination.value }}</span>
          </a>
          <a class="last-item" href="javascript:void(0)" v-if="showNextButton" @click="updatePaginations(currentPage+1)">
            <i class="fal fa-chevron-right"></i><span class="hide-element">chevron-icon</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['currentPage','totalPage'],
  data() {
    return {
      paginations: [],
      minusCurrentPage: 2,
      plusCurrentPage: 2,
      showPreviousButton: false,
      showNextButton: false
    }
  },
  watch: {
    totalPage(){
      this.setCurrentPage()
    }
  },

  mounted() {
    this.setCurrentPage()
  },

  methods:{
    setCurrentPage() {
      let that = this
      that.paginations = []
      for (let i = 1; i <= that.totalPage; i++) {
        that.paginations.push({
          'class': that.getPaginationsClass(i),
          'value': i
        })
      }

      // Next Page
      that.showNextButton = true
      if(that.currentPage == that.totalPage) {
        that.showNextButton = false
      }

      // Previous Page
      that.showPreviousButton = true
      if(that.currentPage == 1){
        that.showPreviousButton = false
      }
    },

    getPaginationsClass(value){
      let response = 'hide'
      let minusValue = this.currentPage - this.minusCurrentPage
      let plusValue = this.currentPage + this.plusCurrentPage
      if(minusValue <= value && plusValue >= value){
        response = 'show'
      }

      if(value == this.currentPage) {
        response+=' active'
      }

      return response
    },

    async updatePaginations(currentPage) {
      this.currentPage = currentPage
      await this.$emit('updateCurrentPage', currentPage)
      await this.setCurrentPage()
    },

    async parentUpdatePagination() {
      this.setCurrentPage()
    }
  }
};
</script>
