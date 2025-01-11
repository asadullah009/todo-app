'use strict';

const todoService = require('../../../services/api/user/todo.service')
module.exports = {
    
    list: async (req, res) => {
        try {
            const data = await todoService.list(req);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    create:async (req, res) => {
        try {
            const data = await todoService.create(req);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    update:async (req, res) => {
        try {
            const data = await todoService.update(req);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    delete:async (req, res) => {
        try {
            const data = await todoService.delete(req);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
}