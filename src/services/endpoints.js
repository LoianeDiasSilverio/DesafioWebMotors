export const  BASE_URL = `http://desafioonline.webmotors.com.br/api/OnlineChallenge`;
export const GET_MAKE = () => `${BASE_URL}/Make`;
export const GET_MODEL = (id) => `${BASE_URL}/Model?MakeID=${id}`;
export const GET_VERSION = (id) => `${BASE_URL}/Version?ModelID=${id}`;
export const GET_VEHICLES = (number) => `${BASE_URL}/Vehicles?Page=${number}`;
