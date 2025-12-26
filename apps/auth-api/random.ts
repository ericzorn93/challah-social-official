import { createConnectTransport } from '@connectrpc/connect-node';
import { createClient } from '@connectrpc/connect';

import { authv1 } from '@challah-social/protos-gen';

async function main() {
  const transport = createConnectTransport({
    // Requests will be made to <baseUrl>/<package>.<service>/method
    baseUrl: 'http://localhost:3000',

    // You have to tell the Node.js http API which HTTP version to use.
    httpVersion: '1.1',

    // Interceptors apply to all calls running through this transport.
    interceptors: [],
  });
  const client = createClient(authv1.AuthService, transport);

  const resp = await client.login({
    username: 'testuser',
    password: 'password123',
    confirmPassword: 'password123',
  });

  console.log('Login response:', resp.token);
}

main();
