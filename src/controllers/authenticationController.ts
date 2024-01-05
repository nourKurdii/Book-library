import user, { UserInstance } from '../models/user'
import { session } from '../models/session'
import express, { Request, Response } from 'express'
const router = express.Router()
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { sessionMiddleware, CustomRequest } from '../../src/middlewares/sessionMiddleware'

export async function findUser(email: string): Promise<UserInstance> {
    try {
        const foundUser = await user.findOne({ where: { email: email } })
        return foundUser
    } catch (err) {
        throw new Error('Error finding user:' + err.message)
    }
}

function generateSessionId(): string {
    return uuidv4()
}

router.post('/signup', async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const foundUser = await findUser(req.body.email)
        if (foundUser) {
            throw new Error('Email already exists');
        }
        const userData: UserInstance = req.body
        await user.create({ email: userData.email, password: userData.password })
        res.status(201).json('Signed up successfully')
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        const foundUser = await findUser(req.body.email)

        if (!foundUser) {
            return res.status(404).json('User not found')
        }
        const pass: string = req.body.password
        bcrypt.compare(pass, foundUser.password, async (err, result) => {
            if (err) {
                res.status(500).json(err.message)
            } else if (result) {
                const sessionId: string = generateSessionId()
                let sessionData = { "sessionId": sessionId, "userId": foundUser.id }
                console.log(await session.create(sessionData))
                res.status(200).json('Logged in successfully')
            } else {
                res.status(401).json('Invalid username or password')
            }
        })
        // await foundUser.comparePassword(pass, function(err: Error, passMatch: Boolean){
        //     if(passMatch && !err){
        //         res.json("logged in succesfully")
        //     }
        //     else {
        //         return res.status(403).json('wrong password')
        //     }
        // })
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.post('/changePassword', sessionMiddleware, async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const { email, password, newPassword } = req.body
        if (!email || !password || !newPassword) {
            return res.status(400).json('Missing required parameters');
        }
        const foundUser = await findUser(email)
        if (!foundUser) {
            return res.status(404).json('User not found')
        }
        const passwordMatch = await bcrypt.compare(password, foundUser.password);

        if (passwordMatch) {

            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(newPassword, salt)
            try {
                await user.update(
                    { password: hashedPass },
                    { where: { email }, ...{ validate: false } }
                );
                res.json('password updated succesfully')
            } catch (err) {
                throw err
            }


        } else {
            res.status(401).json('Invalid username or password')
        }

    }
    catch (err) {
        res.status(500).json(err.message)
    }


})

router.delete('/logout', sessionMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        let sessionData = req.session

        const userSessions = await session.findAll({ where: { userId: sessionData.userId } })

        if (!userSessions || userSessions.length === 0) {
            return res.status(404).json({ error: 'No sessions found for the user' })
        }

        await session.destroy({ where: { userId: sessionData.userId } })

        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to logout', details: error.message })
    }

})
export default router
