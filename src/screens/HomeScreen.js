import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://10.0.2.2:8080/api/evenements';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Événements</Text>
        <TouchableOpacity style={styles.marketBtn} onPress={() => navigation.navigate('Marketplace')}>
          <Text style={styles.marketBtnText}>Shop 🛒</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2f52e0" style={styles.center} />
      ) : events.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Aucun événement trouvé pour le moment.</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      {/* Utilisation de item.titre reçu de l'API Spring Boot */}
      <Text style={styles.cardTitle}>{item.titre || 'Événement sans titre'}</Text>
      <View style={styles.badge}><Text style={styles.badgeText}>Actif</Text></View>
    </View>
    {/* Utilisation de item.description */}
    <Text style={styles.cardDesc}>{item.description || 'Aucune description fournie'}</Text>
    
    {/* Affichage dynamique du lieu et de la capacité maximale */}
    <Text style={styles.cardDetails}>
      📍 {item.lieu || 'Lieu non défini'}  •  👥 {item.capaciteMax !== null ? item.capaciteMax : 0} places
    </Text>
  </View>
)}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateEvent')}>
        <Text style={styles.fabText}>+ Créer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f111a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' },
  marketBtn: { backgroundColor: '#ff6b35', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  marketBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 },
  list: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#1a1d2e', padding: 18, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#252942' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  badge: { backgroundColor: '#2ec4b6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { color: '#ffffff', fontSize: 10, fontWeight: 'bold' },
  cardDesc: { color: '#aaaaaa', marginTop: 8, fontSize: 14 },
  cardDetails: { color: '#666666', marginTop: 12, fontSize: 12, fontWeight: '500' },
  emptyText: { color: '#aaaaaa', fontSize: 16 },
  fab: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#2f52e0', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 30, elevation: 5 },
  fabText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 }
});