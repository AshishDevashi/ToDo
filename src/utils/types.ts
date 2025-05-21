import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined;
    AddTodo: undefined
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type AddTodoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddTodo'>;

export type AddTodoProps = {
    navigation: AddTodoScreenNavigationProp;
}

export type HomeProps = {
    navigation: HomeScreenNavigationProp;
}
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
    created_by: 'user' | 'api';
}

export type FilterType = 'All' | 'Active' | 'Done';
export type SortType = 'most_recent' | 'id';

export type TodoState = {
    todos: Todo[];
    filter: FilterType;
    sort: SortType;
    loading: boolean,
    error: string | null,
    hasMore: boolean,
}