import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client/react';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';
import useAuthStorage from '../hooks/useAuthStorage';
import { GET_ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    backgroundColor: theme.colors.appBarBackground,
  },
  scroll: {
    paddingHorizontal: 15,
  },
  tab: {
    marginRight: 20,
  },
  tabText: {
    color: theme.colors.appBarText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const AppBarTab = ({ label, to }) => {
  return (
    <Link to={to} component={Pressable} style={styles.tab}>
      <Text style={styles.tabText}>{label}</Text>
    </Link>
  );
};

const SignOutTab = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Text style={styles.tabText}>Sign out</Text>
    </Pressable>
  );
};

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab label="Repositories" to="/" />
        {data?.me ? (
          <SignOutTab onPress={signOut} />
        ) : (
          <AppBarTab label="Sign in" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;