export const dynamic = "force-dynamic";
export const runtime = "edge";

import Link from "next/link";

export default function NotFoundPage()
{
    return <div className="min-h-[75vh] w-full flex justify-center items-center">
        <div className="prose">
            <p>This site is used for demonstration purposes only. The page you&quot;ve tried to reach no longer exists </p>
            <nav className="error-page-navigation">
            <h2>Try one of these popular pages instead:</h2>
            <ul>
                <li><a href="/personal/personal-banking">Product Comparison</a></li>
                <li><a href="/digital-banking/financial-calculators">Financial Calculators</a></li>
                <li><a href="/digital-banking/chart-test">Historical Charts</a></li>
                <li><a href="/insights">Insights</a></li>
                <li><a href="/insights?topic=Investment">Investment Insights</a></li>
                <li><a href="/funds">Mutual Funds</a></li>
                <li><a href="/funds/test-fund-post-page">Fund Detail Page</a></li>
                <li><a href="/support/about/our-people">Our People</a></li>
                <li><a href="/support/about/press">Press Releases</a></li>
                <li><a href="/locations-list">Locations</a></li>
                <li><a href="/locations">Location Search</a></li>
                <li><a href="/support/contact-us">Contact Us Form</a></li>
                <li><a href="/support/faq">FAQ</a></li>
            </ul>
            </nav>

        </div>
    </div>
}