import { http, HttpResponse } from 'msw';
import { type INote } from '@/components/noteapp/notes';

const mockData: INote[] = [
  { id: 1, content: 'Note 1' },
  { id: 2, content: 'test2' },
  { id: 3, content: 'test3' },
];

export const handlers = [
  http.get('/api/notes', () => {
    return HttpResponse.json(mockData);
  }),

  http.post('/api/notes', async ({ request }) => {
    const { content } = (await request.json()) as INote;
    return HttpResponse.json({ id: mockData.length + 1, content });
  }),

  http.patch('/api/notes/:id', async ({ request, params }) => {
    const { id } = params;
    const { content } = (await request.json()) as INote;

    return HttpResponse.json({ id, content });
  }),

  http.delete('/api/notes/:id', ({ params }) => {
    const { id } = params;

    // Mock algorithm to remove the note from the list

    return HttpResponse.json({ id });
  }),
];
