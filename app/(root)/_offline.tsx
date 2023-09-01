import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const _offline = (props: Props) => {
    return (
        <div className='flex h-screen w-full justify-center gap-4 items-center'>
            <h2 className='text-light-1 font-medium'>You Are Offline go back to online</h2>
            <Button >Restart</Button>
        </div>
    )
}

export default _offline