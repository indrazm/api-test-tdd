import { NoteInput } from '@/components/noteapp/noteInput';
import { Notes } from '@/components/noteapp/notes';

export default function Page() {
  return (
    <div>
      <Notes data={[]} />
      <NoteInput />
    </div>
  );
}
