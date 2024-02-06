import { ActivityIndicator, View, Text } from "react-native";

import colors from 'tailwindcss/colors'

export function Loading() {
  return(
    <View className="flex-1 items-center justify-center bg-slate-900">
      <ActivityIndicator color={colors.white} size={24}/>
      <Text className="text-white mt-2">Aguarde...</Text>
    </View>
  )
}