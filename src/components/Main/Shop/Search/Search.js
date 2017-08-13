import React, { Component } from 'react';
import NavigationExperimental from 'react-native-deprecated-custom-components';

import SearchView from './SearchView';
import ProductDetail from '../ProductDetail/ProductDetail';

export default class Search extends Component {
    render() {
        return (
            <NavigationExperimental.Navigator
                initialRoute={{ name: 'SEARCH_VIEW' }}
                renderScene={(route, navigator) => {
                    switch (route.name) {
                        case 'SEARCH_VIEW': return <SearchView navigator={navigator} />;
                        default: return <ProductDetail navigator={navigator} product={route.product} />;
                    }
                }}
            />
        );
    }
}
