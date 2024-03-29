
const loading = () => {
    return (
        <>
            <h1 className='head-text'>Activity</h1>
            <section className=' mt-9 flex flex-col gap-4'>
                <div className='p-4 blur-card-bg flex gap-2 items-center rounded-md'>
                    <div className='h-5 w-5 bg-gray-400 bg-opacity-75 rounded-full animate-pulse' />
                    <div className='bg-gray-400 bg-opacity-75 h-5 w-40 rounded-md animate-pulse' />
                </div>
                <div className='p-4 blur-card-bg flex gap-2 items-center rounded-md'>
                    <div className='h-5 w-5 bg-gray-400 bg-opacity-75 rounded-full animate-pulse' />
                    <div className='bg-gray-400 bg-opacity-75 h-5 w-40 rounded-md animate-pulse' />
                </div>
            </section>
        </>
    )
}

export default loading