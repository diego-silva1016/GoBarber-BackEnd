import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreataAppointmentService from '@modules/appointments/services/CreateAppointmentSevice';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const CreateAppointment = container.resolve(CreataAppointmentService);

    const appointment = await CreateAppointment.execute({
      date: parseDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
