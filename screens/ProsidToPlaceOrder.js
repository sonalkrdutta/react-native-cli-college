import React, { useEffect } from 'react';
import { StyleSheet, Text, Button, Alert, FlatList, TouchableOpacity, View, Image, ActivityIndicator,Dimensions } from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProsidToPlaceOrder = ({navigation}) => {
  const [data, setData] = React.useState({
    imgArr: [],
      sku: '',
      qty: '',
      img: '',
      updateQty: '',
      count:'',
    isLoading: true,
  });
  
  // const edit = (val, prop) => {
  //   const state = this.state;
  //   state[prop] = val;
  //   this.setState(state);
  // }
  const reload = () => {
    componentWillMount()
  };

  const componentWillMount = () => {
    axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
    axios.post('/integration/customer/token', {
      "username": global.email,
      "password": global.password
    })
      .then((response) => {
        // console.log(response);
        setData({
          ...data,
          token: response.data
        });
        
        axios.get('http://3.129.205.241/magento/index.php/rest/V1/carts/mine', {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        })
          .then((res) => {

            // console.log(res.data)
            // this.setState({ productArray: res.data.items });
            setData({
              ...data,
              productArray: res.data.items,
              count: res.data,
            });
            // this.setState({ count: res.data });
            // alert('arijit'+ JSON.stringify(res.data.items[0].sku))
            axios.get('http://3.129.205.241/magento/index.php/rest/V1/products/' + data.productArray[0].sku + '/media', {
              headers: {
                'Authorization': `Bearer ${response.data}`
              }
            })
              .then((res) => {
                setData({
                  ...data,
                  img: res.data[0].file,
                });
                // console.log(res.data.custom_attributes[2].value)
              })
          })
          .catch((error) => {
            // console.error(error)
            // Alert.alert('product error!', JSON.stringify(error), [
            //   { text: 'Okay' }
            // ]);
          })
        // Alert.alert('valid tocken!', JSON.stringify(token), [
        //   { text: 'Okay' }
        // ]);

      }, (error) => {
        // Alert.alert('Invalid tocken!', JSON.stringify(error), [
        //   { text: 'Okay' }
        // ]);
        // console.log(error);
      });
    // this.backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   this.backAction
    // );
  }
  useEffect(() => {
    componentWillMount();
    }, []);

  const getImgurl = () => {
    //alert('SKU ALART'+sku)
    let imgUrl = 'http://3.129.205.241/magento/pub/media/catalog/product';
    axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
    axios.post('/integration/admin/token', {
      "username": "arijit",
      "password": "wb 25 0105"
    })
      .then((response) => {
        // console.log(response);
        setData({
          ...data,
          token: response.data,
        });
        axios.get('http://3.129.205.241/magento/index.php/rest/V1/products/' + sku, {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        })
          .then((res) => {
            imgUrl = imgUrl + res.data.custom_attributes[2].value;
            // console.log(res.data.custom_attributes[2].value)
          })
          .catch((error) => {
            // console.error(error)
            // Alert.alert('product error!', JSON.stringify(error), [
            //   { text: 'Okay' }
            // ]);
          })
        // Alert.alert('valid tocken!', JSON.stringify(token), [
        //   { text: 'Okay' }
        // ]);
      }, (error) => {
        // Alert.alert('Invalid tocken!', JSON.stringify(error), [
        //   { text: 'Okay' }
        // ]);
        // console.log(error);
      });
    return imgUrl;
  }
  const deleteItems = (item_id) => {
    axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
    axios.post('/integration/customer/token', {
      "username": global.email,
      "password": global.password
    })
      .then((response) => {
        const config = {
          headers: { Authorization: `Bearer ${response.data}` }
        };
        axios.delete('http://3.129.205.241/magento/index.php/rest/V1/carts/mine/items/' + item_id,
          config
        )
          .then((response) => {
            //start
            // axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
            // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
            // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            // axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
            // axios.post('/integration/customer/token', {
            //   "username": "roni_cost@example.com",
            //   "password": "roni_cost3@example.com"
            // })
            //   .then((response) => {

            //     const config = {
            //       headers: { Authorization: `Bearer ${response.data}` }
            //     };
            //     axios.get(
            //       'http://3.129.205.241/magento/index.php/rest/V1/carts/mine/',
            //       config
            //     ).then((res) => {
            //        alert('token successssssssss>>>'+JSON.stringify (res.data.items_count))

            //       global.productCount = res.data.items_count;
            //       alert('GLOBAL VERIABLE>>>'+JSON.stringify (global.productCount))

            //     })
            //       .catch((error) => {
            //         Alert.alert('product error!', JSON.stringify(error), [
            //           { text: 'Okay' }
            //         ]);
            //       })
            //   }, (error) => {
            //     Alert.alert('Invalid User!', 'Username or password iii====' + (error), [
            //       { text: 'Okay' }
            //     ]);
            //   });
            //end
            // console.log(response);
            global.productCount = global.productCount - 1;
            navigation.navigate('ProsidToPlaceOrder')
            reload()

          }, (error) => {
            // Alert.alert('not Deleted', JSON.stringify(error), [
            //   { text: 'Okay' }
            // ]);
            // console.log(error);
          });
      }, (error) => {
        // Alert.alert('Invalid User!', 'Username or password iii====' + JSON.stringify(error), [
        //   { text: 'Okay' }
        // ]);
        // console.log(error);
      });
  }

  // backAction = () => {
  //   alert('backACTION')
  //    this.props.navigation.navigate('product') 
  //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel"
  //     },
  //     { text: "YES", onPress: () =>   this.props.navigation.navigate('product') }
  //   ]);
  //   return true;
  // };

  // componentDidMount() {

  // }

  // componentWillUnmount() {
  //   this.backHandler.remove();
  // }

    let tmtArr = [];
    {

      axios.get('http://3.129.205.241/magento/index.php/rest/V1/products/' + data.sku + '/media', {
        headers: {
          'Authorization': `Bearer $no auth`
        }
      })
        .then((res) => {
          imgPath = 'http://3.129.205.241/magento/pub/media/catalog/product' + res.data[0].file;
          tmtArr.push(imgPath)
        })
    }
    // if (data.isLoading) {
    //   return (
    //     <View style={styles.preloader}>
    //       <ActivityIndicator size="large" color="#0b774d" />
    //     </View>
    //   )

    // }
    return (
      <>
        <Text style={{fontSize:16,fontWeight:'bold',padding:10 ,textAlign:'center'}} >Total Item's: {data.count.items_count}
          </Text>
        <Animatable.View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigate("contact")}>
              <LinearGradient
                colors={['#30f7e8', '#01ab9d']}
                style={styles.signIn}
              >
                <Text style={styles.textSign} >Procid To Placed</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <FlatList
          data={data.productArray}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableOpacity onPress={() => navigation.navigate("booking", { data: item })}>
              </TouchableOpacity>
              <View style={{ padding: 3 }}>
                <Card >
                  <CardSection>
                    <View style={styles.cardsecstyle}>
                    </View>
                    <View style={styles.textsecstyle}>
                      <Text style={{ padding: 5, fontSize: 17 }}> {item.name} </Text>
                      <Text style={{ padding: 5, fontWeight: 'bold', fontSize: 18 }}>₹ {item.price} </Text>
                    </View>
                  </CardSection>
                  <View style={styles.numberStyle}>
                    
                    <Animatable.View>
                      <View style={styles.button}>
                        <TouchableOpacity onPress={() => deleteItems(item.item_id)}>
                          <LinearGradient
                            colors={['#30f7e8', '#01ab9d']}
                            style={styles.signIn2}
                          >
                            <MaterialIcons
                              name="delete"
                              color="#ff3e5e"
                              size={20}
                            />
                            <Text style={styles.textSign} > Delete</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </Animatable.View>
                    <Text
                      style={styles.textinputstyle}
                    >
                      Qty: {item.qty.toString()}
                    </Text>
                    {/* <Button
                      style={styles.b2}
                      title="    edit    "
                      onPress={() => this.props.navigation.navigate("EditCart", { data: item })}
                    /> */}
                    <Animatable.View>
                      <View style={styles.button}>
                        <TouchableOpacity onPress={() =>navigation.navigate("EditCart", { data: item })}>
                          <LinearGradient
                            colors={['#30f7e8', '#01ab9d']}
                            style={styles.signIn2}
                          >
                            <MaterialIcons
                              name="edit"
                              color="#120002"
                              size={20}
                            />
                            <Text style={styles.textSign} >   edit   </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </Animatable.View>

                  </View>
                </Card>
              </View>
              <View>
              </View>
            </View>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    );
  };
const { width } = Dimensions.get("screen");
const paddhori = width * 0.28;

const styles = StyleSheet.create({
  container: {
    fontSize: 37,
    textAlign: 'center'
  },
  card: {
    textAlign: 'center'
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 30,
  },
  imageThumbnail: {
    height: 50,
    width: 50,
  },
  textsecstyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  thumnellIMG: {
    margin: 5,
    height: 100,
    width: 80,
  },
  textinputstyle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },
  b1: {
    margin: 10,
  },
  b2: {
    margin: 10,
    paddingLeft: 5,
    paddingRight: 5,
    //backgroundColor:"#1045ef",
  },
  numberStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    alignItems: 'center',
    marginBottom: 25
  },
  signIn2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 7,
  },
  signIn: {
    //width: 150,
    //height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: paddhori,
    paddingVertical: 10,

  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    // paddingHorizontal:100,
    // paddingVertical:10,

  }
});
export default ProsidToPlaceOrder;