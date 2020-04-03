import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function HistoryStatusItem({date, isAvailable}) {
  return (
    <View style={styles.item}>
      <Text style={styles.date}>{date.toLocaleString('fr-Fr')}</Text>
      <Text style={styles.status}>{isAvailable ? '🟢' : '🔴'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 14,
  },
  status: {
    fontSize: 14,
  }
});

export default HistoryStatusItem;