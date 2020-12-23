import { Router, request, response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreataAppointmentService from '../services/CreateAppointmentSevice';
import { tr } from 'date-fns/locale';
import { getCustomRepository } from 'typeorm'

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async(request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async(request, response) => {

    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const CreateAppointment = new CreataAppointmentService();

    const appointment = await CreateAppointment.execute({
      date: parseDate,
      provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
