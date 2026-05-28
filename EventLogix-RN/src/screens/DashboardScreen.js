import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { COLORS } from '../theme';
import { StatCard, Card, Badge, ProgressBar, SectionTitle } from '../components';

const fmt = n => n >= 1000000 ? (n / 1000000).toFixed(1) + 'M' : n >= 1000 ? (n / 1000).toFixed(0) + 'K' : String(n);

export default function DashboardScreen({ events, tasks, navigation }) {
  const totalBudget = events.reduce((s, e) => s + e.budget, 0);
  const totalInvites = events.reduce((s, e) => s + e.invites, 0);
  const totalConfirmes = events.reduce((s, e) => s + e.confirmes, 0);
  const enCours = events.filter(e => e.statut === 'En cours').length;
  const tasksDone = tasks.filter(t => t.done).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Welcome */}
      <View style={styles.welcomeRow}>
        <View>
          <Text style={styles.welcomeTitle}>Tableau de Bord</Text>
          <Text style={styles.welcomeSub}>Bienvenue, Kombou Samuel 👋</Text>
        </View>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => navigation.navigate('NewEvent')}
          activeOpacity={0.85}
        >
          <Text style={styles.newBtnText}>＋ Nouvel Événement</Text>
        </TouchableOpacity>
      </View>

      {/* Stats grid */}
      <View style={styles.statsGrid}>
        <StatCard label="Événements actifs" value={enCours} icon="📅" change="+2" color="#8B85FF" />
        <StatCard label="Budget total" value={fmt(totalBudget) + ' FCFA'} icon="💰" change="+15%" color="#FF6B35" />
        <StatCard label="Invités confirmés" value={`${totalConfirmes}/${totalInvites}`} icon="👥" change="+43" color="#10B981" />
        <StatCard label="Tâches faites" value={`${tasksDone}/${tasks.length}`} icon="✅" change="+3" color="#F59E0B" />
      </View>

      {/* Events list */}
      <Card>
        <View style={styles.cardHeaderRow}>
          <SectionTitle style={{ marginBottom: 0 }}>Mes Événements</SectionTitle>
          <TouchableOpacity onPress={() => navigation.navigate('Events')}>
            <Text style={styles.seeAll}>Voir tout →</Text>
          </TouchableOpacity>
        </View>
        {events.slice(0, 4).map(ev => (
          <TouchableOpacity
            key={ev.id}
            style={styles.eventRow}
            onPress={() => navigation.navigate('EventDetail', { event: ev })}
            activeOpacity={0.7}
          >
            <View style={[styles.eventDot, { backgroundColor: ev.color }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.eventName}>{ev.name}</Text>
              <Text style={styles.eventMeta}>📅 {ev.date}  ·  👥 {ev.confirmes}/{ev.invites}</Text>
            </View>
            <Badge text={ev.statut} type={ev.statut === 'En cours' ? 'green' : 'yellow'} />
          </TouchableOpacity>
        ))}
      </Card>

      {/* Tasks */}
      <Card>
        <View style={styles.cardHeaderRow}>
          <SectionTitle style={{ marginBottom: 0 }}>Tâches Prioritaires</SectionTitle>
          <Badge text={`${tasks.filter(t => !t.done).length} restantes`} type="orange" />
        </View>
        {tasks.map(t => (
          <View key={t.id} style={styles.taskRow}>
            <View style={[styles.taskCheck, t.done && styles.taskCheckDone]}>
              {t.done && <Text style={{ color: 'white', fontSize: 10, fontWeight: '700' }}>✓</Text>}
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

      {/* Budget overview */}
      <Card>
        <SectionTitle>Suivi Budgétaire Global</SectionTitle>
        {events.map(ev => {
          const pct = Math.round(ev.depenses / ev.budget * 100);
          return (
            <View key={ev.id} style={styles.budgetItem}>
              <View style={styles.budgetItemHeader}>
                <Text style={styles.budgetName} numberOfLines={1}>{ev.name}</Text>
                <Text style={[styles.budgetPct, { color: ev.color }]}>{pct}%</Text>
              </View>
              <ProgressBar percent={pct} color={ev.color} />
              <View style={styles.budgetItemFooter}>
                <Text style={styles.budgetMeta}>{fmt(ev.depenses)} FCFA dépensés</Text>
                <Text style={styles.budgetMeta}>{fmt(ev.budget)} FCFA</Text>
              </View>
            </View>
          );
        })}
      </Card>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 32 },

  welcomeRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 20,
  },
  welcomeTitle: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  welcomeSub: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  newBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12,
  },
  newBtnText: { color: 'white', fontWeight: '700', fontSize: 12 },

  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14,
  },

  cardHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  seeAll: { fontSize: 13, color: COLORS.accent, fontWeight: '600' },

  eventRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.border + '80',
  },
  eventDot: { width: 10, height: 10, borderRadius: 5 },
  eventName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 2 },
  eventMeta: { fontSize: 11, color: COLORS.textMuted },

  taskRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 9,
    borderBottomWidth: 1, borderBottomColor: COLORS.border + '60',
  },
  taskCheck: {
    width: 20, height: 20, borderRadius: 5,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  taskCheckDone: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  taskText: { flex: 1, fontSize: 13, color: COLORS.textPrimary },
  taskTextDone: { color: COLORS.textMuted, textDecorationLine: 'line-through' },

  budgetItem: { marginBottom: 14 },
  budgetItemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  budgetName: { flex: 1, fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, marginRight: 8 },
  budgetPct: { fontSize: 12, fontWeight: '700' },
  budgetItemFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  budgetMeta: { fontSize: 11, color: COLORS.textMuted },
});
