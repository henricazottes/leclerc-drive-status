import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Notifications } from 'expo';
import axios from 'axios';

function fetchPage(setAvailable, setLoading) {
  setLoading(true);
  axios(
    'https://fd7-courses.leclercdrive.fr/magasin-123111-montaudran.aspx',
  )
  .then(response => {
    const aspNetRegExp = new RegExp(/id="aspnetForm"/g);
    const isAvailable = (response.data.match(aspNetRegExp) !== null);
    setAvailable(isAvailable);
  })
  .catch(err => console.error(err))
  .finally(() => setLoading(false))
}

export default function App() {
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const statusText = `Status: ${available ? 'Available' : 'Not Available'}`;

  return (
    <View style={styles.container}>
      <Button
        title='Reload'
        onPress={() => fetchPage(setAvailable, setLoading)}
      >
        Reload
      </Button>
      {loading
      ? <Text>Loading...</Text>
      : <Text>{statusText}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
