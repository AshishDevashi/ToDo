// FilterButton.tsx
import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setFilter } from '../../redux/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type FilterType = 'All' | 'Active' | 'Done';

type Props = {
    onFilterChange?: (filter: FilterType) => void;
}

const FilterButton: React.FC<Props> = ({ onFilterChange }) => {
    const selectedFilter = useSelector((state: RootState) => state.todo.filter);
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const dispatch = useDispatch();

    const handleSelect = (filter: FilterType) => {
        dispatch(setFilter(filter));
        onFilterChange?.(filter);
        actionSheetRef.current?.hide();
    };

    return (
        <GestureHandlerRootView>
            <TouchableOpacity style={styles.button} onPress={() => actionSheetRef.current?.show()}>
                <Ionicons name="filter" size={24} color="black" />
                <Text style={styles.label}>{selectedFilter}</Text>
            </TouchableOpacity>
            <ActionSheet ref={actionSheetRef}>
                <View style={styles.sheetContent}>
                    {['All', 'Active', 'Done'].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => handleSelect(item as FilterType)}
                            style={styles.option}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ActionSheet>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#4f4f4f'
    },
    label: {
        marginLeft: 8,
        fontSize: 16,
    },
    sheetContent: {
        padding: 20,
    },
    option: {
        paddingVertical: 10,
    },
    optionText: {
        fontSize: 18,
    },
});

export default FilterButton;
