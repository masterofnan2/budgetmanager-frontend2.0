import React from "react";
import Icon from "../Icon/Icon";

export type Image = {
    imageData: File | null,
    imageUrl: string
}

type Props = {
    size?: 'lg' | 'md' | 'sm',
    addImage: (image: Image) => void,
    removeImage: (url: string) => void
    imageUrl?: string
}

const maxAllowedSize = 2000000;

const authorizedFileType = 'image';

const componentSizes = {
    sm: "1x",
    md: "2x",
    lg: "3x"
}

const ImageInputDD = React.memo(({ size = 'lg', addImage, removeImage, imageUrl }: Props) => {

    const imageMaxHeight = React.useMemo(() => {
        switch (size) {
            case 'sm':
                return '100px';

            case 'md':
                return '200px';

            default:
                return '250px';
        }
    }, [size]);

    const handleAllowDrop = React.useCallback((e: any) => {
        e.preventDefault();
    }, []);

    const handleChange = React.useCallback((e: any) => {
        e.preventDefault();
        const files = e.type === 'drop' ? e.dataTransfer.files : e.target.files;

        const imageData = files[0] as File | null;

        if (imageData && imageData.type.includes(authorizedFileType) && imageData.size <= maxAllowedSize) {
            const Reader = new FileReader;

            Reader.readAsDataURL(imageData);
            Reader.onload = () => {
                const imageUrl = Reader.result as string;
                addImage({ imageData, imageUrl });
            }
        } else {
            // Toaster.show({
            //     title: "erreur de chargement de l'image",
            //     content: `Le format de l'image ou la taille de l'image n'est pas prise en charge.
            //     Veuillez vous assurer que l'image ne pèse pas plus de 2Mo et
            //     est de type Jpeg, jpg, png ou webp.`
            // });
        }
    }, [addImage]);

    return <>
        {!imageUrl &&
            <div className="dragAndDrop"
                onDragOver={handleAllowDrop}
                onDrop={handleChange}
                onClick={(e: any) => e.currentTarget.children[0]?.click()}>
                    
                <input
                    type="file"
                    hidden={true}
                    onChange={handleChange}
                    accept="image/*" />

                <div className="dragAndDropDescription">
                    <div className="d-flex justify-content-center">
                        <Icon className={"text-light icon-" + componentSizes[size]}>image</Icon>
                    </div>
                    {size !== 'sm' &&
                        <div>Drag and Drop</div>}
                </div>
            </div>}

        {imageUrl && <div
            className="imageInputDiv">
            <span onClick={() => removeImage(imageUrl)}><Icon>close</Icon></span>
            <img
                src={imageUrl}
                className="img-fluid img-thumbnail"
                alt="Just inserted image"
                width='auto'
                height='auto'
                style={{ maxHeight: imageMaxHeight }}
            />
        </div>}
    </>
});

export default ImageInputDD;