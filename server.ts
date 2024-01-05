import express from 'express'
import bodyParser from 'body-parser'
import bookRoutes from './src/routes/booksRoutes'
import publisherRoutes from './src/routes/publishersRoutes'
import commentRoutes from './src/routes/commentsRoutes'
import userRoutes from './src/controllers/authenticationController'
import { syncModels } from './config/db'

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to handle raw data 
app.use(express.raw({ type: 'application/*' }));

app.use('/', userRoutes)
app.use('/books', bookRoutes)
app.use('/publishers', publisherRoutes )
app.use('/comments', commentRoutes)



syncModels()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });