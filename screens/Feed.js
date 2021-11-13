import { gql, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import Photo from '../components/Photo';

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
  const [offset, setOffset] = useState(0);
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset,
    },
  });
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const [refreshing, setRefreshing] = useState(false);
  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 25 }}
      onPress={() => navigation.navigate('Messages')}
    >
      <Ionicons name='paper-plane' color='white' size={20} />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor='white'
          />
        }
        onEndReachedThreshold={0.05}
        onEndReached={() => {
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          });
        }}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => '' + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
