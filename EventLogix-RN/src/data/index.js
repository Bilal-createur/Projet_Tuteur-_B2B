export const EVENTS = [
  { id: 1, name: 'Gala Corporate 2025', type: 'foire', date: '28 Juin 2025', lieu: 'Yaoundé, Hilton', invites: 300, confirmes: 210, budget: 2500000, depenses: 1875000, statut: 'En cours', color: '#6C63FF' },
  { id: 2, name: 'Cérémonie Dot Ngono', type: 'dot', date: '12 Juil 2025', lieu: 'Douala, Akwa', invites: 120, confirmes: 98, budget: 800000, depenses: 520000, statut: 'Planification', color: '#FF6B35' },
  { id: 3, name: 'Baptême Junior Kamga', type: 'bapteme', date: '20 Juil 2025', lieu: 'Bafoussam', invites: 80, confirmes: 65, budget: 350000, depenses: 180000, statut: 'Planification', color: '#10B981' },
  { id: 4, name: 'Forum StartUp Cmr', type: 'festival', date: '15 Août 2025', lieu: 'Yaoundé, Palais Congrès', invites: 500, confirmes: 320, budget: 5000000, depenses: 2100000, statut: 'En cours', color: '#F59E0B' },
  { id: 5, name: 'Mariage Biya–Ateba', type: 'mariage', date: '3 Sep 2025', lieu: 'Kribi, Hôtel Dérès', invites: 450, confirmes: 200, budget: 8000000, depenses: 3200000, statut: 'Planification', color: '#EC4899' },
];

export const PROVIDERS = [
  { id: 1, name: 'Traiteur Étoile', cat: 'Traiteur', emoji: '🍽️', note: 4.8, avis: 146, tarif: '25 000 FCFA/pers', ville: 'Yaoundé', dispo: true, couleur: '#6C63FF' },
  { id: 2, name: 'DJ VibeKing', cat: 'Animation', emoji: '🎵', note: 4.7, avis: 89, tarif: '150 000 FCFA/soir', ville: 'Douala', dispo: true, couleur: '#FF6B35' },
  { id: 3, name: 'PhotoEvent Pro', cat: 'Photo/Vidéo', emoji: '📸', note: 4.9, avis: 203, tarif: '80 000 FCFA/jour', ville: 'Yaoundé', dispo: false, couleur: '#10B981' },
  { id: 4, name: 'Décor Prestige', cat: 'Décoration', emoji: '💐', note: 4.6, avis: 67, tarif: '500 000 FCFA/événement', ville: 'Douala', dispo: true, couleur: '#F59E0B' },
  { id: 5, name: 'SoundSystem Max', cat: 'Sonorisation', emoji: '🔊', note: 4.5, avis: 112, tarif: '200 000 FCFA/jour', ville: 'Bafoussam', dispo: true, couleur: '#EC4899' },
  { id: 6, name: 'Transport VIP', cat: 'Transport', emoji: '🚌', note: 4.4, avis: 54, tarif: '50 000 FCFA/véhicule', ville: 'Yaoundé', dispo: true, couleur: '#8B5CF6' },
];

export const GUESTS = [
  { id: 1, nom: 'M. Kamga Pierre', table: 'VIP-01', statut: 'Confirmé', scanne: true },
  { id: 2, nom: 'Mme Ateba Rose', table: 'VIP-02', statut: 'Confirmé', scanne: true },
  { id: 3, nom: 'Dr. Mballa Jean', table: 'A-05', statut: 'Confirmé', scanne: false },
  { id: 4, nom: 'Mme Ngo Bassa', table: 'B-12', statut: 'En attente', scanne: false },
  { id: 5, nom: 'M. Fonkou Alain', table: 'A-08', statut: 'Confirmé', scanne: true },
  { id: 6, nom: 'Mme Djomo Lucie', table: 'C-03', statut: 'Décliné', scanne: false },
];

export const TASKS = [
  { id: 1, text: 'Confirmer traiteur principal', done: true, priorite: 'haute' },
  { id: 2, text: 'Envoyer invitations numériques QR', done: true, priorite: 'haute' },
  { id: 3, text: 'Réserver sono & éclairage', done: false, priorite: 'haute' },
  { id: 4, text: 'Valider plan de salle', done: false, priorite: 'moyenne' },
  { id: 5, text: 'Brief agents terrain (x5)', done: false, priorite: 'moyenne' },
  { id: 6, text: 'Tester module QR scan', done: true, priorite: 'basse' },
];

export const EVENT_TYPES = [
  { key: 'mariage', label: 'Mariage', icon: '💍', modules: ['Liste invités', 'Gestion cadeaux', 'Planning cérémonie', 'Module Dot'] },
  { key: 'dot', label: 'Cérémonie Dot', icon: '🤝', modules: ['Calculateur Dot', 'Liste biens', 'Protocole négociation', 'Gestion délégations'] },
  { key: 'bapteme', label: 'Baptême', icon: '👶', modules: ['Liste invités', 'Buffet', 'Planning religieux'] },
  { key: 'foire', label: 'Foire/Salon', icon: '🏢', modules: ['Gestion stands', 'Line-up exposants', 'Badge QR Pass', 'Plan salle'] },
  { key: 'festival', label: 'Festival', icon: '🎉', modules: ['Billetterie', "Line-up artistes", 'Contrôle accès QR', 'Gestion scène'] },
  { key: 'autre', label: 'Autre', icon: '📅', modules: ['Modules personnalisés'] },
];
