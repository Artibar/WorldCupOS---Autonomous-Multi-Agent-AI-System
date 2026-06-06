import express from 'express'

const fanRouter = express.Router()


fanRouter.get('/execute', executeFanAgent)

export default fanRouter;