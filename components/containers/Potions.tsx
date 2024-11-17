import React, { useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchElixirs, setSearchQuery, setFilter, setPage, setActivePotion } from '../store/slices/elixirsSlice';
import { useNavigation } from '@react-navigation/native';

const Potions = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data, loading, error, searchQuery, filter } = useSelector((state) => state.elixirs);

 useEffect(() => {
    dispatch(fetchElixirs({ searchQuery, filter}));
  }, [dispatch, searchQuery, filter]);

  const handleSearch = (text) => {
    dispatch(setSearchQuery(text));
    dispatch(setPage(1)); 
  };

  const handleFilter = (ingredient) => {
    dispatch(setFilter(ingredient));
    dispatch(setPage(1)); 
  };
  
  const activePotion =(item) => {
    dispatch(setActivePotion(item));
    navigation.navigate('SinglePotion')
  };



  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() =>activePotion(item)}>
    <View style={{ marginBottom: 20, border: 'solid', }}>
        <Text >{item.name} </Text>
    </View>
    </TouchableOpacity>
  );
 
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Search Input */}
      <TextInput
        placeholder="Search Elixirs"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Text>Popular Ingredients</Text>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>

        <Button title="Puffer-fish" onPress={() => handleFilter('Puffer-fish')} />
        <Button title="Wolfsbane" onPress={() => handleFilter('Wolfsbane')} />
        <Button title="Moondew" onPress={() => handleFilter('Moondew')} />

      </View>
      <Button title="Clear Filter" onPress={() => handleFilter('')} />

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        /> 
    </View>
  );
};

export default Potions;
