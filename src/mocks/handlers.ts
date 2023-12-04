import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/notes', () => {
    return HttpResponse.json({ message: 'Good!' });
  }),

  http.post('/api/notes', () => {}),

  http.patch('/api/notes', () => {}),

  http.delete('/api/notes', () => {}),
];
