import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from '@expo-google-fonts/inter'
import { Loading } from '@/components/loading'

import Toast from 'react-native-toast-message'

export default function Layout() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  })

  if(!fontsLoaded) {
    return <Loading />
  }

  return (
    <SafeAreaView className='flex-1 bg-slate-900'>
      <Toast />
    <Slot />

    </SafeAreaView>
  )
}