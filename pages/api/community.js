import { SiteClient } from 'datocms-client';

export default async function requestHandler(request, response) {

  if (request.method === "POST") {
    const token = "c44cdecabee9fb23436bfaa74db680";
    const client = new SiteClient(token);

    const recordCreated = await client.items.create({
      itemType: "968518",
      ...request.body
    })

    response.json({
      recordCreated: recordCreated
    })
    return;
  }

  response.status(404).json({
    message: "GET não implementado!"
  })
}