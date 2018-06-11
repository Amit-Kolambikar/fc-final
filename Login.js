import React, { Component } from 'react';
import {View,Alert} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label , Button , Text} from 'native-base';
import {request,setAuthToken} from "./api.js";
const setAuthTokenFunction = setAuthToken
export default class FloatingLabelExample extends Component {
    constructor(props){
        super(props)
        this.state={
            username : 'client@balticsofa.lt',
            password: 'secret',
        };
    }
    checkLoginInformation=()=>{
        request.get(`/login?email=${this.state.username}&password=${this.state.password}`)
            .then((response) => {
                let token = response.data.token;
                setAuthTokenFunction(token);
                this.props.onLoginPress();
            })
            .catch(function (error) {
                this.props.onLogoutPress()
            });
    }
    formSubmit=()=>{
        if(this.state.username.length > 0 || this.state.password.length > 0)
            this.checkLoginInformation()
    }
    render() {
        return (
            <Container>
                <Content>
                    <Form style={{justifyContent:'center', alignItems:'center',width: '100%',marginTop:40}} onSubmit={this.formSubmit}>
                        <Item>
                            <Label>Username</Label>
                            <Input
                                onChangeText={(text) => this.setState({username:text})} required value={this.state.username}/>
                        </Item>
                        <Item last>
                            <Label>Password</Label>
                            <Input
                                onChangeText={(text) => this.setState({password:text})} required type='visible-password' value={this.state.password}/>
                        </Item>
                        <View style={{justifyContent:'center', alignItems:'center',width: '100%',marginTop:20,flexDirection: 'row',}}><Button onPress={this.formSubmit}><Text>Login</Text></Button></View>
                    </Form>
                </Content>
            </Container>
        );
    }
}