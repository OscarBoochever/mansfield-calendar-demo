'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* City Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">City of Mansfield</h3>
            <address className="not-italic text-sm text-gray-600 space-y-1">
              <p>1200 E Broad St</p>
              <p>Mansfield, TX 76063</p>
              <p>
                <a href="tel:8172764200" className="hover:text-primary-600">
                  (817) 276-4200
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600">
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-600 hover:text-primary-600">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-gray-600 hover:text-primary-600">
                  API Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://www.mansfield.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 inline-flex items-center gap-1"
                >
                  City Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Accessibility */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Accessibility</h3>
            <p className="text-sm text-gray-600 mb-3">
              This calendar application is designed to meet WCAG 2.1 AA accessibility standards.
            </p>
            <ul className="text-sm space-y-2">
              <li>
                <Link
                  href="/accessibility"
                  className="text-gray-600 hover:text-primary-600 focus:outline-none focus:underline"
                >
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <a
                  href="mailto:accessibility@mansfield.gov"
                  className="text-gray-600 hover:text-primary-600 focus:outline-none focus:underline"
                >
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} City of Mansfield, Texas. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Built by{' '}
            <a
              href="https://www.oscarboochever.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              Oscar Boochever Consulting
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
