import type { NextApiRequest, NextApiResponse } from 'next';
import { getContentGraphClient } from '@/lib/contentGraph';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the path from the URL
    const { path } = req.query;
    const pagePath = Array.isArray(path) ? `/${path.join('/')}` : path || '/';
    
    // Get the ContentGraph client
    const client = getContentGraphClient();
    
    // Construct a query to get the parent page and its children
    const query = `
      query GetChildPages($path: String!) {
        Content(where: { RelativePath: { eq: $path } }, limit: 1) {
          items {
            _id
            Name
            ParentLink {
              Expanded {
                _children {
                  items {
                    _id
                    Name
                    Url
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    // Execute the query
    const result = await client.request(query, { path: pagePath });
    
    // Extract children
    const parentPage = result.Content?.items?.[0];
    const children = parentPage?.ParentLink?.Expanded?._children?.items || [];
    
    // Return the children
    res.status(200).json(children.map((child: any) => ({
      id: child._id,
      name: child.Name,
      url: child.Url
    })));
  } catch (error) {
    console.error('Error fetching child pages:', error);
    res.status(500).json({ error: 'Failed to fetch child pages' });
  }
}
