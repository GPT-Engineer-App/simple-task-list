import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex as="nav" justify="space-between" mb={8}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <VStack spacing={4}>
        <Flex>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <IconButton
            aria-label="Add task"
            icon={<FaPlus />}
            onClick={addTask}
            ml={2}
          />
        </Flex>
        <List w="full">
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md">
              <Text>{task.text}</Text>
              <Flex>
                <IconButton
                  aria-label="Edit task"
                  icon={<FaEdit />}
                  onClick={() => {
                    const newText = prompt('Edit task:', task.text);
                    if (newText) {
                      editTask(task.id, newText);
                    }
                  }}
                  mr={2}
                />
                <IconButton
                  aria-label="Delete task"
                  icon={<FaTrash />}
                  onClick={() => deleteTask(task.id)}
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;