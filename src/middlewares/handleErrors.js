export const handleErrors = (error, req, res, next) => {
  console.error(error.name)
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'id used is malformed' })
  } else if (error.name === 'ValidationError') {
    res.status(409).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpirerError') {
    res.status(401).jsn({ error: 'token experired' })
  } else {
    res.status(500).end()
  }
}
