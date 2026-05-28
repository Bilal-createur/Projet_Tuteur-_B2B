import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, Alert,
} from 'react-native';
import { COLORS } from '../theme';
import { Badge, PageHeader } from '../components';
import { PROVIDERS } from '../data';

const CATS = ['Tous', 'Traiteur', 'Animation', 'Photo/Vidéo', 'Décoration', 'Sonorisation', 'Transport'];

export default function MarketplaceScreen() {
  const [filter, setFilter] = useState('Tous');
  const [search, setSearch] = useState('');

  const filtered = PROVIDERS.filter(p => {
    const matchCat = filter === 'Tous' || p.cat === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <PageHeader
          title="Marketplace"
          subtitle={`${PROVIDERS.length} prestataires vérifiés au Cameroun`}
        />

        {/* Search */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un prestataire..."
            placeholderTextColor={COLORS.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {CATS.map(c => (
            <TouchableOpacity
              key={c}
              style={[styles.pill, filter === c && styles.pillActive]}
              onPress={() => setFilter(c)}
            >
              <Text style={[styles.pillText, filter === c && styles.pillTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Provider cards */}
        {filtered.map(p => (
          <View key={p.id} style={styles.providerCard}>
            {/* Image area */}
            <View style={[styles.providerImageArea, { backgroundColor: p.couleur + '18' }]}>
              <Text style={{ fontSize: 44 }}>{p.emoji}</Text>
              {!p.dispo && (
                <View style={styles.indispoBadge}>
                  <Text style={styles.indispoText}>Indisponible</Text>
                </View>
              )}
              {p.dispo && (
                <View style={styles.dispoBadge}>
                  <Text style={styles.dispoText}>● Disponible</Text>
                </View>
              )}
            </View>

            <View style={styles.providerInfo}>
              <View style={styles.providerTopRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.providerName}>{p.name}</Text>
                  <Text style={styles.providerCat}>{p.cat} · {p.ville}</Text>
                </View>
              </View>

              <View style={styles.ratingRow}>
                <Text style={styles.ratingText}>⭐ {p.note}</Text>
                <Text style={styles.avisText}>({p.avis} avis)</Text>
              </View>

              <Text style={styles.tarif}>{p.tarif}</Text>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.devisBtn}
                  onPress={() => Alert.alert('Devis Flash', `Demande envoyée à ${p.name} !`)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.devisBtnText}>💬 Devis Flash</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profilBtn} activeOpacity={0.8}>
                  <Text style={styles.profilBtnText}>📋 Profil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Aucun prestataire trouvé</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 32 },

  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: COLORS.border,
    marginBottom: 14, gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1, fontSize: 14,
    color: COLORS.textPrimary,
  },

  filtersScroll: { marginBottom: 16 },
  filtersContent: { gap: 8, paddingRight: 8 },
  pill: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: COLORS.border,
  },
  pillActive: { backgroundColor: 'rgba(108,99,255,0.15)', borderColor: COLORS.accent },
  pillText: { fontSize: 12, color: COLORS.textMuted, fontWeight: '500' },
  pillTextActive: { color: COLORS.accentLight, fontWeight: '600' },

  providerCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16, borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden', marginBottom: 14,
  },
  providerImageArea: {
    height: 90,
    alignItems: 'center', justifyContent: 'center',
  },
  indispoBadge: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: COLORS.red,
    borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3,
  },
  indispoText: { color: 'white', fontSize: 10, fontWeight: '700' },
  dispoBadge: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: 'rgba(16,185,129,0.2)',
    borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: COLORS.green,
  },
  dispoText: { color: COLORS.green, fontSize: 10, fontWeight: '600' },
  providerInfo: { padding: 14 },
  providerTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  providerName: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  providerCat: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  ratingText: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  avisText: { fontSize: 12, color: COLORS.textMuted },
  tarif: { fontSize: 13, fontWeight: '700', color: COLORS.accent, marginBottom: 12 },
  actionRow: { flexDirection: 'row', gap: 8 },
  devisBtn: {
    flex: 1, backgroundColor: COLORS.accent,
    borderRadius: 8, paddingVertical: 9, alignItems: 'center',
  },
  devisBtnText: { color: 'white', fontWeight: '700', fontSize: 13 },
  profilBtn: {
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 8, paddingVertical: 9,
    paddingHorizontal: 14, alignItems: 'center',
  },
  profilBtnText: { color: COLORS.textSecondary, fontWeight: '600', fontSize: 13 },

  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, color: COLORS.textMuted },
});
