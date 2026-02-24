<template>
  <div>
    <template v-if="isLoading">
     <div style="margin: 20px;">
        <el-skeleton animated>
          <template #template>            
            <div style="display: flex;justify-content: space-between;height: 430px;">
              <div style="width: 300px;height: 100%;">
                <el-skeleton-item variant="button"  style="width: 100%;height: 80px; margin-bottom: 20px;" />
                <el-skeleton-item variant="button"  style="width: 100%;height: 80px; margin-bottom: 20px;" />
                <el-skeleton-item variant="button"  style="width: 100%;height: 80px; margin-bottom: 20px;" />
                <el-skeleton-item variant="button"  style="width: 100%;height: 80px; margin-bottom: 20px;" />
              </div>
              <div style="flex: 1;height: 100%;margin-left: 20px;">
                <el-skeleton-item variant="button"  style="width: 100%;height: 380px;" />
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>
    </template>
    <template v-else>
      <div class="year_status_warp" v-if="userInfo.role == 1 || userInfo.role == 2">
        <div class="year_status">
          <div class="data-dashboard">
            <div class="header">
              年度重点工作
              <div>
                <span style="color: #6c757d;font-size: 12px;font-weight: 400;">统计年度</span>&nbsp;&nbsp;&nbsp;
                <select class="year-select" @change="onYearChange" v-model="selectedYear">
                  <option v-for="(item, index) of yearList" :key="index" :value="item">{{item}}年度</option>
                </select>
              </div>
            </div>
            <!-- <div class="subtitle">实时监控和分析项目数据指标</div> -->
      
            <!-- 管理员/领导展示区 role: 1 合规领导 2 合规专员 3 专兼职人员 0 无角色权限 -->
            <div class="years_content" v-if="userInfo.role == 1">
              <!-- 左侧卡片 -->
              <div class="left-panel">
                <div class="card" :class="{cumulative: projectIndex == 0}" @click="projectClick(0)">
                  <div class="title" @click.stop="gopage('/ic/page/p57101u13', {queryType: 'adminljxm', year: selectedYear})">累计项目></div>
                  <div class="number">{{adminProjectInfo.countljxm}}</div>
                  <!-- <div class="trend"><span class="arrow-up">↑</span> 12.5% 较上月</div> -->
                   <div class="icon_box icon_box1">
                     <svg t="1768322885346" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1648" width="200" height="200"><path d="M576 268.8h313.6c12.8 0 19.2-12.8 19.2-25.6V166.4c0-12.8-6.4-25.6-19.2-25.6H518.4c-19.2 0-25.6 25.6-12.8 38.4l57.6 83.2c0 6.4 6.4 6.4 12.8 6.4z" p-id="1649" fill="#165dff"></path><path d="M902.4 320H576c-12.8 0-32-6.4-38.4-25.6L409.6 128c-12.8-12.8-25.6-19.2-44.8-19.2H128c-32 0-57.6 32-57.6 64v627.2c0 38.4 25.6 64 57.6 64h774.4c32 0 57.6-32 57.6-64V384c0-38.4-25.6-64-57.6-64z m-268.8 352c0 19.2-12.8 32-32 32H204.8c-19.2 0-32-12.8-32-32s12.8-32 32-32h403.2c12.8 0 25.6 12.8 25.6 32z m166.4 0c0 19.2-12.8 32-32 32h-25.6c-19.2 0-32-12.8-32-32s12.8-32 32-32h25.6c19.2 0 32 12.8 32 32z" p-id="1650" fill="#165dff"></path></svg>
                   </div>
                </div>
                <div class="card supervision" :class="{cumulative: projectIndex == 1}" @click="projectClick(1)">
                  <div class="title" @click.stop="gopage('/ic/page/p87132u13', {queryType: 'admindbzg', year: selectedYear})">督办整改></div>
                  <div class="number">{{adminProjectInfo.countdbzg}}</div>
                  <!-- <div class="trend"><span class="arrow-up">↑</span> 8.3% 较上月</div> -->
                   <div class="icon_box icon_box2">
                    <svg t="1768273830415" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17963" width="200" height="200"><path d="M944.256 926.4c-31.04 0-820.8 0-865.792 0-44.288 0-65.856-52.16-46.4-91.968C58.688 780.096 441.216 136.064 465.088 90.176c21.376-41.216 72.384-41.92 93.76 0 32.576 63.808 413.248 704.96 432 742.272C1014.464 879.104 984.576 926.4 944.256 926.4L944.256 926.4zM466.496 332.736l30.464 319.616 45.632 0 30.528-319.616L466.496 332.736 466.496 332.736zM573.12 698.112 466.496 698.112l0 91.264 106.624 0L573.12 698.112 573.12 698.112z" fill="#EF4444" p-id="17964"></path></svg>
                   </div>
                </div>
                <div class="card compliance-warning" :class="{cumulative: projectIndex == 2}" @click="projectClick(2)">
                  <div class="title" @click.stop="gopage('/ic/page/p41513u13', {queryType: 'adminhgwzts', year: selectedYear})">合规提示问责></div>
                  <div class="number"><span>{{adminProjectInfo.counthgtswz || 0}}<span style="font-size: 12px;">人</span></span><span>{{adminProjectInfo.countkf || 0}}<span style="font-size: 12px;">分</span></span></div>
                  <!-- <div class="trend"><span class="arrow-down">↓</span> 2.1% 较上月</div> -->
                  <div class="icon_box icon_box3">
                    <svg t="1768273635199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16682" width="200" height="200"><path d="M358.4 76.8v76.8h307.2V76.8h76.8v76.8h204.8v793.6H76.8V153.6h204.8V76.8h76.8z m344.832 305.92l-253.4144 253.44-126.72-126.72-54.2976 54.272 181.0176 181.0432 307.712-307.712-54.272-54.3232z" p-id="16683" fill="#3B82F6"></path></svg>
                   </div>
                </div>
                <div class="card compliance-talk" :class="{cumulative: projectIndex == 3}" @click="projectClick(3)">
                  <div class="title" @click.stop="gopage('/ic/page/p80825u54', {queryType: 'adminhgth', year: selectedYear})">合规谈话></div>
                  <div class="number">{{adminProjectInfo.counthgth}}</div>
                  <!-- <div class="trend"><span class="arrow-up">↑</span> 5.7% 较上月</div> -->
                  <div class="icon_box icon_box4">
                    <svg t="1768274016383" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25250" width="200" height="200"><path d="M345.662439 252.353561c-155.24839 0-281.225366 109.592976-281.225366 244.661073S190.414049 741.675707 345.662439 741.675707c8.99122 0 17.782634-0.39961 26.574049-1.098927-0.499512 63.737756-73.827902 113.489171-73.827903 113.489171 183.420878-61.639805 256.849171-171.032976 282.424195-223.082146 28.971707-38.462439 45.955122-84.517463 45.955122-133.869268 0.099902-135.168-125.877073-244.760976-281.125463-244.760976zM193.810732 532.87961c-19.780683 0-35.864976-15.98439-35.864976-35.864976 0-19.780683 15.98439-35.864976 35.864976-35.864975s35.864976 15.98439 35.864975 35.864975c0.099902 19.880585-15.98439 35.864976-35.864975 35.864976z m151.851707 0c-19.780683 0-35.864976-15.98439-35.864976-35.864976 0-19.780683 15.98439-35.864976 35.864976-35.864975 19.780683 0 35.864976 15.98439 35.864976 35.864975 0.099902 19.880585-16.084293 35.864976-35.864976 35.864976z m151.751805 0c-19.780683 0-35.864976-15.98439-35.864976-35.864976 0-19.780683 15.98439-35.864976 35.864976-35.864975s35.864976 15.98439 35.864976 35.864975-15.98439 35.864976-35.864976 35.864976z" p-id="25251" fill="#A855F7"></path><path d="M824.09522 169.934049H583.829854c-55.046244 0-102.699707 33.367415-123.779122 80.721171 37.063805 13.287024 70.43122 32.768 98.503805 57.244097 54.946341 47.753366 89.71239 114.787902 89.71239 189.21522 0 53.64761-18.182244 103.698732-49.052098 145.158243-0.699317 1.398634-1.498537 2.997073-2.397658 4.595513 45.85522 34.865951 105.397073 68.632976 182.821463 94.607609 0 0-93.908293-63.637854-80.221658-141.761561h124.678244c74.427317 0 135.467707-60.940488 135.467707-135.467707V305.201951c0-74.427317-61.04039-135.267902-135.467707-135.267902z" p-id="25252" fill="#A855F7"></path></svg>
                   </div>
                </div>
              </div>
      
              <!-- 右侧图表区 -->
              <!-- 管理员-累计项目图表区 -->
              <div v-show="projectIndex == 0" class="right-panel">
                <div class="tabs_line">
                  <div class="tab" @click="adminTabClick(item.value, 'adminTabIndex')" v-for="(item, index) of adminTabList" :key="index" :class="{active: adminTabIndex == item.value}">{{item.label}}</div>
                </div>
                <div class="chart_box">
                  <div class="chart-card">
                    <div class="tabs" style="justify-content: center;">
                      <div class="tab" @click="adminTabClick(item.value, 'adminTabIndex_2')" v-for="(item, index) of adminTabList_2" :key="index" :class="{active: adminTabIndex_2 == item.value}">{{item.label}}</div>
                    </div>
                    <div class="chart-content" ref="pieChartEl"></div>
                    <div class="chart-title">按{{ adminTabList_2[adminTabIndex_2].label }}统计</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-content" ref="categoryChartEl"></div>
                    <div class="stat-title">
                      按发起人统计
                    </div>
                  </div>
                </div>
              </div>
              <!-- 管理员-督办整改图表区 -->
              <div v-show="projectIndex == 1" class="right-panel">
                <div class="tabs_line">
                  <div class="tab" @click="adminTabClick(item.value, 'adminTabIndex2')" v-for="(item, index) of adminTabList2" :key="index" :class="{active: adminTabIndex2 == item.value}">{{item.label}}</div>
                </div>
                <div class="chart_box">
                  <div class="chart-card">
                    <div class="tabs" style="justify-content: center;">
                      <div class="tab" @click="adminTabClick(item.value, 'adminTabIndex2_2')" v-for="(item, index) of adminTabList_2" :key="index" :class="{active: adminTabIndex2_2 == item.value}">{{item.label}}</div>
                    </div>
                    <div class="chart-content" ref="pieChartEl2"></div>
                    <div class="chart-title">按{{ adminTabList_2[adminTabIndex2_2].label }}统计</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-content" ref="categoryChartEl2"></div>
                    <div class="stat-title">
                      按发起人统计
                    </div>
                  </div>
                </div>
              </div>
              <!-- 管理员-合规问责图表区 -->
              <div v-show="projectIndex == 2" class="right-panel">
                <div class="tabs_line">
                  <div class="tab" @click="adminTabClick(item.value, 'adminTabIndex3')" v-for="(item, index) of adminTabList3" :key="index" :class="{active: adminTabIndex3 == item.value}">{{item.label}}</div>
                </div>
                <div class="chart_box2">
                  <div class="stat-content" ref="categoryChartEl3"></div>
                </div>
              </div>
              <!-- 管理员-合规谈话图表区 -->
              <div v-show="projectIndex == 3" class="right-panel">
                <div class="tabs_line">
                  <div class="tab" @click="adminTabClick(item.value, 'adminTabIndex4')" v-for="(item, index) of adminTabList4" :key="index" :class="{active: adminTabIndex4 == item.value}">{{item.label}}</div>
                </div>
                <div class="chart_box">
                  <div class="chart-card">
                    <div class="tabs" style="height: 28px;">
                    </div>
                    <div class="chart-content" ref="pieChartEl4"></div>
                    <div class="chart-title">按谈话类型统计</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-content" ref="categoryChartEl4"></div>
                    <div class="stat-title">
                      按业务条线统计
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            <!-- 专员展示区 role: 1 合规领导 2 合规专员 3 专兼职人员 0 无角色权限 -->
            <div class="years_content" v-if="userInfo.role == 2">
              <!-- 左侧卡片 -->
              <div class="left-panel">
                <div class="card" :class="{cumulative: projectIndex == 0}" @click="projectClick(0)">
                  <div class="title" @click.stop="gopage('/ic/page/p57101u13', {queryType: 'zyljxm', year: selectedYear})">累计项目></div>
                  <div class="number">{{adminProjectInfo.countljxm}}</div>
                  <!-- <div class="trend"><span class="arrow-up">↑</span> 12.5% 较上月</div> -->
                  <div class="icon_box icon_box1">
                     <svg t="1768322885346" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1648" width="200" height="200"><path d="M576 268.8h313.6c12.8 0 19.2-12.8 19.2-25.6V166.4c0-12.8-6.4-25.6-19.2-25.6H518.4c-19.2 0-25.6 25.6-12.8 38.4l57.6 83.2c0 6.4 6.4 6.4 12.8 6.4z" p-id="1649" fill="#165dff"></path><path d="M902.4 320H576c-12.8 0-32-6.4-38.4-25.6L409.6 128c-12.8-12.8-25.6-19.2-44.8-19.2H128c-32 0-57.6 32-57.6 64v627.2c0 38.4 25.6 64 57.6 64h774.4c32 0 57.6-32 57.6-64V384c0-38.4-25.6-64-57.6-64z m-268.8 352c0 19.2-12.8 32-32 32H204.8c-19.2 0-32-12.8-32-32s12.8-32 32-32h403.2c12.8 0 25.6 12.8 25.6 32z m166.4 0c0 19.2-12.8 32-32 32h-25.6c-19.2 0-32-12.8-32-32s12.8-32 32-32h25.6c19.2 0 32 12.8 32 32z" p-id="1650" fill="#165dff"></path></svg>
                   </div>
                </div>
                <div class="card supervision" :class="{cumulative: projectIndex == 1}" @click="projectClick(1)">
                  <div class="title" @click.stop="gopage('/ic/page/p87132u13', {queryType: 'zydbzg', year: selectedYear})">督办整改></div>
                  <div class="number">{{adminProjectInfo.countdbzg}}</div>
                  <!-- <div class="trend"><span class="arrow-up">↑</span> 8.3% 较上月</div> -->
                  <div class="icon_box icon_box2">
                    <svg t="1768273830415" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17963" width="200" height="200"><path d="M944.256 926.4c-31.04 0-820.8 0-865.792 0-44.288 0-65.856-52.16-46.4-91.968C58.688 780.096 441.216 136.064 465.088 90.176c21.376-41.216 72.384-41.92 93.76 0 32.576 63.808 413.248 704.96 432 742.272C1014.464 879.104 984.576 926.4 944.256 926.4L944.256 926.4zM466.496 332.736l30.464 319.616 45.632 0 30.528-319.616L466.496 332.736 466.496 332.736zM573.12 698.112 466.496 698.112l0 91.264 106.624 0L573.12 698.112 573.12 698.112z" fill="#EF4444" p-id="17964"></path></svg>
                   </div>
                </div>
                <div class="card compliance-warning" :class="{cumulative: projectIndex == 2}" @click="projectClick(2)">
                  <div class="title" @click.stop="gopage('/ic/page/p41513u13', {queryType: 'zyhgwzts', year: selectedYear})">合规提示问责></div>
                  <div class="number"><span>{{adminProjectInfo.counthgtswz || 0}}<span style="font-size: 12px;">人</span></span><span>{{adminProjectInfo.countkf || 0}}<span style="font-size: 12px;">分</span></span></div>
                  <!-- <div class="trend"><span class="arrow-down">↓</span> 2.1% 较上月</div> -->
                  <div class="icon_box icon_box3">
                    <svg t="1768273635199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16682" width="200" height="200"><path d="M358.4 76.8v76.8h307.2V76.8h76.8v76.8h204.8v793.6H76.8V153.6h204.8V76.8h76.8z m344.832 305.92l-253.4144 253.44-126.72-126.72-54.2976 54.272 181.0176 181.0432 307.712-307.712-54.272-54.3232z" p-id="16683" fill="#3B82F6"></path></svg>
                   </div>
                </div>
                <div class="card compliance-talk" :class="{cumulative: projectIndex == 3}" @click="projectClick(3)">
                  <div class="title" @click.stop="gopage('/ic/page/p80825u54', {queryType: 'zyhgth', year: selectedYear})">合规谈话></div>
                  <div class="number">{{adminProjectInfo.counthgth}}</div>
                  <!-- <div class="trend"><span class="arrow-up">↑</span> 5.7% 较上月</div> -->
                  <div class="icon_box icon_box4">
                    <svg t="1768274016383" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25250" width="200" height="200"><path d="M345.662439 252.353561c-155.24839 0-281.225366 109.592976-281.225366 244.661073S190.414049 741.675707 345.662439 741.675707c8.99122 0 17.782634-0.39961 26.574049-1.098927-0.499512 63.737756-73.827902 113.489171-73.827903 113.489171 183.420878-61.639805 256.849171-171.032976 282.424195-223.082146 28.971707-38.462439 45.955122-84.517463 45.955122-133.869268 0.099902-135.168-125.877073-244.760976-281.125463-244.760976zM193.810732 532.87961c-19.780683 0-35.864976-15.98439-35.864976-35.864976 0-19.780683 15.98439-35.864976 35.864976-35.864975s35.864976 15.98439 35.864975 35.864975c0.099902 19.880585-15.98439 35.864976-35.864975 35.864976z m151.851707 0c-19.780683 0-35.864976-15.98439-35.864976-35.864976 0-19.780683 15.98439-35.864976 35.864976-35.864975 19.780683 0 35.864976 15.98439 35.864976 35.864975 0.099902 19.880585-16.084293 35.864976-35.864976 35.864976z m151.751805 0c-19.780683 0-35.864976-15.98439-35.864976-35.864976 0-19.780683 15.98439-35.864976 35.864976-35.864975s35.864976 15.98439 35.864976 35.864975-15.98439 35.864976-35.864976 35.864976z" p-id="25251" fill="#A855F7"></path><path d="M824.09522 169.934049H583.829854c-55.046244 0-102.699707 33.367415-123.779122 80.721171 37.063805 13.287024 70.43122 32.768 98.503805 57.244097 54.946341 47.753366 89.71239 114.787902 89.71239 189.21522 0 53.64761-18.182244 103.698732-49.052098 145.158243-0.699317 1.398634-1.498537 2.997073-2.397658 4.595513 45.85522 34.865951 105.397073 68.632976 182.821463 94.607609 0 0-93.908293-63.637854-80.221658-141.761561h124.678244c74.427317 0 135.467707-60.940488 135.467707-135.467707V305.201951c0-74.427317-61.04039-135.267902-135.467707-135.267902z" p-id="25252" fill="#A855F7"></path></svg>
                   </div>
                </div>
              </div>
      
              <!-- 右侧图表区 -->
              <!-- 面板区域：使用 transition 包裹多个 v-if 分支 -->
              <!-- <transition name="el-fade-in-linear" mode="out-in"> -->
                <!-- 专员-首页图表区 -->
                <div v-show="projectIndex === 0" key="panel-0" class="right-panel">
                  <div class="tabs_line">
                    <div class="tab" @click="zhuanyTabClick(item.value, 'zhuanyTabIndex')" v-for="(item, index) of zhuanyTabList" :key="index" :class="{active: zhuanyTabIndex == item.value}">{{item.label}}</div>
                  </div>
                  <div class="chart_box">
                    <div class="chart-card">
                      <div class="tabs" style="justify-content: center;">
                        <div class="tab" @click="zhuanyTabClick(item.value, 'zhuanyTabIndex_2')" v-for="(item, index) of adminTabList_2" :key="index" :class="{active: zhuanyTabIndex_2 == item.value}">{{item.label}}</div>
                      </div>
                      <div class="chart-content" ref="zhuany_pieChartEl"></div>
                      <!-- <div class="chart-title">按项目类别统计</div> -->
                      <div class="chart-title">按{{ adminTabList_2[zhuanyTabIndex_2].label }}统计</div>
                    </div>
                    <div class="stat-card">
                      <div class="stat-content" ref="zhuany_categoryChartEl"></div>
                      <div class="stat-title">
                        按进度统计
                      </div>
                    </div>
                  </div>
    
                </div>
    
                <!-- 专员-督办整改图表区 -->
                <div v-show="projectIndex === 1" key="panel-1" class="right-panel">
                  <div class="tabs_line">
                    <div class="tab" @click="zhuanyTabClick(item.value, 'zhuanyTabIndex2')" v-for="(item, index) of zhuanyTabList" :key="index" :class="{active: zhuanyTabIndex2 == item.value}">{{item.label}}</div>
                  </div>
                  <div class="chart_box">
                    <div class="chart-card">
                      <div class="tabs" style="justify-content: center;">
                        <div class="tab" @click="zhuanyTabClick(item.value, 'zhuanyTabIndex2_2')" v-for="(item, index) of adminTabList_2" :key="index" :class="{active: zhuanyTabIndex2_2 == item.value}">{{item.label}}</div>
                      </div>
                      <div class="chart-content" ref="zhuany_pieChartEl2"></div>
                      <!-- <div class="chart-title">项目类别统计</div> -->
                      <div class="chart-title">按{{ adminTabList_2[zhuanyTabIndex2_2].label }}统计</div>
                    </div>
                    <div class="chart-card">
                      <div class="tabs" style="height: 28px;">
                      </div>
                      <div class="chart-content" ref="zhuany_pieChartEl2_1"></div>
                      <div class="chart-title">按进度统计</div>
                    </div>
                    <!-- <div class="stat-card">
                      <div class="stat-content" ref="zhuany_pieChartEl2_1"></div>
                      <div class="stat-title">
                        按进度统计
                      </div>
                    </div> -->
                  </div>
                </div>
    
                <!-- 专员-合规问责图表区 -->
                <div v-show="projectIndex === 2" key="panel-2" class="right-panel">
                  <div class="tabs_line">
                    <div
                      class="tab"
                      @click="zhuanyTabClick(item.value, 'zhuanyTabIndex3')"
                      v-for="(item, index) in adminTabList3"
                      :key="index"
                      :class="{ active: zhuanyTabIndex3 == item.value }"
                    >
                      {{ item.label }}
                    </div>
                  </div>
                  <div class="chart_box">
                      <div class="chart-card">
                        <div class="tabs" style="height: 28px;">
                        </div>
                        <div class="chart-content" ref="zhuany_pieChartEl3"></div>
                        <div class="chart-title">项目类别统计</div>
                      </div>
                      <div class="stat-card">
                        <div class="stat-content" ref="zhuany_categoryChartEl3"></div>
                        <div class="stat-title">
                          按业务条线统计
                        </div>
                      </div>
                    </div>
                </div>
    
                <!-- 专员-合规谈话图表区 -->
                <div v-show="projectIndex === 3" key="panel-3" class="right-panel">
                  <div class="tabs_line">
                    <div
                      class="tab"
                      @click="zhuanyTabClick(item.value, 'zhuanyTabIndex4')"
                      v-for="(item, index) in zhuanyTabList4"
                      :key="index"
                      :class="{ active: zhuanyTabIndex4 == item.value }"
                    >
                      {{ item.label }}
                    </div>
                  </div>
                  <div class="chart_box">
                    <div class="chart-card">
                      <div class="tabs" style="height: 28px;"></div>
                      <div class="chart-content" ref="zhuany_pieChartEl4"></div>
                      <div class="chart-title">按谈话类型统计</div>
                    </div>
                    <div class="stat-card">
                      <div class="stat-content" ref="zhuany_categoryChartEl4"></div>
                      <div class="stat-title">按业务条线统计</div>
                    </div>
                  </div>
                </div>
              <!-- </transition> -->
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'yearStatus', // 多单词
  
  data() {
    return {
      isLoading: true,
      // 暂无数据-SVG图标Base64编码
      placeholderSvg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANEAAADRCAMAAABl5KfdAAAANlBMVEX////t7/L5+fvz9Pf3+Pzx8/Xg4+nw8fT39/n19vjl5+n6+/zr7fHV1978/P3p6+/m6O3b3eQmsXSKAAAGIUlEQVR42uzX0ZLaMAwFUEkeV7a1I+j//2wLZpuAgWgLInHGR+PxPu6dGwSBYRiGYRiGYRiGYRiGYXiVKvRGZ+SC5qS3TCpCrZ4z1XJ2lEkvhBZ0k0l1b5lEK7Fk6mHx6Y3ul0TtZnZEOl8Sekffy1zu6nhJnBo5Tb2n6XbxqZzsqSdVeTzS468jEpGnZzkTbIqKAV18/yUXWm3rO1fIMJI39T+/XpEkxLCxZ+shshA8iV1kUhLDEFaRYPOELBi/8dYzKVkknOEEre3sDTKJeC01AZg38hmzVtS4XeZSCm7ieZREhonYaJY5llIwwdqUTLDRLj4pJ4cM66JkERANmbDUTAFWpIksg09Mi4/KxTEorEWSRUY0ZcLyD6+USZMF4aKstaQZFLDYYkWzTFgm6yxzY0U2QYDKta8Ez224orNAWCZrLPNkgj/AWCbLy3zrFT3KdIzwIcmE8YeYy8R3mbcV5XQ6ubnng/+Bj20mgVYfFVV8KLcSOJNsYKjInAnBWUrZMBENjEuC4EpvFTWZ3EuiXKXZ3Yr4IsZPlaQ55Hw54eGd8XWMnykpZYuAb8FH/5I0ZMvgu/DBuyRyrqjFX64labDI+FaMjiVRCDlUze2RaMok4COY4PsxggsyPnQOErgIJozvx+BCdldRDnNxuq8OowM421FFGVyEaMHoQMGDxBjOE5+dnirK0QT/6qYiA5eKAlT7qUjAg0aLgA4iuEjrVUTgYn8VsUVN1E1FfJp6P5iIDhjOdlRRAheROXIV+ZGeKiJeNiXq4QdQZIuOXiMAUlzpU5TBDQVe0NFrhC1TRAcBfMmzTB29RsxJRr47fVZ0ppnv6ug1opUYG4wOInwMxSlDvXt6jXiUaVcVnUnAs51UNGXyq4hhBZSkIqEbidJMTvlKyOFGrA55EXj6CnoiKlMyU6qbNJNfX7REwA+WmugqVZOpTdW2FL9THX8nWqLgJZYS3pNmcvjT3tntNgzCUHiEJiSm5Of9X3ZkWeRkbgoFCu7EJ+2uN5+Oj+O2k2q6xsnXmxgAnBmhlMMKjcxUau56sMgkHULUtBgjy8ydnsFCN0Ps1HWm1NxNQDI6Qm12iA2iWrUambnE3AnYjJJ1CDOytPnnTsGGdHSIuCA0oZWpW6zR0uRWkgCYkQ60Qifk18jMmavUw46M3XM0o86sqKwhNYBGSfYcshnlnrtxOhjRKzXIRW1gRgYyzt0dEJmwQ7vRsinlO1kFHJCxHaIZ7SFlO1lbOCITduhslO10GOCERBd3h5C/lwKCRplO1h7OSEwo7unaotFepCwnq56JUYJbAUGjXHM3ATFKtOfQCMcuw8kqgBj5XNvODiHiYJThZFVAkKk6RDPKcDpIAEdGkTZiz2gxWeauhwfINB1C7h2G9OaTtYFHtBcuQR1SQojdKMPcyYf0ZOoQ96VAraiRgfnMNBK+EqKjbwVErGxGi7lm+XorY8o9p4Qqb6Sfd2gg+Vy7iENGXUEjZ4f8p46PUZoO8coo7B0RnTs0WsoZua45fxfhZ7TknDr/pyu1QqMNamLpVua0BtQolQ01QhEkg1HYreDOiJhkM4rpELqg0L1zkH3q+teeruKvU3mj2A6pkw6HjGI7xC6jJuCz08uELLwycneIWgl2m6EJvnvEjw3zjELeRQhum6GJ7hC68MjIe+qoFdOpa5J16GMyetohnhm98P0DQjrEKyOfCxWt8JrjuhkC9hzpEN+MvG8FzpvBZ8splwsylTeyCYVMHePN4G9Dn0Q0IR4ZRd8KzKYu4LPTy4R+4GD06vcP5w6xmzp/G9qhj8modew57hkFdYi6WPhklKpDdyZGT2zOMsTmYzI6oVrvueOyGXxd1HMXThk5OuSdEBej3mfPCdetUDyj39/qvVmGIc2eK2W0itxODL7/74NcuPgb3fRoSWCDLsQoyZbzN9rRMV6oQ43ib4UQI9QKyud2xZCgQ4FGSIDTLZzh1tu/V14fQMjMsUYHjR1jVqH/5DTGPIzYDR+u73+gRWQivXRBL51QhuaVxQxNnCrpT9f0FprBT+KOG9rSvCRpX27h+MO+TmVOP85ZqVQqlUqlUqlUKpVKpVKpVPLwDdTKXJ9qCJFdAAAAAElFTkSuQmCC',
      apiBase: 'hgxt',
      libsLoaded: false, // cdn是否加载完成
      apis: {
        queryUserRoleAndToDoNumber: '/business/queryUserRoleAndToDoNumber', // 姓名，角色，代办数量 role: 1 合规领导 2 合规专员 3 专兼职人员 0 无角色权限
        queryAdminProjectAnnuaCompletionStatus: '/business/queryAdminProjectAnnuaCompletionStatus', // 查询管理员角色项目年度完成情况
        AdminProjectLJXMYXT: '/business/queryAdminProjectLJXMYXT', // 查询管理员角色累计项目圆形图数据
        queryAdminProjectLJXMZZT: '/business/queryAdminProjectLJXMZZT', // 查询管理员角色累计项目柱状图数据
        queryAdminProjectDBZGYXT: '/business/queryAdminProjectDBZGYXT', // 查询管理员角色督办整改柱状图数据
        queryAdminProjectDBZGZZT: '/business/queryAdminProjectDBZGZZT', // 查询管理员角色督办整改柱状图数据
        queryAdminProjectHGTHYXT: '/business/queryAdminProjectHGTHYXT', // 查询管理员角色合规谈话圆形图数据
        queryAdminProjectHGTHZZT: '/business/queryAdminProjectHGTHZZT', // 查询管理员角色合规谈话柱状图数据
        queryAdminProjectHGTSWZZZT: '/business/queryAdminProjectHGTSWZZZT', // 查询管理员角色合规提示问责柱状图数据
        queryZyProjectAnnuaCompletionStatus: '/business/queryZyProjectAnnuaCompletionStatus', // 查询专员个人角色项目年度完成情况
        queryZyProjectLJXMYXT: '/business/queryZyProjectLJXMYXT', // 查询专员个人角色累计项目圆形图数据
        queryZyProjectLJXMZZT: '/business/queryZyProjectLJXMZZT', // 查询专员个人角色累计项目柱状图数据
        queryZyProjectDBZGYXTLeft: '/business/queryZyProjectDBZGYXTLeft', // 查询专员个人角色督办整改左圆形图数据
        queryZyProjectDBZGYXTRight: '/business/queryZyProjectDBZGYXTRight', // 查询专员个人角色督办整改右圆形图数据
        queryZyProjectHGTSWZYXT: '/business/queryZyProjectHGTSWZYXT', // 查询专员个人角色合规提示问责圆形图数据
        queryZyProjectHGTSWZZZT: '/business/queryZyProjectHGTSWZZZT', // 查询专员个人角色合规提示问责柱状图数据
        queryZyProjectHGTHYXT: '/business/queryZyProjectHGTHYXT', // 查询专员个人角色合规谈话圆形图数据
        queryZyProjectHGTHZZT: '/business/queryZyProjectHGTHZZT', // 查询专员个人角色合规谈话柱状图数据

      },
      userInfo: {}, // 姓名，角色，代办数量
      adminProjectInfo: {}, // 管理员角色项目年度完成情况
      selectedYear: '2025',
      yearList: ['2023', '2024', '2025', '2026'],
      projectIndex: 0, // 项目类别 0累计项目 1督办整改 2合规提示问责 3合规谈话

      // 管理员-累计项目tab
      adminTabIndex: 0,
      adminTabList: [{label: '全部', value: 0}, {label: '待发起', value: 2}, {label: '进行中', value: 1}, {label: '已验收', value: 4}, {label: '已完成', value: 3}],
     
      // 管理员-累计项目tab2
      adminTabIndex_2: 0,
      adminTabList_2: [{label: '项目类别', value: 0}, {label: '业务条线', value: 1}],

      // 管理员-督办整改tab
      adminTabIndex2: 0,
      adminTabIndex2_2: 0,
      adminTabList2: [{label: '全部', value: 0}, {label: '整改中', value: 1}, {label: '已验收', value: 2}],

      // 管理员-合规问责tab
      adminTabIndex3: 0,
      adminTabList3: [{label: '全部', value: 0}, {label: '被处罚', value: 1}, {label: '被提示', value: 2}],

      // 管理员-合规谈话tab
      adminTabIndex4: 0,
      adminTabList4: [{label: '全部', value: 0}, {label: '已完成', value: 1}, {label: '未完成', value: 2}],

      // 专员-累计项目tab
      zhuanyTabIndex: 0,
      zhuanyTabIndex_2: 0,
      zhuanyTabList: [{label: '全部', value: 0}, {label: '我发起的', value: 1}, {label: '我参与的', value: 2}],
     
      // 专员-督办整改tab
      zhuanyTabIndex2: 0,
      zhuanyTabIndex2_2: 0,
      // 专员-合规问责tab
      zhuanyTabIndex3: 0,
      // 专员-合规谈话tab
      zhuanyTabIndex4: 0,
      zhuanyTabList4: [{label: '全部', value: 0}, {label: '已完成', value: 1}, {label: '未完成', value: 2}],
    }
  },
  async created () {
    await this.loadLibraries()
    this.libsLoaded = true
  },
  async mounted () {
    try {
      this.userInfo = await this.myAxios(this.apis.queryUserRoleAndToDoNumber, {})
      console.log(this.userInfo, 'res')
      const projectYear = this.$getDict?.('projectYear') || {'2024': '2024', '2025': '2025', '2026': '2026', '2027': '2027'}
      console.log(projectYear, 'projectYear')
      this.yearList = Object.values(projectYear)
      this.selectedYear = this.userInfo.year
      if (!window.echarts) {
        await this.loadLibraries()
      }
      // 管理员
      this.init()
      // if (this.userInfo.role == 1) {
      //   // 查询管理员角色项目年度完成情况
      //   this.adminProjectInfo = (await this.myAxios(this.apis.queryAdminProjectAnnuaCompletionStatus, {year: this.selectedYear}))?.data?.[0] || {}
      //   console.log(this.adminProjectInfo, 'adminProjectInfo')
      //   this.adminChart();
      // }
    } catch(err) {
      console.log(err, 'catch err')
    }
    this.isLoading = false;
  },
  methods: {
    gopage (path='', query={}) {
      console.log(path, 'path')
      if (!path) {
        return Error('没有跳转地址')
      }
      window?.gofun?.(path, query)
    },
    async init () {
      if (this.userInfo.role == 1) { // 管理员
        // 查询管理员角色项目年度完成情况
        this.adminProjectInfo = (await this.myAxios(this.apis.queryAdminProjectAnnuaCompletionStatus, {year: this.selectedYear}))?.data?.[0] || {}
        console.log(this.adminProjectInfo, 'adminProjectInfo')
        this.adminChart();
      } else if (this.userInfo.role == 2) { // 专员
        this.adminProjectInfo = (await this.myAxios(this.apis.queryZyProjectAnnuaCompletionStatus, {year: this.selectedYear}))?.data?.[0] || {}
        console.log(this.adminProjectInfo, 'adminProjectInfo')
        this.zhuanyChart();
      }
    },
    // 切换年份
    async onYearChange(e) {
      this.selectedYear = e.target.value;
      this.init()
      // 查询管理员角色项目年度完成情况
      // this.adminProjectInfo = (await this.myAxios(this.apis.queryAdminProjectAnnuaCompletionStatus, {year: this.selectedYear}))?.data?.[0] || {}
      
      // // 调用 API 获取对应年份数据
      // if (this.userInfo.role == 1) {
      //   this.adminChart();
      // }
    },
    // 管理员切换项目类别
    projectClick (index=0) {
      if (index == this.projectIndex) return;
      this.projectIndex = index;
      
      if (this.userInfo.role == 1) {
        this.adminChart();
      } else if (this.userInfo.role == 2) {
        this.zhuanyChart();
      }

    },
    // 管理员
    adminTabClick (v, key="adminTabIndex") {
      console.log(v)
      this[key] = v;
      this.adminChart();
    },
    // 专员
    zhuanyTabClick (v, key="zhuanyTabIndex") {
      console.log(v)
      this[key] = v;
      this.zhuanyChart();
    },
    // 管理员切换tab，渲染各自的图表
    adminChart () {
      console.log('adminChart', this.projectIndex)
      if (this.projectIndex == 0) { // 0累计项目
        this.setAdminPie();
        this.setAdminCategory();
      } else if (this.projectIndex == 1) { // 1督办整改
        this.setAdminPie2();
        this.setAdminCategory2();
      } else if (this.projectIndex == 2) { // 2合规问责
        this.setAdminCategory3();
      } else if (this.projectIndex == 3) { // 3合规谈话
        this.setAdminPie4();
        this.setAdminCategory4();
      }
    },
    // 专员切换tab，渲染各自的图表
    zhuanyChart () {
      console.log('adminChart', this.projectIndex)
      if (this.projectIndex == 0) { // 0累计项目
        this.setZhuanyPie();
        this.setZhuanyCategory();
      } else if (this.projectIndex == 1) { // 1督办整改
        this.setZhuanyPie2();
        this.setZhuanyPie2_1();
      } else if (this.projectIndex == 2) { // 2合规问责
        this.setZhuanyPie3();
        this.setZhuanyCategory3();
      } else if (this.projectIndex == 3) { // 3合规谈话
        this.setZhuanyPie4();
        this.setZhuanyCategory4();
      }
    },
    // 渲染专员累计项目饼图数据
    async setZhuanyPie () {
      let data = (await this.myAxios(this.apis.queryZyProjectLJXMYXT, {year: this.selectedYear, ljxmStatus: this.zhuanyTabIndex, ljxmType: this.zhuanyTabIndex_2 }))?.data || []
      console.log(data, 'data')
      let options = this.getPieOptions(data);
      if (this.$refs.zhuany_pieChartEl) {
        const chart = window.echarts.init(this.$refs.zhuany_pieChartEl)
        chart.setOption(options)
      }
    },
    // 渲染专员督办整改饼图数据-左
    async setZhuanyPie2 () {
      let data = (await this.myAxios(this.apis.queryZyProjectDBZGYXTLeft, {year: this.selectedYear, dbzgStatus: this.zhuanyTabIndex2, dbzgType: this.zhuanyTabIndex2_2 }))?.data || []
      console.log(data, 'data')
      let options = this.getPieOptions(data);
      if (this.$refs.zhuany_pieChartEl2) {
        const chart = window.echarts.init(this.$refs.zhuany_pieChartEl2)
        chart.setOption(options)
      }
    },
    // 渲染专员督办整改饼图数据-右
    async setZhuanyPie2_1 () {
      let data = (await this.myAxios(this.apis.queryZyProjectDBZGYXTRight, {year: this.selectedYear, dbzgStatus: this.zhuanyTabIndex2 }))?.data || []
      console.log(data, 'data')
      let options = this.getPieOptions(data);
      if (this.$refs.zhuany_pieChartEl2_1) {
        const chart = window.echarts.init(this.$refs.zhuany_pieChartEl2_1)
        chart.setOption(options)
      }
    },
    // 渲染专员合规提示问责饼图数据
    async setZhuanyPie3 () {
      let data = (await this.myAxios(this.apis.queryZyProjectHGTSWZYXT, {year: this.selectedYear, hgtswzStatus: this.zhuanyTabIndex3 }))?.data || []
      console.log(data, 'data')
      let options = this.getPieOptions(data);
      if (this.$refs.zhuany_pieChartEl3) {
        const chart = window.echarts.init(this.$refs.zhuany_pieChartEl3)
        chart.setOption(options)
      }
    },
    // 渲染专员合规谈话饼图数据
    async setZhuanyPie4 () {
      let data = (await this.myAxios(this.apis.queryZyProjectHGTHYXT, {year: this.selectedYear, hgthStatus: this.zhuanyTabIndex4 }))?.data || []
      console.log(data, 'data')
      let options = this.getPieOptions(data);
      if (this.$refs.zhuany_pieChartEl4) {
        const chart = window.echarts.init(this.$refs.zhuany_pieChartEl4)
        chart.setOption(options)
      }
    },
    // 渲染专员累计项目柱状图数据
    async setZhuanyCategory () {
      let data = (await this.myAxios(this.apis.queryZyProjectLJXMZZT, {year: this.selectedYear, ljxmStatus: this.zhuanyTabIndex }))?.data || []
      console.log(data, 'data-setZhuanyCategory')
      let options = this.getCategoryOptions(data);
      if (this.$refs.zhuany_categoryChartEl) {
        const chart = window.echarts.init(this.$refs.zhuany_categoryChartEl)
        chart.setOption(options)
      }
    },
    // 渲染专员合规问责柱状图数据
    async setZhuanyCategory3 () {
      let data = (await this.myAxios(this.apis.queryZyProjectHGTSWZZZT, {year: this.selectedYear, hgtswzStatus: this.zhuanyTabIndex3 }))?.data || []
      console.log(data, 'data-setZhuanyCategory')
      // 双柱状图
      let options = this.getCategoryOptions2(data);
      if (this.$refs.zhuany_categoryChartEl3) {
        const chart = window.echarts.init(this.$refs.zhuany_categoryChartEl3)
        chart.setOption(options)
      }
    },
    // 渲染专员合规谈话柱状图数据
    async setZhuanyCategory4 () {
      let data = (await this.myAxios(this.apis.queryZyProjectHGTHZZT, {year: this.selectedYear, hgthStatus: this.zhuanyTabIndex4 }))?.data || []
      console.log(data, 'data-setZhuanyCategory')
      let options = this.getCategoryOptions(data);
      if (this.$refs.zhuany_categoryChartEl4) {
        const chart = window.echarts.init(this.$refs.zhuany_categoryChartEl4)
        chart.setOption(options)
      }
    },
    // 渲染管理员累计项目饼图数据
    async setAdminPie () {
      let data = (await this.myAxios(this.apis.AdminProjectLJXMYXT, {year: this.selectedYear, ljxmStatus: this.adminTabIndex, ljxmType: this.adminTabIndex_2 }))?.data || []
      console.log(data, 'data')
      let options = this.getPieOptions(data);
      if (this.$refs.pieChartEl) {
        const chart = window.echarts.init(this.$refs.pieChartEl)
        chart.setOption(options)
      }
    },
    // 渲染管理员督办整改饼图数据
    async setAdminPie2 () {
      let data = (await this.myAxios(this.apis.queryAdminProjectDBZGYXT, {year: this.selectedYear, dbzgStatus: this.adminTabIndex2, dbzgType: this.adminTabIndex2_2 }))?.data || []
      console.log(data, 'data')
      let options = this.getPieOptions(data);
      if (this.$refs.pieChartEl2) {
        const chart = window.echarts.init(this.$refs.pieChartEl2)
        chart.setOption(options)
      }
    },
    // 渲染管理员合规谈话饼图数据
    async setAdminPie4 () {
      let data = (await this.myAxios(this.apis.queryAdminProjectHGTHYXT, {year: this.selectedYear, hgthStatus: this.adminTabIndex4 }))?.data || []
      console.log(data, 'data')
      let options = this.getPieOptions(data);
      if (this.$refs.pieChartEl4) {
        const chart = window.echarts.init(this.$refs.pieChartEl4)
        chart.setOption(options)
      }
    },
    // 渲染管理员累计项目柱状图数据
    async setAdminCategory () {
      let data = (await this.myAxios(this.apis.queryAdminProjectLJXMZZT, {year: this.selectedYear, ljxmStatus: this.adminTabIndex }))?.data || []
      console.log(data, 'data-setAdminCategory')
      let options = this.getCategoryOptions(data);
      if (this.$refs.categoryChartEl) {
        const chart = window.echarts.init(this.$refs.categoryChartEl)
        chart.setOption(options)
      }
    },
    // 渲染管理员督办整改柱状图数据
    async setAdminCategory2 () {
      let data = (await this.myAxios(this.apis.queryAdminProjectDBZGZZT, {year: this.selectedYear, dbzgStatus: this.adminTabIndex2 }))?.data || []
      console.log(data, 'data-setAdminCategory')
      let options = this.getCategoryOptions(data);
      if (this.$refs.categoryChartEl2) {
        const chart = window.echarts.init(this.$refs.categoryChartEl2)
        chart.setOption(options)
      }
    },
    // 渲染管理员合规问责柱状图数据
    async setAdminCategory3 () {
      let data = (await this.myAxios(this.apis.queryAdminProjectHGTSWZZZT, {year: this.selectedYear, hgtswzStatus: this.adminTabIndex3 }))?.data || []
      console.log(data, 'data-setAdminCategory3')
      // 双柱状图
      let options = this.getCategoryOptions2(data);
      if (this.$refs.categoryChartEl3) {
        const chart = window.echarts.init(this.$refs.categoryChartEl3)
        chart.setOption(options)
      }
    },
    // 渲染管理员督办整改柱状图数据
    async setAdminCategory4 () {
      let data = (await this.myAxios(this.apis.queryAdminProjectHGTHZZT, {year: this.selectedYear, hgthStatus: this.adminTabIndex4 }))?.data || []
      console.log(data, 'data-setAdminCategory')
      let options = this.getCategoryOptions(data);
      if (this.$refs.categoryChartEl4) {
        const chart = window.echarts.init(this.$refs.categoryChartEl4)
        chart.setOption(options)
      }
    },
    // 拿到环形饼图配置，传入数组
    getPieOptions (list=[]) {
      // list格式：{"label": "合规检查","value": "1","name": "合规检查","count": "19"}
      let sum = list[0]?.count || 0;
      sum == 0 && (list = []);
       // 构造图例数据：name 显示为 "标签 (数量)"
      const legendData = list.map(item => ({
        name: `${item.label} (${item.value})`, // 或 item.name，根据你的字段
        // 注意：series.data 中的 name 必须和 legend 的 name 一致才能联动高亮！
      }));
       // 同时，series.data 中的 name 也要同步改为带数量的格式
      const seriesData = list.map(item => ({
        value: item.value,
        name: `${item.label} (${item.value})`, // 必须和 legend 中的 name 一致
        // 如果 tooltip 还想只显示原始 label，可以额外存一个维度，见下方说明
      }));
      console.log(legendData, 'legendData', seriesData)
      const option = {
        // 中间只显示总数（如 16）
        graphic: {
          elements: [
            {
              type: 'image',
              left: 'center',
              top: '6%', // 调整位置使图标居中偏上
              style: {
                image: this.placeholderSvg, // 使用Base64编码的SVG图像
                width: !list.length ? 60 : 0,
                height: !list.length ? 60 : 0
              }
            },
            {
              type: 'text',
              left: 'center',
              top: '46%',
              style: {
                text: !list.length ? '暂无数据 ~' : '',
                fontSize: 14,
                fill: '#909399',
                textAlign: 'center'
              }
            },
            {
              type: 'text',
              left: 'center',
              top: 'middle',
              style: {
                text: !list.length ? '' : sum,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                fill: '#333'
              }
            },
            {
              type: 'text',
              left: 'center',
              top: '57%', // 或 'middle + 16'
              style: {
                text: !list.length ? '' : '累计',
                textAlign: 'center',
                fontSize: 10,
                fill: '#999'
              }
            }
          ]
        },
        // color: ['rgb(80,112,221)', 'rgb(182,214,52)'], // 全局配色，按顺序分配
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            // params.name 是 "合规检查 (19)"，但我们可能只想显示 "合规检查"
            // 所以可以从原始数据中提取 label
            const originalLabel = list.find(item => 
              `${item.label} (${item.value})` === params.name
            )?.label || params.name;
            return `${params.seriesName}<br/>${originalLabel}: ${params.value} (${params.percent}%)`;
          }
        },

        // 图例：底部靠左，圆点，单行
        legend: {
          orient: 'vertical',
          right: '6%',
          top: 'center',
          itemWidth: 8,
          itemHeight: 8,
          // 强制使用圆形 marker
          icon: 'circle', // 关键：指定为圆点
          textStyle: {
            fontSize: 12,
            color: '#666',
            // overflow: 'truncate', // 防止换行（ECharts ≥5.3）
            // width: 90 // 可根据实际调整
          },
          data: legendData // 使用带数量的名称
          // data: list
          // data: [
          //   { name: '稽核审计' },
          //   { name: '合规检查' }
          // ]
        },

        series: [
          {
            name: '名称：',
            type: 'pie',
            radius: [!list.length ? '70%' : '43%', '70%'], // 环形宽度设置
            // 将环形图中心上移
            center: ['50%', '50%'], // 水平居中，垂直 38%（原为 50%）
            label: { show: false },
            labelLine: { show: false },
            // data: list,
            data: seriesData, // 必须与 legend.name 一致
            // data: [
            //   { value: 10, name: '稽核审计' },
            //   { value: 6, name: '合规检查' }
            // ],
            emphasis: {
              itemStyle: {
                shadowBlur: 6,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {
              borderRadius: 0 // 无圆角
            }
          }
        ]
      };
      return option;
    },
    // 拿到柱状图配置，传入数组
    getCategoryOptions(list = []) {
      // list格式：[{label: "管理员", value: "18", name: "管理员", count: nul}]
      const option = {
        graphic: {
          elements: [
            {
              type: 'image',
              left: 'center',
              top: '30%', // 调整位置使图标居中偏上
              style: {
                image: this.placeholderSvg, // 使用Base64编码的SVG图像
                width: !list.length ? 60 : 0,
                height: !list.length ? 60 : 0
              }
            },
            {
              type: 'text',
              left: 'center',
              top: '70%',
              style: {
                text: !list.length ? '暂无数据 ~' : '',
                fontSize: 14,
                fill: '#909399',
                textAlign: 'center'
              }
            }
          ]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b}: {c}'
        },

        xAxis: {
          type: 'category',
          data: list.map(item => item.name),
          axisLabel: {
            color: '#666',
            fontSize: 12,
            interval: 0 // 防止标签换行
          },
          axisLine: {
            show: false // 不显示X轴线
          },
          axisTick: {
            show: false // 不显示刻度线
          }
        },

        yAxis: {
          type: 'value',
          min: 0,
          interval: 100,
          axisLabel: {
            color: '#666',
            fontSize: 12
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed', // 虚线网格
              color: '#e9ecef',
              width: 1
            }
          },
          axisLine: {
            show: false // 不显示Y轴线
          },
          axisTick: {
            show: false // 不显示刻度线
          }
        },

        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '30%', // 控制柱子宽度（可调）
            itemStyle: {
              color: '#4A90E2' // 统一蓝色
            },
            data: list.map(item => item.value),
             // 添加label配置以在柱状图顶部显示数值
            label: {
                show: true,
                position: 'top', // 设置为柱子顶部
                valueAnimation: false, // 可选：为数值添加动画效果
                fontSize: 12, // 字体大小
                color: '#333' // 字体颜色
            }
          }
        ],

        grid: {
          left: '10%',
          right: '10%',
          bottom: '10%',
          top: '15%'
        }
      };

      return option;
    },
    // 拿到柱状图配置，传入对象 -- 双柱状图
    getCategoryOptions2 (obj = {}) {
      // obj格式：{
      //     "分数": {
      //         "财富管理条线": 898,
      //         "风险合规条线": 1,
      //         "资管公司风控运营": 7,
      //         "运作保障条线": 9
      //     },
      //     "人数": {
      //         "财富管理条线": 17,
      //         "风险合规条线": 3,
      //         "资管公司风控运营": 1,
      //         "运作保障条线": 2
      //     }
      // }

      // 提取类别名，比如“财富管理条线”，“风险合规条线”
      const categories = Object.keys(obj['分数'] || []);

      const option = {
        graphic: {
          elements: [
            {
              type: 'image',
              left: 'center',
              top: '30%', // 调整位置使图标居中偏上
              style: {
                image: this.placeholderSvg, // 使用Base64编码的SVG图像
                width: !categories.length ? 60 : 0,
                height: !categories.length ? 60 : 0
              }
            },
            {
              type: 'text',
              left: 'center',
              top: '70%',
              style: {
                text: !categories.length ? '暂无数据 ~' : '',
                fontSize: 14,
                fill: '#909399',
                textAlign: 'center'
              }
            }
          ]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            let result = '';
            params.forEach(function(item) {
              result += item.seriesName + ': ' + item.value + '<br/>';
            });
            return result;
          }
        },

        legend: {
          data: categories.length ? ['分数', '人数'] : [], // 显示在图表上的图例
        },

        xAxis: {
          type: 'category',
          data: categories, // 使用提取的类别名
          axisLabel: {
            color: '#666',
            fontSize: 12,
            interval: 0 // 防止标签换行
          },
          axisLine: {
            show: false // 不显示X轴线
          },
          axisTick: {
            show: false // 不显示刻度线
          }
        },

        yAxis: {
          type: 'value',
          min: 0,
          interval: 100,
          axisLabel: {
            color: '#666',
            fontSize: 12
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed', // 虚线网格
              color: '#e9ecef',
              width: 1
            }
          },
          axisLine: {
            show: false // 不显示Y轴线
          },
          axisTick: {
            show: false // 不显示刻度线
          }
        },

        series: [
          {
            name: '分数',
            type: 'bar',
            barWidth: '30%',
            barMaxWidth: 40,
            itemStyle: {
              color: 'rgb(80,112,221)' // 分数对应的蓝色
            },
            data: categories.map(cat => obj['分数'][cat]) || [],
            // 添加label配置以在柱状图顶部显示数值
            label: {
                show: true,
                position: 'top', // 设置为柱子顶部
                valueAnimation: true, // 可选：为数值添加动画效果
                fontSize: 12, // 字体大小
                color: '#333' // 字体颜色
            }
          },
          {
            name: '人数',
            type: 'bar',
            barWidth: '30%',
            barMaxWidth: 40,
            itemStyle: {
              color: 'rgb(182,214,52)' // 人数对应的灰色或其他颜色
            },
            data: categories.map(cat => obj['人数'][cat]) || [],
             // 添加label配置以在柱状图顶部显示数值
            label: {
                show: true,
                position: 'top', // 设置为柱子顶部
                valueAnimation: true, // 可选：为数值添加动画效果
                fontSize: 12, // 字体大小
                color: '#333' // 字体颜色
            }
          }
        ],

        grid: {
          left: '10%',
          right: '10%',
          bottom: '10%',
          top: '15%'
        }
      };
      return option;
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

    loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.crossOrigin = 'anonymous' // 关键！
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    },
    async loadLibraries() {
      // 4. 加载 ECharts
      await this.loadScript('https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js')
    },
  }
}
</script>
<style scoped>
  .year_status_warp {
    padding: 0 20px 16px 20px;
    background: #f8f9fa;
    text-align: left;
  }
 .year_status {
  padding: 12px 16px 6px 16px;
  border: 3px solid #ffffff;
  border-radius: 8px;
  background: #ffffff;
}
.year_status .data-dashboard .header {
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
}
.year_status .data-dashboard .header .year-select {
  padding: 4px 8px;
  font-size: 16px;
  border: none;
  background-color: transparent;
  color: #495057;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236c757d' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px;
  border: 1px solid #D3D3D3;
  border-radius: 4px;
  padding: 6px 16px;
  padding-right: 24px;
}
.year_status .data-dashboard .subtitle {
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 20px;
}
.year_status .data-dashboard .years_content {
  display: flex;
  gap: 20px;
}
.year_status .data-dashboard .years_content .left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
  min-width: 260px;
}
.year_status .data-dashboard .years_content .left-panel .card {
  padding: 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: relative;
  transition: transform 0.2s ease;
}
.year_status .data-dashboard .years_content .left-panel .card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  cursor: pointer;
}
.year_status .data-dashboard .years_content .left-panel .card .title {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 8px;
  width: 100px;
}
.year_status .data-dashboard .years_content .left-panel .card .number {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  color: #333;
  display: flex;
  justify-content: space-between;
  padding-right: 80px;
}
.year_status .data-dashboard .years_content .left-panel .card .trend {
  font-size: 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.year_status .data-dashboard .years_content .left-panel .card .arrow-up {
  color: #28a745;
}
.year_status .data-dashboard .years_content .left-panel .card .arrow-down {
  color: #dc3545;
}
.year_status .data-dashboard .years_content .left-panel .card .icon_box {
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 16px;
  right: 16px;
}
.year_status .data-dashboard .years_content .left-panel .card .icon_box1 {
  background: #e8f3ff;
}
.year_status .data-dashboard .years_content .left-panel .card .icon_box2 {
  background: #fee2e2;
}
.year_status .data-dashboard .years_content .left-panel .card .icon_box3 {
  background: #dbeafe;
}
.year_status .data-dashboard .years_content .left-panel .card .icon_box4 {
  background: #f3e8ff;
}
.year_status .data-dashboard .years_content .left-panel .card .icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
}
.year_status .data-dashboard .years_content .left-panel .card.cumulative {
  border: 2px solid #165dff;
}
.year_status .data-dashboard .years_content .left-panel .card.cumulative::before {
  content: '';
  position: absolute;
  top: 50%;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 10px solid #165dff;
  transform: translateY(-50%);
  display: block;
  z-index: 2;
}
.year_status .data-dashboard .years_content .left-panel .card.cumulative::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -8px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 8px solid white;
  transform: translateY(-50%);
  display: block;
  z-index: 3;
}
.year_status .data-dashboard .years_content .right-panel {
  flex: 2;
}
.year_status .data-dashboard .years_content .right-panel .tabs_line {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  margin-left: 16px;
}
.year_status .data-dashboard .years_content .right-panel .tabs_line .tab {
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
  height: 34px;
}
.year_status .data-dashboard .years_content .right-panel .tabs_line .tab.active {
  border-bottom: 2px solid #165dff;
  color: #165dff;
}
.year_status .data-dashboard .years_content .right-panel .chart_box {
  display: flex;
  gap: 20px;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .tabs {
  display: flex;
  margin-bottom: 20px;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .tabs .tab {
  padding: 8px 16px;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: all 0.2s ease;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .tabs .tab:hover {
  background-color: #e9ecef;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .tabs .tab.active {
  background-color: #165dff;
  color: white;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .tabs .tab:first-child {
  border-radius: 14px 0 0 14px;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .tabs .tab:last-child {
  border-radius: 0 14px 14px 0;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .chart-card {
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  background-color: white;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .chart-card .chart-title {
  margin-top: 20px;
  font-size: 14px;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .chart-card .chart-content {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6c757d;
  font-size: 14px;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .chart-card .legend {
  display: flex;
  gap: 32px;
  margin-top: 16px;
  font-size: 12px;
  color: #6c757d;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .chart-card .legend .item {
  display: flex;
  align-items: center;
  gap: 4px;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .chart-card .legend .item .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .chart-card .legend .item .label {
  font-size: 12px;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .chart-card .legend .blue-dot .dot {
  background-color: #165dff;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .chart-card .legend .green-dot .dot {
  background-color: #28a745;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .stat-card {
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  background-color: white;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .stat-card .stat-title {
  font-size: 14px;
  margin-top: 68px;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
.year_status .data-dashboard .years_content .right-panel .chart_box .stat-card .stat-content {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6c757d;
  font-size: 14px;
}
.year_status .data-dashboard .years_content .right-panel .chart_box2 {
  padding-top: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.year_status .data-dashboard .years_content .right-panel .chart_box2 .stat-content {
  width: 100%;
  max-width: 800px;
  height: 250px;
  color: #6c757d;
  font-size: 14px;
}

</style>