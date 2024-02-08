import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { ProductCartProps, useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { Feather } from '@expo/vector-icons'
import { LinkButton } from '@/components/link-button'
import { Link, useNavigation } from 'expo-router'

export default function Cart() {

  const cartStore = useCartStore()

  const [address, setAdress] = useState('')

  const navigation = useNavigation()

  const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar'
      },
      {
        text: 'Remover',
        onPress: () => cartStore.remove(product.id)
      }
    ])
  }

  const phone_number = "5571991488264"

  function handleOrder() {
    if(address.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe os dados da entrega')
    }

    const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

    const message = `
      ✅ NOVO PEDIDO ✅

      \n🏠 Entregar em: ${address}

      ${products}

      \n💸 Valor Total: ${total}
    `

    Linking.openURL(`http://api.whatsapp.com/send?phone=${phone_number}&text=${message}`)

    cartStore.clear()
    navigation.goBack()
  }

  return (
    <View className='flex-1 pt-8 pb-8'>
      <Header title='Seu carrinho' />

      <ScrollView className='flex-1 px-5'>
      {
        cartStore.products.length > 0 ? (
          <View className='py-5 flex-1 border-b border-b-slate-700'>
          {
            cartStore.products.map((product) => (
              <TouchableOpacity key={product.id} className='flex-row gap-2 mt-2' onPress={() => handleProductRemove(product)}>
                <Image source={product.thumbnail} className='rounded-lg w-20 h-20'/>
                <View className='flex-col'>
                  <Text className='text-base text-white font-medium'>{product.title}</Text>
                  <Text className='w-[270px] text-slate-500 leading-5'>Quantidade: x{product.quantity}</Text>
                  <Text className='text-lime-400 text-xs'>Subtotal: {formatCurrency(product.price * product.quantity)}</Text>
                </View>
                <Text></Text>
              </TouchableOpacity>
            ))
          }
        </View>
        ) : (
          <Text className='font-body text-slate-400 text-center my-8'>
          Seu carrinho está vazio
        </Text>
        )
      }

     

      <View className='flex-row gap-2 items-center mt-5 mb-4'>
        <Text className='text-white text-xl font-subtitle'>Total: </Text>
        <Text className='text-lime-400 text-2xl font-heading'>{total}</Text>
      </View>

      <Input onChangeText={(text) => setAdress(text)} placeholder='Coloque seu CEP, informações de entrega e etc...'/>

      </ScrollView>
    
      <View className='p-5 gap-5'>
        <Button onPress={handleOrder}>
          
          <Button.Text>
            Enviar Pedido
          </Button.Text>
          <Button.Icon>
            <Feather name='arrow-right-circle' size={20}/>
          </Button.Icon>
        </Button>

        <Link href={'/'} className='text-slate-100 text-center text-base font-body'>Voltar ao Cardápio</Link>


      </View>

    </View>
  )
}