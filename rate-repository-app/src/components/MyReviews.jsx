import { Alert, FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';

import { GET_ME } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  if (loading || !data?.me) {
    return null;
  }

  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const handleDelete = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview(id);
            refetch();
          },
        },
      ],
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewRepository={() =>
            navigate(`/repositories/${item.repositoryId}`)
          }
          onDelete={() => handleDelete(item.id)}
        />
      )}
      keyExtractor={(review) => review.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;