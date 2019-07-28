<template>
    <div>
        <!-- 筛选表单 -->
        <div style="margin-bottom:20px;overflow:hidden;padding-right:120px;" >
            <span style="float:left;margin-left:20px;">筛选</span>
            <el-button style="float:right" type="button"  class="el-button el-button--primary el-button--small" @click="resetHandler"> <i class="el-icon-refresh"  style="margin-right:5px;"></i>重置</el-button>
            <el-button  style="float:right;margin-right:30px;"  type="button" class="el-button el-button--primary el-button--small" @click="searchHandler"><i class="el-icon-search" style="margin-right:5px;"></i>查询</el-button>
        </div>
        <el-form label-position="right" label-width="115px" :inline="true" :model="filterInfo" ref="filterForm" size="small">
            <div>
                <el-form-item label="课程创建城市: " prop="area_code">
                    <el-select v-model="filterInfo.area_code" placeholder="课程创建城市" @change="citySelectChangeHandler">
                        <el-option  v-for="item in cityList" :key="item.cityCode" :label="item.name" v-bind:value="item.cityCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程ID: " prop="lnum">
                    <el-input v-model.trim="filterInfo.lnum" placeholder="课程ID" clearable></el-input>  
                </el-form-item>
                <el-form-item label="主讲: " prop="emp_no">
                    <el-autocomplete v-if="userType == 1"
                        value-key="sysName"
                        clearable
                        class="inline-input"
                        v-model="filterShowInfo.teacher_name"
                        :fetch-suggestions="queryTeacher"
                        placeholder="主讲老师"
                        :trigger-on-focus="false"
                        @select="handleTeacherSelect"
                        @blur="teacherBlurHandler"
                        @clear="clearTeacherHandler"
                        @keyup.native="keyupHandler"
                        ></el-autocomplete>
                        <el-select v-if="userType == 0" v-model="filterShowInfo.teacher_name" placeholder="主讲老师" @change="handleTeacherSelect">
                            <el-option v-for="item in teacherOptions" :key="item.empNo" :label="item.sysName" v-bind:value="item.empNo"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="班次: " prop="level_id">
                    <el-autocomplete
                        value-key="name"
                        clearable
                        class="inline-input"
                        v-model="filterShowInfo.level_name"
                        :fetch-suggestions="queryLevel"
                        placeholder="班次"
                        :trigger-on-focus="false"
                        @select="handleLevelSelect"
                        @blur="levelBlurHandler"
                        @clear="clearLevelHandler"
                        @keyup.native="keyupHandler"
                        ></el-autocomplete>  
                </el-form-item>
                <el-form-item label="年份: " prop="year">
                    <el-select v-model="filterInfo.year" placeholder="年份">
                        <el-option  v-for="(item,index) in yearList" :key="index" :label="item" v-bind:value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学期: " prop="term_id">
                    <el-select v-model="filterInfo.term_id" placeholder="学期">
                        <el-option label="全部" value=""></el-option>
                        <el-option  v-for="item in termList" :key="item.id" :label="item.name" v-bind:value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学科: " prop="subject_id">
                    <el-select v-model="filterInfo.subject_id" placeholder="学科">
                        <el-option label="全部" value=""></el-option>
                        <el-option  v-for="item in subjectListData" :key="item.id" :label="item.name" v-bind:value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级: " prop="grade_id">
                    <el-select v-model="filterInfo.grade_id" placeholder="年级">
                        <el-option label="全部" value=""></el-option>
                        <el-option  v-for="item in gradeList" :key="item.id" :label="item.name" v-bind:value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <div v-if="this.parentPage === 'videoPage'">
                    <el-form-item label="开课日期:" prop="start_date_range" >
                        <el-date-picker
                            editable
                            clearable
                            v-model="filterInfo.start_date_range" 
                            type="daterange" 
                            align="left" 
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期" 
                            value-format="yyyy-MM-dd"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结课日期:" prop="end_date_range" >
                        <el-date-picker
                            editable
                            clearable
                            v-model="filterInfo.end_date_range" 
                            type="daterange" 
                            align="left" 
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期" 
                            value-format="yyyy-MM-dd"
                            >
                        </el-date-picker>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    props: ['parentPage'],                  // 父组件来源
    data() {
        return {
            userType: localStorage.getItem('isAdmin'),                       // 0: 普通用户(下拉), 1: 超管(模糊搜索)
            cityList: [{ cityCode: '0101', name: '全国' }],                   // 城市
            subjectListData: [],            // 课程
            gradeList: [],                  // 年级
            termList: [],                   // 学期
            yearList: [],                   // 年份
            teacherOptions: [],             // 当userType = 0时使用, 主讲下拉框
            filterShowInfo: {               // 不需要传参的字段, 只用于显示
                teacher_name: '',
                level_name: '',
            },
            hasSelected: false,             // 是否选择了下拉框中的值(主讲, 班次)
            filterInfo: {
                area_code: '0101',          // 地区编码(非空)
                lnum: '',                   // 课程id
                emp_no: '',                 // 员工编号
                grade_id: '',               // 年级id
                level_id: '',               // 班次id
                year: '全部',                // 年
                term_id: '',                // 学期id
                subject_id: '',             // 学科id
                start_date_range: null,     // 开课日期
                end_date_range: null,       // 结课日期
            },
            params: {                       // 请求列表参数
                area_code: '0101',
                lnum: '',
                emp_no: '',
                grade_id: '',
                level_id: '',
                term_id: '',
                subject_id: '',
                start_date_range: '',
                end_date_range: '',
            },
            matchedList: {                  // 模糊查询结果
                teacher: [],                // 主讲
                level: [],                  // 班次
            }
        }
    },
    created(){
        this.getCityInfoList();
        this.getSelectList();
        this.$emit('sendParentData', this.params);
    },
    methods: {
        ...mapActions(['CityInfoList', 'SelectList', 'teacherList', 'levelList']),
        // 获取查询条件城市
        getCityInfoList(){
            let params = {
                videoType: this.parentPage === 'videoPage' ? 1 : 2,
            }
            this.CityInfoList(params).then(data => {
                let res = data.result;
                res.forEach((item, index) => {
                    if(item.cityCode == '0101') {
                        res.unshift(res.splice(index, 1)[0]);
                        return false;
                    }
                });
                this.cityList = res;
            }).catch(err => {
            })
        },
        // 获取学科年级学期年份
        getSelectList() {
            let params = {
                area: this.filterInfo.area_code,
                videoType: this.parentPage === 'videoPage' ? 1 : 2,
            }
            this.SelectList(params).then(data => {
                this.subjectListData = data.result.subject;
                this.gradeList = data.result.grade;
                this.termList = data.result.term;
                this.yearList = data.result.year;
                this.yearList && this.yearList.unshift('全部');
            });
            // 判断用户类型
            if(this.userType == 0) {
                this.queryTeacher('', (data) => {
                    this.teacherOptions = data;
                    this.filterShowInfo.teacher_name= data[0].sysName;
                    this.params.emp_no = data[0].empNo;
                })
            }
        },
        // 城市下拉框值发生变化时, 重新请求其他下拉框数据
        citySelectChangeHandler() {
            this.getSelectList();
            this.filterInfo.lnum = '';
            this.filterInfo.emp_no = '';
            this.filterInfo.grade_id = '';
            this.filterInfo.level_id = '';
            this.filterInfo.year = '全部';
            this.filterInfo.term_id = '';
            this.filterInfo.subject_id = '';
            this.filterShowInfo.teacher_name = '';
            this.filterShowInfo.level_name = '';
            this.filterInfo.start_date_range = '';
            this.filterInfo.end_date_range = '';
            this.params = JSON.parse(JSON.stringify(this.filterInfo));
            delete this.params.year;
        },
        // 模糊查询主讲
        queryTeacher(queryString, cb) {
            let params = {
                areaCode: this.filterInfo.area_code,
                sysName: queryString,
                teacherType: '0', // 1是辅导老师  0 主讲老师
            }
            this.teacherList(params).then(data => {
                if(!data.result) {
                    data.result = [];
                }
                this.matchedList.teacher = data.result;
                cb(data.result);
            })
        }, 
        // 模糊查询班次
        queryLevel(queryString, cb) {
            let params = {
                area: this.filterInfo.area_code,
                name: queryString,
            }
            this.levelList(params).then(data => {
                if(!data.result) {
                    data.result = [];
                }
                this.matchedList.level = data.result;
                cb(data.result);
            })
        }, 
        // 选择主讲 
        handleTeacherSelect(data) {
            console.log(data)
            this.filterInfo.emp_no = this.userType == 0 ? data : data.empNo;
            this.hasSelected = true;
        },
        // 选择班次
        handleLevelSelect(item) {
            this.filterInfo.level_id = item.schoolId;
            this.hasSelected = true;
        },
        // 主讲失焦
        teacherBlurHandler(e) {
            if(e.target.value === '') {
                this.filterInfo.emp_no = '';
            } else if(!this.hasSelected) {
                this.filterInfo.emp_no = '99999999';
                this.matchedList.teacher.forEach(item => {
                    if(item.sysName === e.target.value) {
                        this.filterInfo.emp_no = item.empNo;
                        return false;
                    }
                })
            }
            this.hasSelected = false;
        },
        // 班次失焦
        levelBlurHandler(e) {
            if(e.target.value === '') {
                this.filterInfo.level_id = '';
            } else if(!this.hasSelected) {
                this.filterInfo.level_id = '99999999999999999999999999999999';
                this.matchedList.level.forEach(item => {
                    if(item.name === e.target.value) {
                        this.filterInfo.level_id = item.schoolId;
                        return false;
                    }
                })
            }
            this.hasSelected = false;
        },
        // 清空主讲
        clearTeacherHandler() {
            this.filterInfo.emp_no = '';
            this.hasSelected = false;
        },
        // 清空班次
        clearLevelHandler() {
            this.filterInfo.level_id = '';
            this.hasSelected = false;
        },
        // 模糊查询input框keyup
        keyupHandler() {
            this.hasSelected = false;
        },
        searchHandler() {
            this.params = JSON.parse(JSON.stringify(this.filterInfo));
            if(this.params.year == '全部') {
                delete this.params.year;
            }
            this.params.start_date_range = !!this.params.start_date_range ? this.params.start_date_range.join() : '';
            this.params.end_date_range = !!this.params.end_date_range ? this.params.end_date_range.join() : '';
            if(this.parentPage !== 'videoPage') {
                delete this.params.start_date_range;
                delete this.params.end_date_range;
            }
            this.$emit('sendParentData', this.params);
        },
        resetHandler() {
            this.$refs.filterForm.resetFields();
            this.filterShowInfo.teacher_name = '';
            this.filterShowInfo.level_name = '';
            this.filterInfo.start_date_range = '';
            this.filterInfo.end_date_range = '';
            this.params = JSON.parse(JSON.stringify(this.filterInfo));
            delete this.params.year;
            this.$emit('sendParentData', this.params);
        }
    }
}
</script>
<style lang="scss">
</style>


