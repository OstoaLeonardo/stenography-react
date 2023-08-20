import { useState } from 'react'
import { Input } from './components/Input'
import { ImageOutput } from './components/ImageOutput'

function App() {
  const [fileContent, setFileContent] = useState('')
  const [originalImage, setOriginalImage] = useState('')
  const [grayScaleImage, setGrayScaleImage] = useState('')
  const [modifiedImage, setModifiedImage] = useState('')

  const downloadImage = () => {
    // Convertir la imagen en Blob
    const modifiedImageBlob = dataURItoBlob(modifiedImage);

    // Crear una URL para el Blob
    const url = window.URL.createObjectURL(modifiedImageBlob);

    // Crear un enlace de descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image.bmp';
    a.click();

    // Liberar la URL del Blob
    window.URL.revokeObjectURL(url);
  }

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-900 py-16 gap-8'>
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        Estegano
        <span className='text-blue-600 dark:text-blue-500'>grafía</span>
      </h1>
      <div className='w-3/5 flex flex-col gap-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700'>
        <Input
          setFileContent={setFileContent}
          setOriginalImage={setOriginalImage}
          setGrayScaleImage={setGrayScaleImage}
          setModifiedImage={setModifiedImage} />
        {originalImage && grayScaleImage && (
          <div className='grid grid-cols-3 gap-6'>
            <ImageOutput title='Original image' image={originalImage} />
            <ImageOutput title='Grayscale image' image={grayScaleImage} />
            {modifiedImage && (
              <ImageOutput title='Modified image' image={modifiedImage} />
            )}
          </div>
        )}
        {fileContent && originalImage && grayScaleImage && modifiedImage && (
          <button
            type='button'
            onClick={downloadImage}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
            Descargar imagen modificada
          </button>
        )}
      </div>
    </main>
  )
}

export default App
