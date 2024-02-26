// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from 'nodemailer';
import config from '../../config.js';

const { NODEMAILER_USER, NODEMAILER_PASS, APP_BASE_URL } = config;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS
  }
});

/**
 * The function `sendEmailSignUp` sends a welcome email for signing up with a link to validate the
 * token for logging in.
 */
export async function sendEmailSignUp({ to, subject, data = null }) {
  try {
    const mailOptions = {
      from: '"Equipo Footprints to World" <soporte@footprintstoworld.com>',
      to,
      subject,
      html: `<h2 style="color: #333333; font-size: 24px; margin-bottom: 20px; font-family: Arial, sans-serif;">
          ¡Huellas al Mundo te da la bienvenida!
        </h2>
    
        <p style="color: #666666;">
          Haz click en el siguiente enlance para ingresar a la aplicación:
        </p>

        <a href=${APP_BASE_URL}/footprints/login?validateToken=${data.token}
          style="color: #007bff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">
          Iniciar sesión
        </a>
        
        <p style="color: #666666;">
          En caso de que lo anterior no funcione haz click en el siguiente enlance para iniciar sesión:
        </p>

        <a href=${APP_BASE_URL}/footprints/login?validateToken=${data.token}
          style="color: #007bff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">
          ${APP_BASE_URL}/footprints/login?validateToken=${data.token}
        </a>`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
}

/**
 * The function `sendMailLogIn` sends a welcome back email with a login link to a specified recipient.
 */
export async function sendMailLogIn({ to, subject, data = null }) {
  try {
    const mailOptions = {
      from: '"Equipo Footprints to World" <soporte@footprintstoworld.com>',
      to,
      subject,
      html: `<h2 style="color: #333333; font-size: 24px; margin-bottom: 20px; font-family: Arial, sans-serif;">
          ¡Huellas al Mundo te da la bienvenida de nuevo!
        </h2>
    
        <p style="color: #666666;">
          Haz click en el siguiente botón para iniciar sesión:
        </p>
        
        <a href=${APP_BASE_URL}/footprints/login?validateToken=${data.token}
          style="color: #007bff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">
          Iniciar sesión
        </a>
        
        <p style="color: #666666;">
          En caso de que lo anterior no funcione haz click en el siguiente enlance para iniciar sesión:
        </p>

        <a href=${APP_BASE_URL}/footprints/login?validateToken=${data.token}
          style="color: #007bff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">
          ${APP_BASE_URL}/footprints/login?validateToken=${data.token}
        </a>

        `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
}

/**
 * The function `sendMailNotificationNewFootprint` sends an email notification with a gift validation
 * link to a recipient.
 */
export async function sendMailNotificationNewFootprint({
  to, subject, text, data = null
}) {
  try {
    const mailOptions = {
      from: '"Equipo Footprints to World" <soporte@footprintstoworld.com>',
      to,
      subject,
      text,
      html: `<h2 style="color: #333333; font-size: 24px; margin-bottom: 20px; font-family: Arial, sans-serif;">
          ¡Huellas al Mundo te notifica que has recibido un regalo!
        </h2>
    
        <p style="color: #666666;">
          Haz click en el siguiente enlance para iniciar sesión y validar el regalo que te ha enviado ${data.emal}:
        </p>    
        
        <a href=${APP_BASE_URL}/footprints/login?validateToken=${data.token}
          style="color: #007bff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">
          Iniciar sesión
        </a>
        
        <p style="color: #666666;">
          En caso de que lo anterior no funcione haz click en el siguiente enlance para iniciar sesión:
        </p>

        <a href=${APP_BASE_URL}/footprints/login?validateToken=${data.token}
          style="color: #007bff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">
          ${APP_BASE_URL}/footprints/login?validateToken=${data.token}
        </a>`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
}

/**
 * The function `sendMailNotificationRequestNewFootprint` sends an email notification
 * when someone want helper
 * with a specific subject, text, and data for validating a requested gift.
 */
export async function sendMailNotificationRequestNewFootprint({
  to, subject, text, data = null
}) {
  try {
    const mailOptions = {
      from: '"Equipo Footprints to World" <soporte@footprintstoworld.com>',
      to,
      subject,
      text,
      html: `<h2 style="color: #333333; font-size: 24px; margin-bottom: 20px; font-family: Arial, sans-serif;">
          ¡Huellas al Mundo te notifica que te han solicitado ayuda!
        </h2>
    
        <p style="color: #666666;">
          Haz click en el siguiente enlance para iniciar sesión y validar el regalo que te han solicitado ${data.emal}:
        </p>    
        
        <a href=${APP_BASE_URL}/footprints/login?validateToken=${data.token}
          style="color: #007bff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">
          Iniciar sesión
        </a>
        
        <p style="color: #666666;">
          En caso de que lo anterior no funcione haz click en el siguiente enlance para iniciar sesión:
        </p>

        <a href=${APP_BASE_URL}/footprints/login?validateToken=${data.token}
          style="color: #007bff; text-decoration: none; font-family: Arial, sans-serif; font-size: 14px;">
          ${APP_BASE_URL}/footprints/login?validateToken=${data.token}
        </a>`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
}
