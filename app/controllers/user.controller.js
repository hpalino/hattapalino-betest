import {getAll, create, remove, update, getByAccountNumber, getByIdentityNumber} from '../services/user.service.js';

export const getUsers = async (req, res) => {
    try {
        const response = await getAll();
        if (!response[0]) { res.status(400); }
        res.send(response[1]);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    try {
        const response = await create(req.body);
        if (!response[0]) { res.status(400); }
        res.send(response[1]);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send('Parameter Not Found');
        }
        const response = await update(req.params.id, req.body);
        if (!response[0]) { res.status(400); }
        res.send(response[1]);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const removeUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send('Parameter Not Found');
        }
        const response = await remove(req.params.id);
        if (!response[0]) { res.status(400); }
        res.send(response[1]);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const findByAccountNumber = async (req, res) => {
    if (!req.params.accNumber) {
        return res.status(400).json('Parameter Not Found');
    }
    try {
        const response = await getByAccountNumber(req.params.accNumber);
        if (!response[0]) { res.status(400); }
        res.send(response[1]);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const findByIdentityNumber = async (req, res) => {
    if (!req.params.idNumber) {
        return res.status(400).json('Parameter Not Found');
    }
    try {
        const response = await getByIdentityNumber(req.params.idNumber);
        if (!response[0]) { res.status(400); }
        res.send(response[1]);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
