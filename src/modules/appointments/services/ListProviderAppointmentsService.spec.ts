import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it("should be able to list the provider's appointments", async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: '123',
      date: new Date('2021/05/20 11:00:00'), // new Date() acrescenta 3 horas devido ao fuso
      user_id: '1234',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: '123',
      date: new Date('2021/05/20 12:00:00'), // new Date() acrescenta 3 horas devido ao fuso
      user_id: '1234',
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: '123',
      year: 2021,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });
});
