import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "@/stores/useThemeStore";
import { themes } from "@/themes/theme";

const ProfileScreen = () => {

  const theme = useThemeStore((state) => state.theme);
  const colors = themes[theme];
  return (
    <SafeAreaView>
      <View style={{}}></View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
