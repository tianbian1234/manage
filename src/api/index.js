import request from '../utils/request';

/**
 * 查询所有组件ID
 */
export const findAll = () =>
  request.post('/rpc', {
    act: 'v2/screen_component/all',
    args: {
      status: 0
    }
  });

/**
 * 查询大屏所有组件
 */
export const findScreenComponent = () =>
  request.post('/rpc', {
    act: 'v2/screen_component/list',
    args: {
      auth:
        'CCCPozRyNVWENDkN0mD9ReCn89mbKs75fxwQ2c7U8hYR+lc+jeb6gHvr4DYDIqamjekGybPWrKUoYT+2W32+ng==',
      corp_id: '5b8f7a07a166b10e263c3e0c',
      endpoint: 'screen_component-list',
      template_id: '5c80f805176ffb6d03d9fe32'
    }
  });

/**
 * 修改组件
 * @param {String} _id 组件ID
 * @param {String} classify 组件分类
 * @param {String} content 组件内容
 */
export const modifyComponent = (_id, classify, content) =>
  request.post('/rpc', {
    act: 'v2/screen_component/update',
    args: {
      _id,
      classify,
      conent: content
    }
  });

/**
 * 新增组件
 * @param {String} classify 分类
 * @param {String} content 内容
 */
export const addComponent = (classify, content) =>
  request.post('/rpc', {
    act: 'v2/screen_component/add',
    args: {
      classify,
      conent: content
    }
  });

/**
 * 删除组件
 * @param {String} classify 分类
 * @param {String} content 内容
 */
export const removeComponent = component_id =>
  request.post('/rpc', {
    act: 'v2/screen_component/remove',
    args: {
      component_id
    }
  });

/**
 * 组件绑定模板
 * @param {String} component_id 组件ID
 * @param {String} template_id 模板ID
 */
export const bindComponent = (
  component_id,
  template_id = '5c80f805176ffb6d03d9fe32'
) =>
  request.post('/rpc', {
    act: 'v2/screen_component/add_component',
    args: {
      component_id,
      template_id
    }
  });

/**
 * 组件解绑模板
 * @param {String} component_id 组件ID
 * @param {String} template_id 模板ID
 */
export const unbindComponent = (
  component_id,
  template_id = '5c80f805176ffb6d03d9fe32'
) =>
  request.post('/rpc', {
    act: 'v2/screen_component/remove_component_from_template',
    args: {
      component_id,
      template_id
    }
  });
