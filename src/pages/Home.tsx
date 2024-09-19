import { useEffect, useState } from "react";
import { listNote, updateStatus } from "../utils/service";
import { Card, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import NoteCreate from "../components/NoteCreate";
import ItemCreate from "../components/ItemCreate";
import DeleteNote from "../components/DeleteNote";
import ItemDelete from "../components/ItemDelete";
import ItemUpdate from "../components/ItemUpdate";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loadingNoteId, setLoadingNoteId] = useState<number | null>(null);

    const fetchNotes = async () => {
        const response = await listNote();
        const result = response?.data;

        console.log(result.data)

        if (result.statusCode === 2100) {
            setNotes(result.data);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    const handleCheckboxChange = async (noteId: number, itemId: number) => {
        setLoadingNoteId(noteId);
        try {
            await updateStatus(noteId, itemId);
            fetchNotes();
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setLoadingNoteId(null);
        }
    }

    return (
        <div>
            <div className="flex gap-8">
                <NoteCreate revalidate={fetchNotes} />
            </div>
            <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {notes.length === 0 ? (
                    <div>No notes available</div>
                ) : (
                    notes.map((note: any, i) => (
                        <Card key={i} className={loadingNoteId === note.id ? 'opacity-50 pointer-events-none' : ''}>
                            {loadingNoteId === note.id && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                                <span>Loading...</span>
                            </div>}
                            <CardBody>
                                <Typography variant="h5" color="blue-gray">
                                    {note.name}
                                </Typography>
                                <Typography className="my-2">Checklist item:</Typography>
                                {note.items !== null && note.items.map((item: any, j: number) => (
                                    <div className="flex justify-between items-center flex-1 mb-4" key={j}>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={item.itemCompletionStatus}
                                                onChange={() => handleCheckboxChange(note.id, item.id)}
                                                disabled={loadingNoteId === note.id}
                                            />
                                            <Typography>{item.name}</Typography>
                                        </div>
                                        <div className="w-1/3 text-end">
                                            <ItemUpdate
                                                id={note.id}
                                                itemId={item.id}
                                                name={item.name}
                                                revalidate={fetchNotes}
                                            />
                                            <ItemDelete
                                                itemId={item.id}
                                                noteId={note.id}
                                                noteName={note.name}
                                                revalidate={fetchNotes}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardBody>
                            <CardFooter className="mt-auto flex gap-4">
                                <DeleteNote revalidate={fetchNotes} note={note} />
                                <ItemCreate revalidate={fetchNotes} id={note.id} />
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;