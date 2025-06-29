import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  const sendResetEmail = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Success", "Password reset link sent to your email.");
        navigation.goBack(); // or navigate to Login screen
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={sendResetEmail}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20 },
  button: { backgroundColor: '#3D8BFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
