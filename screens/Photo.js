import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PHOTO_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import Photo from '../components/Photo';

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;
export default function PhotoScreen({ route }) {
  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: {
      id: route?.params?.photoId,
    },
  });

  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            tintColor='white'
          />
        }
        style={{
          backgroundColor: 'black',
        }}
        contentContainerStyle={{
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data?.seePhoto && <Photo {...data?.seePhoto} />}
      </ScrollView>
    </ScreenLayout>
  );
}
