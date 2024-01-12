import { CheckUserInterest, CreateInterest,GetAllInterest } from "../controller/PeerController";
import express from 'express';
const router = express.Router();
router.get('/test', (req, res) => {
    res.json('GET request to the testpage')
  });
router.post('/checkUserInterest', CheckUserInterest);
router.post('/create/interest', CreateInterest);
router.get('/interest', GetAllInterest);
export default router;