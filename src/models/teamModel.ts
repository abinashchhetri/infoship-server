import { ITeamResponse } from '@/interfaces/ITeam'
import mongoose from 'mongoose'

const team = new mongoose.Schema({
  name: { type: String, require: true },
  role: { type: String, require: true },
  image: {
    id: { type: String, required: true },
    url: { type: String, required: true },
  },
})

export default mongoose.model<ITeamResponse | mongoose.Document>('Team', team)
