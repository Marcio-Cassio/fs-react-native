import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client/react';

import { GET_ME } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });

  if (loading || !data?.me) {
    return null;
  }

  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(review) => review.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;