import { useState } from "react"

const ImageUpload = ({ register, name = "file", currentImage, baseUrl }) => {
    const [preview, setPreview] = useState(null)

    const getImageSrc = () => {
        if (preview) return preview
        if (!currentImage) return null
        if (currentImage.startsWith("http")) return currentImage
        return `${baseUrl}/uploads/${currentImage}`
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
        } else {
            setPreview(null)
        }
    }

    const imageSrc = getImageSrc()

    return (
        <div className="mb-3">
            <label className="form-label">Imagen</label>
            {imageSrc && (
                <div className="mb-2">
                    <img src={imageSrc} alt="Preview" className="rounded border card-img-cover d-block" />
                </div>
            )}
            <input
                type="file"
                className="form-control"
                accept="image/*"
                {...register(name, { onChange: handleFileChange })}
            />
            <small className="text-muted">Subí una imagen o dejá vacío para mantener la actual</small>
        </div>
    )
}

export default ImageUpload