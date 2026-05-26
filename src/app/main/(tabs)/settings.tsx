import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useThemeStore } from '@/stores/useThemeStore';
import { themes } from '@/themes/theme';

const settings = () => {
  const theme = useThemeStore((state) => state.theme);
  const colors = themes[theme];

  return (
    <View>
      <Text>settings</Text>
    </View>
  )
}

export default settings

const styles = StyleSheet.create({})