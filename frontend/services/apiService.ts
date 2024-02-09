import axios from 'axios';
import request from 'umi-request';
import { getToken } from './common';

interface UniversalProps {
  data: any;
}

// const TestToken = 'godffyiyvsua7djdlscltysnred';
const Token = getToken();

export const fetchData = async (url: string): Promise<UniversalProps> => {
  try {
    const response = await axios.get<any>(url, {
      headers: {
        'Authorization': Token, 
        'Content-Type': 'application/json', 
      },
    });
    const data = response.data;

    return {
      data,
    };
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);

    return {
      data: null,
    };
  }
};


export async function postData( url: string, body: any) {
  return request(`${url}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Authorization': Token as string, 
    },
    body: JSON.stringify(body),
  });
}