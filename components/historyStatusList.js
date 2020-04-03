import React from 'react';
import { FlatList } from 'react-native';

import HistoryStatusItem from './historyStatusItem';


function HistoryStatusList({items}) {
  return (
    <FlatList
        data={items}
        renderItem={({ item }) => <HistoryStatusItem date={item.date} status={item.status} />}
        keyExtractor={item => item.id}
      />
  )
}

export default HistoryStatusList;