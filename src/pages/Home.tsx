import { useEffect, useState } from "react";
import { listNote } from "../utils/service";
import { Card, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import NoteCreate from "../components/NoteCreate";

import DeleteNote from "../components/DeleteNote";

const Home = () => {
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        const response = await listNote();
        const result = response?.data;

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
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {note.name}
                                </Typography>
                                <Typography>
                                    The place is close to Barceloneta Beach and bus stop just 2 min by
                                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                    night life in Barcelona.
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <DeleteNote revalidate={fetchNotes} note={note} />
                                {/* <ItemCreate revalidate={fetchNotes} /> */}
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;