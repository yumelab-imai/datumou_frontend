// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })//status code を200にして、jsonデータを格納。403は、Forbidden error。ステータスコード401（Unauthorized）は適切な認証情報を持たずにリソースにアクセスしようとしたことを示します。
}
