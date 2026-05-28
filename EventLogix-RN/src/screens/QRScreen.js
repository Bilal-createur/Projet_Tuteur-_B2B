import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { COLORS } from '../theme';
import { StatCard, Card, SectionTitle } from '../components';
import { GUESTS } from '../data';

export default function QRScreen() {
  const [scanned, setScanned] = useState(false);
  const [count, setCount] = useState(182);
  const [lastScanned, setLastScanned] = useState(null);

  const simulateScan = () => {
    const guest = GUESTS.find(g => g.statut === 'Confirmé');
    setLastScanned(guest);
    setScanned(true);
    setCount(c => c + 1);
    setTimeout(() => setScanned(false), 4000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <View style={styles.header}>
        <Text style={styles.title}>Agent Terrain — QR Code</Text>
        <Text style={styles.subtitle}>Émargement en temps réel · Gala Corporate 2025</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatCard label="Présents" value={String(count)} icon="✅" color="#10B981" />
        <StatCard label="Attendus" value="300" icon="👥" color="#8B85FF" />
      </View>

      {/* Scanner */}
      <Card>
        <View style={styles.scannerHeader}>
          <SectionTitle style={{ marginBottom: 0 }}>Scanner QR Invité</SectionTitle>
          <View style={styles.onlineBadge}>
            <Text style={styles.onlineDot}>●</Text>
            <Text style={styles.onlineText}>En ligne</Text>
          </View>
        </View>

        <View style={styles.scannerArea}>
          {/* QR Frame */}
          <View style={styles.qrFrame}>
            <View style={[styles.qrCorner, styles.qrCornerTL]} />
            <View style={[styles.qrCorner, styles.qrCornerTR]} />
            <View style={[styles.qrCorner, styles.qrCornerBL]} />
            <View style={[styles.qrCorner, styles.qrCornerBR]} />
            <Text style={styles.qrIcon}>📱</Text>
          </View>

          <Text style={styles.scannerHint}>
            Pointez le scanner vers le QR code de l'invité
          </Text>

          <TouchableOpacity
            style={styles.scanBtn}
            onPress={simulateScan}
            activeOpacity={0.8}
          >
            <Text style={styles.scanBtnText}>📷  Simuler un scan</Text>
          </TouchableOpacity>
        </View>

        {/* Success result */}
        {scanned && lastScanned && (
          <View style={styles.successBox}>
            <Text style={{ fontSize: 28 }}>✅</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.successName}>{lastScanned.nom}</Text>
              <Text style={styles.successMeta}>Table {lastScanned.table} · Invité confirmé</Text>
              <Text style={styles.successStatus}>Émargement enregistré ✓</Text>
            </View>
          </View>
        )}
      </Card>

      {/* Offline note */}
      <View style={styles.offlineNote}>
        <Text style={styles.offlineTitle}>📡 Mode hors-ligne disponible</Text>
        <Text style={styles.offlineText}>
          Les émargements sont stockés localement (AsyncStorage) et synchronisés dès le rétablissement de la connexion via l'API REST.
        </Text>
      </View>

      {/* Last scans */}
      <Card>
        <SectionTitle>Derniers Scans</SectionTitle>
        {GUESTS.filter(g => g.scanne).map(g => (
          <View key={g.id} style={styles.scanRow}>
            <View style={styles.scanAvatar}>
              <Text style={styles.scanAvatarText}>{g.nom[3] || '?'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.scanName}>{g.nom}</Text>
              <Text style={styles.scanMeta}>Table {g.table}</Text>
            </View>
            <Text style={styles.scanDone}>✅ Scanné</Text>
          </View>
        ))}
      </Card>

      {/* Progress bar */}
      <Card>
        <SectionTitle>Progression Globale</SectionTitle>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>{count} / 300 présents</Text>
          <Text style={[styles.progressPct, { color: COLORS.green }]}>
            {Math.round(count / 300 * 100)}%
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(count / 300 * 100)}%` }]} />
        </View>
      </Card>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 32 },

  header: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },

  scannerHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  onlineBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(16,185,129,0.15)',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: 'rgba(16,185,129,0.3)',
  },
  onlineDot: { color: COLORS.green, fontSize: 10 },
  onlineText: { color: COLORS.green, fontSize: 11, fontWeight: '600' },

  scannerArea: {
    borderWidth: 2, borderColor: COLORS.accent,
    borderStyle: 'dashed', borderRadius: 16,
    padding: 28, alignItems: 'center',
    backgroundColor: 'rgba(108,99,255,0.05)',
    marginBottom: 14,
  },

  qrFrame: {
    width: 100, height: 100,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
    position: 'relative',
  },
  qrIcon: { fontSize: 50 },
  qrCorner: {
    position: 'absolute', width: 16, height: 16,
    borderColor: COLORS.accent, borderWidth: 2,
  },
  qrCornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  qrCornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  qrCornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  qrCornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },

  scannerHint: {
    fontSize: 13, color: COLORS.textSecondary,
    textAlign: 'center', marginBottom: 16,
  },
  scanBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24,
  },
  scanBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },

  successBox: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(16,185,129,0.12)',
    borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: 'rgba(16,185,129,0.3)',
  },
  successName: { fontWeight: '700', color: COLORS.textPrimary, fontSize: 14 },
  successMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  successStatus: { fontSize: 11, color: COLORS.green, marginTop: 2 },

  offlineNote: {
    backgroundColor: 'rgba(108,99,255,0.08)',
    borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: 'rgba(108,99,255,0.2)',
    marginBottom: 14,
  },
  offlineTitle: { fontSize: 13, fontWeight: '600', color: COLORS.accentLight, marginBottom: 6 },
  offlineText: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },

  scanRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: COLORS.border + '60',
  },
  scanAvatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  scanAvatarText: { color: 'white', fontWeight: '700', fontSize: 12 },
  scanName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  scanMeta: { fontSize: 11, color: COLORS.textMuted },
  scanDone: { fontSize: 11, color: COLORS.green, fontWeight: '600' },

  progressRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8,
  },
  progressLabel: { fontSize: 13, color: COLORS.textSecondary },
  progressPct: { fontSize: 13, fontWeight: '700' },
  progressTrack: { height: 10, backgroundColor: COLORS.border, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.green, borderRadius: 5 },
});
