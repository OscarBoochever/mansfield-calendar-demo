import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check, Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Accessibility Statement | City of Mansfield Events Calendar',
  description: 'Information about the accessibility features and WCAG 2.1 AA compliance of the City of Mansfield Events Calendar.',
}

export default function AccessibilityPage() {
  const features = [
    'Keyboard navigation support throughout the application',
    'Skip navigation links to bypass repetitive content',
    'Proper heading hierarchy for screen reader navigation',
    'ARIA labels on all interactive elements',
    'Sufficient color contrast ratios (4.5:1 minimum)',
    'Focus indicators on all interactive elements',
    'Alt text for all images and visual content',
    'Status indicators that don\'t rely solely on color',
    'Responsive design that works on all device sizes',
    'Support for browser zoom up to 200%',
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 focus:outline-none focus:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Calendar
      </Link>

      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Accessibility Statement
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          The City of Mansfield is committed to ensuring digital accessibility for people with
          disabilities. We are continually improving the user experience for everyone and applying
          relevant accessibility standards.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Conformance Status
          </h2>
          <p className="text-gray-600 mb-4">
            This Events Calendar application is designed to conform to the{' '}
            <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>. These
            guidelines explain how to make web content more accessible to people with disabilities.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800 font-medium">
              <Check className="w-5 h-5" />
              WCAG 2.1 Level AA Compliant
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Accessibility Features
          </h2>
          <p className="text-gray-600 mb-4">
            This application includes the following accessibility features:
          </p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Assistive Technology Compatibility
          </h2>
          <p className="text-gray-600 mb-4">
            This application is designed to be compatible with the following assistive technologies:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
            <li>Screen magnification software</li>
            <li>Speech recognition software</li>
            <li>Keyboard-only navigation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Keyboard Navigation
          </h2>
          <p className="text-gray-600 mb-4">
            All functionality is available using a keyboard. Common keyboard shortcuts include:
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-2 font-medium text-gray-900">Key</th>
                  <th className="pb-2 font-medium text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Tab</kbd></td>
                  <td className="py-2">Move to next focusable element</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Shift + Tab</kbd></td>
                  <td className="py-2">Move to previous focusable element</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Enter</kbd></td>
                  <td className="py-2">Activate focused element</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Escape</kbd></td>
                  <td className="py-2">Close dialogs and menus</td>
                </tr>
                <tr>
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Arrow keys</kbd></td>
                  <td className="py-2">Navigate within calendar views</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Feedback & Contact
          </h2>
          <p className="text-gray-600 mb-4">
            We welcome your feedback on the accessibility of this application. If you encounter
            accessibility barriers or have suggestions for improvement, please contact us:
          </p>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary-600" />
              <a
                href="mailto:accessibility@mansfield.gov"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                accessibility@mansfield.gov
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary-600" />
              <a
                href="tel:8172764200"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                (817) 276-4200
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We aim to respond to accessibility feedback within 2 business days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Technical Specifications
          </h2>
          <p className="text-gray-600">
            This application relies on the following technologies for accessibility:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
            <li>HTML5 semantic elements</li>
            <li>WAI-ARIA for enhanced accessibility</li>
            <li>CSS for visual presentation</li>
            <li>JavaScript for interactive features</li>
          </ul>
        </section>
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </div>
    </div>
  )
}
