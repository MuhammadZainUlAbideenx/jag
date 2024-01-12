import  mongoose from 'mongoose';



const peerSchema = new mongoose.Schema(
    {
        peer_id: {
            type: String,

        },
        ip_address: {
            type: String,
    
        },
        is_blocked: {
            type: Boolean,
          

        },
        last_online_session: {
            type: Date,
            required: true,
        },
        interest: {
            type: String,
         
        },
     
    },
    { timestamps: true }
);

const Peer = mongoose.model('Peer', peerSchema);

export default Peer;
