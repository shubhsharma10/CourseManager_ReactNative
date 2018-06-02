import React from 'react'
import {Header} from 'react-native-elements'

const FixedHeader = () => (
    <Header
        leftComponent={{ icon: 'menu', color: '#fff'}}
        centerComponent={{ text: 'Title', color: '#fff'}}
    />
);

export default FixedHeader;
