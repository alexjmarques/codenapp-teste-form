// src/components/UserForm.tsx
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const phoneMask = (value: string) => {
  if (!value) return '';
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  if (!match) return '';
  const [, ddd, first, last] = match;
  return `${ddd ? `(${ddd}` : ''}${ddd && ddd.length === 2 ? ') ' : ''}${first}${last ? `-${last}` : ''}`;
};

const validationSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: Yup.string().min(14, 'Telefone incompleto').required('Telefone é obrigatório'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Confirmação obrigatória'),
});

const App = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="my-4 shadow-lg rounded-lg w-2/5 mx-auto p-4">
      <h2 className="text-center mb-4">Cadastro de Usuário</h2>
      <Formik
        initialValues={{ name: '', email: '', phone: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
            resetForm();
          }, 4000);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="form-control p-4 ">
            <div className="mb-3">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
              <Field name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
              <Field name="email" type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Telefone</label>
              <Field
                name="phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={phoneMask(values.phone)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue('phone', phoneMask(e.target.value))
                }
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
              <Field name="password" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmar Senha</label>
              <Field name="confirmPassword" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs italic" />
            </div>

            <button type="submit" className="bg-primaryDark hover:bg-primaryDark/80 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full">
              Cadastrar
            </button>

            {submitted && (
              <div className="alert alert-success mt-3 text-center" role="alert">
                Cadastro realizado com sucesso!
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;