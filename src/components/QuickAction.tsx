import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeStore } from "@/stores/useThemeStore";
import { themes } from "@/themes/theme";
import { useRouter } from "expo-router";

const QuickAction = () => {
  const theme = useThemeStore((state) => state.theme);
  const colors = themes[theme];
  const router = useRouter();
  const TouchableButtons = ({ name, title, onPressTo }) => {
    return (
      <TouchableOpacity onPress={()=>router.push(onPressTo)} style={styles.quickActionButtons}>
        <Ionicons name={name} size={24} color={colors.primary} />
        <Text style={{ color: colors.text }}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[styles.quickActionContainer, { backgroundColor: colors.card }]}
    >
      <Text
        style={{
          fontWeight: "700",
          fontSize: 24,
          color: colors.text,
          margin: 10,
        }}
      >
        Quick Actions
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableButtons name={"add"} title={"New Snippet"} onPressTo={"/main/CreateSnippet"} />

        <TouchableOpacity style={styles.quickActionButtons}>
          <AntDesign name="import" size={24} color={colors.primary} />
          <Text style={{ color: colors.text }}>Import File</Text>
        </TouchableOpacity>

        <TouchableButtons name={"person"} title={"AI Explain"} />

        <TouchableButtons name={"folder"} title={"Files"} />
      </View>
    </View>
  );
};

export default QuickAction;

const styles = StyleSheet.create({
  quickActionContainer: {
    height: 150,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 5,
  },
  quickActionButtons: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
