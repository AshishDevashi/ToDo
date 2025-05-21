import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FabButton from './FabButton'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../../utils/types'


type Props = {
    children: ReactNode;
    needFabButton?: boolean;
};
const AppLayout: React.FC<Props> = ({ children, needFabButton = false }) => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom'] as const}>
            {children}
            {needFabButton && <FabButton onPress={() => navigation.push('AddTodo')} />}
        </SafeAreaView>
    );
};

export default AppLayout;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
})