import { useState, SyntheticEvent } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { createNote } from "../utils/service";

const NoteCreate = ({ revalidate }: { revalidate: () => void }) => {
    const [title, setTitle] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
        setTitle("");
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        createNote(title)
            .then(() => { revalidate(); handleClose() })
            .catch(err => alert(err.message))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="filled" color="blue">
                New Checklist
            </Button>
            <Dialog open={open} handler={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>Create New Checklist.</DialogHeader>
                    <DialogBody className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="title" className="font-medium text-[#687176]">Title Checklist<span className="text-[#f4555a]">*</span></label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Any moment today?"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                className="bg-white border border-[#cdd0d1] rounded-md focus:ring-blue-600/30 focus:border-blue-600/30 focus:ring-[2px] hover:border-[#687176] focus:outline-none block w-full p-2 my-2 text-gray-800"
                                required
                            />
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleClose}
                            className="mr-1"
                            type="button"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button variant="gradient" color="green" type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
};

export default NoteCreate;