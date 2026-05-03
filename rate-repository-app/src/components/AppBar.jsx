import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';

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

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab label="Repositories" to="/" />
        <AppBarTab label="Sign in" to="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;