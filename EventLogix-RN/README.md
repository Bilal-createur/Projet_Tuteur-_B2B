# EventLogix — React Native (Android)

Application mobile de gestion événementielle — Groupe 9 · Keyce B2

---

## ✅ Ce que tu dois avoir installé sur ta machine

### 1. Node.js (déjà installé ✓)
Vérifie la version : doit être >= 18
```
node --version
npm --version
```

### 2. Java Development Kit (JDK) 17
React Native Android nécessite le JDK 17.

**Télécharger ici :** https://www.oracle.com/java/technologies/downloads/#java17
ou via Adoptium : https://adoptium.net/temurin/releases/?version=17

Après installation, vérifie :
```
java --version
```
Tu dois voir : `java 17.x.x`

### 3. Android Studio
**Télécharger ici :** https://developer.android.com/studio

Lors de l'installation, coche :
- ✅ Android SDK
- ✅ Android SDK Platform
- ✅ Android Virtual Device (AVD)

#### Configuration du SDK dans Android Studio :
1. Ouvre Android Studio → SDK Manager
2. Sous **SDK Platforms**, coche : `Android 13 (API 33)` ou `Android 14 (API 34)`
3. Sous **SDK Tools**, coche :
   - ✅ Android SDK Build-Tools
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools

### 4. Variables d'environnement à ajouter

#### Sur Windows :
Ouvre les Variables d'environnement système et ajoute :

| Variable | Valeur (exemple) |
|---|---|
| ANDROID_HOME | C:\Users\TonNom\AppData\Local\Android\Sdk |
| JAVA_HOME | C:\Program Files\Eclipse Adoptium\jdk-17.x.x |

Et dans PATH, ajoute :
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%JAVA_HOME%\bin
```

#### Sur macOS/Linux :
Ajoute dans ton `~/.bashrc` ou `~/.zshrc` :
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk   # macOS
# export ANDROID_HOME=$HOME/Android/Sdk         # Linux
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home
```
Puis : `source ~/.zshrc`

---

## 🚀 Lancer l'application

### Étape 1 — Installer les dépendances npm
```bash
cd EventLogix-RN
npm install
```

### Étape 2 — Créer et lancer un émulateur Android
1. Ouvre **Android Studio**
2. Va dans **Device Manager** (icône téléphone en haut à droite)
3. Clique **Create Device**
4. Choisis : Pixel 6 → Next → Android 13 (API 33) → Finish
5. Lance l'émulateur avec le bouton ▶️ vert

Vérifie que l'émulateur est bien détecté :
```bash
adb devices
```
Tu dois voir quelque chose comme : `emulator-5554   device`

### Étape 3 — Lancer l'app
Dans le dossier du projet, ouvre **deux terminaux** :

**Terminal 1 — Metro bundler :**
```bash
npx react-native start
```

**Terminal 2 — Build Android :**
```bash
npx react-native run-android
```

L'app va se compiler (3–5 minutes la première fois) et s'ouvrir automatiquement sur l'émulateur.

---

## 🔄 Rechargement rapide
Une fois l'app lancée sur l'émulateur :
- Appuie sur **R** deux fois dans Metro pour recharger
- Ou secoue l'émulateur → Reload

---

## 🗂️ Structure du projet
```
EventLogix-RN/
├── App.js                  ← Point d'entrée
├── index.js
├── package.json
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js       ← Page de connexion
│   │   ├── DashboardScreen.js   ← Tableau de bord
│   │   ├── EventsScreen.js      ← Liste événements
│   │   ├── EventDetailScreen.js ← Détail avec onglets
│   │   ├── NewEventScreen.js    ← Création (3 étapes)
│   │   ├── MarketplaceScreen.js ← Prestataires
│   │   ├── QRScreen.js          ← Agent terrain QR
│   │   └── StatsScreen.js       ← Statistiques
│   ├── components/
│   │   └── index.js             ← Composants réutilisables
│   ├── navigation/
│   │   └── AppNavigator.js      ← Navigation tabs + stacks
│   ├── data/
│   │   └── index.js             ← Données mockées
│   └── theme/
│       └── index.js             ← Couleurs & polices
```

---

## ❗ Problèmes courants

**`SDK location not found`**
→ ANDROID_HOME n'est pas défini. Suis la section Variables d'environnement ci-dessus.

**`No connected devices`**
→ L'émulateur n'est pas lancé. Lance-le depuis Android Studio d'abord.

**`Java version incompatible`**
→ Installe le JDK 17 et configure JAVA_HOME.

**Metro bloqué / crash**
```bash
npx react-native start --reset-cache
```

**Build qui échoue la première fois**
→ C'est normal, le Gradle télécharge des dépendances. Patiente et relance.

---

## 🔗 Connexion au Backend (Spring Boot)

Le backend tourne sur `http://localhost:8080`.

Pour que l'émulateur Android accède au backend local, utilise l'IP Android :
- `10.0.2.2` correspond à `localhost` depuis l'émulateur Android

Dans le code, tu pourras configurer l'URL API comme :
```javascript
const API_BASE = 'http://10.0.2.2:8080/api/v1';
```

---

Groupe 9 · Keyce Informatique B2 · EventLogix 2025
