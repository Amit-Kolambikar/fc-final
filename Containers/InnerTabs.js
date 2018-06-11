import React, {Component} from 'react';
import {
    Container,
    Header,
    Content,
    Footer,
    FooterTab,
    Button,
    StyleProvider,
    Icon,
    Thumbnail
} from 'native-base';
import getTheme from '../native-base-theme/components';
import Variables from '../native-base-theme/variables/variables.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductList from './ProductList.js';
import {request} from "../api.js";
var _ = require('lodash');
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Platform,
    Image,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native';

const black = '#2d2d2d';
const grey = '#eaeaea';
const {height,width} = Dimensions.get('window');
const styles = StyleSheet.create(
    {
        container:
            {
                flex: 1,
                backgroundColor: '#fff',
                minWidth:width,

            },

        scrollViewHolder:
            {
                backgroundColor: grey,
                maxHeight: 200,
            },

        item:
            {},
        TabImage: {
            height: 180
        },
        mainContent: {
            height: 420,
            maxHeight: 420,
            minHeight: 420,
            backgroundColor: '#fff',
            marginRight: 'auto',
            marginLeft: 'auto',
        },
        mainImage: {
            height: 440,
            alignItems: 'center',
            justifyContent:'center',
            width:600,
        },
        TabBlock: {
            borderWidth: 3,
            borderColor: black,
            backgroundColor: '#fff',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 40,
            height: 180,
            position:'relative',
        },
        footerTextStyle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#fff'
        },
        infoIcon: {
            position:'absolute',
            right:0,
            top:0,
            overflow:'visible',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
        },
        infoIconVector: {
            fontSize:24,
            overflow:'visible',
            paddingTop:10,
            paddingBottom:10,
            paddingLeft:22,
            paddingRight:18,
            backgroundColor:'#333',
            color:'#fff'
        },
        productInfoView:{
            backgroundColor:'#333',
            position:'absolute',
            right:150,
            paddingTop:1,
            paddingBottom:1,
            paddingLeft:10,
            paddingRight:10,
            top:0
        },
        logoutButton : {
            backgroundColor:'#333',
            position:'absolute',
            right:50,
            paddingTop:1,
            paddingBottom:1,
            paddingLeft:10,
            paddingRight:10,
            top:0
        },
        productInfoTitleText:{
            color:'#fff'
        },
        productInfoDetails:{
            backgroundColor:'#fff',
            position:'absolute',
            bottom:0,
            top:380,
            zIndex:10000,
            elevation:10,
            left:0,
            padding:30,
            right:0,
            width:width,
            borderLeftWidth:15,
            borderRightWidth:15,
            borderColor:'#333',
        }
    });

export default class InnerTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            showInfoIcon : false,
            showInfo: false,
            footerTab: 1,
            models:[],
            textures:[],
            arms:[],
            mattresses:[],
            accessories:[],
            activeModelsKey : null,
            activeTexturesKey : null,
            activeArmsKey : null,
            activeMattressesKey : null,
            activeAccessoriesKey : null,
            mainActiveKey : 1,
            activeModelsObject : {},
            activeTexturesObject : {},
            activeArmsObject : {},
            activeMattressesObject : {},
            activeAccessoriesObject : {},
            mainImageSource:{},
            filterArmsArray:[],
            filterTexturesArray:[],
            filterArmsArray:[],
            filterAccessoriesArray:[],
            filterMattressesArray:[],
        }
    }
    ModelChange(){
        let filterProductID=(arrayCollection)=> {
            return _.filter(arrayCollection, (o)=> {
                   if (o.product_id == this.state.activeModelsKey) return o;
               });
           };
        const filterAllSetState=()=>{
            let armsByProductId = filterProductID(this.state.arms)
            let texturesByProductId = filterProductID(this.state.textures)
            let accessoriesByProductId = filterProductID(this.state.accessories)
            let mattressesByProductId = filterProductID(this.state.mattresses)
            let armsId = armsByProductId.length > 0 && armsByProductId[0].id || 0
            let TexturesId = texturesByProductId.length > 0 && texturesByProductId[0].id || 0
            let MattressId = mattressesByProductId.length > 0 && mattressesByProductId[0].id || 0
            let AccessoriesId = accessoriesByProductId.length > 0 && accessoriesByProductId[0].id || 0
            this.setState({
                filterArmsArray:armsByProductId,
                filterTexturesArray:texturesByProductId,
                filterAccessoriesArray:accessoriesByProductId,
                filterMattressesArray:mattressesByProductId,
                activeTexturesKey : TexturesId,
                activeArmsKey : armsId,
                activeMattressesKey : MattressId,
                activeAccessoriesKey : AccessoriesId,
            },this.filterActiveIndex)
        }
        return filterAllSetState()
    }
    componentWillMount(){
        request.get('/products')
            .then((response) => {
                this.setState({
                    arms:response.data.arms,
                    models:response.data.models,
                    textures:response.data.textures,
                    mattresses:response.data.mattresses,
                    accessories:response.data.accessories,
                    activeModelsObject : response.data.models[0],
                    activeModelsKey : response.data.models[0].id,
                },this.ModelChange)
            })
            .catch(function (error) {
                console.log("ERROR "+error)
            });
        
    }
    filterActiveIndex=()=>{
        this.state.activeAccessoriesKey && this.state.activeArmsKey && this.state.activeModelsKey && this.state.activeTexturesKey && this.MainImage()
    }
    SetSlugModel=(item)=> {
        this.setState({
            activeModelsObject : item,
            activeModelsKey:item.id
        },this.ModelChange)
    }
    onPress = (type,key) => {
        console.log(type,key);
        switch(type){
            case 'models' :
                this.setState({
                    activeModelsKey: key
                },this.filterActiveIndex);
                break;
            case 'accessories' :
                this.setState({
                    activeAccessoriesKey: key
                },this.filterActiveIndex);
                break;
            case 'arms' :
                this.setState({
                    activeArmsKey: key
                },this.filterActiveIndex);
                break;
            case 'textures' :
                this.setState({
                    activeTexturesKey: key
                },this.filterActiveIndex);
                break;
            case 'mattresses' :
                this.setState({
                    activeMattressesKey: key
                },this.filterActiveIndex);
                break;
        }
    }
    // fetchMainImage=()=>{
    //     request.getImage(`http://bs.baltcoda.com/images/original/${this.state.activeModelsObject['slug']}-${this.state.activeModelsKey}-${this.state.activeTexturesKey}-${this.state.activeArmsKey}-${this.state.activeAccessoriesKey}.jpg`)
    //         .then((response) => {
    //             console.log("IMAGE"+JSON.stringify(response))
    //             return response
    //         })
    //         .catch(function (error) {
    //             console.log("ERROR "+error)
    //         });
    // }
    MainImage = () => {
        const url = `http://bs.baltcoda.com/products/images/${this.state.activeModelsObject['slug']}-${this.state.activeModelsKey}-${this.state.activeTexturesKey}-${this.state.activeArmsKey}-${this.state.activeAccessoriesKey}.jpg`
        // Can use Thumbnail from nativebase
        return (<Thumbnail style={{width: 500, height: 400, margin: 30 , borderWidth : 0}} source={{uri:url}}
                       resizeMode={'cover'}/>)
    }

    handleToggleProductDetails=()=>{
        this.setState(function(prevState) {
            return {showInfo: !prevState.showInfo};
        });
    }
    productSelectionButton=()=>{
        return(<View><Button style={styles.productInfoView} onPress={this.handleToggleProductDetails}>
            <Text style={styles.productInfoTitleText}>{this.state.showInfo ? "Close" : "Pris" }</Text>
        </Button><Button
            style={styles.logoutButton}
            onPress={this.props.onLogoutPress}
        ><Text style={styles.productInfoTitleText}>Logout</Text></Button></View>)
    }
    productSelectionDetails(){
        return(<View style={styles.productInfoDetails}>
            <Text style={{fontSize:24}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
        </View>)
    }
    renderTab = (number) => {
        switch (number) {
            case 1:
                return (
                    this.state.models.length>0 && <ProductList onPress={(id)=>{this.onPress('models',id)}} data={this.state.models} SetSlug={this.SetSlugModel} activeKey={this.state.activeModelsKey} type="models"/>
                );
            case 2:
                return (
                    this.state.filterArmsArray.length>0 &&<ProductList onPress={(id)=>{this.onPress('arms',id)}} data={this.state.filterArmsArray} activeKey={this.state.activeArmsKey} type="arms"/>
                );
            case 3:
                return (
                    this.state.filterAccessoriesArray.length>0 &&<ProductList onPress={(id)=>{this.onPress('accessories',id)}} data={this.state.filterAccessoriesArray} activeKey={this.state.activeAccessoriesKey} type="accessories"/>
                );
            case 4:
                return (
                    this.state.filterMattressesArray.length>0 &&<ProductList onPress={(id)=>{this.onPress('mattresses',id)}} data={this.state.filterMattressesArray} activeKey={this.state.activeMattressesKey} type="mattress"/>
                );
            case 5:
                return (
                    this.state.filterTexturesArray.length>0 &&<ProductList onPress={(id)=>{this.onPress('textures',id)}} data={this.state.filterTexturesArray} activeKey={this.state.activeTexturesKey} type="textures"/>
                );
            default:
                return (
                    <ProductList />
                )
        }
    }
    changeTab = (number) => {
        if (this.state.footerTab !== number) {
            this.setState({ footerTab: number });
        }
    }

    render() {
        return (
            <StyleProvider style={getTheme(Variables)}>
                <Container style={styles.container}>
                    <View style={{
                        borderTopWidth:15,
                        borderLeftWidth:15,
                        borderRightWidth:15,
                        borderColor:'#333',
                        width:width,
                        minHeight:height-220-76,
                        maxHeight:height-220-76,
                    flex:1}}>
                        <this.productSelectionButton />
                    <Content style={styles.mainContent}>
                            <this.MainImage/>
                    </Content>
                    </View>
                    {this.renderTab(this.state.footerTab)}
                    { this.state.showInfo && <this.productSelectionDetails />}
                    <Footer>
                        <FooterTab>
                            <Button active={this.state.footerTab === 1} onPress={() => { this.changeTab(1) }}>
                                <Text style={styles.footerTextStyle}>{this.props.navigation.models}</Text>
                            </Button>
                            <Button active={this.state.footerTab === 2} onPress={() => { this.changeTab(2) }}>
                                <Text style={styles.footerTextStyle}>{this.props.navigation.arms}</Text>
                            </Button>
                            <Button active={this.state.footerTab === 3} onPress={() => { this.changeTab(3) }}>
                                <Text style={styles.footerTextStyle}>{this.props.navigation.accessories}</Text>
                            </Button>
                            <Button active={this.state.footerTab === 4} onPress={() => { this.changeTab(4) }}>
                                <Text style={styles.footerTextStyle}>{this.props.navigation.mattresses}</Text>
                            </Button>
                            <Button active={this.state.footerTab === 5} onPress={() => { this.changeTab(5) }}>
                                <Text style={styles.footerTextStyle}>{this.props.navigation.textures}</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </StyleProvider>
        );
    }
}