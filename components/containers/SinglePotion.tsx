import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { useSelector } from 'react-redux';
import ShareButton from '../ui/styled/ShareButton';

const SinglePotion = () => {
    const {potion} = useSelector(state => state.elixirs);
    const arr = potion.ingredients;
    console.log(arr);

    const renderItem = ({ item } : any) => (

            <Text >
            {item.name}
            </Text>


      );
    return(
        <View>
            <Text>{potion.name}</Text>
            <View>
                <Text>
                    Effeft : {potion.effect ? potion.effect : 'unknown' }
                </Text>
            </View>
            <View>
                <Text>
                    Difficulty : {potion.difficulty}
                </Text>
            </View>
            <View>
                <Text>
                     Characteristics : {potion.characteristics ? potion.characteristics : 'unknown'}
                </Text>
            </View>
            <View>
                <Text>
                    Ingredients
                </Text>
                {
                    arr.length > 0 ?
                    <FlatList
                    data={arr}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />
                 :
                <Text>unknown</Text>

                }
            </View>
                <ShareButton />
        </View>
    );
};
export default SinglePotion;
