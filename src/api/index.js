import server from '../utils/request'
import qs from 'qs'
/*--------------- 课程管理start ---------------*/
// 通过搜索条件筛选大班
function courseInfoList(params) {
    return server.post('/classinfo/CoursewareInfoListForContent', params);
}
// 通过大班获取课次视图
function getLessonDetail(params) {
    return server.post('/class/LessonDetail', params);
}
// 课件关联的所有课程
function getCoursewareInLecture(params) {
    return server.post('/courseware/CoursewareInLecture', params);
}
// 选定课程的小班信息(选定大班下的所有小班下发信息)
function getPublishCoursewareInfo(params) {
    return server.post('/bind/PublishCoursewareInfo', params);
}
/*--------------- 课程管理end ---------------*/

// 视频管理 --- 获取视频列表
function getLectureInfoListForZhibo(params) {
    return server.post('/classinfo/LectureInfoListForZhibo', params);
}
// 视频管理 --- 上传视频
function postUploadLiveVideo(params) {
    return server.post('/live/UploadLiveVideo', params);
}
// 视频管理 --- 课次列表
function getLectureDetail(params) {
    return server.post('/classinfo/LectureDetail', params);
}
// 选定大班下的所有小班视图
function getsmallClassLists(params) {
    return server.get(`/smallClass/SmallClassLists?${qs.stringify(params)}`);
}
// 通过小班id查看视频下发状态
function getpublishSmallClassInfo(params) {
    return server.post('/bind/PublishSmallClassInfo', params);
}

// 获取筛选条件板
// 获取城市列表
function cityInfoList(params) {
    return server.get('/cityinfo/CityInfoList?'+qs.stringify(params))
}

// 获取学科年级学期年份/cityinfo/selectList?area=010
function selectList (params) {
    return server.get('/cityinfo/selectList?'+qs.stringify(params))
}

// 模糊查询主讲老师
function getTeacherList(params) {
    return server.post('/teacherinfo/TeacherInfoList', params);
}

// 模糊查询班次
function getLevelList(params) {
    return server.get('/cityinfo/getLevelList?' + qs.stringify(params));
}
// 获取监控列表
function getMonitorList(params) {
    return server.post('/monitor/getMonitorList', params);
}
// 获取课件状态
function coursewareDistributesMessage(params) {
    return server.post('/class/CoursewareDistributesMessage', params);
}

export {
    selectList,
    cityInfoList,
    getLevelList,
    getMonitorList,
    courseInfoList,
    getTeacherList,
    getLessonDetail,
    getCoursewareInLecture,
    getPublishCoursewareInfo,
    getsmallClassLists,
    getpublishSmallClassInfo,
    coursewareDistributesMessage,
    getLectureInfoListForZhibo,
    postUploadLiveVideo,
    getLectureDetail,
}