import React, { useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, filterGames } from '../gamesSlice';
import { Box, VStack, Heading, Input, InputField } from '@gluestack-ui/themed';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { filteredGames, status } = useSelector((state) => state.games);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGames());
    }
  }, [status, dispatch]);

  const handleSearch = (text) => {
    dispatch(filterGames(text));
  };

  const renderItem = ({ item }) => (
    <Box p="$4" borderWidth="$1" borderColor="$borderLight300" borderRadius="$md" mb="$2">
      <Heading size="md">{item.strEvent}</Heading>
      <Text>{item.dateEvent}</Text>
      <Text>{item.strLeague}</Text>
    </Box>
  );

  return (
    <VStack p="$4" space="md">
      <Input>
        <InputField placeholder="Search games..." onChangeText={handleSearch} />
      </Input>
      {status === 'loading' ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={filteredGames}
          renderItem={renderItem}
          keyExtractor={(item) => item.idEvent}
        />
      )}
    </VStack>
  );
};

export default HomeScreen;
