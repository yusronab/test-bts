import { Button, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton } from '@material-tailwind/react';
import { useState } from 'react';
import { deleteNote } from '../utils/service';
import { FaTrash } from 'react-icons/fa';

const DeleteNote: React.FC<{ note: any, revalidate: () => void }> = ({ note, revalidate }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        setLoading(true);

        if (!note) return setLoading(false);

        deleteNote(note.id)
            .then(() => { revalidate(); setOpen(false) })
            .catch(err => alert(err.message))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <IconButton variant="filled" size="sm" onClick={() => setOpen(true)} color="red">
                <FaTrash className="w-4 h-4" />
            </IconButton>
            <Dialog open={open} handler={() => setOpen(false)}>
                <DialogHeader>Delete {note.name}</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Typography>Are you sure want to delete this checklist?</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="green"
                        onClick={() => setOpen(false)}
                        className="mr-1"
                        type="button"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        type="button"
                        disabled={isLoading}
                        onClick={handleDelete}
                    >
                        {isLoading ? 'Loading' : 'Confirm'}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default DeleteNote