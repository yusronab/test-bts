import axios from "axios";
import { isAuthorize } from "./auth";

const BASE_URL = 'http://94.74.86.174:8080/api';

export const listNote = async () => {
    const token = isAuthorize();

    if (!token) return;

    const result = await axios.get(BASE_URL + '/checklist', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return result
}

export const createNote = async (name: string) => {
    const token = isAuthorize();

    if (!token) return;

    const result = await axios.post(BASE_URL + '/checklist', { name }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return result
}

export const deleteNote = async (id: number) => {
    const token = isAuthorize();

    if (!token) return;

    const result = await axios.delete(BASE_URL + '/checklist/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return result
}

export const getChecklistItem = async (id: number) => {
    const token = isAuthorize();

    if (!token) return;

    const result = await axios.get(BASE_URL + '/checklist/' + id + '/item', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return result
}

export const addChecklistItem = async (id: number, name: string) => {
    const token = isAuthorize();

    if (!token) return;

    const result = await axios.post(BASE_URL + '/checklist/' + id + '/item', { itemName: name }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return result
}