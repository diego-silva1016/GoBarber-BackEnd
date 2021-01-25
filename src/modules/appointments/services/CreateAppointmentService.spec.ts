import AppError from '@shared/errors/AppError';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmetService from './CreateAppointmentSevice';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let createAppointmet: CreateAppointmetService;

describe('CreateAppointmet', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationRepository();

    createAppointmet = new CreateAppointmetService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
    );
  });

  it('should be able to cretae a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmet.execute({
      date: new Date(2021, 4, 10, 13),
      provider_id: '1223566',
      user_id: '123',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2021, 4, 10, 11);

    await createAppointmet.execute({
      date: appointmentDate,
      provider_id: '1223566',
      user_id: '123',
    });

    await expect(
      createAppointmet.execute({
        date: appointmentDate,
        provider_id: '1223566',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to cretae a new appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 1, 25, 12).getTime();
    });

    await expect(
      createAppointmet.execute({
        date: new Date(2021, 1, 1, 10),
        provider_id: '1223566',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to cretae a new appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 1, 25, 12).getTime();
    });

    await expect(
      createAppointmet.execute({
        date: new Date(2021, 1, 1, 10),
        provider_id: '123',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to cretae a new appointment before 8am and after 5pm', async () => {
    await expect(
      createAppointmet.execute({
        date: new Date(2021, 1, 1, 4),
        provider_id: '123',
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmet.execute({
        date: new Date(2021, 1, 1, 18),
        provider_id: '123',
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
