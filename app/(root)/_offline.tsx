/**
 * @name _offline.tsx
 * @description This is the offline page of the application
 * @module app/%28root%29/_offline
 * @path app/%28root%29/_offline.tsx
 * @type page
 * @project videon
*/
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