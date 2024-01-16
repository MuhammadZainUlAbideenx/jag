import Peer from "../model/Peer";
import Session from "../model/Session";
import InterestDTO from "../resource/Peer"
import { v4 as uuidv4 } from 'uuid';



export async function CheckUserInterest(req, res) {
  const { interest,name } = req.body;

    try {
      if (!interest || !Array.isArray(interest) || interest.length === 0) {
        return res.status(400).json({ msg: 'Invalid interest format' });
      }
  
      const result = await Peer.find({ 'interest.value': { $all: interest } });

      if (result) {
          const existingSessionWithPeer1 = await Session.findOne({
            peer_1_id: { $exists: true },
            peer_2_id: { $exists: false },
            interest: interest[0],
            is_completed:false,
          });

          if (existingSessionWithPeer1) {
            const peer_2_id = uuidv4();
            existingSessionWithPeer1.peer_2_id = peer_2_id;
            existingSessionWithPeer1.is_completed = true
            const newsession = await existingSessionWithPeer1.save();
            return res.status(200).json({ session: newsession });
          } else {
            const peer_1_id = uuidv4();
            const session_code = uuidv4();
            const newSession = new Session({ peer_1_id, session_code, interest: interest[0], peer_name:name });
            const newsession = await newSession.save();
            return res.status(200).json({ session: newsession });
          }
      
      }
    } catch (error) {
      console.error('Error checking user interest:', error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
}
export async function CreateInterest(req, res) {

  const { interest } = req.body;
  try {

    if (!interest || !Array.isArray(interest) || interest.length === 0) {
      return res.status(400).json({ msg: 'Interests array is required and must not be empty.' });
    }

    const check = await Peer.create({ interest: interest })

    return res.status(201).json({ interest: check })
  }
  catch (e) {
    return res.status(400).json({ msg: 'Internal server error' })
  }
}

export async function GetAllInterest(req, res) {
  try {
    const userLanguage = req.headers['accept-language']; // Check if 'Accept-Language' header is lowercase

    const check = await Peer.find({}, { _id: 0, interest: { $elemMatch: { languageCode: userLanguage } } });

    const flattenedInterests = check.map(peer => peer.interest[0]).filter(Boolean);

    return res.status(200).json({ interest: flattenedInterests });
  } catch (error) {
    console.error('Error fetching interests:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}






