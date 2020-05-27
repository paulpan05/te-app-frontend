export default process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/dev'
  : 'https://98zyuzjmkg.execute-api.us-east-1.amazonaws.com/prod';
