import React from 'react'

function FormGroup({ children }: React.PropsWithChildren) {
    return <div className="flex gap-3 w-full">{children}</div>
}

export default FormGroup
