import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../theme';
import { StatCard, Card, ProgressBar, SectionTitle } from '../components';

export default function StatsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.title}>Statistiques & Analytics</Text>
      <Text style={styles.subtitle}>Tableau de bord analytique — tous événements confondus</Text>

      <View style={styles.statsGrid}>
        <StatCard label="Événements créés" value="12" icon="📅" change="+4" color="#8B85FF" />
        <StatCard label="Revenus totaux" value="16.6M FCFA" icon="💰" change="+23%" color="#FF6B35" />
        <StatCard label="Invités gérés" value="1 450" icon="👥" change="+312" color="#10B981" />
        <StatCard label="Prestataires actifs" value="34" icon="🤝" change="+8" color="#F59E0B" />
      </View>

      {/* Types d'événements */}
      <Card>
        <SectionTitle>Types d'événements organisés</SectionTitle>
        {[
          ['💍 Mariage', 35, '#6C63FF'],
          ['🤝 Dot', 25, '#FF6B35'],
          ['🏢 Foire', 20, '#10B981'],
          ['🎉 Festival', 15, '#F59E0B'],
          ['👶 Baptême', 5, '#EC4899'],
        ].map(([l, v, c]) => (
          <View key={l} style={styles.statRow}>
            <View style={styles.statRowHeader}>
              <Text style={styles.statRowLabel}>{l}</Text>
              <Text style={[styles.statRowValue, { color: c }]}>{v}%</Text>
            </View>
            <ProgressBar percent={v} color={c} />
          </View>
        ))}
      </Card>

      {/* Satisfaction mensuelle */}
      <Card>
        <SectionTitle>Satisfaction prestataires (6 mois)</SectionTitle>
        <View style={styles.barChart}>
          {[['Jan', 78], ['Fév', 82], ['Mar', 75], ['Avr', 88], ['Mai', 91], ['Jun', 85]].map(([m, v]) => (
            <View key={m} style={styles.barItem}>
              <Text style={styles.barValue}>{v}%</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${v}%` }]} />
              </View>
              <Text style={styles.barMonth}>{m}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Lean Canvas */}
      <Card>
        <SectionTitle>Lean Canvas — Modèle d'affaires EventLogix</SectionTitle>
        {[
          { title: 'Problème', color: COLORS.red, items: ['Fragmentation des outils', 'Prestataires introuvables', 'Zéro traçabilité'] },
          { title: 'Solution', color: COLORS.green, items: ['Plateforme 360° unifiée', 'Marketplace vérifiés', 'QR code terrain'] },
          { title: 'Proposition de valeur', color: COLORS.accent, items: ['Seul outil 360° adapté au contexte camerounais'] },
          { title: 'Segments cibles', color: COLORS.orange, items: ['Organisateurs événementiels', 'Prestataires locaux', 'Agents terrain'] },
          { title: 'Revenus', color: COLORS.yellow, items: ['Commission marketplace 5%', 'Abonnement Pro mensuel'] },
        ].map(block => (
          <View key={block.title} style={[styles.canvasBlock, { borderLeftColor: block.color }]}>
            <Text style={[styles.canvasTitle, { color: block.color }]}>{block.title}</Text>
            {block.items.map(item => (
              <Text key={item} style={styles.canvasItem}>→ {item}</Text>
            ))}
          </View>
        ))}
      </Card>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 32 },

  title: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2, marginBottom: 20 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },

  statRow: { marginBottom: 14 },
  statRowHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6,
  },
  statRowLabel: { fontSize: 13, color: COLORS.textSecondary },
  statRowValue: { fontSize: 13, fontWeight: '700' },

  barChart: {
    flexDirection: 'row', alignItems: 'flex-end',
    height: 120, gap: 8,
  },
  barItem: {
    flex: 1, alignItems: 'center', height: '100%',
  },
  barValue: { fontSize: 10, color: COLORS.textMuted, marginBottom: 4 },
  barTrack: {
    flex: 1, width: '100%',
    backgroundColor: COLORS.border,
    borderRadius: 4, overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  barMonth: { fontSize: 10, color: COLORS.textMuted, marginTop: 4 },

  canvasBlock: {
    borderLeftWidth: 3,
    paddingLeft: 12, marginBottom: 14,
  },
  canvasTitle: {
    fontSize: 12, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginBottom: 6,
  },
  canvasItem: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 3 },
});
