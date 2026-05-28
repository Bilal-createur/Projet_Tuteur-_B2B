import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { COLORS } from '../theme';
import { Badge, ProgressBar, PageHeader, PrimaryButton } from '../components';

const fmt = n => n >= 1000000 ? (n / 1000000).toFixed(1) + 'M FCFA' : n >= 1000 ? (n / 1000).toFixed(0) + 'K FCFA' : n + ' FCFA';

const FILTERS = ['Tous', 'En cours', 'Planification', 'Mariage', 'Dot', 'Foire'];

export default function EventsScreen({ events, navigation }) {
  const [filter, setFilter] = useState('Tous');

  const filtered = events.filter(e => {
    if (filter === 'Tous') return true;
    if (filter === 'En cours' || filter === 'Planification') return e.statut === filter;
    return e.type === filter.toLowerCase();
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <PageHeader
          title="Mes Événements"
          subtitle={`${events.length} événements planifiés`}
          action={
            <PrimaryButton
              title="＋ Créer"
              onPress={() => navigation.navigate('NewEvent')}
              style={{ paddingVertical: 8, paddingHorizontal: 14 }}
            />
          }
        />

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.pill, filter === f && styles.pillActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.pillText, filter === f && styles.pillTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Event cards */}
        {filtered.map(ev => {
          const pct = Math.round(ev.confirmes / ev.invites * 100);
          return (
            <TouchableOpacity
              key={ev.id}
              style={[styles.eventCard, { borderLeftColor: ev.color }]}
              onPress={() => navigation.navigate('EventDetail', { event: ev })}
              activeOpacity={0.75}
            >
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardName}>{ev.name}</Text>
                  <Text style={styles.cardDate}>📅 {ev.date}</Text>
                </View>
                <Badge text={ev.statut} type={ev.statut === 'En cours' ? 'green' : 'yellow'} />
              </View>

              <Text style={styles.cardLieu}>📍 {ev.lieu}</Text>

              <View style={styles.cardProgressSection}>
                <View style={styles.cardProgressHeader}>
                  <Text style={styles.cardProgressLabel}>Invités confirmés</Text>
                  <Text style={styles.cardProgressValue}>{ev.confirmes}/{ev.invites}</Text>
                </View>
                <ProgressBar percent={pct} color={ev.color} />
              </View>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.footerLabel}>Budget</Text>
                  <Text style={[styles.footerValue, { color: ev.color }]}>{fmt(ev.budget)}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.footerLabel}>Consommé</Text>
                  <Text style={styles.footerValue}>{Math.round(ev.depenses / ev.budget * 100)}%</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>Aucun événement pour ce filtre</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 32 },

  filtersScroll: { marginBottom: 16 },
  filtersContent: { gap: 8, paddingRight: 16 },
  pill: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1,
    borderColor: COLORS.border,
  },
  pillActive: {
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderColor: COLORS.accent,
  },
  pillText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '500' },
  pillTextActive: { color: COLORS.accentLight, fontWeight: '600' },

  eventCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    marginBottom: 14,
  },
  cardTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 6,
  },
  cardName: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 3 },
  cardDate: { fontSize: 12, color: COLORS.textMuted },
  cardLieu: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 12 },
  cardProgressSection: { marginBottom: 12 },
  cardProgressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  cardProgressLabel: { fontSize: 11, color: COLORS.textMuted },
  cardProgressValue: { fontSize: 11, fontWeight: '600', color: COLORS.textPrimary },
  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingTop: 10, borderTopWidth: 1, borderTopColor: COLORS.border + '80',
  },
  footerLabel: { fontSize: 11, color: COLORS.textMuted, marginBottom: 2 },
  footerValue: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },

  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, color: COLORS.textMuted },
});
