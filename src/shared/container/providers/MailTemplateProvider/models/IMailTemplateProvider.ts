import IParseMailTemplateDTO from '../dtos/IParseMailTempletateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
