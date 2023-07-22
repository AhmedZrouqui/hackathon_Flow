'use client'

import AppProvider from '@/context/appContext'
import './globals.css'
import { Inter } from 'next/font/google'
import Modal from '@/components/modal'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className + ' min-h-screen'}>
                <AppProvider>
                    <>
                        {children}
                        <Modal />
                    </>
                </AppProvider>
            </body>
        </html>
    )
}
