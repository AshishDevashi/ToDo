import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, toggleTodo, deleteTodo, clearToDos } from '../redux/todoSlice';
import { AppDispatch, RootState } from '../redux/store';
import AppLayout from '../assets/components/AppLayout';
import SortDropdown from '../assets/components/SortDropdown';
import FilterButton from '../assets/components/FilterButton';
import { Todo } from '../utils/types';

import TodoList from '../assets/components/Todo/TodoList';
import TodoModal from '../assets/components/Todo/TodoModal';
import { FilterConstant, SortOptionConstant } from '../constants';



const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, filter, sort, hasMore, loading } = useSelector((state: RootState) => state.todo);
    const [page, setPage] = useState<number>(1);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchTodos(page));
        refreshing && setRefreshing(false)
    }, [dispatch, page]);

    const sortedTodos = useMemo(() => {
        const copied = [...todos];

        // Filter
        const filtered = copied.filter(todo => {
            if (filter === FilterConstant.Done) return todo.completed;
            if (filter === FilterConstant.Active) return !todo.completed;
            return true;
        });

        // Separate by created_by user
        const userCreated = filtered.filter(todo => todo.created_by === 'user');
        const apiCreated = filtered.filter(todo => todo.created_by !== 'user');

        const applySort = (list: Todo[]) => {
            if (sort === SortOptionConstant.MostRecent) {
                return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            }
            return list.sort((a, b) => a.id - b.id);
        };

        return [...applySort(userCreated), ...applySort(apiCreated)];
    }, [todos, filter, sort]);


    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [loading, hasMore]);

    const handleModal = useCallback((todo: Todo) => {
        setSelectedTodo(todo);
        setModalVisible(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalVisible(false);
        setSelectedTodo(null);
    }, []);

    const onToggle = useCallback((id: number) => {
        dispatch(toggleTodo(id));
    }, [dispatch]);

    const onDelete = useCallback((id: number) => {
        dispatch(deleteTodo(id));
    }, [dispatch]);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(clearToDos());
        setPage(1)
    }, [dispatch]);

    return (
        <AppLayout needFabButton>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Your To Do</Text>
                    <View style={styles.actionRow}>
                        <SortDropdown selected={sort} />
                        <View>
                            <FilterButton />
                        </View>
                    </View>
                </View>

                <TodoList
                    todos={sortedTodos}
                    loading={loading}
                    hasMore={hasMore}
                    loadMore={loadMore}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    handleModal={handleModal}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />

                <Text style={styles.summary}>
                    Your Remaining Tasks: {todos.filter(t => !t.completed).length} out of {todos.length}
                </Text>
            </View>

            <TodoModal visible={modalVisible} todo={selectedTodo} onClose={closeModal} />
        </AppLayout>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4f4f4f',
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    summary: {
        color: 'black',
        marginTop: 10,
        textAlign: 'center',
    },
});