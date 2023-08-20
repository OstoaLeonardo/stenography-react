export function ImageOutput({ title, image }) {
    return (
        <>
            <div className='flex flex-col gap-2'>
                <span className='text-sm font-medium text-gray-900 dark:text-white'>
                    {title}
                </span>
                <img
                    className='rounded-xl'
                    src={image}
                    alt={title} />
            </div>
        </>
    )
}