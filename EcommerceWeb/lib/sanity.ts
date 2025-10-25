import urlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";


export const client = createClient({
    projectId:"n0gwc2hc",
    dataset:"production",
    apiVersion:"2022-03-25",
    useCdn:true,
});

const builder = urlBuilder(client);

export function urlfor(source: any){
    return builder.image(source);
}