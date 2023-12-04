'use client';

export interface INote {
  id: number;
  content: string;
}

interface NotesProps {
  data: INote[];
}

export const Notes: React.FC<NotesProps> = ({ data }) => {
  return (
    <div>
      <div>All Notes</div>
      <div>
        {data.map(({ id, content }) => {
          return <div key={id}>{content}</div>;
        })}
      </div>
    </div>
  );
};
