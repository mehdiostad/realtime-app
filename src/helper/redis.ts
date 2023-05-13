const upstashRedisRestUrl =
  "https://eu1-cool-lark-38940.upstash.io";
const authToken = "AZgcACQgMDcyY2M2Y2QtMzU1Mi00MzM1LWJlNGEtN2RmM2E0MDgzOWJhODZiOGI1NzQwYjMwNDBmYTgyMzdkODkyZGQ2MWFjM2I="

type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    console.log(response.statusText)
    throw new Error(`Error executing Redis command: ${response.statusText, response.text}`)
  }

  const data = await response.json()
  return data.result
}
