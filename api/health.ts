export default async (req: Request) => {
  return new Response(
    JSON.stringify({
      ok: true,
    }),
    { status: 200 }
  )
}
