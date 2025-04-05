import { ITeamRequest } from '@/interfaces/ITeam'
import { deleteOnCloudinary, uploadOnCloudinary } from '@/libs/cloudinary'
import Logger from '@/loaders/logger'

import { Inject, Service } from 'typedi'

@Service()
export default class TeamService {
  constructor(@Inject('teamModel') private teamModel: Models.team) {}

  public async getTeam() {
    const teams = await this.teamModel.find({})

    return teams
  }

  public async addTeam({ name, role, image }: ITeamRequest) {
    const { public_id, secure_url } = await uploadOnCloudinary(image.path)

    await this.teamModel.create({
      name: name,
      role: role,
      image: { id: public_id, url: secure_url },
    })
  }

  public async deleteTeam(id: string) {
    const member = await this.teamModel.findOne({ _id: id })
    await deleteOnCloudinary(member.image.id)
    await this.teamModel.deleteOne({ _id: id })
  }

  public async updateTeam(data: {
    id: string
    name: string | undefined
    role: string | undefined
    image: Express.Multer.File | undefined
  }) {
    const prevTeam = await this.teamModel.findOne({ _id: data.id })

    if (!prevTeam) {
      const error = new Error('no team member found ')
      error['status'] = 400
      throw error
    }

    if (data.name) {
      prevTeam.name = data.name
    }

    if (data.role) {
      prevTeam.role = data.role
    }

    if (data.image) {
      Logger.info('Jasuda')
      await deleteOnCloudinary(prevTeam.image.id, data.image.path)
      const newProfilePicture = await uploadOnCloudinary(data.image.path)
      prevTeam.image.id = newProfilePicture.public_id
      prevTeam.image.url = newProfilePicture.url
    }

    await prevTeam.save()
  }
}
