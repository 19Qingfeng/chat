import axios from 'axios';
import {
  ElNotification,
  ElMessageBox,
  ElMessage,
  ElLoading,
} from 'element-plus';
// import store from '@/store';
import { debounce } from '../../assets/js/utils';

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? ''
      : process.env.VUE_APP_BASE_API,
  // baseURL: process.env.VUE_APP_BASE_API + '/v1', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
});

let loadinginstace;
let needLoadingRequestCount = 0;
let messageBox = false;

function showLoading(isShow = true, opt) {
  if (isShow) {
    if (needLoadingRequestCount === 0) {
      loadinginstace = ElLoading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        customClass: 'loading',
        body: true,
        background: 'rgba(0, 0, 0, 0.7)',
        ...opt,
      });
    }
    needLoadingRequestCount++;
  }
}

function tryHideLoading(isShow = true) {
  if (isShow) {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    debounce(() => {
      if (needLoadingRequestCount === 0) {
        loadinginstace.close();
      }
    }, 0.1)();
  }
}

// request interceptor
service.interceptors.request.use(
  (config) => {
    // if (store.getters.token) {
      config.headers['Authorization'] =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGU3YjI5N2YtMmYyYy00OGNhLTg5NTctYmU5ZWRlNmZiMzNjIiwiZXhwIjoxNjMyMDM4MTE1LCJpYXQiOjE2MjQyNjIxMTV9.xC9caDIMkV-toTyTpr_LNf_bTa9bE0shZ1kqm-GgpxM';
    // }
    showLoading(config.showLoading, config.loading);
    return config;
  },
  (error) => {
    ElMessage({
      message: '服务器连接异常，请检查服务器！',
      type: 'error',
      showClose: true,
      duration: 2 * 1000,
    });
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const code = response.data.code;
    tryHideLoading(response.config.showLoading);
    if (code === 401) {
      // store.dispatch('user/remove_login_info');
      if (location.href.indexOf('login') !== -1) {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      } else {
        ElMessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          }
        ).then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      }
    } else if (code === 6401) {
      // store.dispatch('user/resetToken');
      ElMessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
      return false;
    } else if (code === 403) {
      // 开发环境hack
      if (response.data.error.msg_id === 10002) {
        ElMessageBox({
          title: '系统提示',
          message: '登录信息过期，请重新登录',
          confirmButtonText: '确定',
          customClass: 'custom-el-message-box',
          callback: () => {
            // store.dispatch('user/remove_login_info').then(() => {
            //   router.push('/login');
            // });
          },
        });
      } else {
        ElMessage({
          message: response.data.error.msg,
          type: 'error',
          duration: 5 * 1000,
        });
        return Promise.reject(response.data.error.msg);
      }
    } else if (code !== 200) {
      ElNotification.error({
        title: response.data.error.msg,
      });
      return Promise.reject('error');
    } else {
      return response.data.data;
    }
  },
  (error) => {
    tryHideLoading();
    if (error instanceof axios.Cancel) {
      return Promise.reject('cancel');
    }

    const status = error.response.status;
    if (status === 401) {
      if (!messageBox) {
        messageBox = true;
        ElMessageBox({
          title: '系统提示',
          message: '登录信息过期，请重新登录',
          confirmButtonText: '确定',
          customClass: 'custom-el-message-box',
          callback: () => {
            messageBox = true;
            // store.dispatch('user/remove_login_info').then(() => {
            //   // router.push('/login');
            // });
          },
        });
      }
    } else if (status === 403) {
      window.location.href = 'https://www.instagram.com/';
    } else {
      if (error.message === 'Network Error') {
        ElMessage({
          message: '服务器连接异常，请检查服务器！',
          type: 'error',
          duration: 5 * 1000,
        });
        return;
      }

      ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
      });
    }

    return Promise.reject(error);
  }
);

export default service;
