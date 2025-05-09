import { NextRequest, NextResponse } from 'next/server';
import { getClientConfig } from '@remkoj/optimizely-dxp-react';
import { createContentGraphClient } from '@remkoj/optimizely-dxp-nextjs';

export async function GET(
  request: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  console.log("Requesting children for path:", params.path);

  try {
    // Format the path correctly
    const pagePath = params.path ? `/${params.path.join('/')}` : '/';
    
    // Get the ContentGraph client
    const config = getClientConfig();
    const client = createContentGraphClient({
      ...config,
      debug: true
    });
    
    // Construct a query to get the parent page and its children
    const query = `
      query GetSiblingPages($path: String!) {
        Content(where: { RelativePath: { eq: $path } }, limit: 1) {
          items {
            _id
            Name
            ParentLink {
              Expanded {
                items {
                  _children {
                    items {
                      _id
                      Name
                      Url
                      RelativePath
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    // Execute the query
    const result = await client.query({
      query,
      variables: { path: pagePath }
    });
    
    console.log("GraphQL response:", JSON.stringify(result.data, null, 2));
    
    // Extract children
    const parentPage = result.data?.Content?.items?.[0];
    const children = parentPage?.ParentLink?.Expanded?.items?.[0]?._children?.items || [];
    
    // Return the children
    return NextResponse.json(children.map((child: any) => ({
      id: child._id,
      name: child.Name || "Unnamed Page",
      url: child.Url || child.RelativePath
    })));
  } catch (error) {
    console.error('Error fetching child pages:', error);
    return NextResponse.json({ error: 'Failed to fetch child pages' }, { status: 500 });
  }
}
