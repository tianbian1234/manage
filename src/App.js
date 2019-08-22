import React, { Component } from 'react';
import { Menu } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './views/Home';
import Create from './views/Create';
import List from './views/List';

class App extends Component {
  state = {
    current: window.location.pathname
  };

  handleClick = e => {
    // window.location.replace(e.key);

    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Router>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode='horizontal'
        >
          <Menu.Item key='/'>
            <Link to="/">更新组件</Link>
          </Menu.Item>
          <Menu.Item key='/list'>
            <Link to="/list">组件列表</Link>
          </Menu.Item>
          <Menu.Item key='/create'>
            <Link to="/create">新建组件</Link>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/create/' component={Create} />
          <Route path='/list/' component={List} />
        </Switch>
      </Router>
    );
  }
}

export default App;
