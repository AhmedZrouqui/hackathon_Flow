'use client'

import Form from '@/components/Form'
import GoBack from '@/components/GoBack'
import { FormType } from '@/lib/types'
import React from 'react'

function Page() {
    return (
        <div>
            <GoBack />
            <Form type={FormType.CREATE} />
        </div>
    )
}

export default Page
