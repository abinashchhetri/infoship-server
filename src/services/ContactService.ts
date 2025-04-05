import Icontact from '@/interfaces/IContact'
import { Inject, Service } from 'typedi'

@Service()
export default class ContactService {
  constructor(@Inject('contactModel') private contactModel: Models.contact) {}

  public async getContact() {
    const contacts = await this.contactModel.find({})
    return contacts
  }

  public async addContact(data: Icontact) {
    await this.contactModel.create({
      fullName: data.fullName,
      email: data.email,
      message: data.message,
      contactNumber: data.contactNumber,
    })
  }

  public async toggleViewStatus(_id: string) {
    const prevContact = await this.contactModel.findById(_id)
    if (prevContact) {
      prevContact.viewed = !prevContact.viewed
      prevContact.save()
    } else {
      const error = new Error('No contact found')
      error['status'] = 401
      throw error
    }
  }

  public async deleteContact(_id: string) {
    await this.contactModel.deleteOne({ _id })
  }
}
