import { View, Text, Button, FlatList, SectionList } from 'react-native'
import React, { useState, useRef } from 'react'
import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'

import {  CATEGORIES, MENU } from '@/utils/data/products'
import { Product } from '@/components/product'
import { Link } from 'expo-router'
import { useCartStore } from '@/stores/cart-store'

export default function Home() {

  const [category, setCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList>(null)

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

    if(sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0
      })
    }
  }

  const cartStore = useCartStore()
  const cartStoreQuantity = cartStore.products.reduce((total, product) => 
    total + product.quantity, 0
  )

  return (
   <View className="flex flex-1 bg-slate-900 pt-12">
    <Header title='Faça seu pedido' cartQuantityItems={cartStoreQuantity}/>


    <FlatList 
      data={CATEGORIES}
      keyExtractor={(item) => item}
      renderItem={({item}) => (
        <CategoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)}/>
      )}
      horizontal
      className='max-h-10 mt-5'
      contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
      showsHorizontalScrollIndicator={false}
    />

    <SectionList 
      ref={sectionListRef}
      sections={MENU}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled={false}
      renderItem={({item}) => (
       <Link href={`/product/${item.id}`} asChild>
      <Product data={item} />
       </Link> 
      )}
      renderSectionHeader={({section: {title}}) => 
      (
        <Text className='text-lg text-white font-heading mb-3'>{title}</Text>
      )}
      className='flex-1 p-5'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 100
      }}
    />

   </View>
  )
}