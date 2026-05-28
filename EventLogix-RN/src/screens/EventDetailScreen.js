import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { COLORS } from '../theme';
import { StatCard, Badge, Card, ProgressBar, SectionTitle } from '../components';
import { GUESTS, TASKS, PROVIDERS } from '../data';

const fmt = n => n >= 1000000 ? (n / 1000000).toFixed(1) + 'M' : n >= 1000 ? (n / 1000).toFixed(0) + 'K' : String(n);

const TABS = [
  { key: 'dashboard', label: '📊 Global' },
  { key: 'guests', label: '👥 Invités' },
  { key: 'budget', label: '💰 Budget' },
  { key: 'tasks', label: '✅ Tâches' },
  { key: 'providers', label: '🛍️ Presta' },
];

export default function EventDetailScreen({ route }) {
  const event = route.params?.event || {};
  const [activeTab, setActiveTab] = useState('dashboard');
  const pct = Math.round(event.depenses / event.budget * 100);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { borderLeftColor: event.color, borderLeftWidth: 4 }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{event.name}</Text>
          <Text style={styles.headerMeta}>📅 {event.date}  ·  📍 {event.lieu}</Text>
        </View>
        <Badge text={event.statut} type={event.statut === 'En cours' ? 'green' : 'yellow'} />
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsContent}
      >
        {TABS.map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, activeTab === t.key && styles.tabActive]}
            onPress={() => setActiveTab(t.key)}
          >
            <Text style={[styles.tabText, activeTab === t.key && styles.tabTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tab content */}
      <ScrollView contentContainerStyle={styles.content}>

        {activeTab === 'dashboard' && (
          <View>
            <View style={styles.statsGrid}>
              <StatCard label="Billets vendus" value="210" icon="🎫" color="#8B85FF" />
              <StatCard label="Présences" value={String(event.confirmes)} icon="👥" color="#10B981" />
              <StatCard label="Revenus" value={fmt(event.depenses) + ' FCFA'} icon="💰" color="#FF6B35" />
              <StatCard label="Taux présence" value={`${Math.round(event.confirmes / event.invites * 100)}%`} icon="📈" color="#F59E0B" />
            </View>

            <Card>
              <SectionTitle>Provenance des ventes</SectionTitle>
              {[
                ['Application mobile', 52, '#6C63FF'],
                ['Site web', 28, '#FF6B35'],
                ['Lien direct', 20, '#10B981'],
              ].map(([l, v, c]) => (
                <View key={l} style={styles.sourceRow}>
                  <View style={styles.sourceHeader}>
                    <Text style={styles.sourceLabel}>{l}</Text>
                    <Text style={[styles.sourceValue, { color: c }]}>{v}%</Text>
                  </View>
                  <ProgressBar percent={v} color={c} />
                </View>
              ))}
            </Card>
          </View>
        )}

        {activeTab === 'guests' && (
          <Card>
            <SectionTitle>Invités ({GUESTS.length})</SectionTitle>
            {GUESTS.map(g => (
              <View key={g.id} style={styles.guestRow}>
                <View style={styles.guestAvatar}>
                  <Text style={styles.guestAvatarText}>
                    {g.nom.split(' ')[1]?.[0] || '?'}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.guestName}>{g.nom}</Text>
                  <Text style={styles.guestTable}>Table {g.table}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <Badge
                    text={g.statut}
                    type={g.statut === 'Confirmé' ? 'green' : g.statut === 'Décliné' ? 'red' : 'yellow'}
                  />
                  <Text style={{ fontSize: 14 }}>{g.scanne ? '✅' : '⬜'}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        {activeTab === 'budget' && (
          <View>
            <Card>
              <SectionTitle>Jauge Budgétaire</SectionTitle>
              <View style={styles.budgetRow}>
                <Text style={styles.budgetLabel}>Budget : <Text style={{ color: COLORS.textPrimary, fontWeight: '700' }}>{(event.budget / 1000000).toFixed(1)}M FCFA</Text></Text>
                <Text style={[styles.budgetPct, { color: pct > 80 ? COLORS.red : COLORS.green }]}>{pct}% consommé</Text>
              </View>
              <View style={styles.budgetTrack}>
                <View style={[styles.budgetFill, {
                  width: `${pct}%`,
                  backgroundColor: pct > 80 ? COLORS.red : pct > 60 ? COLORS.yellow : COLORS.green,
                }]} />
              </View>
              <View style={styles.budgetFooter}>
                <Text style={styles.budgetMeta}>Dépensé : {(event.depenses / 1000000).toFixed(1)}M</Text>
                <Text style={styles.budgetMeta}>Restant : {((event.budget - event.depenses) / 1000000).toFixed(1)}M</Text>
              </View>
            </Card>

            <Card>
              <SectionTitle>Postes de Dépenses</SectionTitle>
              {[
                ['Traiteur', 'Traiteur Étoile', '750 000', 'Payé'],
                ['Sonorisation', 'SoundSystem Max', '200 000', 'Payé'],
                ['Décoration', 'Décor Prestige', '500 000', 'En attente'],
                ['Photo/Vidéo', 'PhotoEvent Pro', '160 000', 'Payé'],
                ['Transport', 'Transport VIP', '265 000', 'En attente'],
              ].map(([poste, presta, montant, statut]) => (
                <View key={poste} style={styles.depenseRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.deposteName}>{poste}</Text>
                    <Text style={styles.depostePresta}>{presta}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 4 }}>
                    <Text style={styles.deposteMontant}>{montant} FCFA</Text>
                    <Badge text={statut} type={statut === 'Payé' ? 'green' : 'yellow'} />
                  </View>
                </View>
              ))}
            </Card>
          </View>
        )}

        {activeTab === 'tasks' && (
          <Card>
            <SectionTitle>Tâches Organisationnelles</SectionTitle>
            {TASKS.map(t => (
              <View key={t.id} style={styles.taskRow}>
                <View style={[styles.taskCheck, t.done && styles.taskCheckDone]}>
                  {t.done && <Text style={styles.taskCheckIcon}>✓</Text>}
                </View>
                <Text style={[styles.taskText, t.done && styles.taskTextDone]} numberOfLines={2}>
                  {t.text}
                </Text>
                <Badge
                  text={t.priorite}
                  type={t.priorite === 'haute' ? 'red' : t.priorite === 'moyenne' ? 'yellow' : 'purple'}
                />
              </View>
            ))}
          </Card>
        )}

        {activeTab === 'providers' && (
          <View style={{ gap: 12 }}>
            {PROVIDERS.slice(0, 4).map(p => (
              <Card key={p.id} style={{ marginBottom: 0 }}>
                <View style={styles.providerRow}>
                  <View style={[styles.providerEmoji, { backgroundColor: p.couleur + '22' }]}>
                    <Text style={{ fontSize: 30 }}>{p.emoji}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.providerName}>{p.name}</Text>
                    <Text style={styles.providerCat}>{p.cat} · {p.ville}</Text>
                    <Text style={styles.providerRating}>⭐ {p.note}  ({p.avis} avis)</Text>
                    <Text style={styles.providerPrice}>{p.tarif}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    padding: 16, paddingTop: 20,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 4 },
  headerMeta: { fontSize: 12, color: COLORS.textSecondary },

  tabsScroll: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  tabsContent: { paddingHorizontal: 12, paddingVertical: 8, gap: 6 },
  tab: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderColor: COLORS.accent,
  },
  tabText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '500' },
  tabTextActive: { color: COLORS.accentLight, fontWeight: '600' },

  content: { padding: 16, paddingBottom: 32 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },

  sourceRow: { marginBottom: 12 },
  sourceHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  sourceLabel: { fontSize: 12, color: COLORS.textSecondary },
  sourceValue: { fontSize: 12, fontWeight: '700' },

  guestRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.border + '60',
  },
  guestAvatar: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  guestAvatarText: { color: 'white', fontWeight: '700', fontSize: 13 },
  guestName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  guestTable: { fontSize: 11, color: COLORS.textMuted },

  budgetRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  budgetLabel: { fontSize: 13, color: COLORS.textSecondary },
  budgetPct: { fontSize: 13, fontWeight: '700' },
  budgetTrack: { height: 14, backgroundColor: COLORS.border, borderRadius: 7, overflow: 'hidden' },
  budgetFill: { height: '100%', borderRadius: 7 },
  budgetFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  budgetMeta: { fontSize: 11, color: COLORS.textMuted },

  depenseRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.border + '60',
  },
  deposteName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  depostePresta: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  deposteMontant: { fontSize: 13, fontWeight: '700', color: COLORS.accent },

  taskRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.border + '60',
  },
  taskCheck: {
    width: 20, height: 20, borderRadius: 5,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  taskCheckDone: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  taskCheckIcon: { color: 'white', fontSize: 10, fontWeight: '700' },
  taskText: { flex: 1, fontSize: 13, color: COLORS.textPrimary },
  taskTextDone: { color: COLORS.textMuted, textDecorationLine: 'line-through' },

  providerRow: { flexDirection: 'row', gap: 12 },
  providerEmoji: {
    width: 60, height: 60, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  providerName: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 2 },
  providerCat: { fontSize: 11, color: COLORS.textMuted },
  providerRating: { fontSize: 12, color: COLORS.textSecondary, marginTop: 3 },
  providerPrice: { fontSize: 12, fontWeight: '600', color: COLORS.accent, marginTop: 2 },
});
