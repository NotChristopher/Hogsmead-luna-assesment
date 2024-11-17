import * as React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';

const SinglePotion = () => {
  const { potion } = useSelector((state: any) => state.elixirs);
  const arr = potion.ingredients;

  const renderItem = ({ item }: { item: { name: string } }) => (
    <Text style={styles.ingredientText}>
      {item.name}
    </Text>
  );

  return (
    <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../../assets/images/potion.png')} />
      <Text style={styles.potionName}>{potion.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Effect: {potion.effect ? potion.effect : 'unknown'}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Difficulty: {potion.difficulty}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Characteristics: {potion.characteristics ? potion.characteristics : 'unknown'}
        </Text>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsText}>
          Ingredients
        </Text>
        {arr.length > 0 ? (
          <FlatList
            data={arr}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
        ) : (
          <Text style={styles.unknownText}>unknown</Text>
        )}
      </View>
      {/*<ShareButton />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  potionName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  ingredientsContainer: {
    marginTop: 20,
  },
  ingredientsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#444',
  },
  unknownText: {
    fontStyle: 'italic',
    color: '#888',
  },
});

export default SinglePotion;
