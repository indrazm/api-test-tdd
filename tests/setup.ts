import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeAll, afterAll } from 'vitest';
import { server } from '@/mocks/server';

// server starts listening on port 3000
beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// server closes
afterAll(() => server.close());
