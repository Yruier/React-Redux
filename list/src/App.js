import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.checked=this.checked.bind(this)
  }
  render() {
    const { list, getList } = this.props;
    return (
      <div className="App">
        <div className='navs'>
          <span onClick={() => getList()}>全部任务</span>
          <span onClick={() => getList(1)}>待办任务</span>
          <span onClick={() => getList(2)}>已完成任务</span>
        </div>
        <div>
          {list.length > 0 && list.map((item, index) => {
            return (
              <div key={index} className='table-list'>
                <span><input type="checkbox" onChange={() => this.checked(item)} checked={item.checked}/></span>
                <span className={item.checked?'ok':''}>{item.name}</span>
                <span onClick={()=>this.props.delete(item)}>删除</span>
              </div>
            )
          })}
        </div>
        <div>
          <input type="text" placeholder='你想做点什么' ref='addTask' />
          <span onClick={this.addTask.bind(this)}>添加任务</span>
        </div>
      </div>
    );
  }

  addTask() {
    this.props.AddTask(this.refs.addTask.value)
    this.refs.addTask.value=null;
  }

  checked(item){
    this.props.toggleChecked(item)
  }

  componentDidMount() {
    this.props.getList()
  }


}

const mapStateToProps = (state) => {
  return {
    list: state.List
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AddTask(value) {
      axios.get('/addtask', { value: value })
        .then(result => {
          dispatch({
            type: 'ADD_TASK',
            payload: result.data
          })
        })
    },

    getList(state) {
      axios.post('/list', state)
        .then(result => {
          dispatch({
            type: 'GET_LIST',
            payload: result.data
          })
        })
    },

    toggleChecked(item){
      axios.get('/checked', {item:item})
        .then(result => {
          dispatch({
            type: 'TOGGLE_CHECKED',
            payload: result.data
          })
        })
    },

    delete(item){
      axios.get('/delete', { items: item })
        .then(result => {
          dispatch({
            type: 'DELETE_ITEM',
            payload: result.data
          })
        })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
