import type { NextApiRequest, NextApiResponse } from 'next';
import pusher from './util/pusher';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(pusher.authorizeChannel(
    req.body.socket_id,
    req.body.channel_name
  ));
}
