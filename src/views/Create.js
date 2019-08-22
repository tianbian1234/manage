import React, { Component } from 'react';
import { Button, message } from 'antd';
import { addComponent } from '../api';

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

class Create extends Component {
  state = {
    loading: false,
    content: '',
    classify: 'advanced'
  };

  onAddComponent = () => {
    this.setState({
      loading: true
    });
    const { classify, content } = this.state;
    addComponent(classify, content)
      .then(data => {
        console.log(data);
        message.success('上传成功！');
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        message.error(err.message);
        this.setState({
          loading: false
        });
      });
  };

  selectChange = e => {
    this.setState({
      classify: e.target.value
    });
  };

  inputChange = e => {
    const files = e.target.files;
    const reader = new FileReader(); //新建一个FileReader
    reader.readAsText(files[0], 'UTF-8'); //读取文件
    reader.onload = evt => {
      //读取完文件之后会回来这里
      const fileString = evt.target.result; // 读取文件内容
      this.setState({
        content: fileString
      });
    };
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            textAlign: 'left',
            display: 'inline-block',
            margin: '20px auto'
          }}
        >
          {/* <p>template_id: <input type="text" onChange={this.inputTemplateId}/></p> */}
          <p>
            组件类别：{' '}
            <select
              name=''
              id=''
              defaultValue={'advanced'}
              onChange={this.selectChange}
            >
              {componentsType.map(({ type, name }) => (
                <option value={type} key={type}>
                  {name}
                </option>
              ))}
            </select>
          </p>
          <p>
            组件内容：
            <input type='file' onChange={this.inputChange} />
          </p>
          <Button
            type='primary'
            loading={this.state.loading}
            onClick={this.onAddComponent}
          >
            添加组件
          </Button>
        </div>
      </div>
    );
  }
}

export default Create;
