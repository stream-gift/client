import UploadVODButton from '@/components/UploadVODButton';

export default function Clips() {
    return (
        <div>
            <h1 className='text-5xl font-medium mb-10'>Clips/VODs</h1>
            <UploadVODButton />

            <p className='text-2xl font-light mt-16'>You have no VODs uploaded currently.</p>
        </div>
    )
}