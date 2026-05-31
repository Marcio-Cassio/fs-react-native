import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import useCreateReview from '../hooks/useCreateReview';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.repositoryItemBackground,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbbbbb',
    borderRadius: 4,
    padding: 12,
    marginBottom: 5,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
  },
  spacer: {
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
  },
  submitText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's name is required"),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
  text: yup.string(),
});

export const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const ownerNameHasError = formik.touched.ownerName && formik.errors.ownerName;
  const repositoryNameHasError =
    formik.touched.repositoryName && formik.errors.repositoryName;
  const ratingHasError = formik.touched.rating && formik.errors.rating;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, ownerNameHasError && styles.inputError]}
        placeholder="Repository owner's username"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {ownerNameHasError ? (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      ) : (
        <View style={styles.spacer} />
      )}

      <TextInput
        style={[styles.input, repositoryNameHasError && styles.inputError]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {repositoryNameHasError ? (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      ) : (
        <View style={styles.spacer} />
      )}

      <TextInput
        style={[styles.input, ratingHasError && styles.inputError]}
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
      />
      {ratingHasError ? (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      ) : (
        <View style={styles.spacer} />
      )}

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Review"
        multiline
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
      />
      <View style={styles.spacer} />

      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={styles.submitText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview(values);
      if (data?.createReview?.repositoryId) {
        navigate(`/repositories/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;