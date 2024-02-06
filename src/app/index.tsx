import { View, Text, Button, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'

import {  CATEGORIES } from '@/utils/data/products'

export default function Home() {

  const [category, setCategory] = useState(CATEGORIES[0])

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
  }

  return (
   <View className="flex flex-1 bg-slate-900 pt-12">
    <Header title='Cardápio' cartQuantityItems={5}/>


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

   </View>
  )
}