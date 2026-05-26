import { useThemeStore } from "@/stores/useThemeStore";
import { themes } from "@/themes/theme";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QuickAction from "@/components/QuickAction";
import { useEffect } from "react";

import { initDatabase } from "@/database/schema";
import { useSnippetStore } from "@/stores/useSnippetStore";
import { db } from "@/database/db";
import { useRouter } from "expo-router";

export default function Index() {
  const theme = useThemeStore((state) => state.theme);
  const colors = themes[theme];

  useEffect(() => {
    initDatabase();
  }, []);

    const { snippets, loadSnippets, addSnippet, removeSnippet } =
    useSnippetStore();

    useEffect(() => {
    loadSnippets();
  }, []);
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* quick actions section  */}
      <QuickAction />

      {/* snippets list section  */}
      <View style={{ flex: 1, padding: 16 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Your Snippets
        </Text>
        {snippets.length === 0 ? (
          <Text style={{ color: colors.text, fontSize: 16 }}>
            No snippets yet. Create one using the button above!
          </Text>
        ) : (
          <FlatList
            data={snippets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/main/snippets/${item.id}`)}
              >
                <View
                  style={{
                    backgroundColor: colors.card,
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                      fontWeight: "600",
                      marginBottom: 4,
                    }}
                  >
                    {item.title} ({item.language})
                  </Text>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                    numberOfLines={2}
                  >
                    {item.code}
                  </Text>
                  <Button
                    title="Delete"
                    color={colors.primary}
                    onPress={() => removeSnippet(item.id)}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
