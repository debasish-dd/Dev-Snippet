import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: true, }}>
      <Tabs.Screen
        name="index"
        options={{
           title: "Home",
          tabBarIcon: ({color})=>(
            <Ionicons color={color} name="home" size={24} />
          )
          }}
        
      />

      <Tabs.Screen
        name="files"
        options={{
           title: "Files", 
           tabBarIcon: ({color})=>(
            <Ionicons color={color} name="book" size={24} />
          ),
         }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
           title: "Favorites",
           tabBarIcon: ({color})=>(
            <Ionicons color={color} name="bookmark" size={24} />
          )
          }}
      />

      <Tabs.Screen
        name="settings"
        options={{ 
          title: "Settings",
         tabBarIcon: ({color})=>(
            <Ionicons color={color} name="settings" size={24} />
          )
        }}
      />
    </Tabs>
  );
}