import { Container, VStack, Heading, Textarea, Button, Box, Text, useColorMode, IconButton, SimpleGrid } from "@chakra-ui/react";
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
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
        <Box display="flex" justifyContent="space-between" width="100%" gridColumn="span 2">
          <Heading as="h1" size="xl" color={colorMode === "light" ? "brand.600" : "brand.300"}>
            Welcome to the Fun Postboard!
          </Heading>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </Box>
        <Textarea
          placeholder="Share your awesome thoughts here..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          size="md"
          bg={colorMode === "light" ? "white" : "gray.700"}
          color={colorMode === "light" ? "black" : "white"}
          _placeholder={{ color: colorMode === "light" ? "gray.500" : "gray.300" }}
          gridColumn="span 2"
        />
        <Button as={motion.button} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} colorScheme="brand" onClick={handlePost} isLoading={addPostMutation.isLoading} gridColumn="span 2">Share It!</Button>
        <Box width="100%" mt={4} gridColumn="span 2">
          {isLoading ? (
            <Text>Fetching awesome posts...</Text>
          ) : (
            posts?.map((post) => (
              <Box
                as={motion.div}
                key={post.id}
                p={4}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                mb={4}
                bg={colorMode === "light" ? "white" : "gray.700"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Text>{post.body}</Text>
              </Box>
            ))
          )}
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default Index;