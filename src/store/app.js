import {
    selectList,
    getVideoList,
    cityInfoList,
    getLevelList,
    courseInfoList,
    getMonitorList,
    getTeacherList,
    getLessonDetail,
    getsmallClassLists,
    getpublishSmallClassInfo,
    getCoursewareInLecture,
    getPublishCoursewareInfo,
    coursewareDistributesMessage,
    getLectureInfoListForZhibo,
    postUploadLiveVideo,
    getLectureDetail,
} from '../api'
let app = {
    actions: {
        // 通过搜索条件筛选大班
        CourseInfoList({dispatch,commit,state,getters},params) {
            return new Promise((resolve,reject) => {
                courseInfoList(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 获取城市
        CityInfoList({dispatch,commit,state,getters},params) {
            return new Promise((resolve,reject) => {
                cityInfoList(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 获取学科年级学期年份
        SelectList({dispatch,commit,state,getters},params) {
            return new Promise((resolve,reject) => {
                selectList(params).then((data) => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 模糊查询主讲老师
        teacherList({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                getTeacherList(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 模糊查询班次
        levelList({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                getLevelList(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 通过大班获取课次视图
        lessonDetail({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                getLessonDetail(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 课件关联的所有课程
        coursewareInLecture({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                getCoursewareInLecture(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 选定课程的小班信息
        publishCoursewareInfo({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                getPublishCoursewareInfo(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 获取视频列表
        lectureInfoListForZhibo({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                getLectureInfoListForZhibo(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 上传视频
        uploadLiveVideo({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                postUploadLiveVideo(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 视频详情--课次列表
        lectureDetail({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                getLectureDetail(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 选定大班下的所有小班视图接口
        smallClassLists({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                getsmallClassLists(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 通过小班id查看视频下发状态
        publishSmallClassInfo({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                getpublishSmallClassInfo(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        monitorList({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                getMonitorList(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getCoursewareDistributesMessage({ dispatch, commit, state, getters }, params) {
            return new Promise((resolve, reject) => {
                coursewareDistributesMessage(params).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        // 视频管理--上传视频
    }
}

export default app