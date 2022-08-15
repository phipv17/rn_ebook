/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
  Text,
  Image,
} from 'react-native';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import ItemBookList from './ItemBookList';
import {icSearch} from '../asset/images';
import Indicator from './Indicator';

const PickFileScreen = () => {
  const Instance = Axios.create({
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [listBook, setListBook] = useState();
  const [search, setSearch] = useState();

  const handleGetBookList = () => {
    Instance.get('https://cameraai-api.dttt.vn:5028/get_data')
      .then(response => {
        setListBook(response?.data);
      })
      .then((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetBookList();
  }, []);

  const handleSearchBook = async (key: string, textSearch: string) => {
    setIsLoading(true);
    let params = {
      key,
      name: textSearch,
    };
    console.log('params: ', params);
    Instance.post('https://cameraai-api.dttt.vn:5028/decryption', params)
      .then((response: any) => {
        setIsLoading(false);
        // Alert.alert('Thông báo ressponse', response.toString());
        if (response?.data?.error) {
          Alert.alert('Thông báo', 'Không có file tìm kiếm');
        } else {
          navigation.navigate('ViewFile', {url: response?.data?.url});
        }
        // navigation.navigate('ViewFile', {url: response?.data?.url});
      })
      .catch((err: any) => {
        setIsLoading(false);
        console.log(err);
        // Alert.alert('Thông báo', '');
      });
  };

  return (
    <View>
      <ScrollView>
        <Text style={styles.titleInput}>Tìm kiếm</Text>
        <View style={styles.searchContainer}>
          <Image source={icSearch} style={styles.image} />
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm"
            value={search}
            onChangeText={value => setSearch(value)}
            onBlur={() => handleSearchBook('abcxyz', search)}
          />
        </View>
        {/* <Text style={styles.titleInput}>Nhập key</Text> */}
        {/* <TextInput
          style={styles.inputKey}
          placeholder="Nhập key"
          value={key}
          onChangeText={value => setKey(value)}
        />
        <TouchableOpacity
          style={styles.container}
          // onPress={() => navigation.navigate('ViewFile')}>
          onPress={() => handleSearchBook()}>
          <Text style={styles.title}>Tìm kiếm</Text>
        </TouchableOpacity> */}
        <Text style={styles.titleInput}>Danh sách</Text>
        {listBook &&
          listBook?.map((item: any, index: number) => {
            return (
              <ItemBookList
                key={index}
                title={item?.name}
                onPress={() => handleSearchBook(item?.key, item?.name)}
              />
            );
          })}
        {isLoading && <Indicator />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '90%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#03a9f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    // backgroundColor: '#d9dbda',
    backgroundColor: '#fafafa',
    // justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    // width: '90%',
  },
  input: {
    flex: 1,
    // marginLeft: 10,
    padding: 16,
  },
  image: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
  titleInput: {
    paddingHorizontal: 16,
    marginVertical: 5,
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputKey: {
    padding: 16,
    // backgroundColor: '#d9dbda',
    backgroundColor: '#fafafa',
    marginHorizontal: 12,
    marginVertical: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  indicator: {
    alignSelf: 'center',
  },
});

export default PickFileScreen;
