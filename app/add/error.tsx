'use client'

import ErrorComponent from '@/components/Error'
const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => (
    <ErrorComponent error={error} reset={reset} />
)

export default ErrorPage
