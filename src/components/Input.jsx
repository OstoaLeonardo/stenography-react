import { useState } from 'react'

export function Input({ setFileContent, setOriginalImage, setGrayScaleImage, setModifiedImage }) {
    const [content, setContent] = useState('')
    const [grayScaleImageSrc, setGrayScaleImageSrc] = useState('')

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const content = reader.result
                setContent(content)
                setFileContent(content)
            }
            reader.readAsText(file)
        }
    }

    const handleContentChange = (event) => {
        setContent(event.target.value)
        setFileContent(event.target.value)
    }

    const handleImageUpload = (event) => {
        const image = new Image()
        image.src = URL.createObjectURL(event.target.files[0])
        // setImageSrc(image.src)

        image.onload = () => {
            setOriginalImage(image.src)

            const grayScaleImage = getGrayScaleImage(image.src)
            setGrayScaleImage(grayScaleImage)
            setGrayScaleImageSrc(grayScaleImage)
        }
    }

    const hideContent = () => {
        console.log(grayScaleImageSrc, content)

        if (content && grayScaleImageSrc) {
            const modifiedImage = getModifiedImage(grayScaleImageSrc, content)
            setModifiedImage(modifiedImage)
        }
    }

    const getGrayScaleImage = (imageSrc) => {
        const image = new Image()
        image.src = imageSrc

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        canvas.width = image.width
        canvas.height = image.height

        context.drawImage(image, 0, 0)

        const imageData = context.getImageData(0, 0, image.width, image.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
            data[i] = avg
            data[i + 1] = avg
            data[i + 2] = avg
        }

        context.putImageData(imageData, 0, 0)

        return canvas.toDataURL('image/bmp')
    }

    const getModifiedImage = (imageSrc, content) => {
        // hide content in image
        const image = new Image()
        image.src = imageSrc

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        canvas.width = image.width
        canvas.height = image.height

        context.drawImage(image, 0, 0)

        const imageData = context.getImageData(0, 0, image.width, image.height)
        const data = imageData.data

        const contentArray = content.split('')
        let contentIndex = 0

        for (let i = 0; i < data.length; i += 4) {
            if (contentArray[contentIndex]) {
                const charCode = contentArray[contentIndex].charCodeAt(0)
                data[i] = charCode
                data[i + 1] = charCode
                data[i + 2] = charCode
                contentIndex++
            } else {
                break
            }
        }

        context.putImageData(imageData, 0, 0)

        return canvas.toDataURL('image/bmp')
    }

    return (
        <>
            <label htmlFor='file-text' className='text-sm font-medium text-gray-900 dark:text-white'>Input</label>
            <textarea
                type='text'
                id='file-text'
                className='font-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:text-white'
                placeholder='Mensaje'
                defaultValue={content}
                onChange={handleContentChange}
            />
            <input
                type='file'
                id='file-input'
                accept='.txt'
                onChange={handleFileUpload}
                className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400'
            />
            <input
                type='file'
                id='file-input'
                accept='.png, .jpg, .jpeg .bmp'
                onChange={handleImageUpload}
                className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400'
            />
            <button
                type='button'
                onClick={hideContent}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                Ocultar mensaje
            </button>
            <hr className='h-px my-2 border-0 bg-gray-200 dark:bg-zinc-700' />
        </>
    )
}