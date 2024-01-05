import { session } from '../models/session'
import { NextFunction, Request, Response } from 'express'
interface CustomRequest extends Request {
  session?: any
}
const sessionMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { headers: headersData } = req
    if (!headersData.sessionid) {
      return res.status(400).json({ error: 'Session ID not provided in headers' })
    }
    const foundSession = await session.findOne({ where: { sessionId: headersData.sessionid } })

    if (foundSession) {
      req.session = foundSession
      next()
    } else {
      return res.status(400).json({error: 'Session not found or timed out. Please log in again.'})
    }
  } catch (error) {
    next(error)
  }
}

export {
  sessionMiddleware,
  CustomRequest,
} 