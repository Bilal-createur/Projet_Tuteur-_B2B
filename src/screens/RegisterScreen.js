import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // 1. Vérification si les champs sont vides
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    // 2. Validation : 8 chars min + au moins un caractère spécial
    const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < 8 || !regexSpecialChar.test(password)) {
      Alert.alert("Erreur", "Mot de passe trop faible : 8 caractères minimum et au moins un caractère spécial requis.");
      return;
    }

    // 3. Succès et redirection
    Alert.alert("Succès", "Inscription réussie !", [
      { text: "OK", onPress: () => navigation.navigate('Login') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      
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
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f111a', padding: 25, justifyContent: 'center' },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#1a1d2e', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#2f52e0', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});