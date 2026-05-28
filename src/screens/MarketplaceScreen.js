import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

const PRESTATAIRES = [
  { id: '1', nom: 'Traiteur Étoile', type: 'Buffet Africain', prix: '25 000 FCFA/pers', color: '#ff0055' },
  { id: '2', nom: 'DJ VibeKing', type: 'Sonorisation & Éclairage', prix: '150 000 FCFA/jour', color: '#38b000' },
  { id: '3', nom: 'PhotoEvent Pro', type: 'Couverture Photo & Vidéo', prix: '80 000 FCFA/Package', color: '#00b4d8' }
];

export default function MarketplaceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Marketplace</Text>
      
      <FlatList
        data={PRESTATAIRES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.colorBar, { backgroundColor: item.color }]} />
            <View style={styles.cardContent}>
              <Text style={styles.nom}>{item.nom}</Text>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.prix}>{item.prix}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f111a', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 20, marginTop: 40 },
  list: { paddingBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: '#1a1d2e', borderRadius: 10, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#252942' },
  colorBar: { width: 6 },
  cardContent: { padding: 16, flex: 1 },
  nom: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  type: { color: '#aaaaaa', fontSize: 14, marginTop: 4 },
  prix: { color: '#ff6b35', fontSize: 13, fontWeight: 'bold', marginTop: 8 }
});