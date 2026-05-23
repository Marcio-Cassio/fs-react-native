import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

const SingleRepository = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (loading || !data?.repository) {
    return null;
  }

  return <RepositoryItem item={data.repository} showGitHubButton />;
};

export default SingleRepository;