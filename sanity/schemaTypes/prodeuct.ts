import { title } from "process";

export default{
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'name of product',
            type: 'string'
        },
        {
            name: 'image',
            type:'array',
            title:'Product Images',
            of: [{type:'image'}]
        },
        {
            name : 'description',
            type: 'text',
            title: 'Description'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options : {
                source : 'name'
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: "price_id",
            title:"Strip Price ID",
            type:"string",
        },
        {
            name: 'category',
            title: 'product Category',
            type: 'reference',
            to : [
                {type : 'category'}
            ]
        }
    ],
}