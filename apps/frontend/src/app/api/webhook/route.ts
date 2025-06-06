import { NextRequest, NextResponse } from "next/server";
const axios = require("axios");

// Type for the webhook response
type WebhookResponse = {
  success: boolean;
  message: string;
  data?: any;
};

const optiGraphUrl = process.env.OPTIMIZELY_GRAPH_GATEWAY || 
    "https://cg.optimizely.com";

const optiContentEndpoint = process.env.OPTIMIZELY_GRAPH_URL_CONTENT_ENDPOINT ||
    "/content/v2?auth=";

const optiGraphContentEnpointUrl = optiGraphUrl + optiContentEndpoint + process.env.OPTIMIZELY_GRAPH_SINGLE_KEY;

const bingWebmasterUrl = process.env.BING_WEBMASTER_URL ||
    "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=";

const getContentByKeyQuery = `
        query GetContentByKey($key: String!) {
        Content: _Content(where: { _metadata: { key: { eq: $key } } }) {
            items {
            _metadata {
                key
                 url {
                    hierarchical
                    base
                }
            }
            _id
            }
        }
        }
    `;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<WebhookResponse>> {
  try {
    const authHeader = request.headers.get("authorization");

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ") ||
      authHeader.split(" ")[1] !== process.env.PUBLISH_HANDLER_WEBHOOK_SECRET
    ) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    console.log("Webhook eventreceived:", body);

    const key = body.data.docId.split("_")[0].split("-").join("");
    console.log("key received:", key);

    const { base, url } = await getContentItemUrlByKey(key);

    await submitToIndexNow(base, url);
    await submitToBing(base, url);

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
      data: body,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}


async function getContentItemUrlByKey(key: any) {
  const response = await axios.post(
    optiGraphContentEnpointUrl,
    {
      getContentByKeyQuery,
      variables: { key },
    },
  );

  const base = response.data.data.Content.items[0]?._metadata?.url.base;
  const url =
    base + response.data.data.Content.items[0]?._metadata?.url.hierarchical;
  console.log("Content URL:", url);
  return { base, url };
}

async function submitToBing(base: any, url: any) {
  try {
    const bingResponse = await axios.post(
      bingWebmasterUrl + process.env.BING_WEBMASTER_API_KEY,
      {
        siteUrl: base,
        url: url,
      },
    );
    console.log("Bing API response:", bingResponse.data);
  } catch (bingError) {
    console.error("Error submitting URL to Bing:", bingError);
  }
}

async function submitToIndexNow(base: any, url: any) {
  try {
    const bingResponse = await axios.post(
      bingWebmasterUrl + process.env.INDEXNOW_URL,
        {
        "host": base,
        "key": process.env.INDEXNOW_KEY,
        "keyLocation": base + process.env.INDEXNOW_KEY_LOCATION || "https://xc-opti-finserv.vercel.app/.well-known/indexnow.txt",
        "urlList": [
          url
        ]
      }
    );
    console.log("IndexNow API response:", bingResponse.data);
  } catch (bingError) {
    console.error("Error submitting URL to IndexNow:", bingError);
  }
}

// Optionally allow GET requests for webhook testing/verification
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: "Webhook endpoint is active",
  });
}

// Configure the route handler
export const runtime = "edge"; // Use edge runtime for better performance
export const dynamic = "force-dynamic"; // Always run dynamically
