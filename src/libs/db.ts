import { Redis } from '@upstash/redis'

export const db = new Redis({
  url: "https://eu1-cool-lark-38940.upstash.io",
  token: 'AZgcACQgMDcyY2M2Y2QtMzU1Mi00MzM1LWJlNGEtN2RmM2E0MDgzOWJhODZiOGI1NzQwYjMwNDBmYTgyMzdkODkyZGQ2MWFjM2I=',
})
   
