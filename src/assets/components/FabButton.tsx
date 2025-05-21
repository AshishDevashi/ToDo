import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, GestureResponderEvent } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type FabButtonProps = {
    onPress: (event: GestureResponderEvent) => void;
    iconName?: string;
    style?: ViewStyle;
    backgroundColor?: string;
};

const FabButton: React.FC<FabButtonProps> = ({
    onPress,
    iconName = 'add',
    style,
    backgroundColor = '#4f4f4f',
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.fab, { backgroundColor }, style]}
            activeOpacity={0.7}
        >
            <Ionicons name={iconName} size={24} color="#fff" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 46,
        width: 46,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
});

export default FabButton;
