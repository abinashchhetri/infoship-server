import bcrypt from 'bcrypt'

export async function encryption(password: string) {
  const saltRound = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(password, saltRound)
  return encryptedPassword
}
