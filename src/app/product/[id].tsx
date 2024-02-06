import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { PRODUCTS } from '@/utils/data/products'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Button } from '@/components/button'
import { Feather } from '@expo/vector-icons'
import { LinkButton } from '@/components/link-button'
import { useCartStore } from '@/stores/cart-store'

import Toast from 'react-native-toast-message'
export default function Product() {

  const {id} = useLocalSearchParams()
  
  const product = PRODUCTS.filter((item) => item.id === id)[0]

  const cartStore = useCartStore()

  function handleAddToCart() {
    cartStore.add(product)
    router.push('/')
  }

  return (
    <View className='flex-1'>
      <Image source={product.cover} className='w-full h-52' resizeMode='cover'/>

      <View className='p-5 mt-8 flex-1'>
        <Text className='font-heading text-slate-100 text-2xl'>{product.title}</Text>
        <Text className='text-lime-400 text-2xl font-heading my-2'>
          {formatCurrency(product.price)}
        </Text>


        <Text className='text-slate-400 font-body text-base leading-6 mb-6'>
          {product.description}
        </Text>

        {
          product.ingredients.map((item) => (
            <Text className='text-slate-400 font-body text-xs leading-6' key={item}>
             • {item}
            </Text>
          ))
        }
      </View>

      <View className='p-5 pb-8 gap-5'>
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