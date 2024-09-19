import { Button, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton } from '@material-tailwind/react';
import { useState } from 'react';
import { deleteItem } from '../utils/service';
import { FaTrash } from 'react-icons/fa';

const ItemDelete: React.FC<{ noteName: string, noteId: number, itemId: number, revalidate: () => void }> = ({ noteName, noteId, itemId, revalidate }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        setLoading(true);

        if (!noteId) return setLoading(false);

        deleteItem(noteId, itemId)
            .then(() => { revalidate(); setOpen(false) })
            .catch(err => alert(err.message))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <IconButton variant="text" size="sm" onClick={() => setOpen(true)} color="red">
                <FaTrash className="w-4 h-4" />
            </IconButton>
            <Dialog open={open} handler={() => setOpen(false)}>
                <DialogHeader>Delete Alert</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Typography>Are you sure want to delete <span className="font-bold">{noteName}</span> item with id <span className="font-bold">{itemId}</span>?</Typography>
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
    );
};

export default ItemDelete;