'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

    container:
    {
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    subContainer:
    {
        padding:10,
    },
    center:
    {
        alignItems: 'center'
    },
    footer:
    {
        backgroundColor: '#0099ff',
        paddingHorizontal: 10,
    },
    header:
    {
        backgroundColor: '#1aa3ff',
        elevation:2,
    },
});