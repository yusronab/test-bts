import { useEffect, useState } from "react";
import { listNote } from "../utils/service";
import { Card, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import NoteCreate from "../components/NoteCreate";
import ItemCreate from "../components/ItemCreate";
import DeleteNote from "../components/DeleteNote";
import ItemDelete from "../components/ItemDelete";

const Home = () => {
    const [notes, setNotes] = useState([]);

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
                        <Card key={i}>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray">
                                    {note.name}
                                </Typography>
                                <Typography className="my-2">Checklist item:</Typography>
                                {note.items !== null && note.items.map((item: any, j: number) => (
                                    <div className="flex justify-between items-center" key={j}>
                                        <Typography key={j}>
                                            {j + 1}. {item.name}
                                        </Typography>
                                        <div>
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