import { View, StyleSheet, Pressable } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.repositoryItemBackground,
  },
  topRow: {
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  contentContainer: {
    flex: 1,
  },
  date: {
    marginVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
    marginLeft: 8,
  },
  actionText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

const ReviewItem = ({ review, onViewRepository, onDelete }) => {
  const showActions = onViewRepository && onDelete;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.ratingContainer}>
          <Text fontWeight="bold" style={styles.ratingText}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary" style={styles.date}>
            {format(new Date(review.createdAt), 'dd MMM yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      {showActions && (
        <View style={styles.actions}>
          <Pressable
            style={[styles.actionButton, styles.viewButton]}
            onPress={onViewRepository}
          >
            <Text style={styles.actionText}>View repository</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.deleteButton]}
            onPress={onDelete}
          >
            <Text style={styles.actionText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;