import { useState, SyntheticEvent } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton } from "@material-tailwind/react";
import { renameItem } from "../utils/service";
import { MdEditSquare } from "react-icons/md";

const ItemUpdate = ({ revalidate, id, name, itemId }: { revalidate: () => void, id: number, itemId: number, name: string }) => {
    const [title, setTitle] = useState<string>(name || "");
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        renameItem(id, itemId, title)
            .then(() => { revalidate(); setOpen(false) })
            .catch(err => alert(err.message))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <IconButton onClick={() => setOpen(true)} variant="text" size="sm" color="blue">
                <MdEditSquare className="w-4 h-4"/>
            </IconButton>
            <Dialog open={open} handler={() => setOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>Update Item Checklist.</DialogHeader>
                    <DialogBody className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="title" className="font-medium text-[#687176]">Item Checklist<span className="text-[#f4555a]">*</span></label>
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
                            onClick={() => setOpen(false)}
                            className="mr-1"
                            type="button"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button variant="gradient" color="green" type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
};

export default ItemUpdate;