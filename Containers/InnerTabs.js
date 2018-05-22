import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Dimensions
} from "react-native";
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { Tabs, DefaultTabBar } from "rmc-tabs";
import { CustomBigTabBar } from "./CustomBigTabBar";

const {
    width,
    height
} = Dimensions.get('window');
// var MainTabsHeight = height - 320

class InnerTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: false,
      page : 0
    };
  }
  componentDidMount() {}
  couchTabImage(props) {
    return (
      <View style={styles.ImageView}>
        <Image
          source={props.ImagePath}
          resizeMode={"center"}
          style={{
            width: 280,
            marginTop: -80,
            height: 300
          }}
        />
        <View style={styles.activeTabInfo}><Image
          source={require('../images/i.png')}
          resizeMode={"center"}
          style={{
            width: 30
          }}
        /></View>
      </View>
    );
  }
  couchTabs = () => {
    return (
      <Tabs
        tabs={[
          {
            title: (
              <this.couchTabImage
                ImagePath={require("../images/c1-mini.png")}
              />
            ),
            key: "t1"
          },
          {
            title: (
              <this.couchTabImage ImagePath={require("../images/c2.png")} />
            ),
            key: "t2"
          },
          {
            title: (
              <this.couchTabImage ImagePath={require("../images/ph.png")}/>
            ),
            key: "t3"
          },
          {
            title: (
              <this.couchTabImage ImagePath={require("../images/c1.png")} />
            ),
            key: "t4"
          },
          {
            title: (
              <this.couchTabImage ImagePath={require("../images/c2.png")} />
            ),
            key: "t5"
          }
        ]}
        initalPage={"t2"}
        tabBarPosition="bottom"
        animated={false}
        swipeable={false}
        renderTabBar={props => <CustomBigTabBar {...props} swipeable={false}/>}
      >
        <View key="t1">
          <this.couchItem ImagePath={require("../images/c1.png")} />
        </View>
        <View key="t2">
          <this.couchItem ImagePath={require("../images/c2.png")} />
        </View>
        <View key="t3">
          <this.couchItem ImagePath={require("../images/ph.png")} />
        </View>
        <View key="t4">
          <this.couchItem ImagePath={require("../images/c1.png")} />
        </View>
        <View key="t5">
          <this.couchItem ImagePath={require("../images/c2.png")} />
        </View>
        <View key="t6">
          <this.couchItem ImagePath={require("../images/ph.png")} />
        </View>
        <View key="t7">
          <this.couchItem ImagePath={require("../images/c1.png")} />
        </View>
        <View key="t8">
          <this.couchItem ImagePath={require("../images/c2.png")} />
        </View>
      </Tabs>
    );
  };
  couchItem(props) {
    return (
      <View style={styles.mainContainer}>
        <View style={{ backgroundColor: "#fff" , height : 423  }}>
          <Image
            source={props.ImagePath}
            resizeMode={"cover"}
            style={{
              width: 800,
              marginLeft: "auto",
              marginRight: "auto",
              height : 423 
            }}
          />
        </View>
      </View>
    );
  }

  toggleProductDetails = () => {
    this.setState({ productDetails: !this.state.productDetails });
  };
  _onShowUnderlay() {
    this.setState({ productDetails: true });
  }
  renderProductDetails = () => {
    return (
      <View
        style={{
          position: "absolute",
          right: 50,
          top: 10,
          zIndex: 1000,
          padding: 7,
          borderRadius: 5,
          backgroundColor: "#333"
        }}
      >
        <TouchableHighlight
          activeOpacity={1}
          style={
            this.state.productDetails
              ? styles.productDetailsButton
              : styles.button
          }
          onPress={this.toggleProductDetails}
        >
          <Text
            style={
              this.state.productDetails
                ? styles.productTitleActiveText
                : styles.productTitleInActiveText
            }
          >
            Pris
          </Text>
        </TouchableHighlight>
      </View>
    );
  };
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
      < this.couchTabs />
        <View style={styles.mainNavigation}>
          <View style={styles.mainNavigationItem}>
            <Text
              style={styles.mainNavigationText}
            >
              Modell
            </Text>
          </View>
          <View style={styles.mainNavigationItem}>
            <Text
              style={styles.mainNavigationText}
            >
              Armlene
            </Text>
          </View>
          <View style={styles.mainNavigationItem}>
            <Text
              style={styles.mainNavigationText}
            >
              Ryggpute
            </Text>
          </View>
          <View style={styles.mainNavigationItem}>
            <Text
              style={styles.mainNavigationText}
            >
              Madrass
            </Text>
          </View>
          <View style={styles.mainNavigationItem}>
            <Text
              style={styles.mainNavigationText}
            >
              Stoff
            </Text>
          </View>
        </View>
        <this.renderProductDetails />
        {this.state.productDetails && (
          <ScrollView
            style={{
              flex: 1,
              padding: 7,
              width: window.width,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 300,
              backgroundColor: "#fff",
              zIndex: 19000
            }}
          >
            <Text style={{ color: "#333", fontSize: 24, padding: 40 }}>
              <Text style={{ fontSize: 36 }}>Fancy Couch 600</Text> {"\n"}
              {"\n"}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              aspernatur deleniti enim non dolore voluptatum corporis excepturi{" "}
              {"\n"}
              {"\n"}Cupiditate nesciunt reiciendis voluptates ipsa.
            </Text>
            <Image
              source={require("../images/email-icon.png")}
              style={{
                flex: 1,
                position: "absolute",
                right: 60,
                bottom: 40
              }}
              resizeMode={"contain"}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

export default InnerTabs;
const styles = StyleSheet.create({
  ImageView: {
    borderWidth: 4,
    borderColor: "#2a2a2a",
    marginRight: 27,
    marginLeft: 28,
    marginTop: 0,
    paddingTop: 0,
    position: "relative",
    backgroundColor: "#fff",
    paddingLeft: 42,
    paddingBottom: 10,
    paddingRight: 30,
    height: 150,
    marginBottom: 0
  },
  mainContainer: {
    backgroundColor: "#333",
    borderWidth: 15,
    borderColor: "#333",
    borderBottomWidth: 0,
  },
  productDetailsButton: {
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#333"
  },
  productTitleActiveText: {
    color: "#333"
  },
  productTitleInActiveText: {
    color: "#fff"
  },
  mainNavigationItem: {
      width:250,
      flex:1,
      alignItems:'center',
  },
  mainNavigation:{
    backgroundColor: "#2a2a2a",
    width:width,
    paddingTop:15,
    height:70,
    flexDirection : 'row'
  },
  mainNavigationText:{
      color:'#fff',
      fontSize:32,
      fontWeight:'400',
      fontFamily : 'Roboto'
  },
  activeTabInfo:{
    position:'absolute',
    top:-80,
    right:0,
    zIndex:19001
  }
});
