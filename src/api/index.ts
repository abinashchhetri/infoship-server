import { Router } from 'express'
import auth from './routes/auth'
import category from './routes/category'
import company from './routes/company'
import project from './routes/project'
import team from './routes/team'
import testimonial from './routes/testimonial'
import contact from './routes/contact'

export default () => {
  const router = Router()
  auth({ router })
  project({ router })
  category({ router })
  testimonial({ router })
  team({ router })
  company({ router })
  contact({ router })
  return router
}
