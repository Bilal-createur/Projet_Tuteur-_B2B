import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';

export default function CreateEventScreen({ navigation }) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [lieu, setLieu] = useState('');
  const [capacite, setCapacite] = useState('');

  const handleCreate = () => {
    if (!titre || !description) {
      Alert.alert('Erreur', 'Veuillez remplir le titre et la description');
      return;
    }

    const newEvent = {
      titre,
      description,
      lieu,
      capaciteMax: parseInt(capacite) || 0
    };

    fetch('http://10.0.2.2:8080/api/evenements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    })
    .then((res) => {
      if(res.ok) {
        Alert.alert('Succès', 'Événement ajouté avec succès !');
        navigation.navigate('Home');
      }
    })
    .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Nouvel Événement</Text>

        <Text style={styles.label}>Titre de l'événement</Text>
        <TextInput style={styles.input} placeholder="Gala" placeholderTextColor="#666666" value={titre} onChangeText={setTitre} />

        <Text style={styles.label}>Description</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          multiline={true} 
          numberOfLines={3} 
          placeholder="Détails..." 
          placeholderTextColor="#666666" 
          value={description} 
          onChangeText={setDescription} 
        />

        <Text style={styles.label}>Lieu / Adresse</Text>
        <TextInput style={styles.input} placeholder="Yaoundé" placeholderTextColor="#666666" value={lieu} onChangeText={setLieu} />

        <Text style={styles.label}>Capacité max</Text>
        <TextInput style={styles.input} placeholder="200" placeholderTextColor="#666666" keyboardType="numeric" value={capacite} onChangeText={setCapacite} />

        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Créer l'événement</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f111a' },
  scroll: { padding: 25 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 25, marginTop: 20 },
  label: { color: '#aaaaaa', fontSize: 14, marginBottom: 8, fontWeight: '500' },
  input: { backgroundColor: '#1a1d2e', color: '#ffffff', padding: 15, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#252942' },
  textArea: { height: 80, textAlignVertical: 'top' },
  button: { backgroundColor: '#9b5de5', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});