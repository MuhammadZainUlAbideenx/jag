import Peer from "../model/Peer";






export async function CheckUserInterest(req, res) {
  const { interest } = req.body;

  try {
    if (!interest) {
      return res.status(400).json({ msg: 'Interest is Required' });
    }


    const result = await Peer.findOne({ interest: interest });
    if (result) {
      return res.status(200).json({ interest: result });
    }

  } catch (error) {
    console.error('Error checking user interest:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}
export async function CreateInterest(req, res) {

  const { interest } = req.body;
  try {

    if (!interest) {
      return res.status(400).json({ msg: 'Interest is Required' })
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

    const check = await Peer.find();

    return res.status(200).json({ interest: check })
  }
  catch (e) {
    return res.status(400).json({ msg: 'Internal server error' })
  }
}






