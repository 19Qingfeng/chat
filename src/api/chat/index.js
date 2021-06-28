import request from '../config';

export const getChatListApi = (params) => {
  return request({
    url: '/v1/get_task_room_list',
    method: 'get',
    params
  });
};
