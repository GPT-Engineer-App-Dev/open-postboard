import { Container, VStack, Heading, Textarea, Button, Box, Text, useColorMode, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePosts, useAddPost } from "../integrations/supabase";
import { FaSun, FaMoon } from "react-icons/fa";

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  const handlePost = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ name: newPost, body: newPost });
      setNewPost("");
    }
  };

  useEffect(() => {
    if (isError) {
      console.error("Error fetching posts");
    }
  }, [isError]);

  return (
    <Container as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box display="flex" justifyContent="space-between" width="100%">
          <Heading as="h1" size="xl" color="brand.600">Public Postboard</Heading>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </Box>
        <Textarea
          placeholder="Write your post here..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          size="md"
          bg="white"
          color="black"
          _placeholder={{ color: "gray.500" }}
        />
        <Button as={motion.button} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} colorScheme="brand" onClick={handlePost} isLoading={addPostMutation.isLoading}>Post</Button>
        <Box width="100%" mt={4}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            posts?.map((post) => (
              <Box as={motion.div} key={post.id} p={4} shadow="md" borderWidth="1px" borderRadius="md" mb={4} bg="white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
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