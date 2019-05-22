import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Task from './components/Task';
import { TagsContainer } from './appStyled';
import styled from 'styled-components';

const data = [
  { id: 0, text: 'Task n°1', isDone: false },
  { id: 1, text: 'Task n°2', isDone: true },
  { id: 2, text: 'Task n°3', isDone: false },
];

const addToTaskList = text => ({ taskList, inputTaskValue }) => ({
  taskList: [...taskList, { id: taskList.length, text, isDone: false }],
  inputTaskValue: '',
});

const updateTask = (id, isDone) => ({ taskList }) => {
  const updatedTaskList = taskList.map(task => {
    if (isDone && task.id === id) {
      return { ...task, isDone: false };
    } else if (!isDone && task.id === id) {
      return { ...task, isDone: true };
    } else {
      return task;
    }
  });
  return { taskList: updatedTaskList };
};

export default class App extends Component {
  state = {
    inputTaskValue: '',
    taskList: data,
    selectedTag: 'all',
  };

  onChangeTaskInput = ({ target: { value: inputTaskValue } }) => {
    this.setState({ inputTaskValue });
  };

  onKeyPressTaskInput = ({ nativeEvent: { text } }) => {
    this.setState(addToTaskList(text));
  };

  updateTaskList = (id, isDone) => {
    this.setState(updateTask(id, isDone));
  };

  changeSelectedTag = tagName => {
    this.setState({ selectedTag: tagName });
  };

  _renderTaskList = ({ item: { text, isDone, id } }) => (
    <Task
      key={id}
      id={id}
      text={text}
      isDone={isDone}
      updateTaskList={this.updateTaskList}
    />
  );

  render() {
    const { inputTaskValue, selectedTag, taskList } = this.state;
    const filteredList = taskList.filter(task => {
      if (selectedTag === 'done') {
        return task.isDone;
      }
      if (selectedTag === 'todo' && !task.isDone) {
        return !task.isDone;
      }
      if (selectedTag === 'all') {
        return task;
      }
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Todo</Text>
        <RkTextInput
          placeholder="Task"
          rkType="rounded"
          onChange={this.onChangeTaskInput}
          onSubmitEditing={this.onKeyPressTaskInput}
          value={inputTaskValue}
        />
        <View>
          <RkButton
            rkType="primary small"
            onPress={this.changeSelectedTag.bind(this, 'all')}
          >
            All
          </RkButton>
          <RkButton
            rkType="danger small"
            onPress={this.changeSelectedTag.bind(this, 'todo')}
          >
            Todo
          </RkButton>
          <RkButton
            rkType="success small"
            onPress={this.changeSelectedTag.bind(this, 'done')}
          >
            Done
          </RkButton>
        </View>
        <FlatList data={filteredList} renderItem={this._renderTaskList} />
      </View>
    );
  }
}

const TagsContainer = styled(View)`
  flex-direction: row;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
