import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useSnippetStore } from "@/stores/useSnippetStore";
import SnippetCard from "@/components/SnippetCard";
import { useRouter } from "expo-router";
import { useThemeStore } from "@/stores/useThemeStore";
import { themes } from "@/themes/theme";

const favorites = () => {
  const loadBookmarkedSnippets = useSnippetStore(
    (state) => state.loadBookmarkedSnippets,
  );

  const bookmarkedSnippets = useSnippetStore(
    (state) => state.bookmarkedSnippets,
  );

  useEffect(() => {
    loadBookmarkedSnippets();
  }, []);

  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);
    const colors = themes[theme];
  return (
    <View style={{backgroundColor: colors.background}}>
      <FlatList
        data={bookmarkedSnippets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/main/snippets/${item.id}`)}
          >
            <SnippetCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default favorites;

const styles = StyleSheet.create({});
