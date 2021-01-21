import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmetService from './CreateAppointmentSevice';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmet: CreateAppointmetService;

describe('CreateAppointmet', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmet = new CreateAppointmetService(fakeAppointmentsRepository);
  });

  it('should be able to cretae a new appointment', async () => {
    const appointment = await createAppointmet.execute({
      date: new Date(),
      provider_id: '1223566',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmet.execute({
      date: appointmentDate,
      provider_id: '1223566',
    });

    await expect(
      createAppointmet.execute({
        date: appointmentDate,
        provider_id: '1223566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
