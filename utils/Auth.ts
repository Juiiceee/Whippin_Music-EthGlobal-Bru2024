// utils/auth.ts
import { supabaseClient } from '@/utils/supabaseClient';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie'; // Import the 'Cookies' module

export const registerOrUpdateUser = async (ethAddress: string) => {
  const { data: existingUser, error } = await supabaseClient
    .from('users')
    .select('*')
    .eq('eth_address', ethAddress)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Erreur lors de la recherche de l\'utilisateur:', error.message);
    return null;
  }

  if (!existingUser) {
    const { data, error } = await supabaseClient
      .from('users')
      .insert({ eth_address: ethAddress });

    if (error) {
      console.error('Erreur lors de l\'inscription de l\'utilisateur:', error.message);
      return null;
    }

    return data;
  } else {
    const { data, error } = await supabaseClient
      .from('users')
      .update({ updated_at: new Date() })
      .eq('eth_address', ethAddress);

    if (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error.message);
      return null;
    }

    return data;
  }
};
const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Assurez-vous de définir cette clé secrète dans vos variables d'environnement

export const generateJwtToken = (ethAddress: string) => {
  return jwt.sign({ ethAddress }, secretKey, { expiresIn: '1h' }); // Token expire in 1 hour
};

export const storeJwtToken = (token: string) => {
  Cookies.set('jwt_token', token, { expires: 1 }); // Le jeton expire dans 1 jour
};