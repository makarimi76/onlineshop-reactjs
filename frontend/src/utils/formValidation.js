export const productValidation = (values, formData, errors, setErrors) => {
    const temp = { ...errors }
    if ('name' in values)
        temp.name = values.name ? '' : 'نام محصول اجباری می باشد'
    if ('description' in values)
        temp.description = values.description ? '' : 'توضیحات محصول اجباری می باشد'
    if ('categories' in values)
        temp.categories = values.categories.length !== 0 ? '' : 'لطفا یک دسته بندی انتخاب کنید'

    setErrors({ ...temp })

    if (values === formData)
        return Object.values(temp).every(x => x === '')
}