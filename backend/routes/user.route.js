import express from 'express';
const router= express.Router();
import {verifyToken} from '../utils/verifyToken.js';
import { getUsersForSidebar } from '../controllers/user.controller.js';

router.get('/',verifyToken,getUsersForSidebar);

export default router