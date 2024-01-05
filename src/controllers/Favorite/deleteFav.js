const jwt = require('jsonwebtoken');
const { Favorite } = require('../../db');
const { AUTH_SECRET } = process.env;

const deleteFav = async (id, token) => {
  try {
    if (!token) {
      throw new Error('Token no provider');
    }

    try {
      const decoded = jwt.verify(token, AUTH_SECRET);
      const userId = decoded.user.id;

      const favoriteFound = await Favorite.findOne({
        where: {
            id: id,
            userId: userId,
        },
      });

      if (!favoriteFound) {
        throw new Error('Favorite not found');
      }

      await favoriteFound.destroy();

      return { message: 'Success' };

    } catch (error) {
      throw new Error('Token invalid: ' + error.message);
    }

  } catch (error) {
    throw new Error('Error deleting favorite: ' + error.message);
  }
};

module.exports =  deleteFav;