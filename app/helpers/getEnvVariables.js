/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
/* eslint-disable eol-last */

require('dotenv').config();

export const getEnvVariables = () => {
  return {
    ...process.env,
  };
};