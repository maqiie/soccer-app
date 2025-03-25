import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, filterGames } from '../gamesSlice';
import {
  Box,
  VStack,
  Heading,
  Input,
  InputField,
  InputIcon,
  Icon,
  HStack,
  Spinner,
  Center,
  Text
} from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';

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
    <Box
      p="$4"
      borderWidth="$1"
      borderColor="$borderLight300"
      borderRadius="$lg"
      mb="$3"
      bg="$backgroundLight100"
      shadow={2}
    >
      <Heading size="md" color="$textDark800">{item.strEvent}</Heading>
      <Text color="$textDark600" mt="$1">{new Date(item.dateEvent).toLocaleDateString()}</Text>
      <Text color="$textDark600" mt="$1">{item.strLeague}</Text>
    </Box>
  );

  return (
    <VStack p="$4" space="md" flex={1} bg="$backgroundLight0">
      <HStack space="md" alignItems="center" mb="$4">
        <Input flex={1} borderRadius="$lg" bg="$backgroundLight200">
          <InputField placeholder="Search games..." onChangeText={handleSearch} />
          <InputIcon>
            <Icon as={Ionicons} name="search" size="md" color="$textDark400" />
          </InputIcon>
        </Input>
      </HStack>
      {status === 'loading' ? (
        <Center flex={1}>
          <Spinner size="large" color="$primary500" />
        </Center>
      ) : (
        <FlatList
          data={filteredGames}
          renderItem={renderItem}
          keyExtractor={(item) => item.idEvent}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
