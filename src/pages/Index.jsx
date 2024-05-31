import { Container, VStack, Heading, Textarea, Button, Box, Text } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, newPost]);
      setNewPost("");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Public Postboard</Heading>
        <Textarea
          placeholder="Write your post here..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          size="md"
        />
        <Button colorScheme="blue" onClick={handlePost}>Post</Button>
        <Box width="100%" mt={4}>
          {posts.map((post, index) => (
            <Box key={index} p={4} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
              <Text>{post}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;