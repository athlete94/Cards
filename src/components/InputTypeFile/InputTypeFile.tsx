import React, {ChangeEvent, useState} from 'react';
import {IconButton} from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

type InputTypeFilePropsType = {
    setUserAva: (ava: string) => void
    userAva?: string
}

export const InputTypeFile = React.memo(({userAva, setUserAva}: InputTypeFilePropsType) => {


    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setUserAva( file64)
                })
            } else {
                alert('Слишком большой файл')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    const errorHandler = () => {
        setIsAvaBroken(true)
        alert('Кривая картинка')
    }


    return (
        <label>
            <img src={isAvaBroken ? 'https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg' : userAva}
                 onError={errorHandler}
                 alt=""/>

            <input type="file"
                   onChange={uploadHandler}
                   style={{display: 'none'}}

            />
            <div style={{display:'flex', justifyContent: 'center', alignItems:'center'}}>
                <IconButton component="span" >
                    <DriveFolderUploadIcon/>
                </IconButton>
            </div>

        </label>
    )
})