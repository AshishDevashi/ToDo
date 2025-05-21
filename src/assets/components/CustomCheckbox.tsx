import React, { useEffect, useRef } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    Animated,
    Easing,
    ViewStyle,
} from 'react-native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

type CustomCheckboxProps = {
    checked: boolean;
    onToggle: () => void;
    size?: number;
    color?: string;
    label?: string;
    style?: ViewStyle;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    checked,
    onToggle,
    size = 24,
    color = '#4CAF50',
    label,
    style,
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.1,
                duration: 100,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
    }, [checked]);

    const boxStyle: ViewStyle = {
        width: size,
        height: size,
        borderColor: color,
        borderWidth: 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: checked ? color : 'transparent',
    };

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onToggle} activeOpacity={0.8}>
            <Animated.View style={[boxStyle, { transform: [{ scale: scaleAnim }] }]}>
                {checked && (
                    <OcticonsIcon
                        name="check"
                        size={size * 0.6}
                        color={'#fff'}
                    />
                )}
            </Animated.View>
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    label: {
        fontSize: 14,
        color: '#000',
    },
});

export default CustomCheckbox;
