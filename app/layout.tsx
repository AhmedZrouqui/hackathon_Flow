import AppProvider from '@/context/appContext'
import './globals.css'
import { Inter } from 'next/font/google'
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
            <body className={`${inter.className} min-h-screen`}>
                <AppProvider>
                    <>
                        <Header />
                        <div className="max-w-7xl m-auto pt-16">{children}</div>
                        <Toast />
                    </>
                </AppProvider>
            </body>
        </html>
    )
}
