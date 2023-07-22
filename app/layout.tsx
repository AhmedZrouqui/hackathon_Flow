'use client'

import AppProvider from '@/context/appContext'
import './globals.css'
import { Inter } from 'next/font/google'
import Modal from '@/components/modal'
import Header from '@/components/Header'
import Toast from '@/components/Toast'

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
                        <Header />
                        <div className="p-4">{children}</div>

                        <Modal />
                        <Toast />
                    </>
                </AppProvider>
            </body>
        </html>
    )
}
