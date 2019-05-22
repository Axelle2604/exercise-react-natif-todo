import React from 'react';
import { View } from 'react-native';
import { RkText, RkButton } from 'react-native-ui-kitten';
import styled from 'styled-components';

const Task = ({ text, isDone, updateTaskList, id }) => {
  const onPressButton = () => {
    console.log(isDone);

    updateTaskList(id, isDone);
  };

  return (
    <View>
      <TextContainer isDone={isDone}>{text}</TextContainer>
      <RkButton onPress={onPressButton} rkType="primary small">
        X
      </RkButton>
    </View>
  );
};

export default Task;

const TextContainer = styled(RkText)`
  text-decoration: ${({ isDone }) => (isDone ? 'line-through' : 'none')};
`;
