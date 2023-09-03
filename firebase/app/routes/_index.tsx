import { Box, Button, ButtonGroup, Container, Heading, VStack } from '@chakra-ui/react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: V2_MetaFunction = () => [{ title: 'Remix Notes' }];

export default function Index() {
  return (
    <Container as="main" sx={{ display: 'flex' }}>
      <VStack>
        <Heading as={'h1'}>links</Heading>

        <Box>
          <ButtonGroup>
            <Link to="/admin">
              <Button>Admin Dashboard</Button>
            </Link>
            <Link to="/og">
              <Button>Original frontpage</Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Dashboard Sample</Button>
            </Link>
            <Link to="/chaos">
              <Button>Chaos</Button>
            </Link>
          </ButtonGroup>
        </Box>
      </VStack>
    </Container>
  );
}
