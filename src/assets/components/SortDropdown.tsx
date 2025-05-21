// components/SortDropdownIcon.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setSort } from '../../redux/todoSlice';
import { useDispatch } from 'react-redux';

const select_options = [
    { label: 'Most Recent', value: 'most_recent' },
    { label: 'ID', value: 'id' },
];

type Props = {
    selected: string;
}

const SortDropdown = ({ selected }: Props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(selected);
    const [items, setItems] = useState(select_options);
    const dispatch = useDispatch();

    useEffect(() => {
        setValue(selected);
    }, [selected]);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                onPress={() => setOpen(prev => !prev)}
                style={styles.iconContainer}
            >
                <MaterialCommunityIcons name="tune-variant" size={24} color="#333" />
                {value && value !== 'most_recent' && <View style={styles.redDot} />}
            </TouchableOpacity>

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(callback) => {
                    const newVal = callback(value);
                    setValue(newVal);
                    dispatch(setSort(newVal));
                }}
                setItems={setItems}
                placeholder="Sort By"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownBox}
                showArrowIcon={false}
                showTickIcon={true}

            />
        </View>
    );
};

export default SortDropdown;

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 999,
    },
    iconContainer: {
        position: 'relative',
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#4f4f4f',
    },
    redDot: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
    },
    dropdown: {
        display: 'none',
    },
    dropdownBox: {
        borderColor: '#ccc',
        borderRadius: 8,
        width: 140,
        backgroundColor: '#fff'
    },
});
