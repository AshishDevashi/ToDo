import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../redux/todoSlice';
import Feather from 'react-native-vector-icons/Feather';
import { RootState } from '../redux/store';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp } from '../utils/types';
import AppLayout from '../assets/components/AppLayout';


const AddTodoScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProp<{ params: { id?: number } }, 'params'>>();
    const { id } = route.params || {};
    const dispatch = useDispatch();
    const existingTodo = useSelector((state: RootState) => state.todo.todos.find(todo => todo.id === id));

    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        if (existingTodo) {
            setTitle(existingTodo.title);
        }
    }, [existingTodo]);

    const handleSave = () => {
        if (title.trim()) {
            if (id && existingTodo) {
                dispatch(updateTodo({ id, title }));
            } else {
                dispatch(addTodo(title));
            }
            navigation.goBack();
        }
    };

    return (
        <AppLayout>
            <View style={styles.screen}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{id ? 'Edit TODO' : 'Add TODO'}</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.container}>
                    <TextInput
                        placeholder="Enter your task"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>{id ? 'Update' : 'Add'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AppLayout>
    );
};

export default AddTodoScreen;


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#555',
        paddingVertical: 10,
        fontSize: 16,
        color: 'black',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#4f4f4f',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
