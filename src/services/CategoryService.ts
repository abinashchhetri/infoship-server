import { Inject, Service } from 'typedi'
import { Logger } from 'winston'

@Service()
export class CategoryService {
  constructor(
    @Inject('categoryModel') private category: Models.category,
    @Inject('logger') private logger: Logger
  ) {}

  public async addCategory(name: string) {
    await this.category.create({
      name: name,
    })
  }

  public async getCategory() {
    return await this.category.find()
  }

  public async deleteCategory(id: string) {
    const category = await this.category.findOne({ _id: id })
    if (!category) {
      const error = new Error('category dosnt exists')
      error['status'] = 404
      throw error
    } else {
      const response = await this.category.deleteOne({ _id: id })
      if (response.acknowledged == false) {
        const error = new Error("couldn't delete category ")
        error['status'] = 404
        throw error
      }
    }
  }

  public async editcategory(categoryId: string, name: string) {
    await this.category.updateOne({ _id: categoryId }, { $set: { name } })
  }
}
