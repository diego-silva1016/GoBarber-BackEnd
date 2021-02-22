import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProviders/models/IStorageProvider';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';

import RedisCacheProvider from './CacheProvider/implementations/RedisCacheProvider';
import ICacheProvider from './CacheProvider/models/ICacheProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider,
);
