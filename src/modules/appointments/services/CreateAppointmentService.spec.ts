import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmetService from './CreateAppointmentSevice';

describe('CreateAppointmet', () => {
  it('should be able to cretae a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointmet = new CreateAppointmetService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmet.execute({
      date: new Date(),
      provider_id: '1223566',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointmet = new CreateAppointmetService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmet.execute({
      date: appointmentDate,
      provider_id: '1223566',
    });

    expect(
      createAppointmet.execute({
        date: appointmentDate,
        provider_id: '1223566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
