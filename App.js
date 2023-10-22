import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView, Button } from 'react-native';
import { collection, addDoc, firestore, serverTimestamp, query, onSnapshot, orderBy, limit } from './firebase/Config'; 
import Constants from 'expo-constants';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(
      collection(firestore, 'MESSAGES'),
      orderBy('created', 'desc'), // Order by 'created' in descending order
      limit(10) // Limit the number of messages to retrieve (adjust as needed)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];

      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        const messageObject = {
          id: doc.id,
          text: messageData.text,
          created: convertFirebaseTimeStampToJS(messageData.created)
        };

        tempMessages.push(messageObject);
      });

      setMessages(tempMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const save = async () => {
    if (newMessage.trim() === '') {
      return; // Don't save empty messages
    }

    const docRef = await addDoc(collection(firestore, 'MESSAGES'), {
      text: newMessage,
      created: serverTimestamp(),
    });
    setNewMessage('');
    console.log('Message saved');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {messages.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text style={styles.messageInfo}>
              {message.created} {/* Timestamp is now in human-readable format */}
            </Text>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        placeholder="Enter your message"
      />
      <Button title="Send" onPress={save} />
    </SafeAreaView>
  );
}

const barHeight = Constants.statusBarHeight;

const styles = StyleSheet.create({
  container: {
    paddingTop: barHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  messageInfo: {
    fontSize: 12
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
});
