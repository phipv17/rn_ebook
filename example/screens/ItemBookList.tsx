import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {icArrow} from '../asset/images';

interface ItemBookList {
  title: string;
  onPress: () => void;
}

const ItemBookList: React.FC<ItemBookList> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>{title}</Text>
      <Image source={icArrow} resizeMode="contain" style={styles.image} />
    </TouchableOpacity>
  );
};

export default ItemBookList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fafafa',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
  },
  image: {
    width: 15,
    height: 15,
  },
});
