/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { Component } from 'react';
import { Table, Collapse, Modal, Form, Input, Select, message } from 'antd';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { findScreenComponent, modifyComponent } from '../api';

const Panel = Collapse.Panel;
const Option = Select.Option;

const componentsType = [
  {
    type: 'base',
    name: '基本组件'
  },
  {
    type: 'map',
    name: '地图组件'
  },
  {
    type: 'advanced',
    name: '高级组件'
  },
  {
    type: 'content',
    name: '文字内容'
  },
  {
    type: 'shape',
    name: '辅助图形'
  }
];

let fileContent = '';

const CollectionForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    inputChange = e => {
      const files = e.target.files;
      const reader = new FileReader(); //新建一个FileReader

      console.log(files)
      if (files.length === 0) return;

      reader.readAsText(files[0], 'UTF-8'); //读取文件
      reader.onload = evt => {
        //读取完文件之后会回来这里
        const fileString = evt.target.result; // 读取文件内容
        fileContent = fileString;
      };
    };

    render() {
      const { visible, onCancel, onUpdate, form, record, confirmLoading } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={`更新组件${record.name ? '-' + record.name : ''}`}
          okText='更新'
          cancelText='取消'
          confirmLoading={confirmLoading}
          onCancel={onCancel}
          onOk={onUpdate}
        >
          <Form layout='vertical'>
            <Form.Item label='组件ID'>
              {getFieldDecorator('_id', {
                initialValue: record._id,
                rules: [
                  {
                    required: true,
                    message: '请输入组件ID!'
                  }
                ]
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label='组件分类'>
              {getFieldDecorator('classify', {
                initialValue: record.classify,
                rules: [
                  {
                    required: true,
                    message: '请选择组件类别!'
                  }
                ]
              })(
                <Select>
                  {componentsType.map(({ type, name }) => (
                    <Option value={type} key={type}>
                      {name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <input type='file' id='file' onChange={this.inputChange} />
          </Form>
        </Modal>
      );
    }
  }
);

class Home extends Component {
  state = {
    dataSource: {},
    modalVisible: false,
    record: null,
    confirmLoading: false,
    columns: [
      {
        title: '组件名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
      },
      {
        title: '组件ID',
        dataIndex: '_id',
        key: '_id',
        align: 'center'
      },
      {
        title: '组件大小',
        dataIndex: 'size',
        key: 'size',
        align: 'center'
      },
      {
        title: '操作',
        key: 'operation',
        width: 140,
        align: 'center',
        render: (text, record) => (
          <span>
            <a
              href='javascript:;'
              onClick={() => {
                this.handleModify(record);
              }}
            >
              修改
            </a>
            {/* <Divider type='vertical' /> */}
            {/* <a href='javascript:;'>删除</a> */}
          </span>
        )
      }
    ]
  };

  componentDidMount() {
    this.getTableData();
  }

  async getTableData() {
    Nprogress.start();
    const dataSource = await findScreenComponent();
    Nprogress.done();
    this.setState({ dataSource });
  }

  hideModal = () => {
    this.setState(
      {
        modalVisible: false
      },
      () => {
        document.getElementById('file').value = '';
      }
    );
  };

  showModal() {
    this.setState({
      modalVisible: true
    });
  }

  handleModify = record => {
    this.setState(
      {
        record
      },
      () => {
        this.showModal();
      }
    );
  };

  handleUpdate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      // console.log('Received values of form: ', values);
      const { _id, classify } = values;
      if (!fileContent) return;

      try {
        // console.log(JSON.parse(fileContent))
        const name = JSON.parse(fileContent).configure.name;
        if (name === this.state.record.name) {
          this.setState({
            confirmLoading: true
          })
          modifyComponent(_id, classify, fileContent)
            .then(res => {
              this.setState({
                confirmLoading: false
              })
              message.success('组件更新成功！');
              form.resetFields();
              this.hideModal();
            })
            .catch(err => {
              this.setState({
                confirmLoading: false
              })
              message.error('组件更新失败！');
              form.resetFields();
              this.hideModal();
            });
        } else {
          message.error('组件不匹配，请检查后再更新！');
        }
      } catch (err) {
        message.error('组件解析失败！');
      }
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { columns, dataSource, modalVisible, record } = this.state;

    return (
      <div className='App'>
        <Collapse defaultActiveKey={['']}>
          {componentsType.map(({ type, name }) => (
            <Panel header={name} key={type}>
              <Table
                bordered
                pagination={false}
                rowKey='_id'
                columns={columns}
                dataSource={dataSource[type]}
              />
            </Panel>
          ))}
        </Collapse>

        {record && (
          <CollectionForm
            record={record}
            wrappedComponentRef={this.saveFormRef}
            visible={modalVisible}
            onCancel={this.hideModal}
            onUpdate={this.handleUpdate}
            confirmLoading={this.state.confirmLoading}
          />
        )}
      </div>
    );
  }
}

export default Home;
