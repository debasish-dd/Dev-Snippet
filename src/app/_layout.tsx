import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="main"
        options={{
          title: "Home",
        }}
      />

      <Drawer.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
        }}
      />
    </Drawer>
  );
}