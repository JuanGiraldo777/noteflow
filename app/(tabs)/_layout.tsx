import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="notas"
        options={{
          title: "Notas",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="note-text"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="checklists"
        options={{
          title: "Tareas",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="checkbox-marked-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: "Ideas",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="lightbulb-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="archivadas"
        options={{
          title: "Archivadas",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="archive-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/* Rutas de detalle — ocultas de la barra de tabs */}
      <Tabs.Screen name="notas/[id]" options={{ href: null }} />
      <Tabs.Screen name="checklists/[id]" options={{ href: null }} />
      <Tabs.Screen name="ideas/[id]" options={{ href: null }} />
    </Tabs>
  );
}
