import { Container, VStack, Heading, Textarea, Button, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { usePosts, useAddPost } from "../integrations/supabase";

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ title: newPost, body: newPost });
      setNewPost("");
    }
  };

  useEffect(() => {
    if (isError) {
      console.error("Error fetching posts");
    }
  }, [isError]);

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
        <Button colorScheme="blue" onClick={handlePost} isLoading={addPostMutation.isLoading}>Post</Button>
        <Box width="100%" mt={4}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            posts?.map((post) => (
              <Box key={post.id} p={4} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
                <Text>{post.body}</Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;