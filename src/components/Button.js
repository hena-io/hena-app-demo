import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default Button = ({ title, buttonStyle, titleStyle }) => (
    <TouchableOpacity style={[styles.container, buttonStyle]}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
)

Button.defaultProps = {
    title: 'Button',
    buttonStyle: { backgroundColor: '#00DDDD' }
}

Button.propTypes = {
    title: PropTypes.string,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})