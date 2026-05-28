import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez entrer vos identifiants.");
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        Alert.alert("Succès", "Connexion réussie !");
        // navigation.navigate('Home'); // Décommente quand tu auras ton HomeScreen
      } else {
        Alert.alert("Erreur", "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Serveur Spring Boot inaccessible.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EventLogix</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#aaa" 
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Mot de passe" 
        secureTextEntry 
        placeholderTextColor="#aaa" 
        onChangeText={setPassword} 
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.footerText}>Pas de compte ? S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f111a', justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, color: '#fff', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#1a1d2e', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#2f52e0', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footerText: { color: '#aaa', textAlign: 'center', marginTop: 20 }
});