import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useThemeStore } from '@/stores/useThemeStore';
import { themes } from '@/themes/theme';

const SnippetCard = ({item}) => {
    const theme = useThemeStore((state) => state.theme);
      const colors = themes[theme];
  return (
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
                       numberOfLines={3}
                     >
                       {item.code}
                     </Text>
                   </View>
  )
}

export default SnippetCard

const styles = StyleSheet.create({})