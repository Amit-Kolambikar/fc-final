'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = {
    Tabs: {
        container: {
            flex: 1,
            backgroundColor:'#eaeaea'
        },
        topTabBarSplitLine: {
            borderBottomColor: '#eee',
            borderBottomWidth: 1
        },
        bottomTabBarSplitLine: {
            borderTopColor: '#eee',
            borderTopWidth: 1
        }
    },
    TabBar: {
        container: {
            height: 220,
            backgroundColor:'#eaeaea'
        },
        tabs: {
            flex: 1,
            flexDirection: 'row',
            height: 220,
            backgroundColor: '#eaeaea',
            justifyContent: 'space-around'
        },
        tab: {
            height: 220,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#eaeaea',
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 2,
            paddingLeft: 2,
            flexDirection: 'row'
        },
        underline: {
            height: 0,
            backgroundColor: '#108ee9'
        },
        textStyle: {
            fontSize: 15
        },
        activeTextColor: '#108ee9',
        inactiveTextColor: '#000'
    }
};
module.exports = exports['default'];