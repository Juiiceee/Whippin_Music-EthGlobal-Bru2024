import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseClient } from '@/utils/supabaseClient'; // Assurez-vous que le chemin est correct
import { authenticateToken } from '@/middleware/authenticateToken'; // Assurez-vous que le chemin est correct

interface CustomNextApiRequest extends NextApiRequest {
  user: any;
}

export default async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  authenticateToken(req, res, async () => {
    const { ethAddress } = req.body;

    const { data: existingUser, error } = await supabaseClient
      .from('users')
      .select('*')
      .eq('eth_address', ethAddress)
      .single();

    if (error && error.code !== 'PGRST116') {
      return res.status(400).json({ error: error.message });
    }

    if (!existingUser) {
      const { data, error } = await supabaseClient
        .from('users')
        .insert({ eth_address: ethAddress });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json({ user: data });
    } else {
      const { data, error } = await supabaseClient
        .from('users')
        .update({ updated_at: new Date() })
        .eq('eth_address', ethAddress);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json({ user: data });
    }
  });
}
