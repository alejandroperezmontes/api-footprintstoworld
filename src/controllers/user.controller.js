import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
// Models
import UserModel from '../models/User.js';
// Config
import config from '../config.js';
// Mail Helper
import { sendEmailSignUp, sendMailLogIn } from '../helper/mail/mailManager.js';

/**
 * The function `generateJWTToken` generates a JSON Web Token (JWT) for a user with specified id and
 * email, using a secret key and setting an expiration time.
 */
const generateJWTToken = ({ user }) => jwt.sign(
  {
    id: user.id,
    email: user.email
  },
  config.JWT_SECRET_KEY,
  {
    expiresIn: 86400
  }
);

/**
 * The function `updateUserByUserModel` updates a user object with new data using the `update` method,
 * and logs any errors that occur.
 * @param user - The "user" parameter is an instance of a user model, which represents a user in the
 * database. It is used to update the user's data with the new data provided in the "newData"
 * parameter.
 * @param newData - The `newData` parameter is an object that contains the updated data for the user.
 * It could include properties such as `name`, `email`, `password`, etc.
 */
const updateUserByUserModel = async (user, newData) => {
  try {
    await user.update(newData);
  } catch (error) {
    console.log({ error });
  }
};

/**
 * The function `checkUserExistByEmail` checks if a user with a specific email exists in the UserModel
 * and returns a boolean value accordingly.
 * @returns A boolean value indicating whether a user with the specified email exists in the UserModel.
 */
export const checkUserExistByEmail = async ({ email }) => {
  const user = await UserModel.findOne({
    where: { email }
  });

  if (!user) return false;

  return true;
};

/**
 * The function checks if a user has permission to create a footprint based on their role, returning
 * true if they are an admin.
 * @returns The function `userHadPermissionToCreateFootprint` is returning a boolean value. It returns
 * `true` if the user with the given `userId` has an admin role (rol === 1), and `false` otherwise.
 */
export const userHadPermissionToCreateFootprint = async ({ userId }) => {
  const user = await UserModel.findByPk(userId);

  // It is a admin rol
  if (user?.rol === 1) return true;

  return false;
};

/**
 * The function `signUpOrLogIn` handles user sign up or log in process, generating JWT tokens and
 * sending emails for account activation or login.
 * @returns The `signUpOrLogIn` response can include a token for authentication,
 * success status, and a message indicating the outcome of the operation (such as successful sign up or
 * login, user inactive status, or any error messages encountered during the process).
 */
export const signUpOrLogIn = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await UserModel.findOne({
      where: { email }
    });
    // If the user doesn't exist then...created...
    if (!user) {
      user = await UserModel.create({ email });

      const token = generateJWTToken({ user });

      await updateUserByUserModel(user, { jwt_token: token });

      await sendEmailSignUp({
        to: email,
        subject: '¡Bienvenid@ a Huellas al mundo!',
        data: {
          token
        }
      });

      return res.status(200).json({
        success: true,
        token,
        message: 'Revisa tu correo eletronico, ¡allí tienes tu link de acceso!'
      });
    }

    if (!user.is_active) {
      return res.status(200).json({
        success: false,
        message: 'Usuario inactivo.'
      });
    }

    const token = generateJWTToken({ user });

    await updateUserByUserModel(user, { jwt_token: token });

    await sendMailLogIn({
      to: email,
      subject: '¡Iniciar sesión en huellas al mundo!',
      data: {
        token
      }
    });

    return res.status(200).json({
      success: true,
      token,
      message: '¡OK!'
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error?.message
    });
  }
};

/**
 * The function logOut handles user logout by invalidating the JWT token associated with the user's
 * email.
 */
export const logOut = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(200).json({
        success: false,
        message: 'El token es requerido o invalido'
      });
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const userFound = await UserModel.findByPk(userId);

    if (userFound) {
      await updateUserByUserModel(userFound, { jwt_token: null });
    } else {
      return res.status(200).json({
        success: false,
        message: 'No autorizado'
      });
    }

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error?.message
    });
  }
};

/**
 * The function `verifyTokenToLogin` checks if a token is valid and corresponds to a user in the
 * database before allowing login access.
 * @returns The function `verifyTokenToLogin` is returning a JSON response with a success status and a
 * message based on the conditions checked in the code.
 */
export const verifyTokenToLogin = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(200).json({
        success: false,
        message: 'El token es requerido o invalido'
      });
    }

    const userFound = await UserModel.findOne({
      where: {
        jwt_token: token
      }
    });

    console.log({ userFound, token });

    if (userFound && userFound.jwt_token) {
      return res.status(200).json({
        success: true
      });
    }

    return res.status(200).json({
      success: false,
      message: 'No autorizado'
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error?.message
    });
  }
};
