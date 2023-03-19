import type { NextApiRequest, NextApiResponse } from 'next';
import pusher from './util/pusher';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await pusher.trigger('private-channel', 'message', {
    message: req.body.message
  });
  res.status(200).json({});
}
