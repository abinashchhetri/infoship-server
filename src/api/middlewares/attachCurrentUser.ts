import Container from 'typedi'

export const attachCurrentUser = async (req, res, next) => {
  try {
    const userModel = Container.get('userModel') as Models.userModel

    const userRecord = await userModel.findById(req.auth._id)

    if (!userRecord) {
      return res.status(401).end()
    }

    const currentUser = userRecord.toObject()

    Reflect.deleteProperty(currentUser, 'password')
    Reflect.deleteProperty(currentUser, 'salt')
    req.currentUser = currentUser
    return next()
  } catch (error) {
    return next(error)
  }
}
