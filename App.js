import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Notifications } from 'expo';
import axios from 'axios';
import Constants from "expo-constants";

import HistoryStatusList from './components/historyStatusList';

const getLocalNotification = (isAvailable) => ({
  title: `Leclerc Drive Status ${isAvailable ? '🟢' : '🔴'}`,
  ios: { // (optional) (object) — notification configuration specific to iOS.
    sound: true // (optional) (boolean) — if true, play a sound. Default: false.
  },
android: // (optional) (object) — notification configuration specific to Android.
  {
    sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
    icon: './assets/available.png',
    priority: 'high',
    vibrate: true,
    sticky: true,
  }
});

function fetchPage(setAvailable, setLoading) {
  setLoading(true);
  axios(
    'https://fd7-courses.leclercdrive.fr/magasin-123111-montaudran.aspx',
  )
  .then(response => {
    const aspNetRegExp = new RegExp(/id="aspnetForm"/g);
    const isAvailable = (response.data.match(aspNetRegExp) !== null);
    triggerNotification(isAvailable);
    setAvailable(isAvailable);
  })
  .catch(err => console.error(err))
  .finally(() => setLoading(false))
}

function triggerNotification(isAvailable) {
  Notifications.dismissAllNotificationsAsync()
  .then(() => {
    Notifications.presentLocalNotificationAsync(
      getLocalNotification(isAvailable),
    );
  })
}

export default function App() {
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const statusText = `${available ? 'Available 🟢' : 'Not Available 🔴'}`;

  return (
    <View style={styles.container}>
      <Text style={styles.lastStatus}>Last Status: 
        {loading
        ? ' Loading...'
        : ` ${statusText}`
        }
      </Text>
      <HistoryStatusList items={[{date: new Date(), isAvailable: false}]} />
      <Button
        title='Reload'
        onPress={() => {
          fetchPage(setAvailable, setLoading);
        }}
      >
        Reload
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    paddingTop: Constants.statusBarHeight,
    marginBottom: 10,
  },
  lastStatus: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  }
});
