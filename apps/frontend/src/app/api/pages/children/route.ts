import { NextRequest, NextResponse } from 'next/server';
import { getSdk } from '@/sdk';

export async function GET(request: NextRequest) {
  // make sure the variable is visible in both try and catch
  let parentPath: string = '/';

  try {
    const { searchParams } = new URL(request.url);
    parentPath = searchParams.get('path') ?? '/';
    
    console.log("Fetching children for parent path:", parentPath);
    
    // Try to use the existing SDK
    try {
      const sdk = await getSdk();
      
      // Check if sdk has a method for fetching children
      // This depends on your existing GraphQL setup
      let children: any[] = [];
      
      // The generated SDK doesn't guarantee a `getChildren` function.
      const sdkAny = sdk as any;            // ← cast once, use safely below
      if (typeof sdkAny.getChildren === 'function') {
        const result = await sdkAny.getChildren({ path: parentPath });
        children = result?.items ?? [];
      } else {
        // Fallback to specific queries if the SDK doesn't have the method
        // (This will depend on your generated SDK methods)
        console.log("Using fallback SDK approach");
        return getFallbackData(parentPath);
      }
      
      // Transform the data
      const formattedChildren = children.map((child: any) => ({
        id: child._id,
        name: child.Name || child._name || "Unnamed Page",
        url: child.Url || child._path || child.RelativePath || "#"
      }));
      
      return NextResponse.json(formattedChildren);
    } catch (sdkError) {
      console.error("SDK approach failed:", sdkError);
      return getFallbackData(parentPath);
    }
  } catch (error) {
    console.error('Error in children API:', error);
    // still have access to the last value of parentPath
    return getFallbackData(parentPath);
  }
}

// Fallback function that returns hardcoded data when the CMS query fails
function getFallbackData(parentPath: string) {
  console.log("Using fallback data for path:", parentPath);
  
  const navigationMap = {
    '/': [
      { id: '1', name: 'Business', url: '/business' },
      { id: '2', name: 'Personal', url: '/personal' },
      { id: '3', name: 'About Us', url: '/about' },
      { id: '4', name: 'Careers', url: '/careers' }
    ],
    '/business': [
      { id: '11', name: 'Business Banking', url: '/business/business-banking' },
      { id: '12', name: 'Business Loans', url: '/business/business-loans' },
      { id: '13', name: 'Treasury Management', url: '/business/treasury-management' },
      { id: '14', name: 'Merchant Services', url: '/business/merchant-services' }
    ],
    '/business/business-banking': [
      { id: '111', name: 'Business Checking Analyzed', url: '/business/business-banking/business-checking-analyzed' },
      { id: '112', name: 'Business Savings', url: '/business/business-banking/business-savings' },
      { id: '113', name: 'Business CDs', url: '/business/business-banking/business-cds' }
    ],
    '/personal': [
      { id: '21', name: 'Personal Banking', url: '/personal/personal-banking' },
      { id: '22', name: 'Mortgages', url: '/personal/mortgages' },
      { id: '23', name: 'Investments', url: '/personal/investments' }
    ]
  };
  
  const children = navigationMap[parentPath as keyof typeof navigationMap] || [];
  return NextResponse.json(children);
}
