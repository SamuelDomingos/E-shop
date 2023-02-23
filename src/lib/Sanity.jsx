import imageUrlBuilder from '@sanity/image-url'

export const URL2 = "https://wiqx2knd.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22product%22%5D";

const imageBuilderConfig = {
    projectId: 'wiqx2knd',
    dataset: 'production',
}

const builder = imageUrlBuilder(imageBuilderConfig);

export const urlFor = (source) => {
    return builder.image(source)
}