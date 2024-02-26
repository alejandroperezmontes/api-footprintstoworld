import { Op } from 'sequelize';
// Models
import FootprintModel from '../models/Footprint.js';
// Controllers
import { userHadPermissionToCreateFootprint } from './user.controller.js';
// Mail Helper
import { sendMailNotificationNewFootprint, sendMailNotificationRequestNewFootprint } from '../helper/mail/mailManager.js';

/**
 * The function `requestNewFootprint` handles the creation of a new footprint request and sends a
 * notification email to the giver.
 */
export const requestNewFootrint = async (req, res) => {
  try {
    const {
      description,
      status,
      id_user_receiver,
      email_user_giver,
      email_user_receiver,
      gift
    } = req.body;

    const newRequestFootprintData = {
      description,
      status,
      id_user_receiver,
      email_user_giver,
      email_user_receiver,
      gift
    };

    const newRequestFootprint = await FootprintModel.create(newRequestFootprintData);

    await sendMailNotificationRequestNewFootprint({
      to: email_user_giver,
      subject: '¡Alguien necesita tu ayuda!',
      data: {
        email: email_user_giver
      }
    });

    return res.status(200).json({
      success: true,
      data: newRequestFootprint,
      message: '¡Huella solicitada exitosamente!'
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error?.message
    });
  }
};

/**
 * The function `addNewFootprint` handles the creation of a new footprint entry, checking permissions
 * and sending email notifications accordingly.
 */
export const addNewFootprint = async (req, res) => {
  try {
    const {
      description,
      status,
      id_user_giver,
      email_user_giver,
      email_user_receiver,
      gift
    } = req.body;

    const newFootprintData = {
      description,
      status,
      id_user_giver,
      email_user_giver,
      email_user_receiver,
      gift
    };

    const userHadReceiverFootprint = await FootprintModel.findOne({
      where: {
        email_user_receiver: email_user_giver,
        status: 1
      }
    });

    const userHadPermission = await userHadPermissionToCreateFootprint({ userId: id_user_giver });
    // IF the user has received or validate a footprint
    if (userHadPermission || userHadReceiverFootprint) {
      const newFootprint = await FootprintModel.create(newFootprintData);

      await sendMailNotificationNewFootprint({
        to: email_user_receiver,
        subject: '¡Te han enviado un regalo!',
        data: {
          email: email_user_giver
        }
      });

      return res.status(200).json({
        success: true,
        data: newFootprint,
        message: '¡Huella enviada exitosamente!'
      });
    }

    return res.status(200).json({
      success: false,
      message: 'Para regalar una huella debes validar una primer huella.'
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error?.message
    });
  }
};

/**
 * The function `validateFootprintByEmailsAndFootprintType` validates a footprint based on emails and
 * footprint type, updating its status and user receiver ID if found.
 * @returns The function `validateFootprintByEmailsAndFootprintType` returns if the footprint is not found based on the provided
 * criteria, it returns a message instructing the user to validate the email of the user who gave the
 * gift. If the footprint is found, it updates the status and user receiver ID of the footprint.
 */
export const validateFootprintByEmailsAndFootprintType = async (req, res) => {
  try {
    const {
      email_user_giver,
      email_user_receiver,
      gift,
      status,
      id_user_receiver
    } = req.body;

    const footprintResult = await FootprintModel.findOne({
      where: {
        email_user_giver,
        email_user_receiver,
        gift
      }
    });

    if (!footprintResult) {
      return res.status(200).json({
        success: false,
        message: 'Valida que el correo del usuario que te dio el regalo sí corresponde con el tipo de huella. En tu sección *Mis huellas* puedes encontrar más información!'
      });
    }

    await footprintResult.update({
      status,
      id_user_receiver
    });

    return res.status(200).json({
      success: true,
      message: '¡Has validado la huella! 👣'
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error?.message
    });
  }
};

/**
 * The function `validateFootprintById` validates a footprint by updating its status and user receiver
 * ID.
 * @returns The function `validateFootprintById` returns if the footprint is not found, it returns a message indicating that the footprint was not
 * found. If the validation is successful, it returns a message indicating that the footprint has been
 * validated. If an error occurs during the process, it returns the error message.
 */
export const validateFootprintById = async (req, res) => {
  try {
    const { footprintId } = req.params;
    const {
      status,
      id_user_receiver
    } = req.body;

    const footprint = await FootprintModel.findByPk(footprintId);

    if (!footprint) {
      return res.status(200).json({
        success: false,
        message: 'Al parecer la huella no se ha encontrado'
      });
    }

    await footprint.update({
      status,
      id_user_receiver
    });

    return res.status(200).json({
      success: true,
      message: status === 0 ? '¡Que bien que hayas dado este regalo solicitado!' : '¡Has validado la huella!'
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error?.message
    });
  }
};

/**
 * This function retrieves footprints based on a given email address and returns them as a JSON
 * response.
 * @returns The `getFootprintsByEmail` function returns if the operation is
 * successful, it returns a success status of 200 and the footprints array in the message. If there is
 * an error during the process, it returns a success status of 200 with a message containing the error
 * message.
 */
export const getFootprintsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const footprints = await FootprintModel.findAll({
      where: {
        [Op.or]: [
          { email_user_giver: email },
          { email_user_receiver: email }
        ]
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Ok',
      data: footprints
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error?.message
    });
  }
};
