import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { PRODUCTS } from '@/utils/data/products'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Button } from '@/components/button'
import { Feather } from '@expo/vector-icons'
import { LinkButton } from '@/components/link-button'
import { useCartStore } from '@/stores/cart-store'
import { Redirect } from 'expo-router'

import Toast from 'react-native-toast-message'
export default function Product() {

  const {id} = useLocalSearchParams()
  
  const product = PRODUCTS.find((item) => item.id === id)

  const cartStore = useCartStore()

  function handleAddToCart() {
    cartStore.add(product!)
    router.push('/')
  }


  if(!product) {
    return <Redirect href={'/'}/>
  }

  return (
    <View className='flex-1'>
      <Image source={product.cover} className='w-full h-64' resizeMode='cover'/>

      <ScrollView className='p-5 mt-8 h-full pb-12'>
        <Text className='font-heading text-slate-100 text-2xl'>{product.title}</Text>
        <Text className='text-lime-400 text-2xl font-heading my-2'>
          {formatCurrency(product.price)}
        </Text>


        <Text className='text-slate-400 font-body text-base leading-6 mb-6'>
          {product.description}
        </Text>

        {
          product.ingredients.map((item) => (
            <Text className='text-slate-400 font-body text-xs leading-[14px]' key={item}>
             • {item}
            </Text>
          ))
        }
      </ScrollView>

      <View className='p-5 pb-8 gap-3'>
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name='plus-circle' size={20}/>
          </Button.Icon>
          <Button.Text>Adicionar ao Pedido</Button.Text>
        </Button>

        <Link href={'/'} className='text-slate-100 text-center text-base font-body'>Voltar ao Cardápio</Link>

      </View>
    </View>
  )
}