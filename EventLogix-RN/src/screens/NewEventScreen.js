import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, Alert,
} from 'react-native';
import { COLORS } from '../theme';
import { Card, Badge, SectionTitle, PrimaryButton, OutlineButton } from '../components';
import { EVENT_TYPES } from '../data';

export default function NewEventScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [form, setForm] = useState({
    name: '', date: '', lieu: '', budget: '', capacite: '',
  });

  const selectedTypeDef = EVENT_TYPES.find(t => t.key === selectedType);

  const handleCreate = () => {
    Alert.alert('✅ Succès', 'Événement créé avec succès !', [
      { text: 'OK', onPress: () => navigation.navigate('Events') },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.title}>Créer un Événement</Text>
      <Text style={styles.subtitle}>Les modules s'adaptent selon votre type d'événement</Text>

      {/* Step indicator */}
      <View style={styles.stepsRow}>
        {['Type', 'Infos', 'Modules'].map((s, i) => (
          <React.Fragment key={s}>
            <View style={styles.stepItem}>
              <View style={[
                styles.stepCircle,
                step > i + 1 && styles.stepCircleDone,
                step === i + 1 && styles.stepCircleActive,
              ]}>
                <Text style={styles.stepCircleText}>
                  {step > i + 1 ? '✓' : String(i + 1)}
                </Text>
              </View>
              <Text style={[styles.stepLabel, step === i + 1 && styles.stepLabelActive]}>{s}</Text>
            </View>
            {i < 2 && (
              <View style={[styles.stepLine, step > i + 1 && styles.stepLineDone]} />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* ── STEP 1 : Type ── */}
      {step === 1 && (
        <Card>
          <SectionTitle>Quel type d'événement ?</SectionTitle>
          <View style={styles.typeGrid}>
            {EVENT_TYPES.map(t => (
              <TouchableOpacity
                key={t.key}
                style={[styles.typeCard, selectedType === t.key && styles.typeCardActive]}
                onPress={() => setSelectedType(t.key)}
                activeOpacity={0.7}
              >
                <Text style={styles.typeIcon}>{t.icon}</Text>
                <Text style={[styles.typeLabel, selectedType === t.key && styles.typeLabelActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedTypeDef && (
            <View style={styles.modulesPreview}>
              <Text style={styles.modulesPreviewTitle}>
                ⚡ Modules activés pour « {selectedTypeDef.label} »
              </Text>
              <View style={styles.modulesBadgesRow}>
                {selectedTypeDef.modules.map(m => (
                  <Badge key={m} text={m} type="purple" />
                ))}
              </View>
            </View>
          )}

          <PrimaryButton
            title="Continuer →"
            onPress={() => selectedType && setStep(2)}
            style={{ opacity: selectedType ? 1 : 0.4, marginTop: 16 }}
          />
        </Card>
      )}

      {/* ── STEP 2 : Infos ── */}
      {step === 2 && (
        <Card>
          <SectionTitle>Informations de l'événement</SectionTitle>

          <Text style={styles.fieldLabel}>Nom de l'événement</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Mariage Biya–Ateba"
            placeholderTextColor={COLORS.textMuted}
            value={form.name}
            onChangeText={v => setForm({ ...form, name: v })}
          />

          <Text style={styles.fieldLabel}>Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 15 Août 2025"
            placeholderTextColor={COLORS.textMuted}
            value={form.date}
            onChangeText={v => setForm({ ...form, date: v })}
          />

          <Text style={styles.fieldLabel}>Lieu / Adresse</Text>
          <TextInput
            style={styles.input}
            placeholder="Yaoundé, Cameroun"
            placeholderTextColor={COLORS.textMuted}
            value={form.lieu}
            onChangeText={v => setForm({ ...form, lieu: v })}
          />

          <Text style={styles.fieldLabel}>Capacité maximale</Text>
          <TextInput
            style={styles.input}
            placeholder="300 personnes"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            value={form.capacite}
            onChangeText={v => setForm({ ...form, capacite: v })}
          />

          <Text style={styles.fieldLabel}>Budget prévisionnel (FCFA)</Text>
          <TextInput
            style={styles.input}
            placeholder="1 500 000"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            value={form.budget}
            onChangeText={v => setForm({ ...form, budget: v })}
          />

          <View style={styles.btnRow}>
            <OutlineButton title="← Retour" onPress={() => setStep(1)} style={{ flex: 1 }} />
            <PrimaryButton title="Continuer →" onPress={() => setStep(3)} style={{ flex: 1 }} />
          </View>
        </Card>
      )}

      {/* ── STEP 3 : Modules ── */}
      {step === 3 && selectedTypeDef && (
        <Card>
          <SectionTitle>
            {selectedTypeDef.icon} Modules activés — {selectedTypeDef.label}
          </SectionTitle>

          {selectedTypeDef.modules.map(m => (
            <View key={m} style={styles.moduleRow}>
              <View style={styles.moduleActiveDot} />
              <Text style={styles.moduleName}>{m}</Text>
              <Badge text="Actif" type="green" />
            </View>
          ))}

          <View style={styles.apiNote}>
            <Text style={styles.apiNoteTitle}>📡 API REST — Endpoint de création</Text>
            <Text style={styles.apiNoteCode}>
              POST /api/v1/evenements{'\n'}
              Authorization: Bearer [JWT_TOKEN]{'\n'}
              Spring Boot + PostgreSQL JSONB
            </Text>
          </View>

          <View style={styles.btnRow}>
            <OutlineButton title="← Retour" onPress={() => setStep(2)} style={{ flex: 1 }} />
            <TouchableOpacity style={[styles.createBtn, { flex: 1 }]} onPress={handleCreate} activeOpacity={0.85}>
              <Text style={styles.createBtnText}>🚀 Créer l'événement</Text>
            </TouchableOpacity>
          </View>
        </Card>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 40 },

  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 24 },

  stepsRow: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 24,
  },
  stepItem: { alignItems: 'center', gap: 4 },
  stepCircle: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  stepCircleActive: { backgroundColor: COLORS.accent },
  stepCircleDone: { backgroundColor: COLORS.green },
  stepCircleText: { color: 'white', fontWeight: '700', fontSize: 12 },
  stepLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '500' },
  stepLabelActive: { color: COLORS.textPrimary, fontWeight: '600' },
  stepLine: {
    flex: 1, height: 2,
    backgroundColor: COLORS.border, marginBottom: 14,
  },
  stepLineDone: { backgroundColor: COLORS.green },

  typeGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16,
  },
  typeCard: {
    width: '30%', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 8,
    borderRadius: 12, borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg,
  },
  typeCardActive: {
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(108,99,255,0.1)',
  },
  typeIcon: { fontSize: 26, marginBottom: 6 },
  typeLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, textAlign: 'center' },
  typeLabelActive: { color: COLORS.accentLight },

  modulesPreview: {
    backgroundColor: 'rgba(108,99,255,0.08)',
    borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: 'rgba(108,99,255,0.2)',
  },
  modulesPreviewTitle: {
    fontSize: 12, fontWeight: '600', color: COLORS.accentLight, marginBottom: 10,
  },
  modulesBadgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },

  fieldLabel: {
    fontSize: 13, fontWeight: '600',
    color: COLORS.textSecondary, marginBottom: 7, marginTop: 14,
  },
  input: {
    backgroundColor: COLORS.bg,
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 10, padding: 12,
    fontSize: 14, color: COLORS.textPrimary,
  },

  btnRow: { flexDirection: 'row', gap: 10, marginTop: 20 },

  moduleRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: COLORS.border + '60',
  },
  moduleActiveDot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: COLORS.green,
  },
  moduleName: { flex: 1, fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },

  apiNote: {
    backgroundColor: 'rgba(108,99,255,0.06)',
    borderRadius: 10, padding: 12, marginTop: 14,
    borderWidth: 1, borderColor: 'rgba(108,99,255,0.2)',
  },
  apiNoteTitle: {
    fontSize: 12, fontWeight: '600', color: COLORS.accentLight, marginBottom: 6,
  },
  apiNoteCode: {
    fontSize: 11, color: COLORS.textSecondary,
    fontFamily: 'monospace', lineHeight: 18,
  },

  createBtn: {
    backgroundColor: COLORS.orange,
    borderRadius: 10, paddingVertical: 12, alignItems: 'center',
  },
  createBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
});
