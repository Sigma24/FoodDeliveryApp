import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); 

  const handleSignUp = async () => {
    if (!email || !password || !name || !phone) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      // Send user data to your backend
      await fetch('http://<your-node-server>/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid, name, email, phone, role,
        }),
      });

      Alert.alert("Success", "Account created!");
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }
   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput style={styles.input} placeholder="Name" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />

      <Text style={styles.label}>Select Role:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity style={styles.radioOption} onPress={() => setRole('customer')}>
          <View style={[styles.outerCircle, role === 'customer' && styles.selectedOuter]}>
            {role === 'customer' && <View style={styles.innerCircle} />}
          </View>
          <Text>Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.radioOption} onPress={() => setRole('rider')}>
          <View style={[styles.outerCircle, role === 'rider' && styles.selectedOuter]}>
            {role === 'rider' && <View style={styles.innerCircle} />}
          </View>
          <Text>Rider</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
   
      <View style={styles.loginContainer}>
        <Text>Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOuter: {
    borderColor: '#3D8BFF',
  },
  innerCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#3D8BFF',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3D8BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

    loginContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginLink: {
    color: '#3D8BFF',
    fontWeight: 'bold',
  },

});
