<template>
  <div class="home_message">
    <template v-if="isLoading">
      <div>
        <el-skeleton animated>
          <template #template>            
            <div style="display: flex;justify-content: space-between;height: 300px;">
              <div style="flex: 1;height: 100%;">
                <el-skeleton-item variant="button"  style="width: 100%;height: 100%;" />
              </div>
              <div style="width: 500px;height: 100%;margin-left: 20px;">
                <el-skeleton-item variant="button"  style="width: 100%;height: 100%;" />
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>
    </template>
    <template v-else>
      <div class="qita_card_wrap">

        <div class="qita_card_box" style="flex:1;">
          <div class="qita_title">待办事项</div>
          <div class="tabs_line">
            <div class="tab" v-for="(item, index) of tabList" @click="tabClick(item)" :key="index" :class="{active: actIndex == item.value}">{{item.label}}</div>
          </div>
          <div class="hm_list">
            <template v-if="list.length">
              <div class="hml_item" v-for="(item, index) of list" :key="index" @click="goTodoPage(item)">
                <div class="hml_dian"></div>
                <div class="hml_tag">{{item.relType}}</div>
                <div class="hml_text">{{item.title}}</div>
              </div>
            </template>
            <el-empty v-else description="暂无数据~"></el-empty>
          </div>
        </div>
  
        <div class="qita_card_box date_box">
          <div class="qita_title">
            <span>日程管理</span>
            <div class="xjrc_wrap">
              <span class="xjrc" @click="openDialog">
                <svg t="1768358647387" class="icon" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2680" width="200" height="200"><path d="M1018.319924 112.117535q4.093748 9.210934 6.652341 21.492179t2.558593 25.585928-5.117186 26.609365-16.374994 25.585928q-12.281245 12.281245-22.003898 21.492179t-16.886712 16.374994q-8.187497 8.187497-15.351557 14.32812l-191.382739-191.382739q12.281245-11.257808 29.167958-27.121083t28.144521-25.074209q14.32812-11.257808 29.679676-15.863275t30.191395-4.093748 28.656239 4.605467 24.050772 9.210934q21.492179 11.257808 47.589826 39.402329t40.425766 58.847634zM221.062416 611.554845q6.140623-6.140623 28.656239-29.167958t56.289041-56.80076l74.710909-74.710909 82.898406-82.898406 220.038979-220.038979 191.382739 192.406177-220.038979 220.038979-81.874969 82.898406q-40.937484 39.914047-73.687472 73.175753t-54.242167 54.753885-25.585928 24.562491q-10.234371 9.210934-23.539054 19.445305t-27.632802 16.374994q-14.32812 7.16406-41.960921 17.398431t-57.824197 19.957024-57.312478 16.886712-40.425766 9.210934q-27.632802 3.070311-36.843736-8.187497t-5.117186-37.867173q2.046874-14.32812 9.722653-41.449203t16.374994-56.289041 16.886712-53.730448 13.304682-33.773425q6.140623-14.32812 13.816401-26.097646t22.003898-26.097646z" p-id="2681" fill="#409eff"></path></svg>
                新建日程
              </span>
              <span class="xjrc" @click.stop="gopage('/ic/page/p91447u13')">
                <svg t="1768358746472" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4572" width="200" height="200"><path d="M919.6 405.6l-57.2-8c-12.7-1.8-23-10.4-28-22.1-11.3-26.7-25.7-51.7-42.9-74.5-7.7-10.2-10-23.5-5.2-35.3l21.7-53.5c6.7-16.4 0.2-35.3-15.2-44.1L669.1 96.6c-15.4-8.9-34.9-5.1-45.8 8.9l-35.4 45.3c-7.9 10.2-20.7 14.9-33.5 13.3-14-1.8-28.3-2.8-42.8-2.8-14.5 0-28.8 1-42.8 2.8-12.8 1.6-25.6-3.1-33.5-13.3l-35.4-45.3c-10.9-14-30.4-17.8-45.8-8.9L230.4 168c-15.4 8.9-21.8 27.7-15.2 44.1l21.7 53.5c4.8 11.9 2.5 25.1-5.2 35.3-17.2 22.8-31.7 47.8-42.9 74.5-5 11.8-15.3 20.4-28 22.1l-57.2 8C86 408 72.9 423 72.9 440.8v142.9c0 17.7 13.1 32.7 30.6 35.2l57.2 8c12.7 1.8 23 10.4 28 22.1 11.3 26.7 25.7 51.7 42.9 74.5 7.7 10.2 10 23.5 5.2 35.3l-21.7 53.5c-6.7 16.4-0.2 35.3 15.2 44.1L354 927.8c15.4 8.9 34.9 5.1 45.8-8.9l35.4-45.3c7.9-10.2 20.7-14.9 33.5-13.3 14 1.8 28.3 2.8 42.8 2.8 14.5 0 28.8-1 42.8-2.8 12.8-1.6 25.6 3.1 33.5 13.3l35.4 45.3c10.9 14 30.4 17.8 45.8 8.9l123.7-71.4c15.4-8.9 21.8-27.7 15.2-44.1l-21.7-53.5c-4.8-11.8-2.5-25.1 5.2-35.3 17.2-22.8 31.7-47.8 42.9-74.5 5-11.8 15.3-20.4 28-22.1l57.2-8c17.6-2.5 30.6-17.5 30.6-35.2V440.8c0.2-17.8-12.9-32.8-30.5-35.2z m-408 245.5c-76.7 0-138.9-62.2-138.9-138.9s62.2-138.9 138.9-138.9 138.9 62.2 138.9 138.9-62.2 138.9-138.9 138.9z" fill="#409eff" p-id="4573"></path></svg>
                日程管理
              </span>
            </div>
          </div>
          <div class="date_wrap">
            <!-- 头部 -->
             <div class="calendar-header-wrap">
                <span class="month-title pointer" @click="goToToday">今天（{{dateFormat(new Date(), 'MM-dd')}}）</span>
               <div class="calendar-header">
                  <!-- <button class="nav-btn" @click="prevYear">&laquo;</button> -->
                  <button class="nav-btn" @click="prevMonth">&lsaquo;</button>
                  <span class="month-title">{{ currentMonthLabel }}</span>
                  <button class="nav-btn" @click="nextMonth">&rsaquo;</button>
                  <!-- <button class="nav-btn" @click="nextYear">&raquo;</button> -->
               </div>
             </div>
            <div class="custom-calendar-wrapper">
  
              <!-- 星期 -->
              <div class="days-grid">
                <div
                  v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day"
                  class="week-cell"
                >
                  <span class="day-week">{{ day }}</span>
                </div>
              </div>
  
              <!-- 日期格子 -->
              <div class="days-grid">
                <div
                  v-for="(day, index) in days"
                  :key="index"
                  class="day-cell"
                  :class="{
                    'today': day.isToday,
                    'selected': day.selected,
                    'marked': day.marked,
                    'empty': day.isEmpty
                  }"
                  @click="selectDay(day)"
                >
                  <span class="day-number">{{ day.date }}</span>
                  <span v-if="day.marked" class="dot"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="hm_list_box">
            <div class="hm_list">
              <template v-if="todoList.length">
                <div class="hml_item" v-for="(item, index) of todoList" :key="index" @click.stop="gopage('/ic/page/p91447u13')">
                  <div class="hml_dian"></div>
                  <div class="hml_text">{{item.handleItem}}</div>
                </div>
              </template>
              <el-empty v-else description="暂无数据~" :image-size="40"></el-empty>
            </div>
          </div>
          
        </div>
      </div>
    </template>
     <!-- 弹窗 -->
      <el-dialog
        title="新建日程"
        v-model="dialogVisible"
        width="500px"
        @close="handleClose"
        center
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="需处理的事项" prop="handleItem">
            <el-input
              v-model="form.handleItem"
              placeholder="请输入"
              clearable
              maxlength="100"
            />
          </el-form-item>

          <el-form-item label="日程日期" prop="scheduleDate">
            <el-date-picker
              v-model="form.scheduleDate"
              type="date"
              placeholder="请选择"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="其他说明" prop="otherSm">
            <el-input
              v-model="form.otherSm"
              type="textarea"
              :rows="3"
              placeholder="请输入"
              maxlength="200"
            />
          </el-form-item>
        </el-form>

        <div slot="footer" style="display: flex;justify-content: center;margin-top: 32px;">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'homeTodo', // 多单词
  
  data() {
    return {
      isLoading: true,
      list: [],
      todoList: [],
      apiBase: 'hgxt',
      apis: {
        queryMemMessageData: '/business/queryMemMessageData', // 查询待办待阅，已办已阅事项
        queryCalendarFlag: '/business/queryCalendarFlag', // 查询日历待办标记
        queryCalendarTodayItemNew: '/business/queryCalendarTodayItemNew', // 查询当日的待办事项
        addDayManage: '/business/addDayManage', // 查询当日的待办事项
        queryMessageTypeByMemberId: '/business/queryMessageTypeByMemberId', // 查询当前登录人的消息类型

      },
      actIndex: 0,
      // tabList: [{label: '待处理', value: 0}, {label: '合规考核', value: 2}, {label: '合规谈话', value: 3}, {label: '月报填写', value: 4}, {label: '合规代办', value: 5}, {label: '已处理', value: 1}],
      tabList: [],
     
      // 当前选中的日期（默认今天）
      selectedDate: new Date(),
      // 当前显示的月份（默认当前月）
      currentMonth: new Date(),
      // 要标记红点的日期（写死或从接口获取）
      markedDates: [
        // new Date(new Date().getFullYear(), new Date().getMonth(), 10), // 本月10号
        // new Date(new Date().getFullYear(), new Date().getMonth(), 20), // 本月20号
        // new Date(new Date().getFullYear(), new Date().getMonth(), 25)  // 本月25号
      ],

      dialogVisible: false,
      form: {
        handleItem: '',
        scheduleDate: '',
        otherSm: ''
      },
      rules: {
        handleItem: [
          { required: true, message: '请输入需处理的事项', trigger: 'blur' }
        ],
        scheduleDate: [
          { required: true, message: '请选择日程日期', trigger: 'change' }
        ]
      }
    }
  },
  async mounted () {
    try {
      this.getTodo();
      this.getTag();
      let res = await this.myAxios(this.apis.queryMessageTypeByMemberId, {})
      this.tabList = res?.tabList || []
      console.log(this.tabList, 'tabList')
      this.tabList.length && this.tabClick(this.tabList[0])
      // let data = await this.myAxios(this.apis.queryMemMessageData, {messageType: '1', status: '1', relType: ''})
      // this.list = data?.data || []
      // console.log(this.list, '待办事项')
    } catch(err) {
      console.log(err, 'catch err')
    }
    this.isLoading = false;
  },
  computed: {
     currentMonthLabel() {
      return this.currentMonth.toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit' })
    },
    days() {
      const year = this.currentMonth.getFullYear()
      const month = this.currentMonth.getMonth()

      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const startOffset = firstDay.getDay()

      const days = []

      // 上个月空白
      for (let i = 0; i < startOffset; i++) {
        days.push({
          date: '',
          isEmpty: true,
          isToday: false,
          selected: false,
          marked: false
        })
      }

      // 本月日期
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const dateObj = new Date(year, month, i)
        const dateStr = dateObj.toDateString()
        const todayStr = new Date().toDateString()

        const isToday = dateStr === todayStr
        const isSelected = this.selectedDate && this.selectedDate.toDateString() === dateStr
        const isMarked = this.markedDates.some(d => d.toDateString() === dateStr)

        days.push({
          date: i,
          isEmpty: false,
          isToday,
          selected: isSelected,
          marked: isMarked
        })
      }

      return days
    }
  },
  methods: {
     openDialog() {
      this.dialogVisible = true;
    },

    handleClose() {
      this.resetForm();
    },

    handleCancel() {
      this.dialogVisible = false;
      this.resetForm();
    },

    async handleSubmit() {
      let that = this;
      this.$refs.form.validate(valid => {
        console.log('保存的日程数据1:', this.form);
        if (valid) {
          // 保存逻辑（这里打印到控制台）
          console.log('保存的日程数据:', this.form);

          that.myAxios(this.apis.addDayManage, this.form).then(res => {
            console.log(res, '添加成功')
            that.getTodo();
            that.getTag();
            that.dialogVisible = false;
            that.resetForm();
          })

        }
      });
    },

    resetForm() {
      this.form = {
        handleItem: '',
        scheduleDate: '',
        otherSm: ''
      };
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate();
        }
      });
    },
    async getTag () {
      let data = await this.myAxios(this.apis.queryCalendarFlag, {})
      console.log(data, 'getTag')
      this.markedDates = Object.keys(data?.data || {}).map(key => new Date(key))
    },
    async getTodo () {
      let scheduleDate = this.dateFormat(this.selectedDate);
      console.log(scheduleDate, 'scheduleDate')
      let data = await this.myAxios(this.apis.queryCalendarTodayItemNew, {scheduleDate})
      console.log(data.itemData, 'getTodo')
      this.todoList = data.itemData || []
    },
    // 回到今天
     goToToday() {
      this.currentMonth = new Date(); // 切换到当前年月
      this.selectedDate = new Date(); // 同时选中今天（可选）
      this.getTodo()
    },
    // ===== 年份切换 =====
    prevYear() {
      this.currentMonth.setFullYear(this.currentMonth.getFullYear() - 1);
      this.currentMonth = new Date(this.currentMonth); // 触发响应式更新
    },
    nextYear() {
      this.currentMonth.setFullYear(this.currentMonth.getFullYear() + 1);
      this.currentMonth = new Date(this.currentMonth);
    },
    prevMonth() {
      this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() - 1))
    },
    nextMonth() {
      this.currentMonth = new Date(this.currentMonth.setMonth(this.currentMonth.getMonth() + 1))
    },
    selectDay(day) {
      if (day.isEmpty) return
      const year = this.currentMonth.getFullYear()
      const month = this.currentMonth.getMonth()
      this.selectedDate = new Date(year, month, day.date)
      this.getTodo()
    },
    gopage (path='') {
      console.log(path, 'path')
      if (!path) {
        return Error('没有跳转地址')
      }
      window?.gofun?.(path)
    },
    goTodoPage (row={}) {
      console.log(row, '待办事项')
      if(row.relType.includes('合规考核')){
      console.log(row, '合规考核')
        window.gofun('/ic/page/p75795u54')
        this.actIndex != 1 && setTimeout(() => {
          window.dialogList.ibdialog31333open({id:row.relId})
        }, 2000);
      }else if(row.relType.includes('合规谈话')){
      console.log(row, '合规谈话')
        window.gofun('/ic/page/p80825u54')
        this.actIndex != 1 && setTimeout(() => {
          window.dialogList.ibdialog34663open({id:row.relId})
        }, 2000);
      }else if(row.relType.includes('月报填写')){
      console.log(row, '月报填写')
        window.gofun('/ic/page/p98504u54')
        if(row.title.includes('合规履职')){
          // 合规
          this.actIndex != 1 && setTimeout(() => {
            window.dialogList.ibdialog65631open({id: row.relId, reportType:"1", dialogTitle:"填写合规履职月报"})
          }, 2000);
        }else{
          // 反洗钱
          this.actIndex != 1 && setTimeout(() => {
            window.dialogList.ibdialog65631open({id: row.relId, reportType:"2", dialogTitle:"填写反洗钱履职月报"})
          }, 2000);
        }
      }else if(row.relType.includes('合规代办')){
        window.gofun('/ic/page/p38269u54')
        this.actIndex != 1 && setTimeout(() => {
          window.dialogList.ibdialog95070open({taskPartyId:row.relId})
        }, 2000);
      }
    },
    async tabClick (item={}) {
      this.actIndex = item.value;
      console.log(item, 'item')
      let query = {messageType: '1', status: '1', relType: ''};
      switch (item.value) {
        case '0':
          query = {messageType: '1', status: '1', relType: ''} // 未处理
          break;
          case '1':
          query = {messageType: '1', status: '2', relType: ''} // 已处理
          break;
          default:
          query = {messageType: '1', status: '1', relType: item.label}
      }
      let data = await this.myAxios(this.apis.queryMemMessageData, query)
      this.list = data?.data || []
    },
    async myAxios(url='', param={}){
      return new Promise((resolve, reject) => {
        // 没有this.$util.ajaxFun使用axios
        let prdEnv = this?.$util?.ajaxFun
        if (prdEnv) {
          this.$util.ajaxFun(url, param, (res)=>{
            if (res.code === 200) {
              resolve(res.data)
            } else {
              console.log(res, '接口报错了，地址：', url)
              reject(res.data)
            }
          })
        } else {
          url = this.apiBase + url
          // 没有this.$util.ajaxFun使用axios
          this.$http.post(url, param).then(res => {
            if (res.data.code === 200) {
              resolve(res.data.data)
            } else {
              console.log(res, '接口报错了，地址：', url)
              reject(res.data)
            }
          })
        }
      })
    },
    // 格式化日期
    dateFormat(dateInput, format = 'yyyy-MM-dd') {
      // 如果是字符串，尝试解析为 Date
      let date;
      if (typeof dateInput === 'string') {
        // 兼容 '2025/1/1' 或 '2025-1-1'
        const normalized = dateInput.replace(/-/g, '/');
        date = new Date(normalized);
      } else if (dateInput instanceof Date) {
        date = dateInput;
      } else {
        throw new Error('Invalid date input. Expected string or Date object.');
      }

      // 检查是否有效日期
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date: ' + dateInput);
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return format
        .replace(/yyyy/g, year)
        .replace(/MM/g, month)
        .replace(/dd/g, day)
        .replace(/HH/g, hours)
        .replace(/mm/g, minutes)
        .replace(/ss/g, seconds);
    }
   
  }
}
</script>
<style scoped>
.home_message {
  text-align: left;
  background: #f8f9fa;
  padding: 0 20px 16px 20px;
}
.home_message .pointer {
  cursor: pointer;
}
.home_message .qita_card_wrap {
  display: flex;
  gap: 20px;
}
.home_message .qita_card_wrap .date_box {
  width: 450px;
}
.home_message .qita_card_wrap .date_box .xjrc_wrap {
  display: flex;
}
.home_message .qita_card_wrap .date_box .xjrc_wrap .xjrc {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #409eff;
  font-weight: 400;
  margin-left: 20px;
  cursor: pointer;
}
.home_message .qita_card_wrap .date_box .xjrc_wrap .xjrc .icon {
  margin-right: 6px;
  width: 14px;
  height: 14px;
}
.home_message .qita_card_wrap .qita_card_box {
  padding: 16px 20px;
  border: 3px solid #ffffff;
  border-radius: 8px;
  background: #ffffff;
}
.home_message .qita_card_wrap .qita_card_box .qita_title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.home_message .qita_card_wrap .qita_card_box .tabs_line {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-left: 12px;
}
.home_message .qita_card_wrap .qita_card_box .tabs_line .tab {
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  height: 38px;
  box-sizing: border-box;
}
.home_message .qita_card_wrap .qita_card_box .tabs_line .tab.active {
  border-bottom: 2px solid #165dff;
  color: #165dff;
}
.home_message .qita_card_wrap .qita_card_box .hm_list_box {
  margin-top: 30px;
  height: 162px;
  overflow: auto;
  scrollbar-color: rgba(139,139,139,0.5) #ffffff;
  scrollbar-width: thin;
}
.home_message .qita_card_wrap .qita_card_box .hm_list .hml_item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}
.home_message .qita_card_wrap .qita_card_box .hm_list .hml_item .hml_dian {
  width: 5px;
  height: 5px;
  background: #165dff;
  border-radius: 50%;
}
.home_message .qita_card_wrap .qita_card_box .hm_list .hml_item .hml_tag {
  border-radius: 4px;
  background: #f8f9fa;
  color: #ff4b57;
  font-size: 12px;
  padding: 3px 6px;
  margin-left: 10px;
}
.home_message .qita_card_wrap .qita_card_box .hm_list .hml_item .hml_text {
  flex: 1;
  margin-left: 10px;
  font-size: 14px;
  line-height: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.home_message .qita_card_wrap .date_wrap .calendar-header-wrap {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.home_message .qita_card_wrap .date_wrap .calendar-header-wrap .calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.home_message .qita_card_wrap .date_wrap .calendar-header-wrap .month-title {
  font-size: 16px;
  color: #333;
}
.home_message .qita_card_wrap .date_wrap .custom-calendar-wrapper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  border-radius: 4px;
  background: #fff;
}
.home_message .qita_card_wrap .date_wrap .nav-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
.home_message .qita_card_wrap .date_wrap .nav-btn:hover {
  background: #f5f7fa;
  color: #409eff;
}
.home_message .qita_card_wrap .date_wrap .week-days {
  display: grid;
  grid-template-columns: repeat(7,1fr);
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}
.home_message .qita_card_wrap .date_wrap .day-week {
  color: #999;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home_message .qita_card_wrap .date_wrap .days-grid {
  display: grid;
  grid-template-columns: repeat(7,1fr);
  gap: 4px;
  margin-top: 16px;
}
.home_message .qita_card_wrap .date_wrap .day-cell {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
}
.home_message .qita_card_wrap .date_wrap .day-cell.empty {
  cursor: default;
}
.home_message .qita_card_wrap .date_wrap .day-number {
  font-size: 14px;
  color: #606266;
}
.home_message .qita_card_wrap .date_wrap .day-cell.today .day-number {
  color: #409eff;
  font-weight: bold;
}
.home_message .qita_card_wrap .date_wrap .day-cell.selected {
  background: #409eff;
}
.home_message .qita_card_wrap .date_wrap .day-cell.selected .day-number {
  color: white;
}
.home_message .qita_card_wrap .date_wrap .day-cell:not(.empty):hover {
  background: #f0f9ff;
}
.home_message .qita_card_wrap .date_wrap .day-cell:not(.empty):hover .day-number {
  color: #409eff;
}
.home_message .qita_card_wrap .date_wrap .dot {
  position: absolute;
  bottom: 2px;
  right: 15px;
  width: 4px;
  height: 4px;
  background: red;
  border-radius: 50%;
  z-index: 2;
}

</style>