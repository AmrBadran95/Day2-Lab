export async function GET(req) {
  try {
    console.log("Incoming GET request");

    return Response.json(
      {
        message: "You have reached the main API route.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET error:", error);
    return Response.json(
      { message: "An error occurred while handling GET request." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Incoming POST request body:", body);

    return Response.json(
      {
        message: "POST request received successfully.",
        receivedData: body,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return Response.json(
      { message: "An error occurred while handling POST request." },
      { status: 500 }
    );
  }
}
