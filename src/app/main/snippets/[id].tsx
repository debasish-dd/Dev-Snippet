import { db } from "@/database/db";
import { useThemeStore } from "@/stores/useThemeStore";
import { themes } from "@/themes/theme";
import { Snippet } from "@/types/snippet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailedSnippetScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);
  const colors = themes[theme];
  const [data, setData] = useState<Snippet | null>(null);

  const getSnippetById = async (snippetId: number): Promise<void> => {
    const result = await db.getFirstAsync<Snippet>(
      `
        SELECT *
        FROM snippets
        WHERE id = ?
      `,
      [snippetId],
    );

    setData(result ?? null);
  };

  useEffect(() => {
    if (id) {
      getSnippetById(Number(id));
    }
  }, [id]);

  const handleCopy = async () => {
    try {
      await Share.share({
        message: data?.code ?? "",
        title: data?.title,
      });
    } catch (error) {
      Alert.alert("Unable to share snippet", "Please try again.");
    }
  };

  if (!data) {
    return (
      <SafeAreaView
        style={[styles.emptyContainer, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.emptyText, { color: colors.text }]}>
          No data found for this snippet.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.headerCard, { backgroundColor: colors.card }]}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: colors.text }]}>
              {data.title}
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.backButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>Back</Text>
            </Pressable>
          </View>

          <Text style={[styles.subtitle, { color: colors.text }]}>
            A clean, readable view for your code snippet.
          </Text>

          <View style={styles.chipRow}>
            <View
              style={[
                styles.chip,
                { backgroundColor: theme === "dark" ? "#2c2c2c" : "#e2e8f0" },
              ]}
            >
              <Text style={[styles.chipText, { color: colors.text }]}>
                {data.language}
              </Text>
            </View>
            <View
              style={[
                styles.chip,
                { backgroundColor: theme === "dark" ? "#2c2c2c" : "#e2e8f0" },
              ]}
            >
              <Text style={[styles.chipText, { color: colors.text }]}>
                Created {new Date(data.created_at).toLocaleDateString()}
              </Text>
            </View>
            <View
              style={[
                styles.chip,
                { backgroundColor: theme === "dark" ? "#2c2c2c" : "#e2e8f0" },
              ]}
            >
              <Text style={[styles.chipText, { color: colors.text }]}>
                {data.code.length} chars
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.codeCard, { backgroundColor: colors.card }]}>
          <View style={styles.codeHeader}>
            <Text style={[styles.codeLabel, { color: colors.text }]}>Code</Text>
            <Pressable
              style={({ pressed }) => [
                styles.copyButton,
                { borderColor: colors.primary },
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleCopy}
            >
              <Text style={[styles.copyButtonText, { color: colors.primary }]}>
                Copy
              </Text>
            </Pressable>
          </View>

          <View style={styles.codeBlock}>
            <Text style={[styles.codeText, { color: colors.text }]}>
              {data.code}
            </Text>
          </View>
        </View>

        <View style={[styles.footerCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.footerTitle, { color: colors.text }]}>
            Details
          </Text>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.text }]}>
              Language
            </Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {data.language}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.text }]}>
              Created
            </Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {new Date(data.created_at).toLocaleString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.text }]}>
              Character count
            </Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {data.code.length}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailedSnippetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerCard: {
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    flex: 1,
    marginRight: 12,
  },
  backButton: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  backText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4b5563",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6b7280",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 18,
  },
  chip: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },
  codeCard: {
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  codeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  copyButton: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
  codeBlock: {
    borderRadius: 18,
    backgroundColor: "rgba(15,23,42,0.08)",
    padding: 18,
  },
  codeText: {
    fontFamily: "Courier",
    fontSize: 14,
    lineHeight: 22,
    color: "#111827",
  },
  footerCard: {
    borderRadius: 22,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148,163,184,0.18)",
  },
  detailLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
  },
});
