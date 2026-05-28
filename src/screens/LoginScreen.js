import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { apiClient } from '../services/apiService'; // Importation du service

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Appel via notre service centralisé
      const response = await apiClient.post('/auth/login', { email, password });
      
      if (response.ok) {
        // Remplace Alert.alert("Succès", "Connexion réussie !"); par :
navigation.navigate('Home');
      } else {
        Alert.alert("Erreur", "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de se connecter au serveur.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Mot de passe" secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }
});