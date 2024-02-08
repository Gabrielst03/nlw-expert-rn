import { Image, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

type HeaderProps = {
  title: string;
  cartQuantityItems?: number;
}

export function Header({title, cartQuantityItems = 0} : HeaderProps) {
  return(
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image source={require('@/assets/logo.png')} className="w-32 h-6"/>
        <Text className="text-white text-lg font-heading mt-2">{title}</Text>
      </View>

    {
      cartQuantityItems > 0 && (
        <Link href={'/cart'} asChild>
  <TouchableOpacity className="relative" activeOpacity={0.8}>
    <View className="bg-lime-300 w-5 h-5 z-10 top-3 -right-4 rounded-full items-center justify-center">
        <Text className="text-slate-900 font-bold text-xs">
          {cartQuantityItems}
        </Text>
      </View>

      <Feather name="shopping-bag" color={colors.white} size={28}/>
    </TouchableOpacity>
    </Link>
      )
    }
    
    
    </View>
  )
}