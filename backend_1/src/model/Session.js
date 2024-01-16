import mongoose from 'mongoose';



const videoSessionSchema = new mongoose.Schema(
    {
        peer_1_id: {
            type: String,
            required: true,

        },
        peer_2_id: {
            type: String,
            // required: true,

        },

        peer_name: {
            type: String,
            // required: true,
            unique:true
        },
        peer_initiator: {
            type: String,
            // required: true,
        },
        session_code: {
            type: String,
            required: true,
            unique: true,
        },
        is_completed: {
            type: Boolean,
            default: false
        },
        is_reported: {
            type: Boolean,
            default: false
        },
        reported_peer_id: {
            type: Boolean,
            default: false
        },
        interest: {
            type: String,
            // default: false
        },

    },
    { timestamps: true }
);

const VideoSession = mongoose.model('Session', videoSessionSchema);

export default VideoSession;
