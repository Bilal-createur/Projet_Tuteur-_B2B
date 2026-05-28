import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { COLORS } from '../theme';

import DashboardScreen from '../screens/DashboardScreen';
import EventsScreen from '../screens/EventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import QRScreen from '../screens/QRScreen';
import StatsScreen from '../screens/StatsScreen';
import NewEventScreen from '../screens/NewEventScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ── Stack pour les écrans Events ──────────────────────────
function EventsStack({ events }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
        cardStyle: { backgroundColor: COLORS.bg },
      }}
    >
      <Stack.Screen name="Events" options={{ title: 'Mes Événements' }}>
        {props => <EventsScreen {...props} events={events} />}
      </Stack.Screen>
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ title: 'Détail Événement' }}
      />
      <Stack.Screen
        name="NewEvent"
        component={NewEventScreen}
        options={{ title: 'Créer un Événement' }}
      />
    </Stack.Navigator>
  );
}

// ── Stack pour le Dashboard ───────────────────────────────
function DashboardStack({ events, tasks }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
        cardStyle: { backgroundColor: COLORS.bg },
      }}
    >
      <Stack.Screen name="Dashboard" options={{ title: 'Tableau de Bord' }}>
        {props => <DashboardScreen {...props} events={events} tasks={tasks} />}
      </Stack.Screen>
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ title: 'Détail Événement' }}
      />
      <Stack.Screen
        name="NewEvent"
        component={NewEventScreen}
        options={{ title: 'Créer un Événement' }}
      />
    </Stack.Navigator>
  );
}

// ── Main Tab Navigator ────────────────────────────────────
export default function AppNavigator({ events, tasks, userRole, onLogout }) {
  const tabIcon = (emoji, focused) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ focused }) => tabIcon('⚡', focused),
        }}
      >
        {props => <DashboardStack {...props} events={events} tasks={tasks} />}
      </Tab.Screen>

      <Tab.Screen
        name="EventsTab"
        options={{
          tabBarLabel: 'Événements',
          tabBarIcon: ({ focused }) => tabIcon('📅', focused),
        }}
      >
        {props => <EventsStack {...props} events={events} />}
      </Tab.Screen>

      <Tab.Screen
        name="MarketplaceTab"
        component={MarketplaceScreen}
        options={{
          tabBarLabel: 'Marketplace',
          tabBarIcon: ({ focused }) => tabIcon('🛍️', focused),
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.surface },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: { fontWeight: '700' },
          title: 'Marketplace',
        }}
      />

      {userRole === 'agent' || true ? (
        <Tab.Screen
          name="QRTab"
          component={QRScreen}
          options={{
            tabBarLabel: 'QR Scan',
            tabBarIcon: ({ focused }) => tabIcon('📱', focused),
            headerShown: true,
            headerStyle: { backgroundColor: COLORS.surface },
            headerTintColor: COLORS.textPrimary,
            headerTitleStyle: { fontWeight: '700' },
            title: 'Agent Terrain',
          }}
        />
      ) : null}

      <Tab.Screen
        name="StatsTab"
        component={StatsScreen}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ focused }) => tabIcon('📊', focused),
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.surface },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: { fontWeight: '700' },
          title: 'Statistiques',
        }}
      />
    </Tab.Navigator>
  );
}
