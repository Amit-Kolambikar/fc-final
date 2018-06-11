import React, { Component } from "react";
import { Thumbnail , Button } from "native-base";
import getTheme from "../native-base-theme/components";
import Variables from "../native-base-theme/variables/variables.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  Image,
  Modal,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";

const black = "#2d2d2d";
const grey = "#eaeaea";
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minWidth: "100%"
  },

  scrollViewHolder: {
    backgroundColor: grey,
    maxHeight: 220
  },

  item: {},
  TabImage: {
    height: 130,
    minWidth: 300
  },
  mainContent: {
    height: 410,
    maxHeight: 410,
    minHeight: 410,
    backgroundColor: "#fff",
    marginRight: "auto",
    marginLeft: "auto"
  },
  mainImage: {
    height: 400,
    alignItems: "center",
    justifyContent: "center"
  },
  TabBlock: {
    borderWidth: 3,
    borderColor: black,
    backgroundColor: "#fff",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 30,
    height: 140,
    position: "relative"
  },
  footerTextStyle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff"
  },
  infoIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10
  },
  infoIconVector: {
    fontSize: 24,
    overflow: "visible",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 22,
    paddingRight: 18,
    backgroundColor: "#333",
    color: "#fff"
  },
  modalStyle: {
    borderRadius: 12,
    zIndex: 10000
  },
  modalCloseIcon: {
    color: "#333",
    fontSize: 32
  }
});


class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      showInfoIcon: false,
      key: props.data[0].id
    };
  }

  onTabPress = id => {
    this.setState({
      key: id
    });
    this.props.onPress(id);
  };
  componentWillReceiveProps(newProps) {
    if (newProps.type !== this.props.type)
      /* do stuff */
      this.refs.listRef.scrollToOffset({ x: -100, y: 0, animated: true });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.scrollViewHolder}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ref="listRef"
          data={this.props.data}
          extraData={this.state.key}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              style={styles.TabBlock}
              onPress={() => {
                this.props.SetSlug && this.props.SetSlug(item);
                this.onTabPress(item.id);
              }}
              key={item.id.toString()}
            >
              <View style={{ overflow: "visible" }}>
                <Thumbnail
                  source={{ uri: item.thumbnail }}
                  style={styles.TabImage}
                />
                {this.state.key == item.id && (
                  <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}
                    style={styles.infoIcon}
                  >
                    <FontAwesome name="info" style={styles.infoIconVector} />
                  </TouchableHighlight>
                )}
              </View>
            </TouchableHighlight>
          )}
        /><Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            style={styles.modalStyle}
            onRequestClose={() => {
                alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
                <View>
                <Text>Hello World!</Text>

                <TouchableHighlight
                    onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Hide Modal</Text>
                </TouchableHighlight>
                </View>
            </View>
            </Modal>
      </View>
    );
  }
}

export default ProductList;
