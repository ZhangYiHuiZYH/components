<template>
    <section class="box">
        <header class="query_header">
            <div class="query_header_left">
                <el-select v-model="category.subject_id" size="mini" style="width:100px;" placeholder="学科">
                    <el-option v-for="(item,index) in filterInfo.subjectList" :key="index" :label="item.subject_name" :value="item.subject_id"></el-option>
                </el-select>
                <el-select v-model="category.stage_id" size="mini" style="width:100px;" placeholder="学段">
                    <el-option v-for="(item,index) in filterInfo.stageList" :key="index" :label="item.stage_name" :value="item.stage_id"></el-option>
                </el-select>
                <el-select v-model="category.usage_id" size="mini" style="width:120px;" placeholder="题目用途">
                    <el-option v-for="(item,index) in filterInfo.usageList" :key="index" :label="item.usage_name" :value="item.usage_id"></el-option>
                </el-select>
                <el-autocomplete :fetch-suggestions="getFuzzyselect" v-model="fuzzy.Kpath"  clearable size="mini" @select="handleSelect" placeholder="请输入知识点关键字" popper-class="fuzzy_width">
                    <template slot-scope="{ item }">
                        <div class="name">{{ item.path }}</div>
                    </template>
                </el-autocomplete>
                <el-date-picker v-model="dateValue" value-format="yyyy-MM-dd" type="date" placeholder="查询时间" size="mini"></el-date-picker>
                <el-button size="mini" type="primary" plain @click="search(1)">搜索</el-button>
            </div>
            <div class="query_header_right">
                <el-button size="mini" type="success" @click="jion()">完成加入</el-button>
            </div>
        </header>
        <div class="container" v-loading="isloading">
            <el-row>
                <el-col :span="6" class="query_left" v-loading="treeloading">
                    <treeRadio ref="treeR" :tree="tree" @update="selectTree"></treeRadio>
                </el-col>
                <el-col :span="18" class="query_right">
                    <div class="query_selected" v-if="chooseShow">
                        <span class="query_condition query_condition_sel">已选</span>
                        <div class="selected_item_box">
                            <span class="selected_item" v-if="tree_select.name!=''">
                                {{tree_select.name}}
                                <i class="el-icon-close" @click="delTree()"></i>
                            </span>
                            <div class="selected_item" v-if="selectList.selectedYear!=''">
                                {{selectList.selectedYear}}
                                <i class="el-icon-close" @click="delYear()"></i>
                            </div>
                            <div class="selected_item" v-if="selectList.province!=''">
                                {{selectList.province}}
                                <i class="el-icon-close" @click="delProvince()"></i>
                            </div>
                            <div class="selected_item" v-if="selectList.city!=''">
                                {{selectList.city}}
                                <i class="el-icon-close" @click="delCity()"></i>
                            </div>
                            <div class="selected_item" v-if="selectList.country!=''">
                                {{selectList.country}}
                                <i class="el-icon-close" @click="delCountry()"></i>
                            </div>
                            <div class="selected_item" v-if="selectList.school!=''">
                                {{selectList.school}}
                                <i class="el-icon-close" @click="delSchool()"></i>
                            </div>
                            <div class="selected_item" v-if="selectList.selectedGrade!=''">
                                {{selectList.selectedGrade}}
                                <i class="el-icon-close" @click="delGrade()"></i>
                            </div>
                            <div class="selected_item" v-if="selectList.selctedTerm!=''">
                                {{selectList.selctedTerm}}
                                <i class="el-icon-close" @click="delTerm()"></i>
                            </div>
                            <div class="selected_item" v-if="selectList.selectedExamtype!=''">
                                {{selectList.selectedExamtype}}
                                <i class="el-icon-close" @click="delExamtype()"></i>
                            </div>
                            <div class="selected_item" v-if="selectList.selectedType!=''">
                                {{selectList.selectedType}}
                                <i class="el-icon-close" @click="delType()"></i>
                            </div>
                            <div class="selected_item" v-if="selectList.selectedDegree!=''">
                                {{selectList.selectedDegree}}
                                <i class="el-icon-close" @click="delDegree()"></i>
                            </div>
                            <div class="selected_item" v-if="selectList.selectedAnalyze !=''">
                                {{selectList.selectedAnalyze}}
                                <i class="el-icon-close" @click="delAnalyze()"></i>
                            </div>
                        </div>
                        <div class="clear-all-selected" @click="delAllSel(true)">
                            <i class="el-icon-delete"></i><span>清空</span>
                        </div>
                    </div>
                    <div class="screen-box">
                        <div class="screen-box-list">
                            <span class="query_condition">学年</span>
                            <div class="condition">
                            <span class="item item_all" :class="{selectedActive:filterList.yearList[0].isSelected}" @click="active(0,'yearList')">{{filterList.yearList[0].name}}</span>
                            <div class="item_other">
                            <span class="item" :class="{selectedActive:item.isSelected}" v-for="(item,index) in filterList.yearList" v-if="index>0?true:false" :key="index" @click="active(index,'yearList')">{{item.name}}</span>
                            </div>
                            </div>
                        </div>
                        <div class="screen-box-list">
                            <span class="query_condition">省份</span>
                            <div class="condition">
                             <el-select v-model="province_code" @change="choseCity()" clearable placeholder="省份" size="mini" style="width:150px;">
                               <el-option v-for="(item,index) in filterList.province" :key="index" :label="item.province_name"   :value="item.province_code"></el-option>
                              </el-select>
                              <el-select v-model="city_code" @change="choseCountry()" clearable placeholder="城市" size="mini" style="width:150px;">
                            <el-option v-for="(item,index) in filterList.city" :key="index"  :label="item.city_name"  :value="item.city_code"></el-option>
                              </el-select>
                              <el-select v-model="country_code" @change="choseSchool()" clearable placeholder="区" size="mini" style="width:150px;">
                                <el-option v-for="(item,index) in filterList.country" :key="index" :label="item.country_name"    :value="item.country_code"></el-option>
                              </el-select>
                            <el-select v-model="school_id" clearable placeholder="选择学校" size="mini" style="width:150px;" filterable>
                                <el-option v-for="(item,index) in filterList.school" :key="index"  :label="item.school_name"  :value="item.school_id"></el-option>
                                  </el-select>
                            </div>
                        </div>
                        <div class="screen-box-list">
                            <span class="query_condition">年级</span>
                            <div class="condition">
                            <span class="item" v-for="(item,index) in filterList.grade" :key="index" :class="{selectedActive:item.isSelected}" @click="active(index,'grade')">
                                {{item.grade_name}}
                            </span></div>
                        </div>
                        <div class="screen-box-list">
                            <span class="query_condition">学期</span>
                            <div class="condition">
                            <span class="item" v-for="(item,index) in filterList.term" :key="index" :class="{selectedActive:item.isSelected}" @click="active(index,'term')">
                                {{item.term_name}}
                            </span></div>
                        </div>
                        <div class="screen-box-list">
                            <span class="query_condition">考试类型</span>
                            <div class="condition">
                            <span class="item" v-for="(item,index) in filterList.examtype" :key="item.exam_type_id+'examtype'" :class="{selectedActive:item.isSelected}" @click="active(index,'examtype')">
                                {{item.exam_type_name}}
                            </span></div>
                        </div>
                        <div class="screen-box-list">
                            <span class="query_condition">题型</span>
                            <div class="condition">
                            <span class="item" v-for="(item,index) in filterList.type" :key="index+'type'" :class="{selectedActive:item.isSelected}" @click="active(index,'type')">
                                {{item.type_name}}
                            </span></div>
                        </div>
                        <div class="screen-box-list">
                            <span class="query_condition">难度</span>
                            <div class="condition">
                            <span class="item" v-for="(item,index) in filterList.degree" :key="index" :class="{selectedActive:item.isSelected}" @click="active(index,'degree')">
                                {{item.type_name}}
                            </span></div>
                        </div>
                        <div class="screen-box-list">
                            <span class="query_condition">更多</span>
                            <div class="condition">
                            <span class="item" v-for="(item,index) in filterList.analyze" :key="index" :class="{selectedActive:item.isSelected}" @click="active(index,'analyze')">
                                {{item.name}}
                            </span></div>
                        </div>
                        <el-button type="primary" round class="search" @click="query(true)">查询</el-button>
                    </div>
                    <div class="sort">共{{total}}道题
                    </div>
                    <div class="subject">
                        <div v-if="context!=''" class="nonelist">{{context}}</div>
                        <div v-else class="subject-content-box" v-for="(item,index) in dataList" :key="index">
                            <div class="subject-index">{{index+1}}</div>
                            <div class="subject-box">                                
                                <div class="subject-content-title">
                                    <el-tooltip placement="top-start" v-if="item.question_source.length > 1">
                                        <div slot="content">
                                            <p v-for="(list,sum) in item.question_source" :key="sum">
                                                <span v-if="list.exam_type_name!=''">{{list.exam_type_name}}、</span>
                                                <span v-if="list.year!=''">{{list.year}}、</span>
                                                <span v-if="list.province_name!=''">{{list.province_name}}、</span>
                                                <span v-if="list.city_name!=''">{{list.city_name}}、</span>
                                                <span v-if="list.country_name!=''">{{list.country_name}}、</span>
                                                <span v-if="list.school_name!=''">{{list.school_name}}、</span>
                                                <span v-if="list.grade_name!=''">{{list.grade_name}}、</span>
                                                <span v-if="list.term_name!=''">{{list.term_name}}、</span>
                                                <span v-if="list.complement!=''">{{list.complement}}、</span>
                                            </p>
                                        </div>
                                        <p class="ellipsis">
                                            <span v-if="item.question_source[0].exam_type_name!=''">{{item.question_source[0].exam_type_name}}、</span>
                                            <span v-if="item.question_source[0].year!=''">{{item.question_source[0].year}}、</span>
                                            <span v-if="item.question_source[0].province_name!=''">{{item.question_source[0].province_name}}、</span>
                                            <span v-if="item.question_source[0].city_name!=''">{{item.question_source[0].city_name}}、</span>
                                            <span v-if="item.question_source[0].country_name!=''">{{item.question_source[0].country_name}}、</span>
                                            <span v-if="item.question_source[0].school_name!=''">{{item.question_source[0].school_name}}、</span>
                                            <span v-if="item.question_source[0].grade_name!=''">{{item.question_source[0].grade_name}}、</span>
                                            <span v-if="item.question_source[0].term_name!=''">{{item.question_source[0].term_name}}、</span>
                                            <span v-if="item.question_source[0].complement!=''">{{item.question_source[0].complement}}、</span>
                                            （{{item.question_source.length}}个）
                                        </p>
                                    </el-tooltip>
                                    <p v-else v-for="(list,sum) in item.question_source" :key="sum" class="ellipsis">
                                        <span v-if="list.exam_type_name!=''">{{list.exam_type_name}}、</span>
                                        <span v-if="list.year!=''">{{list.year}}、</span>
                                        <span v-if="list.province_name!=''">{{list.province_name}}、</span>
                                        <span v-if="list.city_name!=''">{{list.city_name}}、</span>
                                        <span v-if="list.country_name!=''">{{list.country_name}}、</span>
                                        <span v-if="list.school_name!=''">{{list.school_name}}、</span>
                                        <span v-if="list.grade_name!=''">{{list.grade_name}}、</span>
                                        <span v-if="list.term_name!=''">{{list.term_name}}、</span>
                                        <span v-if="list.complement!=''">{{list.complement}}、</span>
                                    </p>
                                </div>
                                <el-tag class="parsing">{{item.degree_name}}</el-tag>
                                <el-tag class="parsing">{{item.analysis.md5==''&&item.analysis.text==''?'无解析':'有解析'}}</el-tag>
                                <img :src="item.content.problem.detail[0].alioss_path">
                                <div class="subject-content-item" v-show="item['isanswer']==true?true:false">
                                    <div class="inner">
                                        <span class="label">答案</span>
                                        <div class="details-item greenspan" v-if="item.content.problem.type_id == 1">
                                            {{item.content.choice_answer.answer}}
                                        </div>
                                        <div class="details-item greenspan" v-if="item.content.problem.type_id == 2">
                                            <div v-for="(list,sum) in item.content.judge_answer.answer" :key="sum">
                                                <i v-if="list.answer=='T'" class="look_i el-icon-check"></i>
                                                <i v-else-if="list.answer=='F'" class="look_i el-icon-close"></i>
                                            </div>
                                        </div>
                                        <div class="details-item" v-if="item.content.problem.type_id==3">
                                            <div v-for="(list,sum) in item.content.fill_answer.answer" :key="sum">
                                                <div class="details_title">空{{sum+1}}答案：</div>
                                                <div class="details_con">
                                                    <p v-if="list.answer_content[0].answer_text!=''">{{list.answer_content[0].answer_text}}</p>
                                                    <img v-if="list.answer_content[0].alioss_path != ''" :src="list.answer_content[0].alioss_path">
                                                </div>
                                                <div v-for="(arr,num) in list.answer_content" :key="num">
                                                    <div v-if="num!=0" class="details_title">空{{sum+1}}备选答案{{num}}：</div>
                                                    <div class="details_con" v-if="num!=0">
                                                        <p v-if="arr.answer_text!=''">{{arr.answer_text}}</p>
                                                        <img v-if="arr.alioss_path != ''" :src="arr.alioss_path">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="details-item" v-if="item.content.problem.type_id==4">
                                            <p v-if="item.content.rubric_answer[0].answer_text!=''">{{item.content.rubric_answer[0].answer_text}}</p>
                                            <img v-if="item.content.rubric_answer[0].alioss_path != ''" :src="item.content.rubric_answer[0].alioss_path">
                                        </div>
                                    </div>

                                    <div class="inner" v-if="item.analysis.md5!=''||item.analysis.text!=''">
                                        <span class="label">解析</span>
                                        <div class="details-item">
                                            <p v-if="item.analysis.text!=''">{{item.analysis.text}}</p>
                                            <img v-if="item.analysis.md5!=''" :src="item.analysis.alioss_path">
                                        </div>
                                    </div>

                                    <div class="inner">
                                        <span class="label">标注</span>
                                        <div class="details-item">
                                            <span v-for="(list,sum) in item.label_system[0].point_info" :key="sum">{{list.path}}; </span>
                                        </div>
                                    </div>                                    

                                </div>
                                <div class="subject-content-item" v-show="item['isID']==true?true:false">
                                    <div class="inner">
                                        <span class="label">ID</span>
                                        <div class="details-item">
                                            <span id="subject-id">{{item.question_id}}</span>
                                            <span class="copy"
                                                    v-clipboard:copy="item.question_id"
                                                    v-clipboard:success="onCopy"
                                                    v-clipboard:error="onError">复制</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="usage">
                                    <ul class="usage-left">
                                        <li>使用：{{item.reference_num}}</li>
                                        <!-- <li>作答：{{item.answer_num}}</li>
                                        <li>正确率：{{item.correct_num}}</li> -->
                                    </ul>
                                    <ul class="usage-right">
                                        <li @click="clickDetails(index)" :class="item.isID?'active':''">详情</li>
                                        <li @click="clickAnwser(index)" :class="item.isanswer?'active':''">答案</li>
                                        <li @click="clickDel(index)" class="item_add" v-if="item.jion">
                                            <el-button type="primary" icon="el-icon-shopping-cart-1">移除</el-button>
                                        </li>
                                        <li @click="clickAdd(index)" class="item_add" v-else>
                                            <el-button type="primary" icon="el-icon-shopping-cart-1">加入</el-button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  分页 -->
                    <div class="pagination">
                        <el-pagination layout="prev, pager, next, total" :total="total" :page-size="datas.size" @current-change="getList"></el-pagination>
                    </div>
                </el-col>

            </el-row>

        </div>
        <div class="library-tool-wrap" @click="open()">
            <span class="library-cart-number">{{carsum}}</span>
            <el-button type="warning" icon="el-icon-shopping-cart-1" circle></el-button>
        </div>
        <div class="setbox" :class="{show: isshow}">
            <el-button class="colse" type="warning" icon="el-icon-arrow-right" circle @click="close"></el-button>
            <div class="setbox_top">
                <div class="setbox_topl">我的资源车<span>{{carsum}}</span></div>
                <div class="setbox_topr" @click="allAll()"><i class="el-icon-delete"></i>清空资源车</div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="'单选('+carData1+')'" name="first"></el-tab-pane>
                <el-tab-pane :label="'判断('+carData2+')'" name="second"></el-tab-pane>
                <el-tab-pane :label="'填空('+carData3+')'" name="third"></el-tab-pane>
                <el-tab-pane :label="'解答('+carData4+')'" name="fourth"></el-tab-pane>
            </el-tabs>
            <div class="subject setbox_con" :type_id="type_id">
                <div v-if="carData.length==0" class="noneset">无数据</div>
                <div v-else class="subject-content-box" v-for="(item,index) in carData" :key="index">
                    <div class="subject-index">{{index+1}}</div>
                    <div class="subject-box">                                
                        <div class="subject-content-title">
                            <el-tooltip placement="top-start" v-if="item.question_source.length > 1">
                                <div slot="content">
                                    <p v-for="(list,sum) in item.question_source" :key="sum">
                                        <span v-if="list.exam_type_name!=''">{{list.exam_type_name}}、</span>
                                        <span v-if="list.year!=''">{{list.year}}、</span>
                                        <span v-if="list.province_name!=''">{{list.province_name}}、</span>
                                        <span v-if="list.city_name!=''">{{list.city_name}}、</span>
                                        <span v-if="list.country_name!=''">{{list.country_name}}、</span>
                                        <span v-if="list.school_name!=''">{{list.school_name}}、</span>
                                        <span v-if="list.grade_name!=''">{{list.grade_name}}、</span>
                                        <span v-if="list.term_name!=''">{{list.term_name}}、</span>
                                        <span v-if="list.complement!=''">{{list.complement}}、</span>
                                    </p>
                                </div>
                                <p class="ellipsis">
                                    <span v-if="item.question_source[0].exam_type_name!=''">{{item.question_source[0].exam_type_name}}、</span>
                                    <span v-if="item.question_source[0].year!=''">{{item.question_source[0].year}}、</span>
                                    <span v-if="item.question_source[0].province_name!=''">{{item.question_source[0].province_name}}、</span>
                                    <span v-if="item.question_source[0].city_name!=''">{{item.question_source[0].city_name}}、</span>
                                    <span v-if="item.question_source[0].country_name!=''">{{item.question_source[0].country_name}}、</span>
                                    <span v-if="item.question_source[0].school_name!=''">{{item.question_source[0].school_name}}、</span>
                                    <span v-if="item.question_source[0].grade_name!=''">{{item.question_source[0].grade_name}}、</span>
                                    <span v-if="item.question_source[0].term_name!=''">{{item.question_source[0].term_name}}、</span>
                                    <span v-if="item.question_source[0].complement!=''">{{item.question_source[0].complement}}、</span>
                                    （{{item.question_source.length}}个）
                                </p>
                            </el-tooltip>
                            <p v-else v-for="(list,sum) in item.question_source" :key="sum" class="ellipsis">
                                <span v-if="list.exam_type_name!=''">{{list.exam_type_name}}、</span>
                                <span v-if="list.year!=''">{{list.year}}、</span>
                                <span v-if="list.province_name!=''">{{list.province_name}}、</span>
                                <span v-if="list.city_name!=''">{{list.city_name}}、</span>
                                <span v-if="list.country_name!=''">{{list.country_name}}、</span>
                                <span v-if="list.school_name!=''">{{list.school_name}}、</span>
                                <span v-if="list.grade_name!=''">{{list.grade_name}}、</span>
                                <span v-if="list.term_name!=''">{{list.term_name}}、</span>
                                <span v-if="list.complement!=''">{{list.complement}}、</span>
                            </p>
                        </div>
                        <el-tag class="parsing">{{item.degree_name}}</el-tag>
                        <el-tag class="parsing">{{item.analysis.md5==''&&item.analysis.text==''?'无解析':'有解析'}}</el-tag>
                        <img :src="item.content.problem.detail[0].alioss_path">
                        <div class="usage">
                            <ul class="usage-left">
                                <li>使用：{{item.reference_num}}</li>
                            </ul>
                            <ul class="usage-right">
                                <li @click="clickDelcar(index)" class="item_add">
                                    <el-button type="primary" icon="el-icon-shopping-cart-1">删除</el-button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="setbox_w" v-if="isshow" @click="close"></div>
    </section>
</template>
<script type="text/javascript">    
    // 请求接口的域名
    import Vue from 'vue'
    import fetch from '../utils/fetch'
    import treeRadio from '../assets/tree-radio.vue'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'

    Vue.use(ElementUI)
    export default {
        components: {
            treeRadio:treeRadio
        },
        data(){
            return {
                isshow: false,
                activeName:'first',
                type_id:1,
                carsum:0,
                carData1:0,
                carData2:0,
                carData3:0,
                carData4:0,
                setboxData:[],//购物车总数据
                carData:[],//购物车当前数据
                treeloading:false,
                apiType:1,//搜索接口1，查询接口2
                isloading:false,
                chooseShow:false,
                category:{
                    subject_id:'',//学科
                    stage_id:'',//学段
                    usage_id:''//用途
                },
                filterInfo:{
                    subjectList:[],//学科
                    stageList:[],//学段
                    usageList:[],//用途
                },
                tree:[],
                tree_select:{
                    id:'',
                    name:''
                },//选中知识树
                //关键字搜索
                fuzzy:{
                    id:'',//id
                    path:'',//关键字
                    Kpath:''
                },
                dateValue:'',//选择日期
                filterList:{//待筛选数据
                    fuzzyList:[],//知识点关键字
                    yearList:[],//学年数据
                    grade:[],// 年级
                    term:[], // 学期
                    examtype:[],//考试类型
                    type:[],//题型
                    degree:[],//难度
                    province:[], //省
                    city:[],//城市
                    country:[],//区
                    school:[],//学校
                    analyze:[
                        {'id':0,'name':'全部','isSelected':true},
                        {'id':1,'name':'有解析','isSelected':false},
                        {'id':2,'name':'无解析','isSelected':false}
                    ]
                },
                province_code: '', // 所选的省
                city_code: '', // 所选的市
                country_code: '', // 所选的区
                school_id:'',
                //已选项
                selectList:{
                    province: '', // 所选的省
                    city: '', // 所选的市
                    country: '', // 所选的区
                    school:'',
                    selectedYear:'',//年
                    selectedGrade:'',//已选年级
                    selctedTerm:'',//已选学期              
                    selectedExamtype:'',//考试类型          
                    selectedType:'',//题型  
                    selectedDegree:'',//难度
                    selectedAnalyze:'',//解析
                },
                datas:{
                    year:[],
                    province_id:[],
                    grade_id:[],
                    term_id:[],
                    exam_id:[],
                    type_id:[],
                    degree_id:[],
                    analyze:[],
                    knowledge:'',
                    page:1,
                    size:10
                },
                sortList:[ //排序
                    {
                        id:0,
                        content:"作答次数",
                        isActive:false,
                        ascending:true,//升序
                        descending:false,//降序
                    },
                    {
                        id:1,
                        content:"使用次数",
                        isActive:false,
                        ascending:true,//升序
                        descending:false,//降序
                    },
                    {
                        id:2,
                        content:"正确率",
                        isActive:false,
                        ascending:true,//升序
                        descending:false,//降序
                    }
                ],

                dataList:[],
                context:'',
                page:1,
                total: 0
            }
        },
        methods: {
            close() {
                this.isshow = false
            },
            open(){
                this.isshow = true
            },
            handleClick(tab, event) {
                this.type_id = Number(tab.index)+1;
                this.carList();
            },
            subjectList(){//学科数据
                fetch({
                    url: '/list/subject',
                    method: 'get'
                }).then(res => {
                    if(res.code == 0){
                        this.filterInfo.subjectList = res.result;
                        this.category.subject_id = 1;
                    }
                });
            },
            stageList(){//学段数据
                fetch({
                    url: '/list/stage',
                    method: 'get'
                }).then(res => {
                    if(res.code == 0){
                        this.filterInfo.stageList = res.result;
                        this.category.stage_id = 1;
                    }
                });
            },
            usageList(){//用途数据
                fetch({
                    url: '/list/usage',
                    method: 'get'
                }).then(res => {
                    if(res.code == 0){
                        this.filterInfo.usageList = res.result;
                        this.category.usage_id = 1;
                    }
                });
            },
            treeList(id){//获取知识树数据
                this.treeloading = true;
                let data = {
                    subject_id:1,
                    stage_id:1
                }
                fetch({
                    url: '/knowledge/gettreebystagesubject',
                    method: 'get',
                    params:data
                }).then(res => {
                    if(res.code == 0){
                        this.treeloading = false;
                        this.tree = res.result.children;
                        setTimeout(() => {
                            this.$refs.treeR.kong(id);
                        },0)
                    }
                });
            },
            selectTree(val){
                this.tree_select = val;
                //知识点
                this.datas.knowledge = this.tree_select.id;
                this.query(true);
            },
            delTree(){
                this.$refs.treeR.delNode();
                this.tree_select.id = '';
                this.tree_select.name = '';
                this.datas.knowledge = '';
                this.isChooseShow();
                this.chaxun(1);
            },

            //知识点关键字
            getFuzzyselect(query,callback){
                this.fuzzy.id = '';
                this.fuzzy.path = '';
                this.filterInfo.fuzzyList = [];
                let vm = this;
                let data = {
                    key_word:query,
                };
                fetch({
                    url:"/knowledge/fuzzyselect",
                    method:'get',
                    params:data
                }).then(data => {
                    if (data.code == 0) {
                        if(query != ''&&data.result.length == 0){
                            vm.$message.error('关键字无效');
                            vm.filterInfo.fuzzyList = [];
                            callback(vm.filterInfo.fuzzyList);
                        }else{
                            data.result.forEach((item, idx) =>{
                                vm.filterInfo.fuzzyList.push({
                                    path: item.path,
                                    id: item.id
                                })
                            })
                            callback(vm.filterInfo.fuzzyList);
                        }
                    }
                })
            },
            handleSelect(item) {
                this.filterInfo.fuzzyList.forEach((key,idx) => {
                    if(key.id == item.id) {
                        this.fuzzy.id = item.id
                        this.fuzzy.path = item.path
                        this.fuzzy.Kpath = item.path
                    }
                })
            },
            // 搜索按钮
            search(page){
                this.dataList = [];
                this.page = page;
                this.apiType = 1;
                if(this.chooseShow){
                    this.delAllSel(false);//清空下面查询数据，不调用查询接口
                }
                this.isloading = true;
                let knowledg_id = '';
                if(this.fuzzy.Kpath != ''&&this.fuzzy.id == ''){
                    knowledg_id = -1;
                }else{
                    knowledg_id = this.fuzzy.id;
                }
                let data = {
                    date:this.dateValue,
                    knowledge_id:knowledg_id,
                    subject_id:this.category.subject_id,
                    stage_id:this.category.stage_id,
                    usage_id:this.category.usage_id,
                    page:page*1-1,
                    size:this.datas.size
                }
                fetch({
                    url:'/questions/knowledge',
                    method:'get',
                    params:data
                }).then(res =>{
                    this.isloading = false;
                    console.log(res);
                    if(res.code == 0){
                        this.makeDate(res);
                    }
                })
            },

            //下面是获取筛选项所有数据------------------------
            active(index,abc){////查询选项样式切换
                if(index != 0){//全部被选中了
                    this.filterList[abc][0].isSelected = false;
                    this.filterList[abc][index].isSelected = !this.filterList[abc][index].isSelected;
                    var list = this.filterList[abc];
                    var sum = 0;
                    for(let i=0;i<list.length;i++){
                        if(list[i].isSelected == false){
                            sum = sum+1;
                        }
                    }
                    if(sum == list.length){
                        this.filterList[abc][0].isSelected = true;
                    }
                }else{
                    this.filterList[abc][0].isSelected = true;
                    var list = this.filterList[abc];
                    for(let i=1;i<list.length;i++){
                        list[i].isSelected = false;
                    }
                }
            },
            yearList(){//来源年份
                var myDate = new Date();       
                var thisYear = myDate.getFullYear();  // 获取当年年份
                var Section = thisYear - 2007;  // 声明一个变量 获得当前年份至想获取年份差 eg.2007
                var all = {'name':'全部',"isSelected":true};
                for(var i = 1;i<=Section;i++){
                    var a = (thisYear-i+1).toString();
                    var b = (thisYear-i).toString();
                    var abc = b+'-'+a;
                    var obj = {"isSelected":false,'name':abc};
                    this.filterList.yearList.push(obj)
                }
                this.filterList.yearList.unshift(all);
            },
            delYear(){
                this.filterList.yearList[0].isSelected = true;
                for(let i=1;i<this.filterList.yearList.length;i++){
                    this.filterList.yearList[i].isSelected = false;
                }
                this.selectList.selectedYear = '';
                this.datas.year = [];
                this.isChooseShow();
                this.chaxun(1);
            },
            gradeList(){
                fetch({
                    url:'/list/grade',
                    method:'get',
                }).then(res=>{
                    if(res.code == 0){
                        for(let i=0;i<res.result.length;i++){
                            res.result[i].isSelected = false;
                        }
                        let obj = {'grade_name':'全部','grade_id':0,'isSelected':true};
                        this.filterList.grade =res.result;
                        this.filterList.grade.unshift(obj);
                    }
                })
            },
            delGrade(){
                this.filterList.grade[0].isSelected = true;
                for(let i=1;i<this.filterList.grade.length;i++){
                    this.filterList.grade[i].isSelected = false;
                }
                this.selectList.selectedGrade = '';
                this.datas.grade_id = [];
                this.isChooseShow();
                this.chaxun(1);
            },
            provinceList(){//省
                fetch({
                    url: '/list/province',
                    method: 'get'
                }).then(res => {
                    if(res.code == 0){
                        this.filterList.province = res.result;
                    }
                });
            },
            delProvince(){
                this.province_code = '';
                this.city_code = '';
                this.country_code = '';
                this.school_id = '';
                this.filterList.city = [];
                this.filterList.country = [];
                this.filterList.school = [];
                this.selectList.province = '';
                this.selectList.city = '';
                this.selectList.country = '';
                this.selectList.school = '';
                this.datas.province_id = [];
                this.isChooseShow();
                this.chaxun(1);
            },
            choseCity(){// 城市
                this.city_code = '';
                this.country_code = '';
                this.school_id = '';
                this.filterList.city = [];
                this.filterList.country = [];
                this.filterList.school = [];
                if(this.province_code != ''){
                    let data = {province_code:this.province_code};
                    fetch({
                        url: '/list/city',
                        method: 'get',
                        params:data
                    }).then(res => {
                        if(res.code == 0){
                            this.filterList.city=res.result;
                        }
                    });  
                }              
            },
            delCity(){
                this.city_code = '';
                this.country_code = '';
                this.school_id = '';
                this.filterList.country = [];
                this.filterList.school = [];
                this.selectList.city = '';
                this.selectList.country = '';
                this.selectList.school = '';
                this.datas.province_id = [];
                this.datas.province_id.push(this.province_code);
                this.isChooseShow();
                this.chaxun(1);
            },
            choseCountry(){ // 区
                this.country_code = '';
                this.school_id = '';
                this.filterList.country = [];
                this.filterList.school = [];
                if(this.city_code != ''){
                    let data = {city_code:this.city_code};
                    fetch({
                        url: '/list/country',
                        method: 'get',
                        params:data
                    }).then(res => {
                        if(res.code == 0){
                            this.filterList.country=res.result;
                        }
                    });
                }
            },
            delCountry(){
                this.country_code = '';
                this.school_id = '';
                this.filterList.school = [];
                this.selectList.country = '';
                this.selectList.school = '';
                this.datas.province_id = [];
                this.datas.province_id.push(this.province_code);
                this.datas.province_id.push(this.city_code);
                this.isChooseShow();
                this.chaxun(1);
            },
            choseSchool(){ // 学校
                this.school_id = '';
                let data = {
                    province_code:this.province_code,
                    city_code:this.city_code,
                    country_code:this.country_code
                };
                fetch({
                    url: '/list/school',
                    method: 'get',
                    params:data
                }).then(res => {
                    if(res.code == 0){
                        this.filterList.school=res.result;
                    }
                });
            },
            delSchool(){
                this.school_id = '';
                this.selectList.school = '';
                this.datas.province_id = [];
                this.datas.province_id.push(this.province_code);
                this.datas.province_id.push(this.city_code);
                this.datas.province_id.push(this.country_code);
                this.isChooseShow();
                this.chaxun(1);
            },
            termList(){ // 学期
                fetch({
                    url:'/list/term',
                    method:'get',
                }).then(res =>{
                    if(res.code == 0){
                        for(let i=0;i<res.result.length;i++){
                            res.result[i].isSelected = false;
                        }
                        let obj = {'term_name':'全部','term_id':0,'isSelected':true};
                        this.filterList.term = res.result;
                        this.filterList.term.unshift(obj);
                    }
                })
            },
            delTerm(){
                this.filterList.term[0].isSelected = true;
                for(let i=1;i<this.filterList.term.length;i++){
                    this.filterList.term[i].isSelected = false;
                }
                this.selectList.selctedTerm = '';
                this.datas.term_id = [];
                this.isChooseShow();
                this.chaxun(1);
            },
            typeList(){// 题型
                fetch({
                    url:'/list/type',
                    method:'get',
                }).then(res=>{
                    if(res.code == 0){
                        for(let i=0;i<res.result.length;i++){
                            res.result[i].isSelected = false;
                        }
                        let obj = {'type_name':'全部','type_id':0,'isSelected':true};
                        this.filterList.type = res.result;
                        this.filterList.type.unshift(obj);
                    }
                })
            },
            delType(){
                this.filterList.type[0].isSelected = true;
                for(let i=1;i<this.filterList.type.length;i++){
                    this.filterList.type[i].isSelected = false;
                }
                this.selectList.selectedType = '';
                this.datas.type_id = [];
                this.isChooseShow();
                this.chaxun(1);
            },
            examtypeList(){//获取考试类型数据
                fetch({
                    url:'/list/examtype',
                    method:'get',
                }).then(res=>{
                    if(res.code == 0){
                        for(let i=0;i<res.result.length;i++){
                            res.result[i].isSelected = false;
                        }
                        let obj = {'exam_type_name':'全部','exam_type_id':0,'isSelected':true};
                        this.filterList.examtype = res.result;
                        this.filterList.examtype.unshift(obj);
                    }
                })
            },
            delExamtype(){
                this.filterList.examtype[0].isSelected = true;
                for(let i=1;i<this.filterList.examtype.length;i++){
                    this.filterList.examtype[i].isSelected = false;
                }
                this.selectList.selectedExamtype = '';
                this.datas.exam_id = [];
                this.isChooseShow();
                this.chaxun(1);
            },
            degreeList(){//获取难度数据
                fetch({
                    url:'/list/degree',
                    method:'get',
                }).then(res=>{
                    if(res.code == 0){
                        for(let i=0;i<res.result.length;i++){
                            res.result[i].isSelected = false;
                        }                        
                        let obj = {'type_name':'全部','type_id':0,'isSelected':true};
                        this.filterList.degree = res.result;
                        this.filterList.degree.unshift(obj);
                    }
                })
            },
            delDegree(){
                this.filterList.degree[0].isSelected = true;
                for(let i=1;i<this.filterList.degree.length;i++){
                    this.filterList.degree[i].isSelected = false;
                }
                this.selectList.selectedDegree = '';
                this.datas.degree_id = [];
                this.isChooseShow();
                this.chaxun(1);
            },
            delAnalyze(){                
                this.filterList.analyze[0].isSelected = true;
                for(let i=1;i<this.filterList.analyze.length;i++){
                    this.filterList.analyze[i].isSelected = false;
                }
                this.selectList.selectedAnalyze = '';
                this.datas.analyze = [];
                this.isChooseShow();
                this.chaxun(1);
            },
            // 清空所有已选项
            delAllSel(is){
                //知识点
                this.$refs.treeR.delNode();
                this.tree_select.id = '';
                this.tree_select.path = '';
                
                this.filterList.yearList[0].isSelected = true;
                for(let i=1;i<this.filterList.yearList.length;i++){
                    this.filterList.yearList[i].isSelected = false;
                }
                this.province_code = '';
                this.city_code = '';
                this.country_code = '';
                this.school_id = '';
                this.filterList.city = [];
                this.filterList.country = [];
                this.filterList.school = [];
                this.filterList.grade[0].isSelected = true;
                for(let i=1;i<this.filterList.grade.length;i++){
                    this.filterList.grade[i].isSelected = false;
                }
                this.filterList.term[0].isSelected = true;
                for(let i=1;i<this.filterList.term.length;i++){
                    this.filterList.term[i].isSelected = false;
                }
                this.filterList.examtype[0].isSelected = true;
                for(let i=1;i<this.filterList.examtype.length;i++){
                    this.filterList.examtype[i].isSelected = false;
                }
                this.filterList.type[0].isSelected = true;
                for(let i=1;i<this.filterList.type.length;i++){
                    this.filterList.type[i].isSelected = false;
                }
                this.filterList.degree[0].isSelected = true;
                for(let i=1;i<this.filterList.degree.length;i++){
                    this.filterList.degree[i].isSelected = false;
                }
                this.filterList.analyze[0].isSelected = true;
                for(let i=1;i<this.filterList.analyze.length;i++){
                    this.filterList.analyze[i].isSelected = false;
                }
                this.query(is);
            },   
            uniq(array){//数组去重
                var temp = []; //一个新的临时数组
                for(var i = 0; i < array.length; i++){
                    if(temp.indexOf(array[i]) == -1){
                        temp.push(array[i]);
                    }
                }
                return temp;
            },         
            query(is){
                //知识点
                this.datas.knowledge = this.tree_select.id;
                //省份
                this.datas.province_id = [];
                if(this.province_code == ''){
                    this.selectList.province = '';
                    this.datas.province_id = [];
                }else{
                    this.datas.province_id.push(this.province_code);
                    for(var i=0;i<this.filterList.province.length;i++){
                        if(this.province_code == this.filterList.province[i].province_code){
                            this.selectList.province = this.filterList.province[i].province_name;
                        }
                    }
                }
                if(this.city_code == ''){                    
                    this.selectList.city = '';
                }else{
                    this.datas.province_id.push(this.city_code);
                    for(var i=0;i<this.filterList.city.length;i++){
                        if(this.city_code == this.filterList.city[i].city_code){
                            this.selectList.city = this.filterList.city[i].city_name;
                        }
                    }
                }
                if(this.country_code == ''){                    
                    this.selectList.country = '';
                }else{
                    this.datas.province_id.push(this.country_code);
                    for(var i=0;i<this.filterList.country.length;i++){
                        if(this.country_code == this.filterList.country[i].country_code){
                            this.selectList.country = this.filterList.country[i].country_name;
                        }
                    }
                }
                if(this.school_id == ''){                    
                    this.selectList.school = '';
                }else{
                    this.datas.province_id.push(this.school_id);
                    for(var i=0;i<this.filterList.school.length;i++){
                        if(this.school_id == this.filterList.school[i].school_id){
                            this.selectList.school = this.filterList.school[i].school_name;
                        }
                    }
                }
                //年份isanswer
                var selectedYear = '';
                this.datas.year = [];
                if(this.filterList.yearList[0].isSelected){//全部
                    selectedYear = '';
                    this.datas.year = [];
                }else{
                    for(var i=0;i<this.filterList.yearList.length;i++){ 
                        if(this.filterList.yearList[i].isSelected){
                            var name = this.filterList.yearList[i].name;
                            selectedYear += name+'、';
                            this.datas.year.push(name.split('-')[0]*1);
                            this.datas.year.push(name.split('-')[1]*1);
                        }
                    }
                }
                this.selectList.selectedYear = selectedYear.substr(0, selectedYear.length - 1);
                this.datas.year = this.uniq(this.datas.year);
                //年级
                var selectedGrade = '';
                this.datas.grade_id = [];
                if(this.filterList.grade[0].isSelected){//全部
                    selectedGrade = '';
                    this.datas.grade_id = [];
                }else{                    
                    for(var i=0;i<this.filterList.grade.length;i++){
                        if(this.filterList.grade[i].isSelected){
                            var name = this.filterList.grade[i];
                            selectedGrade += name.grade_name+'、';
                            this.datas.grade_id.push(name.grade_id);
                        }
                    }
                }
                this.selectList.selectedGrade = selectedGrade.substr(0, selectedGrade.length - 1);
                //学期
                var selctedTerm = '';
                this.datas.term_id = [];
                if(this.filterList.term[0].isSelected){//全部
                    selctedTerm = '';
                    this.datas.term_id = [];
                }else{
                    for(var i=0;i<this.filterList.term.length;i++){
                        if(this.filterList.term[i].isSelected){
                            var name = this.filterList.term[i];
                            selctedTerm += name.term_name+'、';
                            this.datas.term_id.push(name.term_id);
                        }
                    }
                }                
                this.selectList.selctedTerm = selctedTerm.substr(0, selctedTerm.length - 1);
                //考试类型
                var selectedExamtype = '';
                this.datas.exam_id = [];
                if(this.filterList.examtype[0].isSelected){//全部
                    selectedExamtype = '';
                    this.datas.exam_id = [];
                }else{
                    for(var i=0;i<this.filterList.examtype.length;i++){
                        if(this.filterList.examtype[i].isSelected){
                            var name = this.filterList.examtype[i];
                            selectedExamtype+=name.exam_type_name+'、';
                            this.datas.exam_id.push(name.exam_type_id);
                        }
                    }
                }
                this.selectList.selectedExamtype = selectedExamtype.substr(0, selectedExamtype.length - 1);
                //题型
                var selectedType = '';
                this.datas.type_id = [];
                if(this.filterList.type[0].isSelected){//全部
                    selectedType = '';
                    this.datas.type_id = [];
                }else{
                    for(var i=0;i<this.filterList.type.length;i++){
                        if(this.filterList.type[i].isSelected){
                            var name = this.filterList.type[i];
                            selectedType+=name.type_name+'、';
                            this.datas.type_id.push(name.type_id);
                        }
                    }
                }
                this.selectList.selectedType = selectedType.substr(0, selectedType.length - 1);
                //难度
                var selectedDegree = '';
                this.datas.degree_id = [];
                if(this.filterList.degree[0].isSelected){//全部
                    selectedDegree = '';
                    this.datas.degree_id = [];
                }else{
                    for(var i=0;i<this.filterList.degree.length;i++){
                        if(this.filterList.degree[i].isSelected){
                            var name = this.filterList.degree[i];
                            selectedDegree+=name.type_name+'、';
                            this.datas.degree_id.push(name.type_id);
                        }
                    }
                }
                this.selectList.selectedDegree = selectedDegree.substr(0, selectedDegree.length - 1);   
                //解析
                var selectedAnalyze = '';
                this.datas.analyze = [];
                if(this.filterList.analyze[0].isSelected){//全部
                    selectedAnalyze = '';
                    this.datas.analyze = [];
                }else{
                    for(var i=0;i<this.filterList.analyze.length;i++){
                        if(this.filterList.analyze[i].isSelected){
                            var name = this.filterList.analyze[i];
                            selectedAnalyze+=name.name+'、';
                            this.datas.analyze.push(name.id);
                        }
                    }
                }
                this.selectList.selectedAnalyze = selectedAnalyze.substr(0, selectedAnalyze.length - 1);
                console.log(this.datas)
                this.isChooseShow();
                //true查询接口
                if(is){
                    this.chaxun(1);
                }
            },
            isChooseShow(){
                //判断是否显示顶部已选项
                if(this.datas.year.length==0&&this.datas.province_id.length==0&&this.datas.grade_id.length==0&&this.datas.term_id.length==0&&this.datas.exam_id.length==0&&this.datas.type_id.length==0&&this.datas.degree_id.length==0&&this.datas.analyze.length==0&&this.datas.knowledge==''){
                    this.chooseShow = false;
                }else{
                    this.chooseShow = true;
                } 
            },
            chaxun(page){
                this.dataList = [];
                this.page = page;
                this.apiType = 2;
                //清空搜索数据信息
                this.fuzzy.id = '';//id
                this.fuzzy.path = '';//关键字
                this.fuzzy.Kpath = '';
                this.dateValue = '';
                //清空结束
                this.isloading = true;
                this.datas['subject_id'] = this.category.subject_id;
                this.datas['stage_id'] = this.category.stage_id;
                this.datas['usage_id'] = this.category.usage_id;
                this.datas.page = page*1-1;
                for(var i=0;i<this.datas.province_id.length;i++){
                    this.datas.province_id[i] = this.datas.province_id[i]*1;
                }
                this.datas.knowledge = this.datas.knowledge == ''?0:this.datas.knowledge;
                let data = this.datas;
                fetch({
                    url:'/questions/source',
                    method:'post',
                    data:JSON.stringify(data)
                }).then(res=>{
                    console.log(res);
                    this.makeDate(res);
                })
            },
            selectMD5(md5,config){
                for(var i=0;i<config.length;i++){
                    if(config[i].md5 == md5){
                        return config[i].alioss_path;
                    }
                }
            },
            makeDate(res){
                this.total = res.result.count;
                var con = res.result.question_list==null?[]:res.result.question_list;
                if(con.length == 0){
                    this.context = "无数据"
                }else{
                    this.context = ''
                }
                for(var i=0;i<con.length;i++){
                    //是否已在购物车
                    for(var j=0;j<this.setboxData.length;j++){
                        if(con[i].content.problem.question_id == this.setboxData[j].question_id){
                            con[i]['jion'] = true;
                        }
                    }
                    //题目
                    con[i].content.problem.detail[0]['alioss_path'] = this.selectMD5(con[i].content.problem.detail[0].md5,con[i].res_config);//获取对应的图片路径
                    //答案
                    if(con[i].content.problem.type_id == 3){//填空题
                        var abc = con[i].content.fill_answer.answer;
                        for(var k=0;k<abc.length;k++){
                            for(var j=0;j<abc[k].answer_content.length;j++){
                                if(abc[k].answer_content[j].answer_md5 != ''){
                                    abc[k].answer_content[j]['alioss_path'] = this.selectMD5(abc[k].answer_content[j].answer_md5,con[i].res_config);//获取对应的图片路径
                                }                                    
                            }
                        }
                    }
                    if(con[i].content.problem.type_id ==4){//解答题
                        con[i].content.rubric_answer[0]['alioss_path'] = this.selectMD5(con[i].content.rubric_answer[0].answer_md5,con[i].res_config);//获取对应的图片路径
                    }
                    //解析
                    if(con[i].analysis.md5 != ''){
                        con[i].analysis['alioss_path'] = this.selectMD5(con[i].analysis.md5,con[i].res_config);//获取对应的图片路径
                    }
                }
                this.dataList = con;
                this.isloading = false;
            },
            //复制ID
            onCopy: function (e) {
                this.$message.success('复制成功');
            },
            onError: function (e) {
                this.$message.error('复制失败');
            },
            // 点击答案按钮
            clickAnwser(index){
                var obj = this.dataList[index];
                if(obj['isanswer']==undefined || obj['isanswer']==false){
                    obj['isanswer'] = true;
                }else{
                    obj['isanswer'] = false;
                }
                this.$set(this.dataList,index,obj)
            },
            // 点击详情按钮
            clickDetails(index){
                var obj = this.dataList[index];
                if(obj['isID']==undefined || obj['isID']==false){
                    obj['isID'] = true;
                }else{
                    obj['isID'] = false;
                } 
                this.$set(this.dataList,index,obj)
            },
            // 点击加入购物车
            clickAdd(index){
                this.setboxData.push(this.dataList[index]);
                this.dataList[index]['jion'] = true;
                this.carsum += 1;
                this.carList();
            },
            // 点击移除购物车
            clickDel(index){
                var id = this.dataList[index].question_id;
                this.dataList[index]['jion'] = false;
                for(var i=0;i<this.setboxData.length;i++){
                    if(id == this.setboxData[i].question_id){
                        this.setboxData.splice(i, 1);
                        this.carsum -= 1;
                    }
                }
                this.carList();
            },
            // 点击移除购物车
            clickDelcar(index){
                var id = this.setboxData[index].question_id;
                this.setboxData.splice(index, 1);
                this.carsum -= 1;
                for(var i=0;i<this.dataList.length;i++){
                    if(id == this.dataList[i].question_id){                        
                        this.dataList[i]['jion'] = false;
                    }
                }
                this.carList();
            },
            allAll(){
                this.setboxData = [];
                this.carData = [];
                this.carsum = 0;
                this.carData1 = 0;
                this.carData2 = 0;
                this.carData3 = 0;
                this.carData4 = 0;
                for(var i=0;i<this.dataList.length;i++){
                    this.dataList[i]['jion'] = false;
                }
            },
            carList(){
                this.carData = [];
                this.carData1 = 0;
                this.carData2 = 0;
                this.carData3 = 0;
                this.carData4 = 0;
                for(var i=0;i<this.setboxData.length;i++){
                    if(this.setboxData[i].content.problem.type_id == this.type_id){
                        this.carData.push(this.setboxData[i]);
                    }
                    if(this.setboxData[i].content.problem.type_id == 1){
                        this.carData1 += 1;
                    }else if(this.setboxData[i].content.problem.type_id == 2){
                        this.carData2 += 1;
                    }else if(this.setboxData[i].content.problem.type_id == 3){
                        this.carData3 += 1;
                    }else{
                        this.carData4 += 1;
                    }
                }
            },
            jion(){//完成加入
                console.log(this.setboxData);
            },
            getList(page) {
                if(this.apiType==1){
                    this.search(page);
                }else{
                    this.chaxun(page);
                }
            },

        },

        created() {            
            this.yearList()//来源年份
            this.subjectList();
            this.stageList();
            this.usageList();
            this.treeList();//获取知识树数据
            this.gradeList();//获取年级数据
            this.termList();//获取学期数据
            this.examtypeList();//获取考试类型
            this.typeList();//获取试题类型
            this.degreeList();//获取难度
            this.provinceList();//获取省
            this.getList(1);
        },

    }
</script>
<style lang="scss">    
    .query_header {
        background:#daeef7;
        padding:10px;
        overflow: hidden;
    }
    .query_header_left {
        float: left;
    }
    .query_header_right {
        float:right;
    }
    .query_left .knowledge{
        color:#409eff;
        font-size:16px
    }
    .title_box i {
        color: #409eff !important;
        margin-left:10px;
        font-size:20px;
        right: auto;
    }
    .query_right{
        border-left: 1px solid #ddd;
        padding: 20px;
    }    
    .query_right .selectedActive{
        color: #409EFF;
    }
    .screen-box .all{
        float: left;
    }
    .container{
        position:absolute;
        width: 100%;
        min-width:500px;
        height: 100%;
        overflow-y: auto;
        font-size: 14px;
    }
    // 已选start
    .query_condition{
        color:#000;
        font-weight:bold;
        width:60px;
        float: left;
        text-align: justify;
        &::after {
            display: inline-block;
            width: 100%;
            content: '';
            height: 0;
        }
    }
    .condition {
        margin-left: 80px;
    }
    .condition .item {
        margin-right: 20px;
        margin-bottom:10px;
        cursor: pointer;
        display: inline-block;
    }
    .condition .item.item_all {
        float: left;
    }
    .condition .item_other {
        margin-bottom:-10px;
        margin-left:48px;
    }
    .query_condition_sel{
        line-height: 20px;
        padding-top:4px;
    }
    .query_selected{
        border-bottom:1px solid #eee;
        position: relative;
        overflow: hidden;
    }
    .selected_item_box{
        margin: 0 80px;
    }
    .query_right .selected_item{
        background: #eee;
        color:#333;
        border-radius:3px;
        display: inline-block;
        padding: 0 5px;
        line-height: 25px;
        font-size:14px;
        margin: 0 10px 6px 0;
    }
    .selected_item .el-icon-close:hover{
        cursor:pointer;
        color:#ff0000;
    }
    .clear-all-selected{
        float: right;
        color: #aaa;
        font-size: 14px;
        position: absolute;
        top:6px;
        right: 0;
        cursor:pointer;
    }
    .clear-all-selected .el-icon-delete{
        font-size: 16px;
    }
    // 已选 end
    // 查询条件start
    .screen-box{
        border-bottom: 1px solid #eee;
        padding-bottom: 13px;
    }
    .screen-box-list{
        padding-top:15px;
        line-height: 12px;
        overflow: hidden;
    }   
    .more .el-checkbox{
        padding: 0 9px;
    }
    .more .el-checkbox__label{
        font-size: 14px;
        color: #011;
    }
    .screen-box .search{
        margin: 0 auto;
        width: 100px;
        display: block;
    }
    //查询条件end
    .sort{
        padding:15px 0;
        line-height: 30px;
        color: #000;
        font-weight: bold;
        border-bottom: 1px solid #eeeeee;
    }
    // subject start
    .subject {
        overflow: hidden;
    }
    .setbox_con {
        height: calc(100% - 120px);
        overflow-y:auto;
        margin-top:14px;
        padding-bottom:20px;
    }
    .subject .subject-content-box {
        margin-top:20px;
        overflow: hidden;
        border-bottom:1px dashed #ccc;
    }
    .setbox_con .subject-content-box {
        background: #fff;
        border-radius: 8px;
        padding:10px;
        margin-right: 20px;
        border:none;
    }
    .subject-content-box img {
        display: block;
        max-width: 315px;
        height: auto;
    }
    .subject-content-box .i.look_i {
        float: left;
        line-height: 30px;
        margin-right: 10px;
        font-weight: bold;
    }
    .subject .subject-content-box:last-child {
        border:none;
    }
    .subject .subject-index {
        float: left;
        width: 30px;
        height:30px;
        line-height:30px;
        background:#a1dec3;
        text-align: center;
        border-radius: 50%;
    }
    .subject .ellipsis{
        width:100%;
        overflow:hidden; /*超出部分隐藏*/
        white-space:nowrap; /*让文本强制在一行不换行*/
        text-overflow:ellipsis;
    }
    .subject .subject-box {
        margin-left:40px;
        font-size: 14px;
        color:#000;
        line-height: 25px;
    }
    .subject .subject-content-title {
        color:#666;
    }
    .subject .subject-box .parsing {
        margin:10px 5px;
    }
    .subject .subject-box img {
        max-width: 315px;
        height: auto;
    }

    .subject-content-item {
        margin:10px 0;
        padding: 10px 12px;
        background: #f5f6f7;
    }
    .subject .inner {
        overflow: hidden;
        margin-bottom: 10px;
    }
    .subject .inner:last-child{
        margin: 0;
    }
    .subject .label {
        color:#fff;
        padding:0 5px;
        float: left;
        height: 25px;
        background: #93969b;
        border-radius: 4px;
        font-weight: 400!important;
    }
    .subject .details-item {
        word-break: break-all;
        margin-left:50px;
    }
    .subject .greenspan {
        color: #67C23A;
    }
    .subject .details_title {
        float: left;
        color:#67C23A;
    }
    .subject .details_con {
        margin-left:110px;
    }
    .subject .copy {
        color:#409EFF;
        cursor: pointer;
    }
    .subject .usage {
        padding:10px 0;
        overflow: hidden;
    }
    .usage-left,.usage-right{
        list-style: none;
    }
    .usage-left li{
        float: left;
        margin-right: 8px;
    }
    .usage-right{
        float: right;
    }
    .usage-right li{
        float: left;
        margin-left: 10px;
        padding:0 7px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        cursor: pointer;
        border:1px solid #ccc;
    }
    .usage-right li.active{
        border: 1px solid #66b1ff;
        color: #66b1ff;
    }
    .subject .nonelist,.noneset {
        text-align: center;
        line-height: 100px;
        font-size: 22px;
        color:#999;
    }
    .pagination {
        margin: 50px auto;
    }
    .fuzzy_width {
        width:470px !important;
        div{
            width:470px;
        }
    }
    .usage-right li.item_add {
        background: none;
        border:none;
    }
    .item_add .el-button.el-button--primary {
        padding: 5px 10px !important;
    }
    .library-tool-wrap {
        position: fixed;
        right: 30px;
        bottom: 30px;
        z-index: 23;
        width: 60px;
        height: 60px;
    }
    .library-tool-wrap .el-button {
        background: #ffa30f;
        font-size:25px;
    }
    .library-cart-number {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 5;
        padding: 0 5px;
        border-radius: 8px;
        background: #ff342d;
        color: #fff;
        line-height: 16px;
        text-align: center;
        font-size: 12px;
        height: 16px;
    }
    .setbox_w {
        width:100%;
        height:100%;
        background: rgba(0,0,0,0);
        position:fixed;
        z-index: 999;
        top:0;
    }
    .setbox{
        position:fixed;
        z-index:1000;
        top:0px;
        bottom:0px;
        width:450px;
        height:100%;
        background:#f5f6f7;
        box-shadow:0px 3px 10px rgba(0,0,0,0.5);
        -webkit-transition: all 0.5s ease;
        transition: all 0.5s ease;
        right:-500px;
        padding: 0 0 10px 20px;
    }
    .setbox .colse {
        position: absolute;
        bottom:20px;
        left:-20px;
    }
    .setbox_top {
        width: 100%;
        margin:20px 0;
        overflow: hidden;
    }
    .setbox_topl {
        float: left;
        font-size:16px;
        color:#333;
    }
    .setbox_topl span {
        color:#409EFF;
        padding-left:10px;
    }
    .setbox_topr {
        float:right;
        padding-right: 20px;
        font-size: 13px;
        color:#999;
        cursor: pointer;
    }
    .setbox_topr:hover {
        color:red;
    }
    .show {
        right: 0;
    }
</style>
