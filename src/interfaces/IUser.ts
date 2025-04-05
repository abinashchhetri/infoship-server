export type role = 'student' | 'company' | 'admin'

export default interface IUser {
  _id?: string
  email: string
  password: string
  role: 'student' | 'company' | 'admin'
  cv: {
    public_id: string
    url: string
  }
  profilePicture: {
    public_id: string
    url: string
  }
}
