import { ICompany } from '@/interfaces/ICompany'
import { Inject, Service } from 'typedi'
import { Logger } from 'winston'

@Service()
export default class CompanyService {
  constructor(
    @Inject('companyDetailModel')
    private companyDetailModel: Models.companyDetail,
    @Inject('logger') private logger: Logger
  ) {}

  public async getCompanyDetais() {
    const companyDetail = await this.companyDetailModel.findOne({})
    return companyDetail
  }

  public async editCompanyDetails(userData: ICompany) {
    const count = await this.companyDetailModel.countDocuments()
    if (count > 0) {
      // if detail already exists
      await this.companyDetailModel.findOneAndUpdate({}, { ...userData })
    } else {
      // if detail deson't exists
      await this.companyDetailModel.create(userData)
    }
  }
}
