import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListMonthAvailabilityService from './ListMonthAvailabilityService';

let listMonthAvailabilityService: ListMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listMonthAvailabilityService = new ListMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      user_id: '1234',
      date: new Date(2021, 4, 21, 8, 0, 0),
    });

    const availability = await listMonthAvailabilityService.execute({
      provider_id: '123',
      month: 5,
      year: 2021,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
