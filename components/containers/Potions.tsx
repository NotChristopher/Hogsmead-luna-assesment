import React, { useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchElixirs, setSearchQuery, setFilter, setPage, setActivePotion } from '../store/slices/elixirsSlice';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Potion {
  id: string;
  name: string;
  ingredients: string[];
  effect?: string;
  difficulty: string;
  characteristics?: string;
}

interface ElixirsState {
  data: Potion[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filter: string;
}

interface IRootState {
  elixirs: ElixirsState;
}

const Potions = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { data, loading, error, searchQuery, filter } = useSelector((state: IRootState) => state.elixirs);

  useEffect(() => {
    dispatch(fetchElixirs({ searchQuery, filter }));
  }, [dispatch, searchQuery, filter]);

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text));
    dispatch(setPage(1));
  };

  const handleFilter = (ingredient: string) => {
    dispatch(setFilter(ingredient));
    dispatch(setPage(1));
  };

  const activePotion = (item: Potion) => {
    dispatch(setActivePotion(item));
    navigation.navigate('SinglePotion');
  };

  const renderItem = ({ item }: { item: Potion }) => (
    <TouchableOpacity onPress={() => activePotion(item)}>
      <View style={styles.potionItem}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Elixirs"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Text style={styles.filterText}>Popular Ingredients</Text>
      <View style={styles.filterContainer}>
        <Button title="Puffer-fish" onPress={() => handleFilter('Puffer-fish')} />
        <Button title="Wolfsbane" onPress={() => handleFilter('Wolfsbane')} />
        <Button title="Moondew" onPress={() => handleFilter('Moondew')} />
      </View>
      <Button title="Clear Filter" onPress={() => handleFilter('')} />

      {error && <Text style={styles.errorText}>{error}</Text>}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  filterText: {
    fontSize: 16,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  potionItem: {
    marginTop:10,
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  errorText: {
    color: 'red',
  },
});

export default Potions;
