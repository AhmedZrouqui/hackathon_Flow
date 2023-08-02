import Form from '@/components/Form'
import GoBack from '@/components/GoBack'
import { FormType } from '@/lib/types'
import React from 'react'
import { createPlayer } from '../actions'

function Page() {
    return (
        <div>
            <GoBack />
            <Form
                type={FormType.CREATE}
                initialData={null}
                action={createPlayer}
            />
        </div>
    )
}

export default Page
