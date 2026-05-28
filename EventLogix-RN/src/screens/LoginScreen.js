import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, StatusBar,
} from 'react-native';
import { COLORS } from '../theme';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [role, setRole] = useState('organisateur');

  const roles = [
    { key: 'organisateur', label: 'Organisateur', icon: '🎯' },
    { key: 'prestataire', label: 'Prestataire', icon: '🤝' },
    { key: 'agent', label: 'Agent Terrain', icon: '📱' },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Logo */}
      <View style={styles.logoSection}>
        <Text style={styles.logoText}>EventLogix</Text>
        <Text style={styles.logoSub}>Plateforme Intelligente 360° de Gestion Événementielle</Text>
        <Text style={styles.logoGroup}>Groupe 9 · Keyce B2</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>

        {/* Role selector */}
        <Text style={styles.fieldLabel}>Votre rôle</Text>
        <View style={styles.roleRow}>
          {roles.map(r => (
            <TouchableOpacity
              key={r.key}
              style={[styles.roleBtn, role === r.key && styles.roleBtnActive]}
              onPress={() => setRole(r.key)}
              activeOpacity={0.8}
            >
              <Text style={styles.roleIcon}>{r.icon}</Text>
              <Text style={[styles.roleLabel, role === r.key && styles.roleLabelActive]}>
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Email */}
        <Text style={styles.fieldLabel}>Adresse email</Text>
        <TextInput
          style={styles.input}
          placeholder="vous@exemple.cm"
          placeholderTextColor={COLORS.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password */}
        <Text style={styles.fieldLabel}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor={COLORS.textMuted}
          value={pass}
          onChangeText={setPass}
          secureTextEntry
        />

        {/* Login button */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => onLogin(role)}
          activeOpacity={0.85}
        >
          <Text style={styles.loginBtnText}>Se connecter →</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => onLogin(role)}
          activeOpacity={0.8}
        >
          <Text style={styles.googleBtnText}>🔵  Continuer avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createLink}>
          <Text style={styles.createLinkText}>
            Pas encore de compte ?{' '}
            <Text style={{ color: COLORS.accent }}>Créer un compte</Text>
          </Text>
        </TouchableOpacity>

        {/* Security note */}
        <View style={styles.securityNote}>
          <Text style={styles.securityNoteText}>
            🔐 Authentification JWT sécurisée{'\n'}
            Architecture Spring Boot + PostgreSQL
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 24, paddingTop: 60, paddingBottom: 40 },

  logoSection: { alignItems: 'center', marginBottom: 32 },
  logoText: {
    fontSize: 36, fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: -1,
  },
  logoSub: {
    fontSize: 13, color: COLORS.textSecondary,
    textAlign: 'center', marginTop: 6, lineHeight: 18,
  },
  logoGroup: {
    fontSize: 11, color: COLORS.textMuted,
    marginTop: 4, letterSpacing: 1,
    textTransform: 'uppercase',
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  fieldLabel: {
    fontSize: 13, fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8, marginTop: 16,
  },

  roleRow: { flexDirection: 'row', gap: 8 },
  roleBtn: {
    flex: 1, alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg,
  },
  roleBtnActive: {
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(108,99,255,0.12)',
  },
  roleIcon: { fontSize: 20, marginBottom: 4 },
  roleLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted },
  roleLabelActive: { color: COLORS.accentLight },

  input: {
    backgroundColor: COLORS.bg,
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 10, padding: 13,
    fontSize: 14, color: COLORS.textPrimary,
  },

  loginBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 10, padding: 15,
    alignItems: 'center', marginTop: 22,
  },
  loginBtnText: { color: 'white', fontWeight: '700', fontSize: 15 },

  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { marginHorizontal: 12, color: COLORS.textMuted, fontSize: 12 },

  googleBtn: {
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 10, padding: 13,
    alignItems: 'center',
  },
  googleBtnText: { color: COLORS.textPrimary, fontWeight: '600', fontSize: 14 },

  createLink: { alignItems: 'center', marginTop: 18 },
  createLinkText: { fontSize: 13, color: COLORS.textMuted },

  securityNote: {
    marginTop: 20,
    backgroundColor: 'rgba(108,99,255,0.08)',
    borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: 'rgba(108,99,255,0.2)',
  },
  securityNoteText: {
    fontSize: 11, color: COLORS.textSecondary,
    textAlign: 'center', lineHeight: 17,
  },
});
