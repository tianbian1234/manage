/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { Component } from 'react';
import { Table, Divider, message } from 'antd';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import {
  findAll,
  removeComponent,
  bindComponent,
  unbindComponent
} from '../api';

class List extends Component {
  state = {
    dataSource: [],
    columns: [
      {
        title: '组件类别',
        dataIndex: 'classify',
        key: 'classify',
        align: 'center'
      },
      {
        title: '组件名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
      },
      {
        title: '组件ID',
        dataIndex: 'object_id',
        key: 'object_id',
        align: 'center'
      },
      {
        title: '组件KEY',
        dataIndex: 'key',
        key: 'key',
        align: 'center'
      },
      {
        title: '操作',
        key: 'operation',
        width: 200,
        align: 'center',
        render: (text, record) => (
          <span>
            <a
              href='javascript:;'
              onClick={() => {
                this.handleBind(record);
              }}
            >
              绑定
            </a>
            <Divider type='vertical' />
            <a
              href='javascript:;'
              onClick={() => {
                this.handleUnbind(record);
              }}
            >
              解绑
            </a>
            <Divider type='vertical' />
            <a
              href='javascript:;'
              onClick={() => {
                this.handleClick(record);
              }}
            >
              删除
            </a>
          </span>
        )
      }
    ]
  };

  componentDidMount() {
    this.getDataSource();
  }

  handleClick = record => {
    removeComponent(record.object_id)
      .then(data => {
        this.getDataSource();
        message.success('删除成功！');
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  handleBind = record => {
    bindComponent(record.object_id)
      .then(data => {
        message.success('组件绑定成功！');
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  handleUnbind = record => {
    unbindComponent(record.object_id)
      .then(data => {
        message.success('组件解绑成功！');
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  async getDataSource() {
    Nprogress.start();
    try {
      const dataSource = await findAll();
      Nprogress.done();

      const newDataSource = [...dataSource];
      newDataSource.reverse();

      this.setState({
        dataSource: newDataSource
      });
    } catch (err) {}
  }

  render() {
    const { dataSource, columns } = this.state;
    return (
      <div className='List'>
        <Table bordered columns={columns} dataSource={dataSource} />
      </div>
    );
  }
}

export default List;
