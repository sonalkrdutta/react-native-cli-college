import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';
// import DealCaroussel from '../../components/DealCaroussel'
import CustomCarasole from '../../components/CustomCarasole';
import {Avatar} from 'react-native-paper';
import SearchBar from '../../components/SearchBar';
import {ScrollView} from 'react-native-gesture-handler';
const HomeScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    productArray: [],
    isLoading: true,
  });
  const onScreenLoad = () => {
    axios
      .get(
        'http://10.15.176.14/magento/index.php/rest/V1/products?searchCriteria[page_size]=40',
      )
      .then(res => {
        setData({
          ...data,
          productArray: res.data.items,
        });
      })
      .catch(error => {
        // console.error(error)
        Alert.alert('product error!', JSON.stringify(error), [{text: 'Okay'}]);
      });
  };
  useEffect(() => {
    onScreenLoad();
  }, [onScreenLoad]);
  return (
    <>
      <View style={styles.MainContainer}>
        <SearchBar />
        <ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('catagoryDetails')
                }>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                    flexDirection: 'column',
                  }}>
                  <Avatar.Image
                    size={50}
                    source={require('../../assets/shirt2.jpg')}
                  />

                  <Text
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 13,
                    }}>
                    Men
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 3,
                  flexDirection: 'column',
                }}>
                <Avatar.Image
                  size={50}
                  source={require('../../assets/woman.png')}
                />
                <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                  Women
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 3,
                  flexDirection: 'column',
                }}>
                <Avatar.Image
                  size={50}
                  source={require('../../assets/35.png')}
                />
                <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                  appliances
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 3,
                  flexDirection: 'column',
                }}>
                <Avatar.Image
                  size={50}
                  source={require('../../assets/avata1.jpg')}
                />
                <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                  Men
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 3,
                  flexDirection: 'column',
                }}>
                <Avatar.Image
                  size={50}
                  source={require('../../assets/security3.jpg')}
                />
                <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                  Women
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 3,
                  flexDirection: 'column',
                }}>
                <Avatar.Image
                  size={50}
                  source={require('../../assets/security2.jpg')}
                />
                <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                  Women
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 3,
                  flexDirection: 'column',
                }}>
                <Avatar.Image
                  size={50}
                  source={require('../../assets/avata1.jpg')}
                />
                <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                  Women
                </Text>
              </View>
            </View>
          </ScrollView>
          <CustomCarasole />

          <FlatList
            data={data.productArray}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 1,
                  backgroundColor: '#61bbef',
                  borderRadius: 25,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('booking', {data: item})
                  }>
                  <Image
                    style={styles.imageThumbnail}
                    source={{
                      uri:
                        'http://10.15.176.14/magento/pub/media/catalog/product' +
                        item.media_gallery_entries[0].file,
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                  }}>
                  <Text> {item.name} </Text>
                  <Text>₹ {item.price} </Text>
                </View>
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    </>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: 5,
    backgroundColor: '#fdfeff',
  },
  MainContainerfooter: {
    justifyContent: 'center',
    flex: 1,
    padding: 5,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 260,
    height: Dimensions.get('window').height * 0.2, // 25% window
    //width: Dimensions.get('window').width * 0.25,
  },
  b1: {
    paddingBottom: 15,
  },
  container: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: 400,
    flex: 1,
    width: 400,
  },
  singleimg: {
    height: 100,
    width: null,
  },
});