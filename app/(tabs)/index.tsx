import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useHeaderHeight } from '@react-navigation/elements'
import CategoryButtons from '@/components/CategoryButtons'
import Listings from '@/components/Listings'
import NewsCard from '@/components/NewsCard'
import Chart from '@/components/Chart'

// player data json
import listingData from '@/data/destinations.json'
import userlogs from '@/data/userlogs.json'

import axios from 'axios'
import { API_URL } from '@env'

interface UserType {
  id: number
  description: string
  price: number
  imageUrl: boolean
}

const Page = () => {
  const headerHeight = useHeaderHeight()
  const [team, setTeam] = useState('All')
  const [dataset, setDataset] = useState(
    userlogs.data.similarity_per_date.similarity
  )
  const [loadData, setLoadData] = useState()

  const onTeamChanged = (team: string) => {
    setTeam(team)
  }

  const fetchLoadData = async () => {
    try {
      const { data } = await axios.get(API_URL)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLoadData()
    console.log('use effect')
  }, [])
  return (
    <>
      <Stack.Screen
        options={{
          headerTintColor: Colors.black,
          headerStyle: { backgroundColor: Colors.black },
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
              <Image
                source={require('../../assets/null/github.jpeg')}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: 'gray',
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: 20,
                backgroundColor: Colors.bgColor,
                padding: 10,
                borderRadius: 10,
                shadowColor: '#171717',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
              }}
            >
              <Ionicons name="settings" size={20} color={Colors.gray} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.black }}
        pagingEnabled
      >
        <View style={[styles.container, { paddingTop: headerHeight }]}>
          <NewsCard />
          <CategoryButtons onTeamChanged={onTeamChanged} />
          <Listings listings={listingData} category={team} />
          <Chart dataset={dataset} />
        </View>
      </ScrollView>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.black,
  },
  searchSectionWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.bgColor,
    padding: 16,
    borderRadius: 10,
  },
  filterBtn: {
    backgroundColor: Colors.primartColor,
    padding: 12,
    borderRadius: 10,
    marginLeft: 20,
  },
})
