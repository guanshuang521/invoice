<template>
    <div class="pagination_wrapper">
      <ul class="pagesInner">
        <li class="page">
          <div class="page_btn" :class="pageNum > 1 ? '' : 'forbidClick'" @click="go(1)">
            <img src="./pagebtn-first.png" alt="" @click="go(1)">
          </div>
        </li>
        <li class="page">
          <div class="page_btn" :class="pageNum > 1 ? '' : 'forbidClick'" @click="go(pageNum - 1)">
            <img src="./pagebtn-pre.png" alt="" @click="go(pageNum - 1)">
          </div>
        </li>
        <li class="page">
          <div class="page_btn" @click="go(pageNum)">第{{pageNum}}页</div>
        </li>
        <li class="page">
          <div class="page_btn" :class="pageNum < totalPage ? '' : 'forbidClick'" @click="go(pageNum + 1)">
            <img src="./pagebtn-next.png" alt="" @click="go(pageNum + 1)">
          </div>
        </li>
        <li class="page">
          <div class="page_btn" :class="pageNum < totalPage ? '' : 'forbidClick'" @click="go(totalPage)">
            <img src="./pagebtn-last.png" alt="" @click="go(totalPage)">
          </div>
        </li>
        <li class="page">
          每页
          <select name="" class="page_select" v-model="changePageSize">
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          条
        </li>
        <li class="page">
          <input type="number" min="1" :max="totalPage" v-model="jumpPage" class="jump_input">
          <div class="page_btn" @click="go(jumpPage)">跳转</div>
        </li>
        <li class="page">共{{totalPage}}页</li>
        <li class="page">总共{{totalCount}}条记录</li>
      </ul>
    </div>
</template>

<script>

    export default {
      props: {
        totalCount: { // 总页数
          type: Number,
          default: 0
        },
        pageSize: { // 显示条数
          type: Number,
          default: 1
        },
        pageNum: { // 当前页
          type: Number,
          default: 1
        }
      },
      data () {
        return {
          page: 1,
          jumpPage: 0,
          changePageSize: 5,
          sumPage: 0
        };
      },
      created () {
        this.changePageSize = this.pageSize;
      },
      methods: {
        go (page) {
          if (page < 1) {
            page = 1;
            return false;
          } else if (page > this.totalPage) {
            page = this.totalPage;
            return false;
          } else if (page === this.pageNum) {
            return false;
          } else {
            this.$emit('currentPage', parseInt(page, 10)); // 告诉父组件，子组件修改了pageNum的值
          }
        }
      },
      computed: {
        totalPage() {
          return Math.ceil(this.totalCount / this.pageSize) || 0;
        }
      },
      watch: {
        changePageSize(val) {
          let data = {
            page: Number(val)
          };
          this.$emit('showNewPageSize', data); // 告诉父组件，子组件修改了pageSize的值
        }
      }
    };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
    .pagination_wrapper{
        margin-top: 10px;
        width: 100%;
        height: 20px;
        line-height: 20px;
        .pagesInner{
            width: 100%;
            height: 100%;
            font-size: 0;
            .page{
                height: 100%;
                display: inline-block;
                vertical-align: top;
                margin-right: 10px;
                font-size: 12px;
                .page_btn{
                    display: inline-block;
                    vertical-align: top;
                    padding: 0 8px;
                    width: auto;
                    height: 100%;
                    line-height: 18px;
                    text-align: center;
                    color: #4da1ff;
                    border-radius: 5px;
                    cursor: pointer;
                    border: 1px solid #4da1ff;
                    img{
                        position: relative;
                        top: 1px;
                        cursor: pointer;
                    }
                }
                .forbidClick{
                    cursor: not-allowed;
                    filter: blur(1px);
                }
                .page_select{
                    padding-left: 5px;
                    width: 50px;
                    border-radius: 5px;
                    text-align: center;
                }
                .jump_input{
                    width: 45px;
                    height: 100%;
                }
            }
        }
    }
</style>
