import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme';

// ── StatCard ──────────────────────────────────────────────
export function StatCard({ label, value, icon, change, color }) {
  return (
    <View style={[styles.statCard, { borderTopColor: color }]}>
      <View style={[styles.statIcon, { backgroundColor: color + '22' }]}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {change && (
        <Text style={[styles.statChange, { color: change.startsWith('+') ? COLORS.green : COLORS.red }]}>
          {change} ce mois
        </Text>
      )}
    </View>
  );
}

// ── Badge ─────────────────────────────────────────────────
export function Badge({ text, type = 'purple' }) {
  const colorMap = {
    purple: { bg: 'rgba(108,99,255,0.15)', text: '#8B85FF', border: 'rgba(108,99,255,0.2)' },
    green:  { bg: 'rgba(16,185,129,0.15)',  text: '#10B981', border: 'rgba(16,185,129,0.2)' },
    orange: { bg: 'rgba(255,107,53,0.15)',  text: '#FF6B35', border: 'rgba(255,107,53,0.2)' },
    yellow: { bg: 'rgba(245,158,11,0.15)',  text: '#F59E0B', border: 'rgba(245,158,11,0.2)' },
    red:    { bg: 'rgba(239,68,68,0.15)',   text: '#EF4444', border: 'rgba(239,68,68,0.2)' },
  };
  const c = colorMap[type] || colorMap.purple;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg, borderColor: c.border }]}>
      <Text style={[styles.badgeText, { color: c.text }]}>{text}</Text>
    </View>
  );
}

// ── Card ──────────────────────────────────────────────────
export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

// ── SectionTitle ──────────────────────────────────────────
export function SectionTitle({ children, style }) {
  return <Text style={[styles.sectionTitle, style]}>{children}</Text>;
}

// ── Avatar ────────────────────────────────────────────────
export function Avatar({ initials, size = 36 }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

// ── ProgressBar ───────────────────────────────────────────
export function ProgressBar({ percent, color }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${percent}%`, backgroundColor: color }]} />
    </View>
  );
}

// ── PrimaryButton ─────────────────────────────────────────
export function PrimaryButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.primaryBtn, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.primaryBtnText}>{title}</Text>
    </TouchableOpacity>
  );
}

// ── OutlineButton ─────────────────────────────────────────
export function OutlineButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.outlineBtn, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.outlineBtnText}>{title}</Text>
    </TouchableOpacity>
  );
}

// ── PageHeader ────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }) {
  return (
    <View style={styles.pageHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.pageTitle}>{title}</Text>
        {subtitle ? <Text style={styles.pageSubtitle}>{subtitle}</Text> : null}
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderTopWidth: 3,
    borderTopColor: COLORS.accent,
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1,
    minWidth: '45%',
  },
  statIcon: {
    width: 40, height: 40,
    borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24, fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12, color: COLORS.textSecondary,
  },
  statChange: {
    fontSize: 11, marginTop: 4,
  },
  badge: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11, fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16, fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  avatar: {
    backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: {
    color: 'white', fontWeight: '700',
  },
  progressTrack: {
    height: 6, backgroundColor: COLORS.border,
    borderRadius: 3, overflow: 'hidden',
  },
  progressFill: {
    height: '100%', borderRadius: 3,
  },
  primaryBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: 'white', fontWeight: '700', fontSize: 14,
  },
  outlineBtn: {
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  outlineBtnText: {
    color: COLORS.textPrimary, fontWeight: '600', fontSize: 14,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24, fontWeight: '800',
    color: COLORS.textPrimary,
  },
  pageSubtitle: {
    fontSize: 13, color: COLORS.textSecondary,
    marginTop: 3,
  },
});
