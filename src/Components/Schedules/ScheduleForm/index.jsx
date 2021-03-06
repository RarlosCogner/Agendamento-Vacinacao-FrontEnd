import React from 'react';
import {
  Formik, Field,
} from 'formik';
import {
  Form, Col, Button,
} from 'react-bootstrap';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import yup from 'yup';
import Page from '../../Page';
import axios from '../../../Utils/api';

registerLocale('pt', pt);
setDefaultLocale('pt');
toast.configure();

const scheduleForm = () => {
  const initialValues = {

    patientName: '',
    patientBirthday: null,
    scheduleDay: null,
    scheduleHour: null,
    _id: null,

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/api/patient', {
        patientName: event.patientName,
        patientBirthday: event.patientBirthday,
        scheduleDay: event.scheduleDay,
        scheduleHour: event.scheduleHour,
        _id: Date.now(),

      });

      toast.info('Agendamento feito com sucesso!');
    } catch (error) {
      toast.error('Erro');
    }
  };

  const validationSchema = yup.object({

    patientName: yup.string().required('Campo Obrigatório!'),
    patientBirthday: yup.date().required('Campo Obrigatório!'),
    scheduleDay: yup.date().required('Campo Obrigatório!'),
    scheduleHour: yup.date().required('Campo Obrigatório!'),

  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >

      {({
        values, handleChange, isSubmitting, setFieldValue,
      }) => (
        <Page title="Agendamento " mainTitle="Agente sua Vacinação!">

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupName">
              <Form.Row>
                <Col xs={6}>
                  <Form.Label>Nome Completo</Form.Label>
                  <Field
                    value={values.patientName}
                    name="patientName"
                    onChange={handleChange}
                    placeholder="Seu nome aqui"
                    as={Form.Control}
                  />

                </Col>

              </Form.Row>
            </Form.Group>
            <Form.Group controlId="formGroupBirthday">
              <Form.Row>
                <Col xs={3}>
                  <Form.Label>Data de Nascimento</Form.Label>

                  <DatePicker
                    selected={values.patientBirthday}
                    onChange={(date) => setFieldValue('patientBirthday', date)}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                    placeholderText="Sua data de nascimento"
                  />

                </Col>
              </Form.Row>
            </Form.Group>
            <br />

            <Form.Group controlId="formGroupSchedule">
              <Form.Label>Dias e Horários disponíveis:</Form.Label>
              <Form.Row>
                <DatePicker
                  selected={values.scheduleDay}
                  onChange={(date) => setFieldValue('scheduleDay', date)}
                  showYearDropdown
                  dropdownMode="select"
                  showMonthDropdown
                  minDate={new Date()}
                  placeholderText="Dias para agendar"
                />
                <DatePicker
                  className="ml-2"
                  selected={values.scheduleHour}
                  onChange={(time) => setFieldValue('scheduleHour', time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="hora"
                  disabled={!values.scheduleDay}
                />

              </Form.Row>
            </Form.Group>
            <Button disabled={isSubmitting} type="submit"> Agendar! </Button>
          </Form>

        </Page>

      )}

    </Formik>
  );
};
export default scheduleForm;
